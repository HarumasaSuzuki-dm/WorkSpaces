# Salesforce 調査結果

**調査日：** 2026年2月9日

---

## A. サービス概要

| 項目 | 内容 |
|------|------|
| 正式名称 | Salesforce (Sales Cloud, Service Cloud, Experience Cloud等の統合CRMプラットフォーム) |
| 提供元 | Salesforce, Inc.（米国） |
| 日本法人 | 株式会社セールスフォース・ジャパン（東京・丸の内） |
| 最新エディション/バージョン | Spring '26 Release（2026年2月リリース）<br>主要エディション：Starter Suite、Pro Suite、Enterprise、Unlimited、Agentforce 1 |

### 主要な特徴
- **No.1 AI CRMプラットフォーム**：世界で15万社以上が導入する業界最大手のクラウドCRM
- **統合プラットフォーム**：営業（Sales Cloud）、カスタマーサービス（Service Cloud）、外部ユーザーポータル（Experience Cloud）を単一プラットフォームで提供
- **AI機能の充実（Einstein/Agentforce）**：予測分析、商談スコアリング、AIエージェントによる自動化、会話インテリジェンスなど先進的なAI機能を標準搭載
- **ノーコード/ローコード開発**：Flow Builder、Lightning App Builder、OmniStudioなど、プログラミング不要でカスタマイズ可能
- **大規模外部ユーザー対応**：Experience Cloudにより数千～数万の外部パートナー・顧客向けポータルを構築可能

### 導入実績
- **日本国内**：多数の大企業・製造業での導入実績あり
  - 旭化成株式会社：製品軸から市場軸へのビジネス変革、事業横断的な営業・マーケティング実現
  - Mipox株式会社：創業100周年企業による営業DX推進
  - 大規模導入事例：約4,700名の関係者が利用するSalesforce Field Service導入（フィールドサービス管理）
- **グローバル**：150,000社以上の企業が利用、あらゆる業種・規模に対応
- **日本市場での成長**：2026年も継続的な成長トレンド、AIエージェント（Agentforce）の本格導入が加速

---

## B. ライセンス・料金体系

### プラン一覧（Sales Cloud基準）

| プラン/エディション名 | 対象 | 月額単価（税抜） | 年額単価（税抜） | 備考 |
|---------------------|------|---------|---------|------|
| Starter Suite | 小規模企業（最大2ユーザー推奨） | 3,000円/ユーザー | 36,000円/ユーザー | 月払いまたは年払い可 |
| Pro Suite | 中小企業 | 12,000円/ユーザー | 144,000円/ユーザー | 年間契約 |
| Enterprise | 中堅～大企業 | 21,000円/ユーザー | 252,000円/ユーザー | 年間契約、最も人気 |
| Unlimited | 大企業・高度なカスタマイズ | 42,000円/ユーザー | 504,000円/ユーザー | 年間契約、無制限サポート |
| Agentforce 1 Sales | AI最大活用・エンタープライズ | 66,000円/ユーザー | 792,000円/ユーザー | 年間契約、AI機能フル装備 |

### Experience Cloud（外部ユーザー向け）ライセンス

| ライセンスタイプ | 月額単価（税抜） | 対象 | 備考 |
|----------------|---------|------|------|
| Customer Community | ログインベース：240円/ログイン<br>メンバーベース：600円/メンバー | 顧客向けポータル | 最大10カスタムオブジェクトアクセス可 |
| Customer Community Plus | ログインベース：1,200円/ログイン<br>メンバーベース：6,000円/メンバー | 顧客向け高機能ポータル | 無制限カスタムオブジェクトアクセス、レポート機能あり |
| Partner Community | ログインベース：1,200円/ログイン<br>メンバーベース：9,000円/メンバー | パートナー/販売代理店向け | 商談管理、リード配信など営業機能付き |
| External Apps | 3,000円/ユーザー/月 | カスタムアプリ専用 | 標準CRMオブジェクトアクセス不可 |

### 本利用規模でのコスト概算

#### 前提条件
- 社内ユーザー：管理者10名 + 一般ユーザー50名 = 計60名
- 社外ユーザー：約4,500名（4,000店舗 + 500社）
- エディション：Enterprise（社内）、Customer Community（社外、メンバーベース）を想定

