# 🏋️ 合トレマッチングBot

Shape Fit メンバー向けの合同トレーニングマッチングを完全自動化する Slack Bot。

## 全体フロー

```
月曜 9:00   →  募集投稿（ジムをランダム選出 → スレッドに日別投稿）
                メンバーはリアクションで「日 × ジム」を回答
水曜 18:00  →  リマインド（現在のエントリー数を通知）
水曜 23:59  →  締め切り → リアクション自動集計
木曜 9:00   →  確定アナウンス（最多マッチの日×場所を通知）
当日  6:30  →  当日リマインド
```

## セットアップ手順

### 1. Slack Appを作成

1. https://api.slack.com/apps にアクセス
2. 「Create New App」→「From scratch」を選択
3. App名: `合トレBot`（任意）、Workspaceを選択

### 2. Bot権限を設定

「OAuth & Permissions」→「Bot Token Scopes」に以下を追加:

| Scope | 用途 |
|---|---|
| `chat:write` | メッセージ投稿 |
| `reactions:read` | リアクション取得 |
| `reactions:write` | リアクション付与（投票用） |
| `users:read` | ユーザー名取得 |
| `channels:read` | チャンネル情報取得 |
| `channels:history` | メッセージ履歴取得 |

### 3. Appをインストール

「Install to Workspace」→ 許可
→ 表示される `xoxb-xxxx` トークンをコピー

### 4. チャンネルにBotを追加

投稿先チャンネル（例: `#合トレ`）で:
- `/invite @合トレBot` を実行

### 5. 環境設定

```bash
# クローン & 依存インストール
cd goutore-bot
pip install -r requirements.txt

# 環境変数を設定
cp .env.example .env
# .env を編集して SLACK_BOT_TOKEN と CHANNEL_ID を入力
```

### 6. ジム候補を設定

`config.py` の `GYM_POOL` を編集:

```python
GYM_POOL = [
    {
        "name": "エニタイム渋谷",
        "url": "https://www.anytimefitness.co.jp/shibuya/",
    },
    {
        "name": "ゴールドジム表参道",
        "url": "https://www.goldsgym.jp/shop/13208",
    },
    # ↑ 自由に追加・削除
]
```

### 7. テスト実行

```bash
# 全ステップをテスト（実際にSlackに投稿されます）
python bot.py test

# 募集投稿だけテスト
python bot.py recruit

# 現在のデータ確認
python bot.py status
```

### 8. 本番起動

```bash
# スケジューラーが常駐して毎週自動実行
python bot.py
```

本番では `systemd`, `supervisord`, `Docker`, `Render`, `Railway` 等で
プロセスを常駐させてください。

## コマンド一覧

| コマンド | 説明 |
|---|---|
| `python bot.py` | 本番起動（スケジューラー常駐） |
| `python bot.py test` | 全ステップを順番にテスト実行 |
| `python bot.py recruit` | 募集投稿のみ |
| `python bot.py reminder` | リマインドのみ |
| `python bot.py tally` | リアクション集計のみ |
| `python bot.py announce` | 確定アナウンスのみ |
| `python bot.py status` | 保存データをJSON表示 |

## カスタマイズ

`config.py` で変更可能な項目:

| 項目 | 変数名 | デフォルト |
|---|---|---|
| ジム候補 | `GYM_POOL` | 6箇所 |
| 週の選出数 | `NUM_GYMS_PER_WEEK` | 3 |
| トレ開始時間 | `TRAINING_TIME` | 7:00 |
| 最少開催人数 | `MIN_PARTICIPANTS` | 2 |
| 各ステップの曜日・時間 | `SCHEDULE` | 上記フロー通り |
| 候補期間の日数 | `CANDIDATE_DAYS` | 7（木〜水） |

## ファイル構成

```
goutore-bot/
├── bot.py           # メインBot（全ロジック）
├── config.py        # 設定ファイル（ジム・スケジュール等）
├── requirements.txt # Python依存パッケージ
├── .env.example     # 環境変数テンプレート
├── .env             # 実際の環境変数（Git管理外）
├── weekly_data.json # 自動生成：週次データ保存
└── README.md        # このファイル
```
