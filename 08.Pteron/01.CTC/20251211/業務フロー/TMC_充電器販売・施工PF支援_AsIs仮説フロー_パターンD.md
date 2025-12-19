# As-Is業務フロー：パターンD（法人・フリートモデル）

## 【パターンD】法人・フリートモデル：B2B・複数台・複数拠点

このパターンは、企業が営業車や配送車として車両を導入するケースです。
個人の買い物とは異なり、**「契約（本社）」と「現場（支店）」が分離している点**、および**「リスト形式での一括管理」**が最大の特徴です。

* **基本定義**
    * **顧客属性**: 法人企業（社用車、配送車、店舗用車両）。
    * **特徴**: 1台ごとの契約ではなく、複数台・複数拠点の工事をまとめて発注・管理します。
    * **意思決定**: 「総務部（契約・支払）」と「ドライバー/支店（現場立ち会い）」が別人です。

* **業務フローの特徴と課題**
    * **Excelバケツリレー**: 顧客データが「申込書」ではなく「拠点リスト（Excel）」で流通するため、更新管理が煩雑化します。
    * **意思決定と現場の乖離**: 本社がGoサインを出しても、現場（支店）の事情で工事日が決まらない、というタイムラグが発生します。
    * **月締め請求**: 案件ごとの入金消込ではなく、月末に「完了した工事分」をまとめて請求書化する処理が必要です。

## 1. 業務フロー図（スイムレーン形式）

**凡例と見方：**
* **円柱**: 利用システム（一括取込機能がない場合、手入力の温床となります）
* **書類**: 帳票・データ（パターンDでは「リスト/台帳」が主役となります）
* **矢印上のテキスト**: 伝達手段（メール添付が主、現場へは電話）

```mermaid
flowchart TD
    %% クラス定義
    classDef system fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef doc fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray: 5 5;
    classDef process fill:#ffffff,stroke:#333333,stroke-width:1px;
    classDef warning fill:#ffccbc,stroke:#bf360c,stroke-width:2px;

    %% --- スイムレーン定義 ---

    subgraph CustomerHQ [顧客本社（総務・管財）]
        direction TB
        HQ1("車両導入計画・予算確保")
        DocHQ1[["設置拠点リスト<br>(Excel)"]]:::doc
        HQ2("一括発注・契約捺印")
        HQ3("請求書受領・支払")
    end

    subgraph CustomerSite [顧客現場（支店・ドライバー）]
        direction TB
        Site1("現調立会い")
        Site2("工事日程調整")
        Site3("工事立会い・完了サイン")
    end

    subgraph CorpSales [メーカー/販社（法人営業）]
        direction TB
        S1["案件登録・リスト受領"]:::process
        SysCorp[("法人営業支援<br>システム")]:::system
        
        S2["概算見積・契約調整"]:::process
        DocS1[["基本契約書<br>単価合意書"]]:::doc
        
        S3["現調依頼（一括）"]:::process
        DocS2[["現調依頼リスト<br>(Excel)"]]:::doc
        
        S4["本見積・一括発注処理"]:::process
        DocS3[["一括工事注文書"]]:::doc
        
        S5["工事Goサイン"]:::process
        
        S6["月次売上集計"]:::process
        DocS4[["一括請求書"]]:::doc
    end

    subgraph CMC [施工管理会社]
        direction TB
        M1["案件一括登録・分解"]:::process
        SysCMC[("管理台帳(Excel)<br>or 基幹システム")]:::system
        
        M2["エリア別業者割当"]:::process
        DocM1[["個別現調指示書"]]:::doc
        
        M3["見積集約・回答"]:::process
        DocM2[["見積回答リスト<br>(Excel)"]]:::doc
        
        M4["工事指示"]:::process
        
        M5["完了報告集約"]:::process
        DocM3[["完了報告リスト<br>(月次)"]]:::doc
    end

    subgraph Installer [施工会社（各エリア）]
        direction TB
        I1["指示受領・アポ取り"]:::process
        I2["現地調査"]:::process
        DocI1[["現調報告書"]]:::doc
        
        I3["工事実施"]:::process
        DocI2[["完了報告書"]]:::doc
    end

    %% --- フロー接続 ---

    %% 【フェーズ1：リスト提示・契約】
    HQ1 --> DocHQ1
    DocHQ1 -->|メール添付| S1
    S1 -.- SysCorp
    S1 --> S2
    S2 --> DocS1
    DocS1 --> HQ2

    %% 【フェーズ2：一括現調依頼】
    S2 --> S3
    S3 --> DocS2
    DocS2 -->|メール添付| M1
    M1 -.- SysCMC
    
    %% ここでリストが個別の指示に分解される
    M1 --> M2
    M2 --> DocM1
    DocM1 -->|FAX / メール| I1
    
    %% 現場との個別調整
    I1 <-->|電話| Site1
    I1 --> I2
    I2 --> DocI1
    DocI1 --> M3

    %% 【フェーズ3：見積集約・発注】
    M3 --> DocM2
    DocM2 -->|メール添付| S4
    S4 --> DocS3
    DocS3 -->|メール| HQ2
    HQ2 -->|発注書返送| S5
    
    %% 【フェーズ4：施工調整（課題）】
    S5 -->|メール| M4
    M4 -->|指示| Installer
    
    %% 現場調整の乖離リスク
    Installer -.->|日程調整| Site2
    Site2 -.->|決定| Installer
    
    Installer --> I3
    I3 --> Site3
    Site3 --> DocI2
    DocI2 --> M5

    %% 【フェーズ5：月締め請求】
    M5 --> DocM3
    DocM3 -->|メール添付| S6
    S6 --> DocS4
    DocS4 -->|郵送/PDF| HQ3

```
