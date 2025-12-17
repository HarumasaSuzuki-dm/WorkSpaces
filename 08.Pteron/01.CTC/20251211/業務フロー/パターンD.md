### 1\. パターンD（法人・フリート）の業務フロー仮説

**▼ パターンDの仮説フロー（B2Bモデル）**

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
    actor Driver as 現場担当者<br>(支店/ドライバー)
    actor HQ as 法人本社<br>(総務/管財)
    participant CorpSales as メーカー/販社<br>(法人営業部)
    participant Admin as 販社/メーカー<br>(経理・業務)
    participant CMC as 施工管理会社
    participant Installer as 施工会社

    Note over HQ, CorpSales: 【フェーズ1：包括契約・案件発生】
    HQ->>CorpSales: 1. 車両導入計画提示（〇〇台）
    CorpSales->>HQ: 2. 包括契約・単価合意
    Note right of CorpSales: ※都度の見積ではなく<br>単価契約の可能性が高い

    Note over Driver, CMC: 【フェーズ2：拠点ごとの現調】
    HQ->>CorpSales: 3. 設置拠点リスト送付
    CorpSales->>CMC: 4. 全拠点の現調依頼一括送付
    
    loop 拠点数分繰り返し
        CMC->>Installer: 5. 各拠点へ現調手配
        Installer->>Driver: 6. 現場日程調整
        Installer-->>Driver: 7. 現地調査実施
        Installer->>CMC: 8. 報告・個別見積作成
    end

    CMC->>CorpSales: 9. 全拠点分の見積/工事可否回答

    Note over HQ, CorpSales: 【フェーズ3：一括発注・承認】
    CorpSales->>HQ: 10. 工事リスト・総額提示
    HQ->>CorpSales: 11. 発注書発行（一括）
    
    Note over Driver, Installer: 【フェーズ4：施工・納品】
    CorpSales->>CMC: 12. 工事Goサイン
    CMC->>Installer: 13. 工事指示
    Installer->>Driver: 14. 工事日程調整（現場担当と）
    Installer->>Driver: 15. 施工・完了サイン受領
    Installer->>CMC: 16. 完了報告

    Note over HQ, Admin: 【フェーズ5：月締め請求】
    CMC->>CorpSales: 17. 完了案件の月次報告
    CorpSales->>Admin: 18. 売上確定
    Admin->>HQ: 19. 請求書発行（月締め一括）
    HQ->>Admin: 20. 支払い（翌月末払い等）
```

**【パターンAとの決定的な違い（ヒアリングでの確認ポイント）】**

1.  **契約形態**: 都度の注文書ではなく「基本契約＋発注リスト」ではないか？
2.  **窓口**: 店舗（ディーラー）ではなく「法人営業部」等の別組織が担当していないか？
3.  **日程調整**: 契約は本社だが、日程調整は現場（支店）と直接行う必要がある（連絡ルートの複線化）。

-----