| 費用項目 | 金額（概算） | 算出根拠 |
|---------|-----------|---------|
| **初期費用** | 500万～2,000万円 | 要件定義・設計・構築・データ移行・研修含む（3～6ヶ月プロジェクト） |
| **月額（社内ユーザー分）** | 126万円 | 21,000円 × 60名 |
| **月額（社外ユーザー分）** | 270万円 | 600円 × 4,500名（メンバーベース） |
| **ストレージ追加費用（月額）** | 50万～100万円 | 写真・図面データ想定（500GB～1TB追加）<br>追加ストレージ：1,000円/GB/月 |
| **API連携・カスタマイズ追加（月額）** | 10万～30万円 | Databricks連携、帳票生成機能等の追加開発保守 |
| **月額合計** | **456万～526万円** | 上記合計 |
| **年間ランニングコスト** | **5,472万～6,312万円** | 月額合計 × 12ヶ月 |
| **5年間総コスト** | **2億8,860万～3億3,560万円** | 初期費用 + (年間ランニング × 5年) |

### 注意事項
- **2025年8月の価格改定**：平均6%の値上げ実施済み（Starter/Pro Suiteは据え置き）
- **ストレージ標準容量**：
  - データストレージ：10GB + 20MB/ユーザー（Enterprise）
  - ファイルストレージ：10GB + 2GB/ユーザー（Enterprise）
  - **Spring '26より**：単一ファイルサイズ上限が2GB→10GBに拡大
- **外部ユーザーライセンスの選択肢**：
  - **ログインベース**：アクセス頻度が低い場合（月数回程度）に有利
  - **メンバーベース**：月間アクティブユーザーが多い場合（週1回以上）に有利
  - 4,500名の外部ユーザーがすべて頻繁にアクセスする場合、メンバーベースが経済的
- **Success Plan（サポートプラン）別途**：
  - Standard：ライセンス料金に含まれる
  - Premier：ライセンス費用の30%追加（Enterprise以上で購入可）

---

## C. 機能対応状況

| # | 機能 | 対応レベル | 実現方法 | 備考 |
|---|------|----------|---------|------|
| 1 | 統一ID管理 | **標準機能** | レコードID（自動採番18桁）、またはカスタム自動採番（Flow/Apex） | すべてのユーザーが同一IDで参照可能 |
| 2 | ステータス管理 | **標準機能** | 選択リスト項目、レコードタイプ、プロセスビルダー/Flow | アラート機能：Flowで実装可能（停滞期間トリガー） |
| 3 | 入力フォーム | **標準機能** | Lightning Record Page、Experience Cloud Sites、Dynamic Forms | モバイル対応◎、UIシンプル化可能 |
| 4 | ファイル添付・ストレージ | **標準機能** | Salesforce Files（Spring '26で10GBファイル対応） | 1案件あたり数十枚の画像添付可能、容量制限に注意 |
| 5 | 帳票・出力 | **カスタマイズ** | OmniStudio Document Generation、サードパーティ（Conga Composer、Docs Made Easyなど） | PDF/Word/Excel出力可、テンプレート作成必要 |
| 6 | 承認ワークフロー | **標準機能** | Approval Process（承認プロセス） | 多段階承認（3段階以上）、差し戻し・再申請すべて対応 |
| 7 | 通知・アラート | **標準機能** | Flow（メール/Chatter/Slack通知）、Platform Events | ステータス変更時の自動通知、期限超過アラート実装可 |
| 8 | ダッシュボード・KPI | **標準機能** | Reports & Dashboards、Einstein Analytics（Tableau CRM） | カスタムダッシュボード構築可、リアルタイム更新 |
| 9 | アカウント・権限管理 | **標準機能** | Profiles、Permission Sets、Sharing Rules、Role Hierarchy | RBAC完全対応、組織単位でのデータ分離（共有ルール） |
| 10 | 監査ログ | **標準機能** | Field History Tracking、Setup Audit Trail、Event Monitoring | 誰が・いつ・何を変更したか記録可能 |

### 各機能の詳細

#### 1. 統一ID管理
- **標準のレコードID**：18桁の一意識別子を自動付与
- **カスタム採番**：Flowの「自動採番」機能またはApexでカスタム採番ルール実装可能（例：YY-MM-XXXX形式）
- **全ユーザー共通参照**：内部・外部ユーザーとも同一IDで案件を特定可能

