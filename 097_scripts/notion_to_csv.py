import csv
from notion_client import Client

NOTION_TOKEN = "secret_xxxxxxxxxxxx"  # ← あなたのAPIキー
DATABASE_ID  = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # ← データベースID

notion = Client(auth=NOTION_TOKEN)

results = []
cursor = None

# ページネーション対応（100件以上でも全件取得）
while True:
    response = notion.databases.query(
        database_id=DATABASE_ID,
        start_cursor=cursor
    )
    results.extend(response["results"])
    if not response["has_more"]:
        break
    cursor = response["next_cursor"]

# CSV出力
with open("output.csv", "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["タイトル", "URL"])

    for page in results:
        # タイトル取得（プロパティ名が"Name"以外の場合は変更）
        title_prop = page["properties"].get("Name") or page["properties"].get("タイトル")
        title = title_prop["title"][0]["plain_text"] if title_prop and title_prop["title"] else "(無題)"

        # URL生成
        page_id = page["id"].replace("-", "")
        url = f"https://www.notion.so/{page_id}"

        writer.writerow([title, url])

print(f"✅ {len(results)}件をoutput.csvに出力しました")