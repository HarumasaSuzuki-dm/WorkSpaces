/** * @OnlyCurrentDoc 
 * このスクリプトは、Google風デザインテンプレートに基づきGoogleスライドを自動生成します。 
 * Version: 12.0 (Universal Google Design - Final) 
 * Author: Googleスライド自動生成マスター
 * Prompt Design: まじん式プロンプト 
 * Description: 指定されたslideData配列を元に、Google風デザインに準拠したスライドを生成します。 
 */

// --- 1. 実行設定 --- 
const SETTINGS = {
  SHOULD_CLEAR_ALL_SLIDES: true,
  TARGET_PRESENTATION_ID: null
};

// --- 2. マスターデザイン設定 (Google Design Ver.) --- 
const CONFIG = {
  BASE_PX: { W: 960, H: 540 },

  // レイアウトの基準となる不変のpx値 
  POS_PX: {
    titleSlide: {
      logo: { left: 55, top: 105, width: 135 },
      title: { left: 50, top: 230, width: 800, height: 90 },
      date: { left: 50, top: 340, width: 250, height: 40 },
    },

    // 共通ヘッダーを持つ各スライド 
    contentSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      body: { left: 25, top: 172, width: 910, height: 303 },
      twoColLeft: { left: 25, top: 172, width: 440, height: 303 },
      twoColRight: { left: 495, top: 172, width: 440, height: 303 }
    },
    compareSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      leftBox: { left: 25, top: 172, width: 430, height: 303 },
      rightBox: { left: 505, top: 172, width: 430, height: 303 }
    },
    processSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      area: { left: 25, top: 172, width: 910, height: 303 }
    },
    timelineSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      area: { left: 25, top: 172, width: 910, height: 303 }
    },
    diagramSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      lanesArea: { left: 25, top: 172, width: 910, height: 303 }
    },
    cardsSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      gridArea: { left: 25, top: 172, width: 910, height: 303 }
    },
    tableSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      area: { left: 25, top: 172, width: 910, height: 303 }
    },
    progressSlide: {
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 25, top: 60, width: 830, height: 65 },
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 },
      subhead: { left: 25, top: 140, width: 830, height: 30 },
      area: { left: 25, top: 172, width: 910, height: 303 }
    },

    // 章扉（背景に大きなゴースト番号） 
    sectionSlide: {
      title: { left: 55, top: 230, width: 840, height: 80 },
      ghostNum: { left: 35, top: 120, width: 300, height: 200 }
    },

    footer: {
      leftText: { left: 15, top: 505, width: 250, height: 20 },
      rightPage: { right: 15, top: 505, width: 50, height: 20 }
    },
    bottomBar: { left: 0, top: 534, width: 960, height: 6 }
  },

  FONTS: {
    family: 'Arial',
    sizes: {
      title: 45,
      date: 16,
      sectionTitle: 38,
      contentTitle: 28,
      subhead: 18,
      body: 14,
      footer: 9,
      chip: 11,
      laneTitle: 13,
      small: 10,
      processStep: 14,
      axis: 12,
      ghostNum: 180
    }
  },
  COLORS: {
    primary_blue: '#4285F4',
    google_red: '#EA4335',
    google_yellow: '#FBBC04',
    google_green: '#34A853',
    text_primary: '#333333',
    background_white: '#FFFFFF',
    background_gray: '#f8f9fa',
    faint_gray: '#e8eaed',
    lane_title_bg: '#f5f5f3',
    lane_border: '#dadce0',
    card_bg: '#ffffff',
    card_border: '#dadce0',
    neutral_gray: '#9e9e9e',
    ghost_gray: '#efefed'
  },
  DIAGRAM: {
    laneGap_px: 24, lanePad_px: 10, laneTitle_h_px: 30,
    cardGap_px: 12, cardMin_h_px: 48, cardMax_h_px: 70,
    arrow_h_px: 10, arrowGap_px: 8
  },

  LOGOS: {
    header: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png',
    closing: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png'
  },

  FOOTER_TEXT: `© ${new Date().getFullYear()} Google LCC`
};

