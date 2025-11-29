import json
from bs4 import BeautifulSoup

def convert_transcript_html_to_json(input_file_path, output_file_path):
    try:
        # HTMLファイルを読み込む
        with open(input_file_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # BeautifulSoupでHTMLを解析
        soup = BeautifulSoup(html_content, 'html.parser')
        
        transcript_data = []

        # data-index属性を持つ<p>タグ（各発言ブロック）をすべて取得
        paragraphs = soup.find_all('p', attrs={'data-index': True})

        for p in paragraphs:
            # 1. Indexの取得
            index_str = p.get('data-index')
            index = int(index_str) if index_str.isdigit() else index_str

            # 2. 話者(Speaker)と時間(Time)の取得
            # data-speaker="true" のspanタグを探す
            speaker_block = p.find('span', attrs={'data-speaker': 'true'})
            
            speaker = "Unknown"
            timestamp = "00:00"

            if speaker_block:
                # 話者名を取得 (class="text-base-800" のタグ内)
                name_tag = speaker_block.find('span', class_='text-base-800')
                if name_tag:
                    speaker = name_tag.get_text(strip=True)

                # 時間を取得 (<a>タグ内)
                time_tag = speaker_block.find('a')
                if time_tag:
                    timestamp = time_tag.get_text(strip=True)

            # 3. テキスト(Text)の取得
            # data-speaker="false" のspanタグをすべて取得して結合する
            text_spans = p.find_all('span', attrs={'data-speaker': 'false'})
            full_text = "".join([span.get_text() for span in text_spans]).strip()

            # 辞書を作成してリストに追加
            item = {
                "index": index,
                "speaker": speaker,
                "time": timestamp,
                "text": full_text
            }
            transcript_data.append(item)

        # JSONファイルとして書き出し
        with open(output_file_path, 'w', encoding='utf-8') as f:
            json.dump(transcript_data, f, ensure_ascii=False, indent=4)

        print(f"変換完了: {len(transcript_data)} 件のデータを {output_file_path} に保存しました。")

    except FileNotFoundError:
        print(f"エラー: ファイル '{input_file_path}' が見つかりませんでした。")
    except Exception as e:
        print(f"エラーが発生しました: {e}")

# --- 実行部分 ---
if __name__ == "__main__":
    # 入力ファイル名（アップロードされたHTMLファイル名に合わせてください）
    INPUT_FILE = '/Users/suzukiharumasaru/docs/WorkSpaces/099_tmp/tldv.html' 
    # 出力ファイル名
    OUTPUT_FILE = 'output.json'

    convert_transcript_html_to_json(INPUT_FILE, OUTPUT_FILE)