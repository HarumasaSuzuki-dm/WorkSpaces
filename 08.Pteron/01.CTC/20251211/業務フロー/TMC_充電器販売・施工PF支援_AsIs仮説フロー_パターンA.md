# As-Is業務フロー：パターンA（標準モデル）

## 【パターンA】標準モデル（戸建て・持家 × 標準工事）
**最もボリュームが大きく、自動化・効率化のベースとなる「（基本形）」。**

* **定義**:
    * **意思決定**: 本人のみで完結（戸建て・持家）。
    * **工事**: 標準範囲内（追加工事なし、電力申請なし）。
    * **リードタイム**: 最短。

## フロー図

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'textColor': '#000000',
    'actorTextColor': '#000000',
    'signalTextColor': '#000000',
    'noteTextColor': '#000000',
    'loopTextColor': '#000000'
  }
}}%%
sequenceDiagram
    autonumber
    actor Customer as 施主<br>(お客様)
    participant Sales as 販売店<br>(営業担当)
    participant Admin as 販売店<br>(経理・業務)
    participant CMC as 施工管理会社<br>(元請)
    participant Installer as 施工会社<br>(現場)

    Note over Customer, Sales: 【フェーズ1：商談・現調依頼】
    Customer->>Sales: 1. 車両購入商談（充電器設置の要望）
    Sales->>Sales: 2. 車両注文書作成<br>（充電器品番選定）
    Sales->>CMC: 3. 現地調査依頼<br>（FAX/メール/専用Web）
    Note right of Sales: 課題: 顧客情報・車両情報の<br>二重入力・転記が発生

    Note over Customer, Installer: 【フェーズ2：現地調査・見積】
    CMC->>Installer: 4. 現調手配（FAX/電話）
    Installer->>Customer: 5. 訪問日時調整（電話）
    Installer-->>Customer: 6. 訪問・現地調査（写真撮影・計測）
    Installer->>CMC: 7. 調査報告・工事可否判定<br>（報告書送付/メール）
    CMC->>CMC: 8. 工事費算出・見積作成
    CMC->>Sales: 9. 工事見積回答（FAX/メール）
    
    Note over Customer, Sales: 【フェーズ3：契約・発注】
    Sales->>Customer: 10. 最終見積提示（車両＋工事）
    Customer->>Sales: 11. 契約締結（注文書サイン）
    Sales->>CMC: 12. 工事正式発注（FAX/メール）
    Sales->>Admin: 13. 売上計上依頼・注文書回送
    
    Note over Sales, Installer: 【フェーズ4：部材手配・日程調整】
    Sales->>Sales: 14. 充電器本体発注<br>（メーカー純正部品ルート）
    Note right of Sales: ※充電器本体は車両部品と<br>同様に販売店に入荷
    CMC->>Installer: 15. 工事依頼（確定）
    
    loop 日程調整の伝言ゲーム（課題）
        CMC->>Sales: 16. 工事候補日連絡
        Sales->>Customer: 17. 日程打診
        Customer-->>Sales: 18. 日程回答
        Sales->>CMC: 19. 日程確定連絡
        CMC->>Installer: 20. 日程指示
    end

    Note over Customer, Installer: 【フェーズ5：施工・納品】
    Sales-->>Installer: 21. 充電器本体の引き渡し<br>（店頭受取 or 配送）
    Installer->>Customer: 22. 設置工事実施
    Installer->>Customer: 23. 工事完了確認（サイン受領）
    Installer->>CMC: 24. 完了報告・写真送付<br>（メール/専用Web/紙）
    
    Note over Sales, Admin: 【フェーズ6：検収・請求・支払】
    CMC->>Sales: 25. 工事完了報告書提出
    Sales->>Admin: 26. 売上確定報告
    CMC->>Admin: 27. 工事代金請求書送付
    
    par 金流の動き（車両代と合算の場合が多い）
        Admin->>Customer: 28. 請求書発行（車両＋工事）
        Customer->>Admin: 29. 代金支払い（振込/ローン）
        Admin->>CMC: 30. 工事代金支払い（月締め等）
    end
```

-----