// --- 3. スライドデータ（★ここをAIが生成・置換する★） --- 
const slideData = [
  { type: 'title', title: '経営戦略ディスカッション', date: '2025.10.24', notes: '本日は「経営戦略ディスカッション」にお時間をいただき、ありがとうございます。このミーティングの目的は、なーすけ様の「最上位の論点」を私たちがどう構造化したかをご提示し、共に「解くべき課題」の全体像を掴むことです。' },
  {
    type: 'content', title: '本日の共通前提', points: [
      '**NDAの確認**: 事前に締結済みのNDAに基づき、機密情報を取り扱います',
      '**ご持参資料**: 議論を深めるため、直近四半期のPL/BS（概算で可）をご準備ください',
      '**本日のスタンス**: "評価の場"ではなく、共に思考を深める"壁打ちの場"です。自由な発想で議論しましょう'
    ], notes: '本題に入る前に、3点の共通前提を確認させてください。第一にNDA、第二にご準備いただいた資料について、そして第三に、本日の場は評価ではなく、共に思考を深める「壁打ち」の場であるというスタンスの確認です。'
  },
  {
    type: 'content', title: '本日の目的とゴール', subhead: '最上位の論点を構造化し、最も重要な論点について「共同作業（壁打ち）」を行います', points: [
      '1. 解くべき課題の**「全体像（課題マップ）」**について、目線を合わせます',
      '2. 最重要論点について**「Test Drive（お試し議論）」**を行い、思考を深めます',
      '3. この議論をどう**「実行」**に移すか、今後の進め方を協議します'
    ], notes: '本日の目的は、ご提示いただいた論点を私たちがどう構造化したかをお見せし、一緒に議論することです。そして、ゴールとして、この3点「全体像の目線合わせ」「最重要論点Test Drive」「今後の進め方」の合意を目指します。'
  },
  {
    type: 'content', title: 'なーすけ様の「最上位の論点」の再確認', subhead: 'なーすけ様ご自身による高度な現状分析が全ての出発点です', twoColumn: true, columns: [
      ['**最上位の論点**', '1. 会社PL視点での今後のビジョン', '2. SFG事業と他事業へのリソース配分'],
      ['**私の役割**', 'この高度なCEOアジェンダを「構造化」し、「意思決定」を加速させる', '[[思考のパートナー]]です']
    ], notes: 'まず、私たちが議論の出発点としている、なーすけ様から頂いた「最上位の論点」を再確認します。それは「PL視点のビジョン」と「リソース配分」です。これに対し、私の役割は、この高度なアジェンダを構造化し、意思決定を加速させる「思考のパートナー」であると定義しています。'
  },
  {
    type: 'diagram', title: '【全体像】経営・戦略レイヤーの「課題マップ」', subhead: '本日の目的は、[1]この全体像の目線合わせ、[2]最重要論点のTest Drive、[3]今後の進め方の合意です', lanes: [
      { title: '1. ビジョン', items: ['ビジョン / PL定義'] },
      { title: '2. ドメイン', items: ['事業ドメイン (投資先)'] },
      { title: '3. 強み', items: ['コア・コンピタンス (強み)'] },
      { title: '4. ポートフォリオ', items: ['事業ポートフォリオ (シナジー)'] },
      { title: '5. リソース', items: ['リソース配分 (時間・カネ)'] },
      { title: '6. 現場', items: ['現場の課題 (MVV・評価制度)'] }
    ], notes: 'こちらが、頂いた論点から私たちが構造化した「課題マップ」の全体像です。「ビジョン」から「ドメイン」、「強み」、「ポートフォリオ」、「リソース配分」、そして「現場の課題」へと流れる6つのレイヤーで整理しました。本日はこの全体像の目線合わせから始めます。'
  },
  {
    type: 'content', title: '本日の "Test Drive" （共同作業）', subhead: 'この課題マップの中で、最も重要な「2つの分岐点」についてディスカッションを行います', points: [
      '**Test Drive 1 (ミクロ)**: SFGの「本質的な価値（強み）」は何か？',
      '**Test Drive 2 (マクロ)**: 事業全体の「勝利の方程式」と「ボトルネック」は何か？'
    ], notes: 'では早速、このマップに基づき「Test Drive」と呼ぶ共同作業に移ります。本日は特に重要な分岐点となる、ミクロな「SFGの価値」と、マクロな「事業全体の勝利の方程式」という2点について議論を深めたいと思います。'
  },
  { type: 'section', title: 'Test Drive 1 (ミクロ): 「ギャップ」は"課題"ではなく"機会"か？', notes: '最初のTest Driveです。テーマは、SFG事業における「ギャップ」の捉え方です。これは課題ではなく、むしろ「機会」ではないかという仮説についてご意見を伺います。' },
  {
    type: 'compare', title: '(TD1) 仮説：その「ギャップ」は"機会"ではないか？', leftTitle: '論点A ("課題"と捉える見方)', leftItems: [
      'マーケティング（見た目）と実態（関係性）がズレており、非効率'
    ], rightTitle: '私の仮説 ("機会"と捉える見方)', rightItems: [
      'この「ギャップ」こそが、SFGが提供する**「意図せざる"変容プロセス"」**そのものではないか？',
      'この**「変容プロセス」こそが"プロダクト"**であり、他社が模倣困難な「[[コア・コンピタンス]]」の源泉ではないか？'
    ], notes: '現在、マーケティング上の「見た目」への訴求と、実態としての「関係性」の重視にズレがある、という見方（論点A）があるかと思います。それに対し、私の仮説（論点B）は、このギャップこそがSFGの本質的な価値、すなわち「変容プロセス」というプロダクトであり、模倣困難な強みの源泉ではないか、というものです。'
  },
  {
    type: 'cards', title: '(TD1) 根拠：なぜ「変容プロセス」が強みと言えるのか？', columns: 3, items: [
      { title: '《SFG理念》', desc: '人にしか提供できない"深い対話と共感"がサービスの核' },
      { title: '《トレーナー所感》', desc: 'お客様の入会動機は"見た目"、しかし継続理由は"関係性"' },
      { title: '《ペルソナ》', desc: '"見た目"で入会し、"関係性"を通じて"内面の変化（自己肯定感）"を得る変容の余地がある' }
    ], notes: 'なぜそう言えるのか。3つの根拠があります。第一に"理念"にある対話と共感。第二にトレーナーの所感、すなわち"入会理由は見た目、継続理由は関係性"という事実。第三にペルソナ、すなわち"見た目"から"内面の変化"へと変容するお客様像です。'
  },
  {
    type: 'cards', title: '(TD1) 問い：もし「変容プロセス」が強みなら？', columns: 3, items: [
      { title: '問い1: 実感値との合致', desc: 'この仮説（ギャップ＝変容プロセス）は、なーすけ様の実感値と合致しますか？' },
      { title: '問い2: 事業ドメインの再定義', desc: 'もしこれが強みなら、「事業ドメイン」は「①ジム業」ではなく**「②コーチング/メンタリング業」**にリソースを集中投下すべきではないか？' },
      { title: '問い3: PL（投資先）の変化', desc: 'その場合、PL（投資先）は「機材」ではなく、「トレーナーの採用・育成（ヒアリング力）」に変わるのではないか？' }
    ], notes: 'この仮説に基づき、3つの問いを投げかけたいと思います。1. この仮説は実感値と合致するか。 2. 合致する場合、事業ドメインを「コーチング業」と再定義すべきではないか。 3. そして、その場合、投資先は「機材」から「トレーナー育成」に変わるのではないか。この点について、ぜひご意見をお聞かせください。'
  },
  { type: 'section', title: 'Test Drive 2 (マクロ): 「勝利の方程式」と"ボトルネック"はどこか？', notes: '続いて、2つ目のTest Driveです。視点をマクロに移し、事業全体の「勝利の方程式」と、その流れを妨げている「ボトルネック」について議論します。' },
  {
    type: 'content', title: '(TD2) 仮説：御社の「勝利の方程式」とは？', subhead: 'TD1の結果を踏まえると、SFGの役割は「キャッシュカウ」ではなく、顧客の循環を回す**「フラッグシップ（ビジョンの象徴）」**である、という仮説です', points: [
      '**[集客]**: SNS (YouTube)',
      '**[関係構築]**: SFG ("変容プロセス")',
      '**[挑戦/LTV最大化]**: SFF (大会・イベント)',
      '**[収益化/コミュニティ]**: アパレル事業'
    ], notes: 'TD1の「SFG＝変容プロセス」という仮説を踏まえると、御社の「勝利の方程式」が見えてきます。SFGは単なる利益源ではなく、顧客の循環を生み出す「フラッグシップ」としての役割を持つという仮説です。具体的には、SNSで集客し、SFGで関係構築（＝変容プロセス）を行い、SFFで挑戦を促し、アパレルで収益化とコミュニティ化を図る、という流れです。'
  },
  {
    type: 'diagram', title: '(TD2) 可視化：顧客の循環（エコシステム）', subhead: 'この「顧客の循環」という仮説は、実感値と合致しますか？', lanes: [
      { title: 'SNS (YouTube)', items: ['[集客]'] },
      { title: 'SFG (変容プロセス)', items: ['[関係構築]'] },
      { title: 'SFF (大会・イベント)', items: ['[挑戦/LTV最大化]'] },
      { title: 'アパレル事業', items: ['[収益化/コミュニティ]'] }
    ], notes: 'この流れを可視化したのが、こちらの顧客循環（エコシステム）の図です。SNSからSFG、SFF、アパレルへと顧客が循環し、再びSNSへと戻っていく。この仮説は、なーすけ様の実感値と合致するでしょうか？'
  },
  {
    type: 'content', title: '(TD2) 問い：この「方程式」の"ボトルネック"は？', subhead: '最重要の問い: この「勝利の方程式」の中で、今、経営者として最も**『流れが滞っている（＝ボトルネック）』**と感じる箇所はどこですか？', points: [
      '（例：SNSからSFGへの流入が弱い？）',
      '（例：SFGからSFFへの挑戦者が少ない？）',
      '（例：SFFからアパレルへの繋がりが薄い？）'
    ], notes: 'もしこの「勝利の方程式」にご同意いただける場合、最重要の問いはこれです。この循環の中で、経営者として今、最も「流れが滞っている」、すなわち「ボトルネック」となっているのはどの矢印の部分でしょうか。例としていくつか挙げましたが、ご所感をお聞かせください。'
  },
  { type: 'section', title: 'ご提案：今後の進め方', notes: 'ここまで2つのTest Driveを行いました。もしこの議論の方向性にご共感いただけましたら、今後の進め方について、具体的なご提案をさせてください。' },
  {
    type: 'table', title: '配分判断の"型"（ご提案）', subhead: '今後のリソース配分の議論を加速させるため、共通の「判断の型」を導入しませんか？', headers: [
      '評価軸', '重み付け', '事業A', '事業B', '事業C'
    ], rows: [
      ['**戦略性**', '40%', '5', '3', '4'],
      ['**収益性**', '30%', '3', '5', '4'],
      ['**シナジー**', '20%', '4', '4', '5'],
      ['**コスト**', '10%', '2', '4', '3'],
      ['**合計スコア**', '**100%**', '**4.1**', '**3.9**', '**4.1**']
    ], notes: 'リソース配分の意思決定を加速させるため、このような共通の「判断の型」の導入をご提案します。例えば、戦略性、収益性、シナジー、コストといった軸で重み付けをし、各事業をスコアリングすることで、客観的な議論が可能になります。'
  },
  {
    type: 'content', title: 'Phase 1の具体的なアウトプット', subhead: '本日特定したボトルネックを解消し、勝利の方程式を完成させるために、以下の成果物を定義します', points: [
      '**Vision Statement v1.0**: 会社が目指す北極星',
      '**Domain Definition**: 注力する事業領域の決定',
      '**Core Competence Statement**:「変容プロセス」の言語化',
      '**Resource Allocation v1.0**: 4軸評価に基づく配分表',
      '**Next Step for HR**: 評価制度の見直し方針'
    ], notes: 'この議論をプロジェクトとして進める場合、Phase 1のアウトプットとして、これら5点を定義します。ビジョンの策定から、ドメイン、強みの言語化、そしてリソース配分表の作成、人事評価へのネクストステップまでをカバーします。'
  },
  {
    type: 'content', title: 'ご提案する進め方（案）', subhead: '本日特定した"ボトルネック"の解消と"勝利の方程式"の完成を、**「プロジェクト」**として正式にご支援させていただけないでしょうか？', points: [
      '**Phase 1: 戦略の確定**（例: 3ヶ月）',
      '  上記の全アウトプットを「決定」します',
      '  会議体: 週1回の定例MTG',
      '  意思決定ゲート: 各アウトプットのv1.0承認',
      '**Phase 2: 現場への接続**',
      '  決定した戦略に基づき、現場課題（MVV、評価制度）に着手します'
    ], notes: '具体的な進め方として、2つのフェーズをご提案します。まずPhase 1で、例えば3ヶ月間、週1回のミーティングを通じ、先ほどのアウトプットをすべて「決定」します。その後、Phase 2で、決定した戦略を現場のMVVや評価制度に接続していきます。'
  },
  {
    type: 'content', title: 'Next Step & Q&A', subhead: 'もしこの進め方にご興味を持っていただけるようでしたら、次回、具体的なご提案をさせてください', points: [
      '1. **NDA締結**（本日 or 明日）',
      '2. **PL/BSのご共有**（可能な範囲で）',
      '3. **Phase 1 のスコープ（支援範囲）とお見積り** のご提案',
      '→ 次回キックオフの日程を協議させていただけますでしょうか？'
    ], notes: 'もしこのプロジェクトにご興味をお持ちいただけましたら、次のステップとして、まずNDAの締結（本日確認済みですね）、次に可能な範囲でのPL/BSのご共有をお願いできればと思います。それを踏まえ、次回、Phase 1の具体的なスコープとお見積りをご提案します。ご質問がなければ、ぜひ次回のキックオフ日程を決めさせてください。'
  },
  { type: 'closing', notes: '本日は貴重なお時間をいただき、誠にありがとうございました。引き続き、よろしくお願いいたします。' }
];

