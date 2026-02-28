"""
===================================================================
合トレマッチングBot - メインアプリケーション
===================================================================
毎週のサイクル:
  月曜 09:00  → 募集投稿（ランダムにジム選出 + スレッドに日別投稿）
  水曜 18:00  → リマインド投稿
  水曜 23:59  → 締め切り & リアクション自動集計
  木曜 09:00  → 確定アナウンス投稿
  当日  06:30 → 当日リマインド投稿
===================================================================
"""

import json
import os
import random
import logging
from datetime import datetime, timedelta
from pathlib import Path

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from dotenv import load_dotenv

import config

# -------------------------------------------------------------------
# 初期設定
# -------------------------------------------------------------------
load_dotenv()

# 環境変数 or config.py から読み込み（環境変数を優先）
SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN", config.SLACK_BOT_TOKEN)
CHANNEL_ID = os.getenv("CHANNEL_ID", config.CHANNEL_ID)

client = WebClient(token=SLACK_BOT_TOKEN)
scheduler = BlockingScheduler(timezone="Asia/Tokyo")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


# -------------------------------------------------------------------
# データ永続化（JSON）
# -------------------------------------------------------------------
DATA_PATH = Path(config.DATA_FILE)


def load_data() -> dict:
    """保存済みの週次データを読み込む"""
    if DATA_PATH.exists():
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_data(data: dict):
    """週次データをJSONに保存"""
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# -------------------------------------------------------------------
# ユーティリティ
# -------------------------------------------------------------------
WEEKDAY_JP = {
    0: "月曜", 1: "火曜", 2: "水曜", 3: "木曜",
    4: "金曜", 5: "土曜", 6: "日曜",
}


def get_candidate_dates() -> list[dict]:
    """
    合トレ候補期間（次の木曜〜水曜）の日付リストを生成。
    月曜に実行される想定で、同じ週の木曜から翌水曜までを返す。
    """
    today = datetime.now()

    # 次の木曜を見つける（月曜=0 → 木曜=3 → +3日）
    days_until_thursday = (3 - today.weekday()) % 7
    if days_until_thursday == 0 and today.weekday() == 3:
        # 今日が木曜なら翌週木曜
        days_until_thursday = 7
    next_thursday = today + timedelta(days=days_until_thursday)

    dates = []
    for i in range(config.CANDIDATE_DAYS):
        d = next_thursday + timedelta(days=i)
        dates.append({
            "date": d.strftime("%Y-%m-%d"),
            "display": f'{WEEKDAY_JP[d.weekday()]}（{d.month}/{d.day}）',
            "weekday": d.weekday(),
        })
    return dates


def select_random_gyms() -> list[dict]:
    """ジムプールからランダムにN箇所を選出"""
    n = min(config.NUM_GYMS_PER_WEEK, len(config.GYM_POOL))
    selected = random.sample(config.GYM_POOL, n)

    result = []
    for i, gym in enumerate(selected):
        emoji_info = config.LOCATION_EMOJIS[i]
        result.append({
            "name": gym["name"],
            "url": gym["url"],
            "emoji": emoji_info["emoji"],
            "display_emoji": emoji_info["display"],
        })
    return result


def format_gym_line(gym: dict) -> str:
    """ジム情報を Slack mrkdwn 形式でフォーマット"""
    return f'{gym["display_emoji"]} <{gym["url"]}|{gym["name"]}>'


def get_reaction_users(channel: str, timestamp: str, emoji: str) -> list[str]:
    """
    特定メッセージの特定リアクションを押したユーザーIDリストを取得。
    Bot自身のIDは除外する。
    """
    try:
        result = client.reactions_get(channel=channel, timestamp=timestamp)
        message = result.get("message", {})
        reactions = message.get("reactions", [])

        for reaction in reactions:
            if reaction["name"] == emoji:
                users = reaction.get("users", [])
                # Bot自身を除外
                bot_info = client.auth_test()
                bot_user_id = bot_info["user_id"]
                return [u for u in users if u != bot_user_id]
        return []

    except SlackApiError as e:
        logger.error(f"リアクション取得エラー: {e}")
        return []