#### 2. ステータス管理
- **選択リスト項目**：「受付」「対応中」「保留」「完了」など多段階設定
- **自動アラート**：Flowの「スケジュール済みトリガー」で停滞案件を定期検出し、担当者にメール/Slack通知

#### 3. 入力フォーム
- **Lightning Experience**：直感的なUIで項目をドラッグ&ドロップ配置
- **Experience Cloud Sites**：外部ユーザー向けにカスタマイズ可能なフォーム提供
- **モバイル対応**：Salesforce Mobile App（iOS/Android）で完全対応、オフライン編集も可能

#### 4. ファイル添付・ストレージ
- **Salesforce Files**：1ファイル最大10GB（Spring '26以降）
- **1案件あたり数十枚**：問題なく対応可能
- **容量拡張**：追加ストレージ購入（1,000円/GB/月）で対応

#### 5. 帳票・出力
- **OmniStudio Document Generation**：Word/PowerPoint/PDFテンプレートから生成
- **サードパーティツール**：
  - Conga Composer：高度なテンプレート作成、一括生成
  - Docs Made Easy：シンプルなテンプレート作成
- **Visualforce + Apex**：プログラミングでカスタムPDF生成も可能

#### 6. 承認ワークフロー
- **Approval Process**：
  - 3段階以上の承認ステップ設定可能
  - 差し戻し・再申請・並列承認すべて対応
  - 条件分岐（金額・担当者に応じたルート変更）も可能

#### 7. 通知・アラート
- **Flow Builder**：
  - メール通知（標準テンプレート/カスタムテンプレート）
  - Chatter投稿（社内コラボレーション）
  - Slack通知（連携設定必要）
- **Platform Events**：リアルタイムイベント駆動型通知

#### 8. ダッシュボード・KPI
- **Reports & Dashboards**：ドラッグ&ドロップでグラフ作成
- **Einstein Analytics（Tableau CRM）**：高度な分析、予測モデル統合
- **カスタムダッシュボード**：ユーザー/役割ごとに表示内容をカスタマイズ

#### 9. アカウント・権限管理
- **Profile/Permission Sets**：機能・オブジェクトレベルのアクセス制御
- **Sharing Rules**：レコードレベルのアクセス制御（特定部署のみ閲覧など）
- **マルチテナント的運用**：共有ルールで店舗/会社ごとにデータ分離可能

#### 10. 監査ログ
- **Field History Tracking**：項目変更履歴（最大20項目/オブジェクト）
- **Setup Audit Trail**：設定変更履歴（最大過去180日）
- **Event Monitoring**：ログイン履歴、データアクセス履歴（Unlimited Edition以上）

---

## D. 外部ユーザー（社外）対応

| 項目 | 内容 |
|------|------|
| アクセス方式 | **Experience Cloud Sites**（旧Community Cloud）<br>専用ポータルサイト、モバイルアプリ対応 |
| アカウント発行・管理 | ・セルフサービス登録（メール認証）<br>・CSVインポート一括登録<br>・API経由の自動登録 |
| データアクセス制限 | ・共有ルールで自社案件のみ閲覧可<br>・取引先階層（Account Hierarchy）で店舗/親会社を紐付け |
| スケーラビリティ（4,500名） | ・**問題なし**：Experience Cloudは数万ユーザー規模に対応<br>・パフォーマンス最適化：キャッシュ、CDN活用 |
| 認証方式 | ・ID/パスワード（標準）<br>・SSO（SAML 2.0）対応<br>・多要素認証（MFA）推奨・設定可能 |
| ライセンス費用 | Customer Community：600円/メンバー/月<br>→ 4,500名 × 600円 = 270万円/月 |

### 外部ユーザー対応の詳細

#### アクセス方式
- **Experience Cloud Sites**：
  - ブランディング可能な独自ドメインポータル
  - モバイルアプリ（iOS/Android）対応
  - Lightning Web Components（LWC）で高度なカスタマイズ可能

#### アカウント管理
- **セルフサービス登録**：メールアドレス認証後、管理者承認フローで有効化
- **一括登録**：CSVインポートまたはData Loader使用
- **API連携**：REST API経由で外部システムからのアカウント同期可能