// --- 4. メイン実行関数 --- 
let __SECTION_COUNTER = 0; // 章番号カウンタ（ゴースト数字用）

function generatePresentation() {
  let presentation;
  try {
    presentation = SETTINGS.TARGET_PRESENTATION_ID
      ? SlidesApp.openById(SETTINGS.TARGET_PRESENTATION_ID)
      : SlidesApp.getActivePresentation();
    if (!presentation) throw new Error('対象のプレゼンテーションが見つかりません。');

    if (SETTINGS.SHOULD_CLEAR_ALL_SLIDES) {
      const slides = presentation.getSlides();
      for (let i = slides.length - 1; i >= 0; i--) slides[i].remove();
    }

    __SECTION_COUNTER = 0;

    const layout = createLayoutManager(presentation.getPageWidth(), presentation.getPageHeight());

    let pageCounter = 0;
    for (const data of slideData) {
      const generator = slideGenerators[data.type];
      if (data.type !== 'title' && data.type !== 'closing') pageCounter++;
      if (generator) {
        const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
        generator(slide, data, layout, pageCounter);

        // スピーカーノートを設定する処理 
        if (data.notes) {
          try {
            const notesShape = slide.getNotesPage().getSpeakerNotesShape();
            if (notesShape) {
              notesShape.getText().setText(data.notes);
            }
          } catch (e) {
            Logger.log(`スピーカーノートの設定に失敗しました: ${e.message}`);
          }
        }
      }
    }
  } catch (e) {
    Logger.log(`処理が中断されました: ${e.message}\nStack: ${e.stack}`);
  }
}