def get_display_name(user_id: str) -> str:
    """ユーザーIDから表示名を取得"""
    try:
        result = client.users_info(user=user_id)
        user = result["user"]
        return (
            user.get("profile", {}).get("display_name")
            or user.get("real_name")
            or user_id
        )
    except SlackApiError:
        return user_id


# -------------------------------------------------------------------
# Step 1: 募集投稿（毎週月曜 9:00）
# -------------------------------------------------------------------
def post_recruitment():
    """月曜朝の合トレ募集投稿"""
    logger.info("=== 合トレ募集投稿を開始 ===")

    # ランダムにジム選出
    gyms = select_random_gyms()
    dates = get_candidate_dates()

    if not dates:
        logger.error("候補日が生成できませんでした")
        return

    period_start = dates[0]["display"]
    period_end = dates[-1]["display"]

    # --- メイン投稿 ---
    gym_lines = "\n".join([f"  {format_gym_line(g)}" for g in gyms])

    main_text = (
        f"🏋️ *今週の合トレ募集！（{period_start} 〜 {period_end}）*\n"
        f"\n"
        f"今週も合トレメンバー募集します！\n"
        f"スレッドに日程別の投稿があるので、"
        f"*参加できる日 × 行けるジム* のリアクションを押してください！\n"
        f"\n"
        f"*📍 今週の候補ジム（ランダム選出）*\n"
        f"{gym_lines}\n"
        f"\n"
        f"🕖 トレーニング時間：*{config.TRAINING_TIME}〜*\n"
        f"⏰ 締切：*水曜 23:59*\n"
        f"✅ 木曜朝に確定連絡します！"
    )

    try:
        main_result = client.chat_postMessage(
            channel=CHANNEL_ID,
            text=main_text,
            mrkdwn=True,
        )
        main_ts = main_result["ts"]
        logger.info(f"メイン投稿完了: ts={main_ts}")

    except SlackApiError as e:
        logger.error(f"メイン投稿エラー: {e}")
        return

    # --- スレッドに日別投稿 ---
    day_messages = {}
    for date_info in dates:
        emoji_legend = "\n".join([
            f"  {g['display_emoji']} → <{g['url']}|{g['name']}> に行ける！"
            for g in gyms
        ])

        day_text = (
            f"📅 *{date_info['display']}* に参加できる人！\n"
            f"\n"
            f"行けるジムのリアクションを押してね👇\n"
            f"{emoji_legend}"
        )

        try:
            day_result = client.chat_postMessage(
                channel=CHANNEL_ID,
                thread_ts=main_ts,
                text=day_text,
                mrkdwn=True,
            )
            day_ts = day_result["ts"]

            # Botが先にリアクションを付けておく（ユーザーが押しやすいように）
            for gym in gyms:
                client.reactions_add(
                    channel=CHANNEL_ID,
                    timestamp=day_ts,
                    name=gym["emoji"],
                )

            day_messages[date_info["date"]] = {
                "ts": day_ts,
                "display": date_info["display"],
            }
            logger.info(f"  日別投稿完了: {date_info['display']} ts={day_ts}")

        except SlackApiError as e:
            logger.error(f"  日別投稿エラー ({date_info['display']}): {e}")

    # --- データ保存 ---
    weekly_data = {
        "week_start": datetime.now().strftime("%Y-%m-%d"),
        "main_message_ts": main_ts,
        "gyms": gyms,
        "day_messages": day_messages,
        "confirmed_sessions": [],
    }
    save_data(weekly_data)
    logger.info("=== 募集投稿完了 ===")