#### データアクセス制限
- **共有ルール（Sharing Rules）**：
  - 取引先（Account）ベースで案件（Case/Opportunity等）へのアクセス制御
  - 例：A店舗ユーザーはA店舗に紐づく案件のみ閲覧
- **ロール階層不使用**：外部ユーザーは階層を持たない（フラット構造）

#### スケーラビリティ
- **実績**：数万ユーザー規模のExperience Cloudサイト運用事例あり
- **パフォーマンス対策**：
  - コンテンツキャッシュ（CDN）
  - ページロード最適化（Lightning Locker Service）
  - データクエリ最適化（SOQL Index活用）

#### セキュリティ
- **多要素認証（MFA）**：2026年2月以降、全ユーザーに推奨
- **IP制限**：特定IPアドレスからのみアクセス許可可能
- **ログイン時間制限**：業務時間外のアクセス制限可能

---

## E. セキュリティ・コンプライアンス

| 項目 | 対応状況 | 詳細 |
|------|---------|------|
| ISMAP登録 | **対応済み** | Salesforce Services（Sales Cloud、Service Cloud等）がISMAP登録済み |
| SOC報告書 | **SOC 1 Type 2、SOC 2 Type 2、SOC 3** | 年次監査実施、レポート提供可能 |
| ISO認証 | **ISO/IEC 27001:2022、ISO/IEC 27017、ISO/IEC 27018、ISO/IEC 27701** | 情報セキュリティ、クラウドセキュリティ、個人情報保護 |
| 保存時暗号化 | **対応** | AES-256ビット暗号化（Salesforce Shield Platform Encryption） |
| 通信時暗号化 | **対応** | TLS 1.2以上強制、すべての通信を暗号化 |
| 日本リージョン | **あり** | 東京データセンター（NTT Communications）、神戸データセンター（Kansai地域） |
| バックアップ | **自動バックアップ** | 日次バックアップ、RPO：24時間、RTO：4～8時間（ケースによる） |
| IP制限 | **対応** | ログインIPアドレス範囲制限可能 |
| 監査ログ保持期間 | **標準：180日、Event Monitoring：最大10年（別途保管）** | Setup Audit Trail：180日、Field History：最大18ヶ月 |
| 個人情報保護対応 | **対応** | データマスキング（Shield Platform Encryption）、匿名化（Data Mask）、GDPR/日本個人情報保護法対応 |

### セキュリティ・コンプライアンスの詳細

#### ISMAP登録
- **登録済みサービス**：Salesforce Platform（Sales Cloud、Service Cloud、Marketing Cloud、Data Cloud等）
- **日本政府機関向け**：クラウドサービス調達基準を満たす

#### 認証・監査
- **SOC 1/2/3**：財務報告内部統制、セキュリティ・可用性・機密性・処理の完全性に関する監査
- **ISO 27001/27017/27018/27701**：
  - 27001：情報セキュリティマネジメントシステム
  - 27017：クラウドサービスセキュリティ
  - 27018：パブリッククラウドにおける個人情報保護
  - 27701：プライバシー情報マネジメント

#### データ暗号化
- **保存時**：Shield Platform Encryption（追加料金）でフィールドレベル暗号化
- **通信時**：TLS 1.2/1.3、HTTP Strict Transport Security（HSTS）有効

#### データ所在地
- **日本リージョン選択可能**：東京（Tokyo）、神戸（Kobe）データセンター
- **データレジデンシー保証**：日本国内のみにデータ保管可能（Hyperfroce環境）

#### バックアップ・DR
- **自動バックアップ**：日次スナップショット
- **RPO（Recovery Point Objective）**：24時間（1日前の状態に復元）
- **RTO（Recovery Time Objective）**：4～8時間（システム復旧時間）
- **Advanced Cross-Region Continuity（ACRC）**：リージョン間災害対策（追加オプション）

#### 監査ログ
- **Setup Audit Trail**：過去180日の設定変更履歴
- **Field History Tracking**：項目変更履歴（最大18ヶ月、最大20項目/オブジェクト）
- **Event Monitoring**：ログイン、API、レポート実行ログ（Unlimited Edition以上、または追加購入）

#### 個人情報保護
- **Data Mask（Sandbox用）**：本番データをマスキングして開発環境に複製
- **GDPR/CCPA対応**：データポータビリティ、削除権、アクセス権対応
- **プライバシーセンター**：個人情報管理画面提供可能

---

## F. 外部連携