// --- 5. スライド生成ディスパッチャ --- 
const slideGenerators = {
  title: createTitleSlide,
  section: createSectionSlide,
  content: createContentSlide,
  compare: createCompareSlide,
  process: createProcessSlide,
  timeline: createTimelineSlide,
  diagram: createDiagramSlide,
  cards: createCardsSlide,
  table: createTableSlide,
  progress: createProgressSlide,
  closing: createClosingSlide
};

// --- 6. スライド生成関数群 --- 
function createTitleSlide(slide, data, layout) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);

  const logoRect = layout.getRect('titleSlide.logo');
  const logo = slide.insertImage(CONFIG.LOGOS.header);
  const aspect = logo.getHeight() / logo.getWidth();
  logo.setLeft(logoRect.left).setTop(logoRect.top).setWidth(logoRect.width).setHeight(logoRect.width * aspect);

  const titleRect = layout.getRect('titleSlide.title');
  const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height);
  setStyledText(titleShape, data.title, { size: CONFIG.FONTS.sizes.title, bold: true });

  const dateRect = layout.getRect('titleSlide.date');
  const dateShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, dateRect.left, dateRect.top, dateRect.width, dateRect.height);
  dateShape.getText().setText(data.date || '');
  applyTextStyle(dateShape.getText(), { size: CONFIG.FONTS.sizes.date });

  drawBottomBar(slide, layout);
}

function createSectionSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_gray);

  // 透かし番号：sectionNo > タイトル先頭の数字 > 自動連番 
  __SECTION_COUNTER++;
  const parsedNum = (() => {
    if (Number.isFinite(data.sectionNo)) return Number(data.sectionNo);
    const m = String(data.title || '').match(/^\s*(\d+)[\.\．]/);
    return m ? Number(m[1]) : __SECTION_COUNTER;
  })();
  const num = String(parsedNum).padStart(2, '0');

  const ghostRect = layout.getRect('sectionSlide.ghostNum');
  const ghost = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, ghostRect.left, ghostRect.top, ghostRect.width, ghostRect.height);
  ghost.getText().setText(num);
  applyTextStyle(ghost.getText(), { size: CONFIG.FONTS.sizes.ghostNum, color: CONFIG.COLORS.ghost_gray, bold: true });
  try { ghost.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch (e) { }

  const titleRect = layout.getRect('sectionSlide.title');
  const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height);
  titleShape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
  setStyledText(titleShape, data.title, { size: CONFIG.FONTS.sizes.sectionTitle, bold: true, align: SlidesApp.ParagraphAlignment.CENTER });

  addGoogleFooter(slide, layout, pageNum);
}

// content（1/2カラム + 小見出し + 画像） 
function createContentSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'contentSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'contentSlide', data.subhead);

  // アジェンダ安全装置 
  const isAgenda = isAgendaTitle(data.title || '');
  let points = Array.isArray(data.points) ? data.points.slice(0) : [];
  if (isAgenda && (!points || points.length === 0)) {
    points = buildAgendaFromSlideData();
    if (points.length === 0) points = ['本日の目的', '進め方', '次のアクション'];
  }

  const hasImages = Array.isArray(data.images) && data.images.length > 0;
  const isTwo = !!(data.twoColumn || data.columns);

  if ((isTwo && (data.columns || points)) || (!isTwo && points && points.length > 0)) {
    if (isTwo) {
      let L = [], R = [];
      if (Array.isArray(data.columns) && data.columns.length === 2) {
        L = data.columns[0] || []; R = data.columns[1] || [];
      } else {
        const mid = Math.ceil(points.length / 2);
        L = points.slice(0, mid); R = points.slice(mid);
      }
      const leftRect = offsetRect(layout.getRect('contentSlide.twoColLeft'), 0, dy);
      const rightRect = offsetRect(layout.getRect('contentSlide.twoColRight'), 0, dy);
      const leftShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, leftRect.left, leftRect.top, leftRect.width, leftRect.height);
      const rightShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rightRect.left, rightRect.top, rightRect.width, rightRect.height);
      setBulletsWithInlineStyles(leftShape, L);
      setBulletsWithInlineStyles(rightShape, R);
    } else {
      const bodyRect = offsetRect(layout.getRect('contentSlide.body'), 0, dy);
      const bodyShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, bodyRect.left, bodyRect.top, bodyRect.width, bodyRect.height);
      setBulletsWithInlineStyles(bodyShape, points);
    }
  }

  // 画像（任意） 
  if (hasImages) {
    const area = offsetRect(layout.getRect('contentSlide.body'), 0, dy);
    renderImagesInArea(slide, layout, area, normalizeImages(data.images));
  }

  drawBottomBarAndFooter(slide, layout, pageNum);
}