# -------------------------------------------------------------------
# Step 2: リマインド（水曜 18:00）
# -------------------------------------------------------------------
def post_reminder():
    """水曜夕方のリマインド投稿"""
    logger.info("=== リマインド投稿 ===")

    data = load_data()
    if not data:
        logger.warning("週次データがありません。スキップします。")
        return

    main_ts = data.get("main_message_ts")
    gyms = data.get("gyms", [])
    day_messages = data.get("day_messages", {})

    # 現時点のリアクション状況を簡易集計
    total_entries = 0
    for date_str, msg_info in day_messages.items():
        for gym in gyms:
            users = get_reaction_users(CHANNEL_ID, msg_info["ts"], gym["emoji"])
            total_entries += len(users)

    reminder_text = (
        f"⏰ *合トレ募集、今夜締め切り！*\n"
        f"\n"
        f"まだの人は上のスレッドからリアクションしてね！\n"
        f"現在 *{total_entries}件* のエントリーあり 🔥\n"
        f"\n"
        f"締切：*今夜 23:59*"
    )

    try:
        client.chat_postMessage(
            channel=CHANNEL_ID,
            thread_ts=main_ts,
            text=reminder_text,
            reply_broadcast=True,  # チャンネルにも表示
            mrkdwn=True,
        )
        logger.info("リマインド投稿完了")
    except SlackApiError as e:
        logger.error(f"リマインド投稿エラー: {e}")


# -------------------------------------------------------------------
# Step 3: 締め切り & 自動集計（水曜 23:59）
# -------------------------------------------------------------------
def tally_reactions():
    """リアクションを集計して、開催する「日×場所」を決定"""
    logger.info("=== リアクション集計開始 ===")

    data = load_data()
    if not data:
        logger.warning("週次データがありません。スキップします。")
        return

    gyms = data.get("gyms", [])
    day_messages = data.get("day_messages", {})

    # 全組み合わせの集計
    results = []
    for date_str, msg_info in day_messages.items():
        for gym in gyms:
            users = get_reaction_users(CHANNEL_ID, msg_info["ts"], gym["emoji"])
            if users:
                results.append({
                    "date": date_str,
                    "date_display": msg_info["display"],
                    "gym_name": gym["name"],
                    "gym_url": gym["url"],
                    "gym_emoji": gym["display_emoji"],
                    "user_ids": users,
                    "count": len(users),
                })
                logger.info(
                    f"  {msg_info['display']} × {gym['name']}: "
                    f"{len(users)}人 {users}"
                )

    # 人数の多い順にソート
    results.sort(key=lambda x: x["count"], reverse=True)

    # 最少人数以上の組み合わせを開催候補にする
    confirmed = [r for r in results if r["count"] >= config.MIN_PARTICIPANTS]

    # 同じユーザーが複数日にいる場合のバッティングは許容
    # （同じ人が複数回合トレに参加するのはOK）

    data["confirmed_sessions"] = confirmed
    data["all_results"] = results
    save_data(data)

    logger.info(f"=== 集計完了: {len(confirmed)}件の開催確定 ===")
    return confirmed