| 連携先/方式 | 対応状況 | 詳細 |
|-----------|---------|------|
| **Databricks連携** | **対応** | ・Lakeflow Connect（組み込みコネクタ）<br>・REST API経由のデータ同期<br>・Zero Copy Data Sharing（Data Cloud連携）<br>・双方向データ連携可能 |
| **REST API** | **対応** | ・レートリミット：1日あたり15,000 + 1,000/ユーザー（Enterprise）<br>・GraphQL API対応（同一レートリミット）<br>・Bulk API（大量データ処理用） |
| **CSV/Excelインポート・エクスポート** | **標準機能** | ・Data Loader（一括処理）<br>・Data Import Wizard（UI操作）<br>・Bulk API 2.0（最大1億レコード） |
| **SharePoint連携** | **対応** | ・Q!365（AppExchange）<br>・Microsoft Graph API連携<br>・ドキュメント同期、共同編集 |
| **Teams連携** | **標準機能** | ・Salesforce for Microsoft Teams（無償）<br>・レコード共有、通知、検索<br>・Teamsチャネル内でSalesforce操作可能 |
| **メール連携（Outlook）** | **標準機能** | ・Outlook統合（Einstein Activity Capture）<br>・メール/カレンダー同期<br>・Outlook Add-in（Salesforce Inspector） |
| **Webhook/リアルタイム連携** | **対応** | ・Platform Events<br>・Change Data Capture（CDC）<br>・Streaming API<br>・Callout（Apex HTTP/REST） |

### 外部連携の詳細

#### Databricks連携
- **Lakeflow Connect**（2026年最新）：
  - Salesforceオブジェクトを自動的にDatabricksにインジェスト
  - 双方向同期（Salesforce → Databricks、Databricks → Salesforce）
  - スケジュール同期またはリアルタイム同期
- **Zero Copy Data Sharing**：
  - Data Cloud経由でSalesforce CRMデータをDatabricksにコピーレス共有
  - ETL不要、低レイテンシ
- **REST API連携**：
  - カスタムインテグレーション開発可能
  - Bulk API 2.0で大量データ移行

#### REST API
- **レートリミット**：
  - Enterprise Edition：15,000 + 1,000/ユーザー/日
  - 例：60ユーザー → 75,000 API calls/日
- **GraphQL API**：
  - 複雑なクエリを1回のAPI呼び出しで実現
  - Connect API制限を共有
- **Bulk API 2.0**：
  - 大量データ処理専用（最大1億レコード）
  - レートリミット対象外

#### CSV/Excel処理
- **Data Loader**：
  - デスクトップアプリ（Windows/Mac）
  - 一括挿入、更新、削除、エクスポート
  - スケジュール実行可能
- **Data Import Wizard**：
  - Web UI操作で最大50,000レコード処理
  - 重複検出機能あり

#### SharePoint連携
- **Q!365（AppExchange製品）**：
  - Salesforce内でSharePointファイル閲覧・編集
  - バージョン管理、権限同期
- **カスタム連携**：
  - Microsoft Graph API + Salesforce REST API

#### Teams連携
- **Salesforce for Microsoft Teams**：
  - Teamsチャネル内にSalesforceタブ表示
  - レコード検索、通知受信
  - ワークフロー自動化（Flow ↔ Slack Workflow Builder）

#### Outlook連携
- **Einstein Activity Capture**：
  - Outlookメール/カレンダーイベントを自動的にSalesforceに同期
  - 手動入力不要
- **Outlook Add-in**：
  - Outlook画面からSalesforceレコード検索・作成

#### Webhook/リアルタイム連携
- **Platform Events**：
  - カスタムイベント定義、Publish/Subscribe型
  - 外部システムとの非同期連携
- **Change Data Capture（CDC）**：
  - レコード変更をリアルタイムでストリーミング配信
  - 外部システムへの即時反映
- **Streaming API**：
  - PushTopic購読、リアルタイム更新通知

---

## G. 導入・運用