// compare（左右ボックス：ヘッダー青＋白文字） 
function createCompareSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'compareSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'compareSlide', data.subhead);

  const leftBox = offsetRect(layout.getRect('compareSlide.leftBox'), 0, dy);
  const rightBox = offsetRect(layout.getRect('compareSlide.rightBox'), 0, dy);
  drawCompareBox(slide, leftBox, data.leftTitle || '選択肢A', data.leftItems || []);
  drawCompareBox(slide, rightBox, data.rightTitle || '選択肢B', data.rightItems || []);

  drawBottomBarAndFooter(slide, layout, pageNum);
}
function drawCompareBox(slide, rect, title, items) {
  const box = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, rect.left, rect.top, rect.width, rect.height);
  box.getFill().setSolidFill(CONFIG.COLORS.lane_title_bg);
  box.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.lane_border);
  box.getBorder().setWeight(1);

  const th = 0.75 * 40; // 約30px相当 
  const titleBar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, rect.left, rect.top, rect.width, th);
  titleBar.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
  titleBar.getBorder().setTransparent();
  setStyledText(titleBar, title, { size: CONFIG.FONTS.sizes.laneTitle, bold: true, color: CONFIG.COLORS.background_white, align: SlidesApp.ParagraphAlignment.CENTER });

  const pad = 0.75 * 12;
  const textRect = { left: rect.left + pad, top: rect.top + th + pad, width: rect.width - pad * 2, height: rect.height - th - pad * 2 };
  const body = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, textRect.left, textRect.top, textRect.width, textRect.height);
  setBulletsWithInlineStyles(body, items);
}

// process（角枠1px＋一桁数字） 
function createProcessSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'processSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'processSlide', data.subhead);

  const area = offsetRect(layout.getRect('processSlide.area'), 0, dy);
  const steps = Array.isArray(data.steps) ? data.steps : [];
  const n = Math.max(1, steps.length);
  const gapY = (area.height - layout.pxToPt(40)) / Math.max(1, n - 1);
  const cx = area.left + layout.pxToPt(44);
  const top0 = area.top + layout.pxToPt(10);

  const line = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, cx - layout.pxToPt(1), top0 + layout.pxToPt(6), layout.pxToPt(2), gapY * (n - 1));
  line.getFill().setSolidFill(CONFIG.COLORS.faint_gray);
  line.getBorder().setTransparent();

  for (let i = 0; i < n; i++) {
    const cy = top0 + gapY * i;
    const sz = layout.pxToPt(28);
    const numBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, cx - sz / 2, cy - sz / 2, sz, sz);
    numBox.getFill().setSolidFill(CONFIG.COLORS.background_white);
    numBox.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.primary_blue);
    numBox.getBorder().setWeight(1);
    const num = numBox.getText(); num.setText(String(i + 1));
    applyTextStyle(num, { size: 12, bold: true, color: CONFIG.COLORS.primary_blue, align: SlidesApp.ParagraphAlignment.CENTER });

    const txt = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, cx + layout.pxToPt(28), cy - layout.pxToPt(16), area.width - layout.pxToPt(70), layout.pxToPt(32));
    setStyledText(txt, steps[i] || '', { size: CONFIG.FONTS.sizes.processStep });
    try { txt.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch (e) { }
  }

  drawBottomBarAndFooter(slide, layout, pageNum);
}

// timeline（左右余白広め） 
function createTimelineSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'timelineSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'timelineSlide', data.subhead);

  const area = offsetRect(layout.getRect('timelineSlide.area'), 0, dy);
  const milestones = Array.isArray(data.milestones) ? data.milestones : [];
  if (milestones.length === 0) { drawBottomBarAndFooter(slide, layout, pageNum); return; }

  const inner = layout.pxToPt(60);
  const baseY = area.top + area.height * 0.55;
  const leftX = area.left + inner;
  const rightX = area.left + area.width - inner;

  const line = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, leftX, baseY - layout.pxToPt(1), rightX - leftX, layout.pxToPt(2));
  line.getFill().setSolidFill(CONFIG.COLORS.faint_gray);
  line.getBorder().setTransparent();

  const dotR = layout.pxToPt(8);
  const gap = (rightX - leftX) / Math.max(1, (milestones.length - 1));

  milestones.forEach((m, i) => {
    const x = leftX + gap * i - dotR / 2;
    const dot = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, x, baseY - dotR / 2, dotR, dotR);
    const state = (m.state || 'todo').toLowerCase();
    if (state === 'done') { dot.getFill().setSolidFill(CONFIG.COLORS.google_green); dot.getBorder().setTransparent(); }
    else if (state === 'next') { dot.getFill().setSolidFill(CONFIG.COLORS.background_white); dot.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.google_yellow); dot.getBorder().setWeight(2); }
    else { dot.getFill().setSolidFill(CONFIG.COLORS.background_white); dot.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.neutral_gray); dot.getBorder().setWeight(1); }

    const t = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, x - layout.pxToPt(40), baseY - layout.pxToPt(40), layout.pxToPt(90), layout.pxToPt(20));
    t.getText().setText(String(m.label || ''));
    applyTextStyle(t.getText(), { size: CONFIG.FONTS.sizes.small, bold: true, align: SlidesApp.ParagraphAlignment.CENTER });

    const d = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, x - layout.pxToPt(40), baseY + layout.pxToPt(8), layout.pxToPt(90), layout.pxToPt(18));
    d.getText().setText(String(m.date || ''));
    applyTextStyle(d.getText(), { size: CONFIG.FONTS.sizes.small, color: CONFIG.COLORS.neutral_gray, align: SlidesApp.ParagraphAlignment.CENTER });
  });

  drawBottomBarAndFooter(slide, layout, pageNum);
}