# -------------------------------------------------------------------
# Step 4: 確定アナウンス（木曜 9:00）
# -------------------------------------------------------------------
def post_announcement():
    """木曜朝の確定アナウンス"""
    logger.info("=== 確定アナウンス投稿 ===")

    data = load_data()
    if not data:
        logger.warning("週次データがありません。スキップします。")
        return

    confirmed = data.get("confirmed_sessions", [])

    if not confirmed:
        # 開催なしの場合
        no_session_text = (
            "📢 *今週の合トレ結果*\n"
            "\n"
            f"残念ながら、今週は{config.MIN_PARTICIPANTS}人以上集まる"
            f"組み合わせがありませんでした 😢\n"
            "来週またチャレンジしましょう！💪"
        )
        try:
            client.chat_postMessage(
                channel=CHANNEL_ID,
                text=no_session_text,
                mrkdwn=True,
            )
        except SlackApiError as e:
            logger.error(f"アナウンス投稿エラー: {e}")
        return

    # --- 開催ありの場合 ---
    session_blocks = []
    for i, session in enumerate(confirmed):
        member_mentions = " ".join([f"<@{uid}>" for uid in session["user_ids"]])
        session_block = (
            f"{'🥇' if i == 0 else '🏋️'} "
            f"*{session['date_display']}*\n"
            f"  📍 <{session['gym_url']}|{session['gym_name']}>\n"
            f"  🕖 {config.TRAINING_TIME}〜\n"
            f"  👥 {session['count']}人参加: {member_mentions}"
        )
        session_blocks.append(session_block)

    sessions_text = "\n\n".join(session_blocks)

    announcement_text = (
        f"✅ *今週の合トレ確定！*\n"
        f"\n"
        f"{sessions_text}\n"
        f"\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"✅ 参加確定 → ✅ リアクション\n"
        f"❌ やっぱ無理 → ❌ リアクション\n"
        f"\n"
        f"当日朝にもリマインドします！🔥"
    )

    try:
        result = client.chat_postMessage(
            channel=CHANNEL_ID,
            text=announcement_text,
            mrkdwn=True,
        )
        data["announcement_ts"] = result["ts"]
        save_data(data)
        logger.info("確定アナウンス投稿完了")
    except SlackApiError as e:
        logger.error(f"確定アナウンス投稿エラー: {e}")

    # スケジュール：各確定日の朝にリマインド登録
    schedule_day_of_reminders(confirmed)


# -------------------------------------------------------------------
# Step 5: 当日リマインド（当日 6:30）
# -------------------------------------------------------------------
def schedule_day_of_reminders(sessions: list):
    """確定した合トレ日の朝にリマインドを送るジョブを登録"""
    reminder_hour = config.SCHEDULE["day_of_reminder"]["hour"]
    reminder_minute = config.SCHEDULE["day_of_reminder"]["minute"]

    for session in sessions:
        session_date = datetime.strptime(session["date"], "%Y-%m-%d")
        reminder_time = session_date.replace(
            hour=reminder_hour, minute=reminder_minute
        )

        # 過去の日付はスキップ
        if reminder_time <= datetime.now():
            logger.info(
                f"  リマインド日時が過去のためスキップ: {session['date']}"
            )
            continue

        job_id = f"day_reminder_{session['date']}_{session['gym_name']}"

        # 既存ジョブがあれば削除
        existing = scheduler.get_job(job_id)
        if existing:
            scheduler.remove_job(job_id)

        scheduler.add_job(
            post_day_of_reminder,
            "date",
            run_date=reminder_time,
            args=[session],
            id=job_id,
        )
        logger.info(
            f"  当日リマインド登録: {session['date_display']} "
            f"{reminder_hour}:{reminder_minute:02d}"
        )


def post_day_of_reminder(session: dict):
    """合トレ当日朝のリマインド"""
    member_mentions = " ".join([f"<@{uid}>" for uid in session["user_ids"]])

    reminder_text = (
        f"🔥 *おはよう！今日は合トレDAY！*\n"
        f"\n"
        f"📅 {session['date_display']}\n"
        f"📍 <{session['gym_url']}|{session['gym_name']}>\n"
        f"🕖 {config.TRAINING_TIME}〜\n"
        f"👥 {member_mentions}\n"
        f"\n"
        f"いいトレーニングにしよう💪"
    )

    try:
        client.chat_postMessage(
            channel=CHANNEL_ID,
            text=reminder_text,
            mrkdwn=True,
        )
        logger.info(f"当日リマインド投稿完了: {session['date_display']}")
    except SlackApiError as e:
        logger.error(f"当日リマインド投稿エラー: {e}")