| 項目 | 内容 |
|------|------|
| 標準導入期間 | **3～6ヶ月**（中規模プロジェクト）<br>・要件定義・設計：2～4週間<br>・構築・開発：4～8週間<br>・テスト・改善：2～3週間<br>・データ移行・研修：1～2週間<br>**大規模（4,500外部ユーザー含む）：6～9ヶ月** |
| 開発方式 | **ノーコード/ローコード/プロコード併用**<br>・ノーコード：Flow Builder、Lightning App Builder<br>・ローコード：OmniStudio、Dynamic Forms<br>・プロコード：Apex、Lightning Web Components（LWC） |
| 日本語UI | **完全対応**（日本語UI、日本語ヘルプ、日本語エラーメッセージ） |
| 日本語サポート体制 | **充実**<br>・株式会社セールスフォース・ジャパン（国内法人）<br>・電話サポート：0120-733-257<br>・オンラインヘルプ、Trailhead（日本語学習コンテンツ）<br>・Trailblazer Community（日本語コミュニティ） |
| SLA | **99.9%以上稼働率保証**<br>・実績：99.9+%の稼働率を継続<br>・年間ダウンタイム許容：約8時間46分以内 |
| 管理画面 | **Setup画面（直感的なWeb UI）**<br>・設定変更、ユーザー管理、カスタマイズすべてGUIで操作可能<br>・Salesforce Inspector（Chrome拡張）で詳細管理 |
| トレーニング・ドキュメント | **充実**<br>・Trailhead（無料オンライン学習、日本語対応）<br>・公式ドキュメント（Salesforce Help、Developer Guide）<br>・認定資格プログラム（Administrator、Developer等）<br>・TDX Tokyo（年次イベント）、Agentforce World Tour Tokyo（2026年6月・11月開催予定） |

### 導入・運用の詳細

#### 標準導入期間
- **フェーズ1：要件定義・設計**（2～4週間）
  - ビジネス要件整理
  - データモデル設計
  - 外部ユーザーポータル要件定義
- **フェーズ2：構築・開発**（4～8週間）
  - カスタムオブジェクト作成
  - ワークフロー/Flow構築
  - Experience Cloudサイト構築
  - 帳票テンプレート作成
- **フェーズ3：テスト・改善**（2～3週間）
  - ユーザー受入テスト（UAT）
  - パフォーマンステスト
  - セキュリティテスト
- **フェーズ4：データ移行・研修**（1～2週間）
  - 既存データ移行（Data Loader）
  - ユーザートレーニング
  - 本番リリース

#### 開発方式の選択
- **ノーコード**：90%の要件をカバー可能（Flow Builder、Lightning App Builder）
- **ローコード**：複雑なビジネスロジック（OmniStudio、Process Builder）
- **プロコード**：高度なカスタマイズ（Apex、LWC、Visualforce）

#### 日本語サポート
- **サポートプラン**：
  - Standard：平日9:00～17:00（メール/電話）
  - Premier：24時間365日対応（重大障害時）、専任担当者
- **レスポンスタイム**：
  - 重大障害（P1）：1時間以内
  - 高（P2）：4時間以内
  - 中（P3）：1営業日以内

#### SLA
- **稼働率保証**：99.9%以上
- **実績**：Salesforce Platform全体で99.9+%の稼働率を長年維持
- **ダウンタイム発生時**：Trust.salesforce.comでリアルタイム状況確認可能

#### 管理画面
- **Setup**：すべての設定を一元管理
- **Lightning Experience**：モダンなUI/UX
- **Salesforce Inspector**：開発者向け高度な管理ツール

#### トレーニング
- **Trailhead**：
  - 無料オンライン学習プラットフォーム
  - バッジ取得でスキル証明
  - 日本語コンテンツ豊富
- **認定資格**：
  - Administrator
  - Platform App Builder
  - Developer（Platform Developer I/II）
  - Consultant（各Cloud別）

---

## H. 拡張性

| 項目 | 対応状況 | 詳細 |
|------|---------|------|
| データ項目追加 | **容易** | カスタムフィールド作成（クリック操作）、数式項目、ロールアップ集計など |
| 業務パターン追加 | **柔軟** | Flow Builder、Approval Process、レコードタイプで対応<br>プロセス変更時も既存データ影響なし |
| AI/ML活用 | **充実** | ・Einstein AI：予測、推奨、自動化<br>・Agentforce：AIエージェント<br>・Einstein Prediction Builder：カスタムAIモデル<br>・Einstein Discovery：高度な予測分析 |
| モバイルアプリ | **標準提供** | ・Salesforce Mobile App（iOS/Android）<br>・オフライン編集対応<br>・カスタムモバイルアプリ構築可能（Mobile SDK） |
| スケールアップ | **優秀** | ・ユーザー数：無制限（ライセンス追加）<br>・データ量：ペタバイト級対応<br>・API呼び出し：ユーザー追加でリミット自動増加<br>・パフォーマンス：BigObjects、External Objects活用 |