// diagram（Mermaid風・レーン＋カード＋自動矢印） 
function createDiagramSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'diagramSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'diagramSlide', data.subhead);

  const lanes = Array.isArray(data.lanes) ? data.lanes : [];
  const area0 = layout.getRect('diagramSlide.lanesArea');
  const area = offsetRect(area0, 0, dy);

  const px = (p) => layout.pxToPt(p);
  const laneGap = px(CONFIG.DIAGRAM.laneGap_px);
  const lanePad = px(CONFIG.DIAGRAM.lanePad_px);
  const laneTitleH = px(CONFIG.DIAGRAM.laneTitle_h_px);
  const cardGap = px(CONFIG.DIAGRAM.cardGap_px);
  const cardMinH = px(CONFIG.DIAGRAM.cardMin_h_px);
  const cardMaxH = px(CONFIG.DIAGRAM.cardMax_h_px);
  const arrowH = px(CONFIG.DIAGRAM.arrow_h_px);
  const arrowGap = px(CONFIG.DIAGRAM.arrowGap_px);

  const n = Math.max(1, lanes.length);
  const laneW = (area.width - laneGap * (n - 1)) / n;

  const cardBoxes = [];

  for (let j = 0; j < n; j++) {
    const lane = lanes[j] || { title: '', items: [] };
    const left = area.left + j * (laneW + laneGap);
    const top = area.top;

    const lt = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, left, top, laneW, laneTitleH);
    lt.getFill().setSolidFill(CONFIG.COLORS.lane_title_bg);
    lt.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.lane_border);
    lt.getBorder().setWeight(1);
    lt.getText().setText(lane.title || '');
    applyTextStyle(lt.getText(), { size: CONFIG.FONTS.sizes.laneTitle, bold: true, align: SlidesApp.ParagraphAlignment.CENTER });

    const items = Array.isArray(lane.items) ? lane.items : [];
    const availH = area.height - laneTitleH - lanePad * 2;
    const rows = Math.max(1, items.length);
    const idealH = (availH - cardGap * (rows - 1)) / rows;
    const cardH = Math.max(cardMinH, Math.min(cardMaxH, idealH));
    const totalH = cardH * rows + cardGap * (rows - 1);
    const firstTop = top + laneTitleH + lanePad + Math.max(0, (availH - totalH) / 2);

    cardBoxes[j] = [];
    for (let i = 0; i < rows; i++) {
      const cardTop = firstTop + i * (cardH + cardGap);
      const cardLeft = left + lanePad;
      const cardWidth = laneW - lanePad * 2;

      const card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, cardLeft, cardTop, cardWidth, cardH);
      card.getFill().setSolidFill(CONFIG.COLORS.card_bg);
      card.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.card_border);
      card.getBorder().setWeight(1);
      setStyledText(card, items[i] || '', { size: CONFIG.FONTS.sizes.body });

      try { card.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch (e) { }
      cardBoxes[j][i] = { left: cardLeft, top: cardTop, width: cardWidth, height: cardH };
    }
  }

  // 同行カード間を矢印で接続 
  const maxRows = Math.max(...cardBoxes.map(a => a.length));
  for (let j = 0; j < n - 1; j++) {
    const L = cardBoxes[j], R = cardBoxes[j + 1];
    for (let i = 0; i < maxRows; i++) {
      const a = L[i], b = R[i];
      if (a && b) drawArrowBetweenRects(slide, a, b, arrowH, arrowGap);
    }
  }

  drawBottomBarAndFooter(slide, layout, pageNum);
}

// cards（グレー枠のみ）— title/desc 両方でインライン装飾を有効化 
function createCardsSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'cardsSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'cardsSlide', data.subhead);

  const area = offsetRect(layout.getRect('cardsSlide.gridArea'), 0, dy);
  const items = Array.isArray(data.items) ? data.items : [];
  const cols = Math.min(3, Math.max(2, Number(data.columns) || (items.length <= 4 ? 2 : 3)));
  const gap = layout.pxToPt(16);
  const rows = Math.ceil(items.length / cols);
  const cardW = (area.width - gap * (cols - 1)) / cols;
  const cardH = Math.max(layout.pxToPt(92), (area.height - gap * (rows - 1)) / rows);

  for (let idx = 0; idx < items.length; idx++) {
    const r = Math.floor(idx / cols), c = idx % cols;
    const left = area.left + c * (cardW + gap);
    const top = area.top + r * (cardH + gap);

    const card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, left, top, cardW, cardH);
    card.getFill().setSolidFill(CONFIG.COLORS.card_bg);
    card.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.card_border);
    card.getBorder().setWeight(1);

    const obj = items[idx];
    if (typeof obj === 'string') {
      setStyledText(card, obj, { size: CONFIG.FONTS.sizes.body });
    } else {
      const title = String(obj.title || '');
      const desc = String(obj.desc || '');
      const combined = `${title}${desc ? '\n' + desc : ''}`;
      setStyledText(card, combined, { size: CONFIG.FONTS.sizes.body });
      if (title.length > 0) {
        try { card.getText().getRange(0, title.length).getTextStyle().setBold(true); } catch (e) { }
      }
    }
    try { card.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch (e) { }
  }

  drawBottomBarAndFooter(slide, layout, pageNum);
}

// table（Slidesテーブルでもインライン装飾対応。失敗時は矩形代替でも対応） 
function createTableSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'tableSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'tableSlide', data.subhead);

  const area = offsetRect(layout.getRect('tableSlide.area'), 0, dy);
  const headers = Array.isArray(data.headers) ? data.headers : [];
  const rows = Array.isArray(data.rows) ? data.rows : [];

  try {
    if (headers.length > 0) {
      const table = slide.insertTable(rows.length + 1, headers.length);
      table.setLeft(area.left).setTop(area.top).setWidth(area.width);
      for (let c = 0; c < headers.length; c++) {
        const cell = table.getCell(0, c);
        setStyledText(cell, String(headers[c] || ''), { bold: true, align: SlidesApp.ParagraphAlignment.CENTER });
      }
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r] || [];
        for (let c = 0; c < headers.length; c++) {
          const cell = table.getCell(r + 1, c);
          setStyledText(cell, String(row[c] || ''), { align: SlidesApp.ParagraphAlignment.CENTER });
        }
      }
    } else {
      throw new Error('headers is empty');
    }
  } catch (e) {
    const cols = Math.max(1, headers.length || 3);
    const rcount = rows.length + 1;
    const gap = layout.pxToPt(1);
    const cellW = (area.width - gap * (cols - 1)) / cols;
    const cellH = (area.height - gap * (rcount - 1)) / rcount;
    const drawCell = (r, c, text, bold) => {
      const left = area.left + c * (cellW + gap);
      const top = area.top + r * (cellH + gap);
      const cell = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, left, top, cellW, cellH);
      cell.getFill().setSolidFill(CONFIG.COLORS.background_white);
      cell.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.card_border);
      cell.getBorder().setWeight(1);
      setStyledText(cell, String(text || ''), { bold: !!bold, align: SlidesApp.ParagraphAlignment.CENTER });
      try { cell.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch (e) { }
    };
    (headers.length ? headers : ['項目', '値1', '値2']).forEach((h, c) => drawCell(0, c, h, true));
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r] || [];
      for (let c = 0; c < (headers.length || 3); c++) drawCell(r + 1, c, row[c], false);
    }
  }

  drawBottomBarAndFooter(slide, layout, pageNum);
}