# -------------------------------------------------------------------
# 手動実行コマンド（テスト・デバッグ用）
# -------------------------------------------------------------------
def run_full_cycle_test():
    """全ステップを手動で順番に実行（テスト用）"""
    logger.info("========== テスト実行開始 ==========")
    post_recruitment()
    logger.info("--- 5秒後にリマインドを実行 ---")
    import time; time.sleep(5)
    post_reminder()
    logger.info("--- 5秒後に集計を実行 ---")
    time.sleep(5)
    tally_reactions()
    logger.info("--- 5秒後にアナウンスを実行 ---")
    time.sleep(5)
    post_announcement()
    logger.info("========== テスト実行完了 ==========")


# -------------------------------------------------------------------
# スケジューラー登録 & 起動
# -------------------------------------------------------------------
def setup_scheduler():
    """週次スケジュールを登録"""
    sched = config.SCHEDULE

    # Step 1: 月曜 9:00 募集投稿
    scheduler.add_job(
        post_recruitment,
        CronTrigger(
            day_of_week=sched["recruit"]["day"],
            hour=sched["recruit"]["hour"],
            minute=sched["recruit"]["minute"],
        ),
        id="weekly_recruitment",
        replace_existing=True,
    )

    # Step 2: 水曜 18:00 リマインド
    scheduler.add_job(
        post_reminder,
        CronTrigger(
            day_of_week=sched["reminder"]["day"],
            hour=sched["reminder"]["hour"],
            minute=sched["reminder"]["minute"],
        ),
        id="weekly_reminder",
        replace_existing=True,
    )

    # Step 3: 水曜 23:59 集計
    scheduler.add_job(
        tally_reactions,
        CronTrigger(
            day_of_week=sched["deadline_and_tally"]["day"],
            hour=sched["deadline_and_tally"]["hour"],
            minute=sched["deadline_and_tally"]["minute"],
        ),
        id="weekly_tally",
        replace_existing=True,
    )

    # Step 4: 木曜 9:00 確定アナウンス
    scheduler.add_job(
        post_announcement,
        CronTrigger(
            day_of_week=sched["announce"]["day"],
            hour=sched["announce"]["hour"],
            minute=sched["announce"]["minute"],
        ),
        id="weekly_announcement",
        replace_existing=True,
    )

    logger.info("スケジューラー登録完了:")
    logger.info(f"  募集:     {sched['recruit']['day']} {sched['recruit']['hour']}:{sched['recruit']['minute']:02d}")
    logger.info(f"  リマインド: {sched['reminder']['day']} {sched['reminder']['hour']}:{sched['reminder']['minute']:02d}")
    logger.info(f"  集計:     {sched['deadline_and_tally']['day']} {sched['deadline_and_tally']['hour']}:{sched['deadline_and_tally']['minute']:02d}")
    logger.info(f"  確定:     {sched['announce']['day']} {sched['announce']['hour']}:{sched['announce']['minute']:02d}")


def main():
    """メインエントリーポイント"""
    import sys

    if len(sys.argv) > 1:
        command = sys.argv[1]

        if command == "test":
            # テスト: 全ステップ実行
            run_full_cycle_test()

        elif command == "recruit":
            post_recruitment()

        elif command == "reminder":
            post_reminder()

        elif command == "tally":
            tally_reactions()

        elif command == "announce":
            post_announcement()

        elif command == "status":
            # 現在の保存データを表示
            data = load_data()
            print(json.dumps(data, ensure_ascii=False, indent=2))

        else:
            print("使い方:")
            print("  python bot.py          → スケジューラー起動（本番）")
            print("  python bot.py test     → 全ステップをテスト実行")
            print("  python bot.py recruit  → 募集投稿のみ実行")
            print("  python bot.py reminder → リマインドのみ実行")
            print("  python bot.py tally    → 集計のみ実行")
            print("  python bot.py announce → 確定アナウンスのみ実行")
            print("  python bot.py status   → 現在のデータを表示")

    else:
        # 本番: スケジューラー起動
        logger.info("🤖 合トレマッチングBot 起動！")
        setup_scheduler()
        try:
            scheduler.start()
        except (KeyboardInterrupt, SystemExit):
            logger.info("Bot停止")


if __name__ == "__main__":
    main()
