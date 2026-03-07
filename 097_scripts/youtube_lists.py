from googleapiclient.discovery import build
from datetime import datetime
import csv  # ← これを追加

api_key = "AIzaSyDrevN_pHhcWbcCxFj1LdiJP7rbom4dz5M"
channel_id = "UCRvM4zFmDz2cEiuk7d9C-3w"

youtube = build("youtube", "v3", developerKey=api_key)

# チャンネルIDからアップロードプレイリストIDを取得
# "UC..." → "UU..." に変換するだけ
uploads_playlist_id = "UU" + channel_id[2:]

videos = []
next_page_token = None

while True:
    res = youtube.playlistItems().list(
        part="snippet,contentDetails",
        playlistId=uploads_playlist_id,
        maxResults=50,
        pageToken=next_page_token
    ).execute()

    for item in res["items"]:
        published_at = item["contentDetails"]["videoPublishedAt"][:10]
        
        # 期間フィルタ（2023/12 〜 2025/12）
        if "2023-12" <= published_at[:7] <= "2025-12":
            video_id = item["contentDetails"]["videoId"]
            title = item["snippet"]["title"]
            url = f"https://www.youtube.com/watch?v={video_id}"
            
            videos.append({
                "published_at": published_at,
                "title": title,
                "url": url
            })

    next_page_token = res.get("nextPageToken")
    if not next_page_token:
        break

print(f"取得件数: {len(videos)}件")

# CSV保存
with open("videos.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["published_at", "title", "url"])
    writer.writeheader()
    writer.writerows(videos)