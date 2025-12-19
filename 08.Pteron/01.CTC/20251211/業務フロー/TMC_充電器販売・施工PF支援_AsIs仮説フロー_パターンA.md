# As-Is業務フロー：パターンA（標準モデル）

## 【パターンA】標準モデル：戸建て・持家への標準工事

このパターンは、個人の顧客が自分の所有する戸建て住宅に設置するケースです。最も件数が多く、システム化や自動化を検討する際の基礎となるモデルです。

* **基本定義**
    * **顧客属性**: 個人客であり、設置場所は自己所有の戸建て住宅です。
    * **意思決定**: 顧客本人の意思だけで設置を決定できます。他者の許可は不要です。
    * **工事内容**: 基本的な標準工事の範囲内で完了します。追加の特殊な工事は発生しません。
    * **所要期間**: 検討から設置完了までの期間が最も短く済みます。

* **業務フローの特徴と課題**
    * **情報の分断**: 車両の契約は販売店で行い、工事の契約は施工会社と行うため、顧客情報や車両情報が二重管理になりがちです。
    * **現地調査**: 施工担当者が顧客宅を訪問して調査を行いますが、事前に顧客自身が写真を送付して済ませるオンライン調査の形式も存在します。
    * **日程調整の伝言ゲーム**: 販売店、施工管理会社、施工会社、顧客の4者の間で連絡を取り合うため、工事日の決定に時間がかかります。

## 1. 業務フロー図（スイムレーン形式）

**凡例と見方：**
* **円柱**: 利用システム（ここが情報のサイロになっています）
* **書類**: 帳票・データ（ここがアナログな受け渡しポイント＝IPOです）
* **矢印上のテキスト**: 伝達手段（FAX、電話、メールなど）

```mermaid
flowchart TD
    %% クラス定義（色分け）
    classDef system fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef doc fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray: 5 5;
    classDef process fill:#ffffff,stroke:#333333,stroke-width:1px;
    classDef warning fill:#ffccbc,stroke:#bf360c,stroke-width:2px;

    %% --- スイムレーン定義 ---

    subgraph Customer [施主（お客様）]
        direction TB
        C1("来店・車両商談")
        C2("日程回答")
        C3("工事立会い・完了サイン")
        C4("支払い")
    end

    subgraph Sales [販売店（営業・業務）]
        direction TB
        S1["車両注文情報の入力"]:::process
        SysSales[("車両注文システム")]:::system
        Doc1[["現調依頼書<br>兼 顧客情報シート"]]:::doc
        
        S2["最終見積・契約締結"]:::process
        Doc2[["注文書<br>(車両+工事)"]]:::doc
        
        S3["工事発注・部材手配"]:::process
        SysParts[("部品発注システム")]:::system
        Doc3[["工事発注書"]]:::doc
        
        S4["日程調整仲介"]:::warning
        
        S5["請求書発行"]:::process
        SysAcc[("会計システム")]:::system
    end

    subgraph CMC [施工管理会社]
        direction TB
        M1["受付・台帳入力"]:::process
        SysCMC[("自社管理Excel<br>or 基幹システム")]:::system
        
        M2["協力店選定・手配"]:::process
        Doc4[["現調指示書"]]:::doc
        
        M3["見積作成"]:::process
        Doc5[["工事見積書"]]:::doc
        
        M4["工事手配・指示"]:::process
        Doc6[["工事指示書"]]:::doc
        
        M5["完了報告確認・請求"]:::process
        Doc7[["月次請求書"]]:::doc
    end

    subgraph Installer [施工会社（現場）]
        direction TB
        I1["現調依頼受領・アポ取り"]:::process
        I2["現地調査・写真撮影"]:::process
        Doc8[["現調報告書<br>現場写真"]]:::doc
        
        I3["工事実施"]:::process
        Doc9[["完了報告書<br>完了写真"]]:::doc
    end

    %% --- フロー接続 ---

    %% 【フェーズ1：商談・現調依頼】
    C1 -->|充電器要望| S1
    S1 -.- SysSales
    S1 --> Doc1
    Doc1 -->|FAX / メール| M1
    M1 -.- SysCMC

    %% 【フェーズ2：現地調査・見積】
    M1 --> M2
    M2 --> Doc4
    Doc4 -->|FAX| I1
    I1 <-->|電話| C1
    I1 --> I2
    I2 --> Doc8
    Doc8 -->|メール / 専用Web| M3
    M3 --> Doc5
    Doc5 -->|FAX / メール| S2

    %% 【フェーズ3：契約・発注・部材】
    S2 --> Doc2
    Doc2 --> S3
    S3 -.- SysParts
    S3 --> Doc3
    Doc3 -->|FAX / メール| M4

    %% 【フェーズ4：日程調整（課題）】
    M4 --> Doc6
    Doc6 -->|FAX| I3
    
    %% 伝言ゲームの可視化
    I3 -.->|候補日| M4
    M4 -.->|候補日| S4
    S4 <-->|電話調整| C2
    S4 -.->|確定日| M4
    M4 -.->|確定日| I3

    %% 【フェーズ5：施工・完了】
    I3 --> C3
    C3 --> Doc9
    Doc9 -->|メール / 専用Web| M5

    %% 【フェーズ6：請求・支払】
    M5 --> Doc7
    Doc7 -->|郵送| S5
    S5 -.- SysAcc
    S5 -->|請求書| C4

```