// progress（進捗バー） 
function createProgressSlide(slide, data, layout, pageNum) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  drawStandardTitleHeader(slide, layout, 'progressSlide', data.title);
  const dy = drawSubheadIfAny(slide, layout, 'progressSlide', data.subhead);

  const area = offsetRect(layout.getRect('progressSlide.area'), 0, dy);
  const items = Array.isArray(data.items) ? data.items : [];
  const n = Math.max(1, items.length);
  const rowH = area.height / n;

  for (let i = 0; i < n; i++) {
    const y = area.top + i * rowH + layout.pxToPt(6);
    const label = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, area.left, y, layout.pxToPt(150), layout.pxToPt(18));
    setStyledText(label, String(items[i].label || ''), { size: CONFIG.FONTS.sizes.body });

    const barLeft = area.left + layout.pxToPt(160);
    const barW = area.width - layout.pxToPt(210);
    const barBG = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, barLeft, y, barW, layout.pxToPt(14));
    barBG.getFill().setSolidFill(CONFIG.COLORS.faint_gray); barBG.getBorder().setTransparent();

    const p = Math.max(0, Math.min(100, Number(items[i].percent || 0)));
    const barFG = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, barLeft, y, barW * (p / 100), layout.pxToPt(14));
    barFG.getFill().setSolidFill(CONFIG.COLORS.google_green); barFG.getBorder().setTransparent();

    const pct = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, barLeft + barW + layout.pxToPt(6), y - layout.pxToPt(1), layout.pxToPt(40), layout.pxToPt(16));
    pct.getText().setText(String(p) + '%');
    applyTextStyle(pct.getText(), { size: CONFIG.FONTS.sizes.small, color: CONFIG.COLORS.neutral_gray });
  }

  drawBottomBarAndFooter(slide, layout, pageNum);
}

function createClosingSlide(slide, data, layout) {
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
  const image = slide.insertImage(CONFIG.LOGOS.closing);
  const imgW_pt = layout.pxToPt(450) * layout.scaleX;
  const aspect = image.getHeight() / image.getWidth();
  image.setWidth(imgW_pt).setHeight(imgW_pt * aspect);
  image.setLeft((layout.pageW_pt - imgW_pt) / 2).setTop((layout.pageH_pt - (imgW_pt * aspect)) / 2);
}

// --- 7. ユーティリティ関数群 --- 
function createLayoutManager(pageW_pt, pageH_pt) {
  const pxToPt = (px) => px * 0.75;
  const baseW_pt = pxToPt(CONFIG.BASE_PX.W);
  const baseH_pt = pxToPt(CONFIG.BASE_PX.H);
  const scaleX = pageW_pt / baseW_pt;
  const scaleY = pageH_pt / baseH_pt;

  const getPositionFromPath = (path) => path.split('.').reduce((obj, key) => obj[key], CONFIG.POS_PX);
  return {
    scaleX, scaleY, pageW_pt, pageH_pt, pxToPt,
    getRect: (spec) => {
      const pos = typeof spec === 'string' ? getPositionFromPath(spec) : spec;
      let left_px = pos.left;
      if (pos.right !== undefined && pos.left === undefined) {
        left_px = CONFIG.BASE_PX.W - pos.right - pos.width;
      }
      return {
        left: left_px !== undefined ? pxToPt(left_px) * scaleX : undefined,
        top: pos.top !== undefined ? pxToPt(pos.top) * scaleY : undefined,
        width: pos.width !== undefined ? pxToPt(pos.width) * scaleX : undefined,
        height: pos.height !== undefined ? pxToPt(pos.height) * scaleY : undefined,
      };
    }
  };
}

function offsetRect(rect, dx, dy) {
  return { left: rect.left + (dx || 0), top: rect.top + (dy || 0), width: rect.width, height: rect.height };
}

function drawStandardTitleHeader(slide, layout, key, title) {
  const logoRect = layout.getRect(`${key}.headerLogo`);
  const logo = slide.insertImage(CONFIG.LOGOS.header);
  const asp = logo.getHeight() / logo.getWidth();
  logo.setLeft(logoRect.left).setTop(logoRect.top).setWidth(logoRect.width).setHeight(logoRect.width * asp);

  const titleRect = layout.getRect(`${key}.title`);
  const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height);
  setStyledText(titleShape, title || '', { size: CONFIG.FONTS.sizes.contentTitle, bold: true });

  const uRect = layout.getRect(`${key}.titleUnderline`);
  const u = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, uRect.left, uRect.top, uRect.width, uRect.height);
  u.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
  u.getBorder().setTransparent();
}

function drawSubheadIfAny(slide, layout, key, subhead) {
  if (!subhead) return 0;
  const rect = layout.getRect(`${key}.subhead`);
  const box = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rect.left, rect.top, rect.width, rect.height);
  setStyledText(box, subhead, { size: CONFIG.FONTS.sizes.subhead, color: CONFIG.COLORS.text_primary });
  return layout.pxToPt(36);
}

function drawBottomBar(slide, layout) {
  const barRect = layout.getRect('bottomBar');
  const bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, barRect.left, barRect.top, barRect.width, barRect.height);
  bar.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
  bar.getBorder().setTransparent();
}

function drawBottomBarAndFooter(slide, layout, pageNum) {
  drawBottomBar(slide, layout);
  addGoogleFooter(slide, layout, pageNum);
}