### 拡張性の詳細

#### データ項目追加
- **カスタムフィールド**：
  - 各オブジェクトに最大500項目追加可能（Enterprise以上）
  - データ型：テキスト、数値、日付、選択リスト、ファイル、関連レコード等
  - 追加後もUIに即反映
- **数式項目**：
  - 自動計算フィールド（Excel関数ライク）
  - 例：納期 = 受注日 + 14日
- **ロールアップ集計**：
  - 子レコードの合計・平均・最大値等を親に表示

#### 業務パターン追加
- **Flow Builder**：
  - ビジネスプロセス変更を即座に反映
  - バージョン管理機能で安全にテスト・デプロイ
- **レコードタイプ**：
  - 業種・顧客タイプごとに異なる画面レイアウト・プロセス適用
  - 例：店舗向け、企業向けで異なる承認フロー

#### AI/ML活用
- **Einstein AI（標準搭載/追加購入）**：
  - **リードスコアリング**：商談化確度を自動予測
  - **商談スコアリング**：成約確度を自動算出
  - **Einstein Prediction Builder**：独自の予測モデル構築（ノーコード）
  - **Einstein Discovery**：データから洞察を自動発見
- **Agentforce（2026年注目）**：
  - AIエージェントがタスクを自動実行
  - リード育成、パイプライン管理、セールスコーチング
  - 従業員向け営業アクション自動化

#### モバイルアプリ
- **Salesforce Mobile App**：
  - すべてのSalesforce機能をモバイルで利用
  - オフライン編集：インターネット接続なしで入力、同期時に自動アップロード
  - プッシュ通知：重要なアラートを即座に受信
- **カスタムアプリ**：
  - Mobile SDK（iOS/Android）でネイティブアプリ開発可能
  - Lightning Web Components for Mobile

#### スケールアップ
- **ユーザー数増加**：
  - ライセンス追加購入で即座に対応
  - パフォーマンス影響なし（マルチテナントアーキテクチャ）
- **データ量増加**：
  - **BigObjects**：数十億レコード格納可能（アーカイブ用途）
  - **External Objects**：外部データベースを仮想的にSalesforce内で操作
- **API呼び出し増加**：
  - ユーザー数増加に伴い自動的にリミット増加
  - 追加API容量購入も可能

---

## I. 総括

### 強み
1. **業界最大手の信頼性**：世界15万社以上、日本でも多数の大企業・製造業導入実績
2. **大規模外部ユーザー対応**：Experience Cloudで4,500名の外部ユーザーを問題なく管理可能
3. **包括的な機能**：案件管理、ステータス管理、承認ワークフロー、帳票出力、ダッシュボードすべて標準機能またはカスタマイズで実現
4. **ノーコード/ローコード開発**：ITリテラシーが低いユーザーでもシンプルなUI/UX、管理者がFlow Builderで業務プロセス変更可能
5. **セキュリティ・コンプライアンス**：ISMAP、SOC、ISO認証取得済み、日本リージョン選択可能
6. **AI機能の充実**：Einstein AI、Agentforceで業務自動化・予測分析が可能
7. **豊富な外部連携**：Databricks、SharePoint、Teams、Outlook等との標準連携、REST API/GraphQL対応
8. **充実したサポート・コミュニティ**：日本語サポート、Trailhead無料学習、認定資格プログラム

### 弱み・懸念
1. **コスト**：
   - 社内60名 + 社外4,500名で月額456万～526万円、5年間総コスト2.9億～3.4億円
   - ストレージ追加費用が高額（1,000円/GB/月）
   - API呼び出し制限に注意（Databricks連携で消費増加の可能性）
2. **ストレージ制限**：
   - 写真・図面データが大量の場合、追加ストレージ購入必須
   - 1案件あたり数十枚の写真でも、案件数が多いと容量逼迫
3. **帳票生成機能**：
   - 標準機能のOmniStudio Document Generationは追加購入が必要な場合あり
   - 高度なテンプレートはサードパーティツール（Conga Composer等）の導入検討