function addGoogleFooter(slide, layout, pageNum) {
  const leftRect = layout.getRect('footer.leftText');
  const leftShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, leftRect.left, leftRect.top, leftRect.width, leftRect.height);
  leftShape.getText().setText(CONFIG.FOOTER_TEXT);
  applyTextStyle(leftShape.getText(), { size: CONFIG.FONTS.sizes.footer, color: CONFIG.COLORS.text_primary });

  if (pageNum > 0) {
    const rightRect = layout.getRect('footer.rightPage');
    const rightShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rightRect.left, rightRect.top, rightRect.width, rightRect.height);
    rightShape.getText().setText(String(pageNum));
    applyTextStyle(rightShape.getText(), { size: CONFIG.FONTS.sizes.footer, color: CONFIG.COLORS.primary_blue, align: SlidesApp.ParagraphAlignment.END });
  }
}

function applyTextStyle(textRange, opt) {
  const style = textRange.getTextStyle();
  style.setFontFamily(CONFIG.FONTS.family);
  style.setForegroundColor(opt.color || CONFIG.COLORS.text_primary);
  style.setFontSize(opt.size || CONFIG.FONTS.sizes.body);
  style.setBold(opt.bold || false);
  if (opt.align) {
    try { textRange.getParagraphs().forEach(p => p.getRange().getParagraphStyle().setParagraphAlignment(opt.align)); } catch (e) { }
  }
}

function setStyledText(shapeOrCell, rawText, baseOpt) {
  const parsed = parseInlineStyles(rawText || '');
  const tr = shapeOrCell.getText();
  tr.setText(parsed.output);
  applyTextStyle(tr, baseOpt || {});
  applyStyleRanges(tr, parsed.ranges);
}

function setBulletsWithInlineStyles(shape, points) {
  const joiner = '\n\n';
  let combined = '';
  const ranges = [];

  (points || []).forEach((pt, idx) => {
    const parsed = parseInlineStyles(String(pt || ''));
    const bullet = '• ' + parsed.output;
    if (idx > 0) combined += joiner;
    const start = combined.length;
    combined += bullet;

    parsed.ranges.forEach(r => {
      ranges.push({ start: start + 2 + r.start, end: start + 2 + r.end, bold: r.bold, color: r.color });
    });
  });

  const tr = shape.getText();
  tr.setText(combined || '• —');
  applyTextStyle(tr, { size: CONFIG.FONTS.sizes.body });

  try {
    tr.getParagraphs().forEach(p => {
      const ps = p.getRange().getParagraphStyle();
      ps.setLineSpacing(100);
      ps.setSpaceBelow(6);
    });
  } catch (e) { }

  applyStyleRanges(tr, ranges);
}

function parseInlineStyles(s) {
  const ranges = [];
  let out = '';
  for (let i = 0; i < s.length;) {
    // [[青太字]] 
    if (s[i] === '[' && s[i + 1] === '[') {
      const close = s.indexOf(']]', i + 2);
      if (close !== -1) {
        const content = s.substring(i + 2, close);
        const start = out.length;
        out += content;
        const end = out.length;
        ranges.push({ start, end, bold: true, color: CONFIG.COLORS.primary_blue });
        i = close + 2; continue;
      }
    }
    // **太字**
    if (s[i] === '*' && s[i+1] === '*') {
      const close = s.indexOf('**', i + 2);
      if (close !== -1) {
        const content = s.substring(i + 2, close);
        const start = out.length;
        out += content;
        const end = out.length;
        ranges.push({ start, end, bold: true });
        i = close + 2; continue;
      }
    }
    out += s[i]; i++;
  }
  return { output: out, ranges };
}

function applyStyleRanges(textRange, ranges) {
  ranges.forEach(r => {
    try {
      const sub = textRange.getRange(r.start, r.end);
      if (!sub) return;
      const st = sub.getTextStyle();
      if (r.bold) st.setBold(true);
      if (r.color) st.setForegroundColor(r.color);
    } catch (e) { }
  });
}

function normalizeImages(arr) {
  return (arr || []).map(v => {
    if (typeof v === 'string') return { url: v };
    if (v && typeof v.url === 'string') return { url: v.url, caption: v.caption || '' };
    return null;
  }).filter(Boolean).slice(0, 6);
}

function renderImagesInArea(slide, layout, area, images) {
  if (!images || images.length === 0) return;
  const n = Math.min(6, images.length);
  let cols = 1, rows = 1;
  if (n === 1) { cols = 1; rows = 1; }
  else if (n === 2) { cols = 2; rows = 1; }
  else if (n <= 4) { cols = 2; rows = 2; }
  else { cols = 3; rows = 2; }

  const gap = layout.pxToPt(10);
  const cellW = (area.width - gap * (cols - 1)) / cols;
  const cellH = (area.height - gap * (rows - 1)) / rows;

  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    const left = area.left + c * (cellW + gap);
    const top = area.top + r * (cellH + gap);
    try {
      const img = slide.insertImage(images[i].url);
      const scale = Math.min(cellW / img.getWidth(), cellH / img.getHeight());
      const w = img.getWidth() * scale;
      const h = img.getHeight() * scale;
      img.setWidth(w).setHeight(h);
      img.setLeft(left + (cellW - w) / 2).setTop(top + (cellH - h) / 2);
    } catch (e) { }
  }
}

function isAgendaTitle(title) {
  const t = String(title || '').toLowerCase();
  return /(agenda|アジェンダ|目次|本日お伝えすること)/.test(t);
}
function buildAgendaFromSlideData() {
  const pts = [];
  for (const d of slideData) {
    if (d && d.type === 'section' && typeof d.title === 'string' && d.title.trim()) pts.push(d.title.trim());
  }
  if (pts.length > 0) return pts.slice(0, 5);
  const alt = [];
  for (const d of slideData) {
    if (d && d.type === 'content' && typeof d.title === 'string' && d.title.trim()) alt.push(d.title.trim());
  }
  return alt.slice(0, 5);
}

function drawArrowBetweenRects(slide, a, b, arrowH, arrowGap) {
  const fromX = a.left + a.width;
  const toX = b.left;
  const width = Math.max(0, toX - fromX - arrowGap * 2);
  if (width < 8) return;
  const yMid = ((a.top + a.height / 2) + (b.top + b.height / 2)) / 2;
  const top = yMid - arrowH / 2;
  const left = fromX + arrowGap;
  const arr = slide.insertShape(SlidesApp.ShapeType.RIGHT_ARROW, left, top, width, arrowH);
  arr.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
  arr.getBorder().setTransparent();
}