4. **学習コスト**：
   - 機能が豊富なため、管理者・開発者の教育に時間とコストがかかる
   - Trailheadで自己学習可能だが、認定資格取得推奨
5. **初期導入期間**：
   - 本規模（社内60名+社外4,500名）で6～9ヶ月必要
   - データ移行、外部ユーザーポータル構築に時間を要する
6. **カスタマイズの複雑性**：
   - 高度なカスタマイズはApex/LWC開発必要（外部ベンダー依頼の場合は追加コスト）

### 導入スケジュール概算

| マイルストーン | 想定期間 | 備考 |
|--------------|---------|------|
| 契約～環境準備 | 2週間 | Salesforce環境プロビジョニング、プロジェクトキックオフ |
| 要件定義・設計 | 4週間 | ビジネス要件整理、データモデル設計、外部ユーザー要件定義 |
| 基本機能構築 | 8週間 | カスタムオブジェクト、Flow、Experience Cloudサイト構築 |
| 帳票・外部連携開発 | 4週間 | OmniStudio Document Generation、Databricks連携設定 |
| テスト・改善 | 3週間 | UAT、パフォーマンステスト、セキュリティテスト |
| データ移行・研修 | 2週間 | 既存データ移行、ユーザートレーニング（社内・社外） |
| 稼働開始目安 | **6～9ヶ月** | プロジェクト規模・複雑性により変動 |

### 情報の確度
- **公式情報に基づく箇所**：
  - 料金体系（Salesforce公式サイト、2026年2月時点）
  - 標準機能（Salesforce Help、Spring '26 Release Notes）
  - セキュリティ認証（ISMAP、SOC、ISO）
  - Databricks連携（Lakeflow Connect）
  - モバイルアプリ対応
  - SLA（99.9%稼働率）

- **推定・概算の箇所**：
  - **外部ユーザー4,500名のライセンス費用**：Customer Communityメンバーベース想定（600円/月）→ 実際のアクセス頻度により変動
  - **初期導入費用**：500万～2,000万円（要件・カスタマイズ範囲により大幅に変動）
  - **ストレージ追加費用**：写真・図面データ量の詳細不明のため、500GB～1TB想定
  - **導入期間**：6～9ヶ月（標準的な中～大規模プロジェクト想定）

- **追加確認が必要な箇所**：
  - **外部ユーザーの正確なアクセス頻度**：ログインベース（240円/ログイン）またはメンバーベース（600円/月）のどちらが経済的か
  - **写真・図面データの正確な容量**：1案件あたりのファイルサイズ・総案件数から正確な追加ストレージ費用算出
  - **帳票出力要件の詳細**：OmniStudio Document Generationで対応可能か、サードパーティツール必要か
  - **Databricks連携の詳細要件**：連携頻度・データ量によるAPI呼び出し制限への影響
  - **Success Plan（サポートプラン）の必要性**：Premierプラン（ライセンス費用の30%追加）が必要か

---

**主要な情報源**
- [Salesforce公式価格ページ（日本）](https://www.salesforce.com/jp/pricing/)
- [Sales Cloud価格ページ](https://www.salesforce.com/jp/sales/pricing/)
- [Experience Cloud User Licenses - Salesforce Help](https://help.salesforce.com/s/articleView?id=users_license_types_communities.htm&language=en_US&type=0)
- [Salesforce ISMAP Compliance](https://compliance.salesforce.com/categories/ismap)
- [Salesforce and Databricks Integration (Lakeflow Connect)](https://docs.databricks.com/aws/en/ingestion/lakeflow-connect/salesforce-concepts)
- [Salesforce File Storage Allocations - Salesforce Help](https://help.salesforce.com/s/articleView?id=experience.files_storage.htm&language=en_US&type=5)
- [Salesforce Spring '26 Release Highlights](https://www.salesforceben.com/sales-cloud-top-salesforce-spring-26-features/)
- [Salesforce Implementation Timeline Guide 2026](https://crminnovators.com/salesforce/salesforce-implementation-timeline-what-impacts-project-duration/)
- [Salesforce Trust & Compliance Documentation](https://www.salesforce.com/company/trust-and-compliance/)
- [Salesforce Mobile App - App Store/Google Play](https://www.salesforce.com/solutions/mobile/overview/)
