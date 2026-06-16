const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = __dirname;
const svgPath = path.join(outDir, "manatsu-portfolio-desktop-mockup-v2.svg");
const pngPath = path.join(outDir, "manatsu-portfolio-desktop-mockup-v2.png");

const W = 1440;
const H = 2840;

const c = {
  bg: "#f7f2e8",
  paper: "#fffdf8",
  paper2: "#fbf7ef",
  navy: "#16233f",
  navy2: "#22345b",
  muted: "#667085",
  line: "#d9dce2",
  beige: "#e8ddce",
  taupe: "#b8a68d",
  mustard: "#c49a3b",
  blueGray: "#dfe8ea",
  white: "#ffffff",
};

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function text(x, y, value, opts = {}) {
  const {
    size = 20,
    weight = 400,
    fill = c.navy,
    anchor = "start",
    letter = 0,
    family = "Noto Sans JP",
    opacity = 1,
  } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${letter}" opacity="${opacity}">${esc(value)}</text>`;
}

function multiline(x, y, rows, opts = {}) {
  const lineHeight = opts.lineHeight ?? 32;
  return rows.map((row, i) => text(x, y + i * lineHeight, row, opts)).join("");
}

function sectionTitle(y, title, sub) {
  return `
    ${text(96, y, title, { size: 34, weight: 800 })}
    <rect x="96" y="${y + 18}" width="44" height="4" rx="2" fill="${c.mustard}"/>
    ${sub ? text(158, y + 22, sub, { size: 12, weight: 700, fill: c.muted, letter: 2.2 }) : ""}
  `;
}

function pill(x, y, label, width) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="36" rx="18" fill="${c.paper}" stroke="${c.line}"/>
    ${text(x + width / 2, y + 24, label, { size: 15, weight: 600, anchor: "middle" })}
  `;
}

function smallTag(x, y, label, width) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="28" rx="6" fill="#f5f0e8" stroke="${c.line}"/>
    ${text(x + width / 2, y + 19, label, { size: 12, weight: 700, fill: c.navy2, anchor: "middle" })}
  `;
}

function iconButton(x, y, label, mark) {
  return `
    <rect x="${x}" y="${y}" width="52" height="52" rx="16" fill="${c.paper}" stroke="${c.line}"/>
    ${mark(x + 26, y + 26)}
    ${text(x + 26, y + 78, label, { size: 12, weight: 700, fill: c.muted, anchor: "middle" })}
  `;
}

function mailMark(cx, cy) {
  return `
    <rect x="${cx - 14}" y="${cy - 10}" width="28" height="20" rx="2" fill="none" stroke="${c.navy}" stroke-width="2"/>
    <path d="M${cx - 14} ${cy - 8} L${cx} ${cy + 2} L${cx + 14} ${cy - 8}" fill="none" stroke="${c.navy}" stroke-width="2"/>
  `;
}

function gitMark(cx, cy) {
  return `
    <circle cx="${cx}" cy="${cy}" r="15" fill="${c.navy}"/>
    <circle cx="${cx - 6}" cy="${cy - 2}" r="3" fill="${c.paper}"/>
    <circle cx="${cx + 6}" cy="${cy - 2}" r="3" fill="${c.paper}"/>
    <path d="M${cx - 7} ${cy + 6} C${cx - 2} ${cy + 10}, ${cx + 2} ${cy + 10}, ${cx + 7} ${cy + 6}" fill="none" stroke="${c.paper}" stroke-width="2" stroke-linecap="round"/>
  `;
}

function wantedlyMark(cx, cy) {
  return `
    <path d="M${cx - 18} ${cy - 12} L${cx - 8} ${cy + 12} L${cx} ${cy - 4} L${cx + 8} ${cy + 12} L${cx + 18} ${cy - 12}" fill="none" stroke="${c.navy}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="${cx + 20}" cy="${cy - 14}" r="4" fill="${c.mustard}"/>
  `;
}

function codeIcon(cx, cy) {
  return `
    <rect x="${cx - 92}" y="${cy - 62}" width="184" height="124" rx="10" fill="${c.paper}" stroke="${c.navy}" stroke-width="2"/>
    <line x1="${cx - 92}" y1="${cy - 28}" x2="${cx + 92}" y2="${cy - 28}" stroke="${c.line}" stroke-width="2"/>
    <circle cx="${cx - 68}" cy="${cy - 45}" r="4" fill="${c.mustard}"/>
    <circle cx="${cx - 52}" cy="${cy - 45}" r="4" fill="${c.taupe}"/>
    <circle cx="${cx - 36}" cy="${cy - 45}" r="4" fill="${c.blueGray}"/>
    <path d="M${cx - 54} ${cy + 16} L${cx - 24} ${cy - 2} L${cx - 54} ${cy - 20}" fill="none" stroke="${c.navy2}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${cx + 54} ${cy - 20} L${cx + 24} ${cy - 2} L${cx + 54} ${cy + 16}" fill="none" stroke="${c.navy2}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="${cx - 2}" y1="${cy + 22}" x2="${cx + 18}" y2="${cy - 26}" stroke="${c.mustard}" stroke-width="3" stroke-linecap="round"/>
  `;
}

function responsiveIcon(cx, cy) {
  return `
    <rect x="${cx - 78}" y="${cy - 62}" width="128" height="100" rx="10" fill="${c.paper}" stroke="${c.navy}" stroke-width="2"/>
    <rect x="${cx + 34}" y="${cy - 16}" width="54" height="88" rx="10" fill="${c.paper}" stroke="${c.navy}" stroke-width="2"/>
    <line x1="${cx - 32}" y1="${cy + 54}" x2="${cx + 8}" y2="${cy + 54}" stroke="${c.navy}" stroke-width="2"/>
    <line x1="${cx - 12}" y1="${cy + 38}" x2="${cx - 12}" y2="${cy + 54}" stroke="${c.navy}" stroke-width="2"/>
    <circle cx="${cx + 61}" cy="${cy + 60}" r="3" fill="${c.mustard}"/>
  `;
}

function logIcon(cx, cy) {
  return `
    <rect x="${cx - 58}" y="${cy - 74}" width="104" height="136" rx="8" fill="${c.paper}" stroke="${c.navy}" stroke-width="2"/>
    <line x1="${cx - 34}" y1="${cy - 42}" x2="${cx + 22}" y2="${cy - 42}" stroke="${c.taupe}" stroke-width="3" stroke-linecap="round"/>
    <line x1="${cx - 34}" y1="${cy - 12}" x2="${cx + 22}" y2="${cy - 12}" stroke="${c.taupe}" stroke-width="3" stroke-linecap="round"/>
    <line x1="${cx - 34}" y1="${cy + 18}" x2="${cx + 6}" y2="${cy + 18}" stroke="${c.taupe}" stroke-width="3" stroke-linecap="round"/>
    <path d="M${cx + 68} ${cy - 58} L${cx + 92} ${cy - 45} L${cx + 48} ${cy + 72} L${cx + 30} ${cy + 88} L${cx + 27} ${cy + 64} Z" fill="${c.paper}" stroke="${c.navy}" stroke-width="2"/>
  `;
}

function projectCard(x, y, title, desc, tags, icon) {
  const tagWidths = tags.map((t) => Math.max(58, t.length * 9 + 22));
  let offset = 0;
  const tagSvg = tags
    .map((tag, i) => {
      const svg = smallTag(x + 26 + offset, y + 326, tag, tagWidths[i]);
      offset += tagWidths[i] + 10;
      return svg;
    })
    .join("");
  return `
    <rect x="${x}" y="${y}" width="386" height="398" rx="10" fill="${c.paper}" stroke="${c.line}"/>
    <rect x="${x}" y="${y}" width="386" height="174" rx="10" fill="${c.blueGray}"/>
    <rect x="${x}" y="${y}" width="386" height="174" rx="10" fill="#f3f0e8" opacity=".55"/>
    <line x1="${x}" y1="${y + 174}" x2="${x + 386}" y2="${y + 174}" stroke="${c.line}"/>
    ${icon}
    ${text(x + 26, y + 226, title, { size: 24, weight: 800 })}
    ${multiline(x + 26, y + 265, desc, { size: 15, fill: c.muted, lineHeight: 25, weight: 500 })}
    ${tagSvg}
  `;
}

function illustrationThumb(x, y, variant) {
  const art = [
    `<path d="M${x + 70} ${y + 108} C${x + 112} ${y + 44}, ${x + 170} ${y + 48}, ${x + 214} ${y + 104}" fill="none" stroke="${c.navy2}" stroke-width="2" stroke-linecap="round"/>
     <ellipse cx="${x + 178}" cy="${y + 112}" rx="58" ry="34" fill="${c.beige}" opacity=".65"/>`,
    `<circle cx="${x + 92}" cy="${y + 94}" r="34" fill="${c.taupe}" opacity=".6"/>
     <ellipse cx="${x + 170}" cy="${y + 60}" rx="44" ry="28" fill="${c.mustard}" opacity=".3"/>
     <path d="M${x + 134} ${y + 130} C${x + 186} ${y + 42}, ${x + 260} ${y + 94}, ${x + 204} ${y + 160} C${x + 170} ${y + 198}, ${x + 128} ${y + 172}, ${x + 134} ${y + 130}Z" fill="none" stroke="${c.navy2}" stroke-width="2"/>`,
    `<circle cx="${x + 216}" cy="${y + 108}" r="42" fill="${c.beige}"/>
     <path d="M${x + 166} ${y + 156} C${x + 140} ${y + 110}, ${x + 148} ${y + 62}, ${x + 174} ${y + 38} C${x + 200} ${y + 66}, ${x + 208} ${y + 108}, ${x + 184} ${y + 156}Z" fill="none" stroke="${c.navy2}" stroke-width="2"/>
     <path d="M${x + 172} ${y + 62} C${x + 120} ${y + 20}, ${x + 78} ${y + 50}, ${x + 72} ${y + 90}" fill="none" stroke="${c.blueGray}" stroke-width="3"/>
     <circle cx="${x + 82}" cy="${y + 82}" r="4" fill="${c.navy2}"/><circle cx="${x + 114}" cy="${y + 54}" r="4" fill="${c.navy2}"/><circle cx="${x + 150}" cy="${y + 48}" r="4" fill="${c.navy2}"/>`,
  ][variant];
  return `
    <rect x="${x}" y="${y}" width="326" height="176" rx="10" fill="${c.paper}" stroke="${c.line}"/>
    ${art}
  `;
}

function heroIllustration() {
  return `
    <g transform="translate(888 168)">
      <rect x="52" y="350" width="310" height="26" rx="13" fill="${c.beige}" opacity=".8"/>
      <rect x="52" y="210" width="258" height="154" rx="18" fill="${c.paper}" stroke="${c.navy}" stroke-width="4"/>
      <line x1="76" y1="252" x2="286" y2="252" stroke="${c.line}" stroke-width="3"/>
      <path d="M98 314 L130 282 L158 304 L198 264 L256 326" fill="none" stroke="${c.mustard}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M360 278 C432 262, 434 354, 360 338" fill="none" stroke="${c.navy}" stroke-width="4"/>
      <rect x="308" y="258" width="74" height="98" rx="14" fill="${c.paper}" stroke="${c.navy}" stroke-width="4"/>
      <circle cx="345" cy="180" r="68" fill="${c.mustard}" opacity=".95"/>
      <g stroke="${c.mustard}" stroke-width="4" stroke-linecap="round">
        <line x1="345" y1="84" x2="345" y2="50"/>
        <line x1="345" y1="276" x2="345" y2="244"/>
        <line x1="249" y1="180" x2="215" y2="180"/>
        <line x1="475" y1="180" x2="443" y2="180"/>
        <line x1="276" y1="111" x2="252" y2="87"/>
        <line x1="414" y1="111" x2="438" y2="87"/>
        <line x1="276" y1="249" x2="252" y2="273"/>
        <line x1="414" y1="249" x2="438" y2="273"/>
      </g>
      <path d="M326 252 C300 284, 288 328, 286 372" fill="none" stroke="${c.navy}" stroke-width="5" stroke-linecap="round"/>
      <path d="M364 252 C392 292, 402 326, 406 372" fill="none" stroke="${c.navy}" stroke-width="5" stroke-linecap="round"/>
      <path d="M306 300 C266 304, 228 324, 190 356" fill="none" stroke="${c.navy}" stroke-width="5" stroke-linecap="round"/>
      <path d="M382 300 C412 305, 438 320, 462 344" fill="none" stroke="${c.navy}" stroke-width="5" stroke-linecap="round"/>
      <g opacity=".72">
        <rect x="404" y="74" width="118" height="78" rx="14" fill="${c.paper}" stroke="${c.line}"/>
        <path d="M430 119 L448 104 L430 89" fill="none" stroke="${c.navy2}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M496 89 L478 104 L496 119" fill="none" stroke="${c.navy2}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="458" y1="126" x2="470" y2="84" stroke="${c.mustard}" stroke-width="3" stroke-linecap="round"/>
      </g>
    </g>
  `;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      @font-face { font-family: 'Noto Sans JP'; src: url('C:/Windows/Fonts/NotoSansJP-VF.ttf'); }
      text { dominant-baseline: alphabetic; }
    </style>
    <pattern id="dotGrid" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="${c.line}" opacity=".75"/>
    </pattern>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#16233f" flood-opacity=".06"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${c.bg}"/>

  <rect x="0" y="0" width="${W}" height="98" fill="${c.paper}"/>
  <line x1="0" y1="98" x2="${W}" y2="98" stroke="${c.line}"/>
  ${text(96, 60, "Manatsu Sawada", { size: 22, weight: 800 })}
  ${text(690, 60, "About", { size: 15, weight: 700 })}
  ${text(790, 60, "Skills", { size: 15, weight: 700 })}
  ${text(888, 60, "Works", { size: 15, weight: 700 })}
  ${text(996, 60, "Illustration", { size: 15, weight: 700 })}
  ${text(1142, 60, "Contact", { size: 15, weight: 700 })}
  <rect x="1264" y="32" width="52" height="34" rx="12" fill="${c.navy}"/>
  ${text(1290, 55, "JP", { size: 13, weight: 800, fill: c.white, anchor: "middle" })}
  ${text(1328, 55, "/", { size: 14, fill: c.muted })}
  ${text(1356, 55, "EN", { size: 13, weight: 800 })}

  <rect x="0" y="98" width="${W}" height="650" fill="${c.bg}"/>
  <rect x="812" y="128" width="520" height="520" fill="url(#dotGrid)" opacity=".7"/>
  <rect x="96" y="592" width="370" height="1" fill="${c.line}"/>
  ${text(96, 244, "Manatsu Sawada", { size: 76, weight: 850, letter: -1 })}
  ${text(100, 310, "Web Learner / Nurse / Illustrator", { size: 25, fill: c.navy2, weight: 700 })}
  ${multiline(100, 378, [
    "看護の経験を活かしながら、Web制作とAIツールを学んでいます。",
    "実用的で、使う人に寄り添うデジタル制作を目指しています。"
  ], { size: 20, fill: c.navy, lineHeight: 36, weight: 500 })}
  <rect x="100" y="486" width="166" height="48" rx="24" fill="${c.navy}"/>
  ${text(183, 518, "Worksを見る", { size: 15, weight: 800, fill: c.white, anchor: "middle" })}
  <rect x="284" y="486" width="150" height="48" rx="24" fill="${c.paper}" stroke="${c.navy}"/>
  ${text(359, 518, "Contact", { size: 15, weight: 800, fill: c.navy, anchor: "middle" })}
  ${iconButton(100, 572, "GitHub", gitMark)}
  ${iconButton(170, 572, "Mail", mailMark)}
  ${iconButton(240, 572, "Wantedly", wantedlyMark)}
  ${heroIllustration()}

  <line x1="0" y1="748" x2="${W}" y2="748" stroke="${c.line}"/>
  ${sectionTitle(850, "About", "PROFILE")}
  <rect x="96" y="930" width="328" height="278" rx="18" fill="${c.paper}" stroke="${c.line}"/>
  <rect x="124" y="958" width="272" height="222" rx="14" fill="${c.bg}"/>
  <path d="M184 1108 C212 1020, 280 996, 340 1064" fill="none" stroke="${c.navy}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="210" cy="1044" r="34" fill="${c.mustard}" opacity=".85"/>
  <path d="M250 1112 L292 1040 L342 1112" fill="none" stroke="${c.navy}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="520" y="926" width="820" height="282" rx="18" fill="${c.paper}" stroke="${c.line}"/>
  ${multiline(564, 992, [
    "看護師としての臨床経験を活かし、人の役に立つ情報や仕組みをWebで届けたいと考えています。",
    "現在はWeb制作とAIツールを学び、実践を重ねながら、わかりやすい制作物づくりに取り組んでいます。"
  ], { size: 18, fill: c.navy, lineHeight: 34, weight: 500 })}
  <line x1="564" y1="1088" x2="1296" y2="1088" stroke="${c.line}"/>
  ${text(564, 1142, "Healthcare", { size: 16, weight: 800 })}
  ${text(724, 1142, "患者さんやチームと丁寧に関わり、相手の状況を考える姿勢を大切にしています。", { size: 16, fill: c.muted, weight: 500 })}
  ${text(564, 1184, "English / AI", { size: 16, weight: 800 })}
  ${text(724, 1184, "英語の情報収集やAIツールを活用しながら、制作と学習を進めています。", { size: 16, fill: c.muted, weight: 500 })}

  <line x1="96" y1="1292" x2="1344" y2="1292" stroke="${c.line}"/>
  ${sectionTitle(1378, "Skills", "TOOLS")}
  ${pill(96, 1444, "HTML", 114)}
  ${pill(230, 1444, "CSS", 102)}
  ${pill(352, 1444, "JavaScript", 164)}
  ${pill(536, 1444, "PHP", 104)}
  ${pill(660, 1444, "GitHub", 128)}
  ${pill(808, 1444, "AI Tools", 138)}
  ${pill(966, 1444, "English", 130)}
  ${pill(1116, 1444, "Healthcare", 164)}

  <line x1="96" y1="1538" x2="1344" y2="1538" stroke="${c.line}"/>
  ${sectionTitle(1624, "Works", "MAIN PORTFOLIO")}
  ${projectCard(96, 1690, "Portfolio Project", ["ポートフォリオサイトを自分で設計・制作しました。", "情報を整理し、読みやすく伝えることを意識しています。"], ["HTML", "CSS", "JavaScript"], codeIcon(289, 1776))}
  ${projectCard(527, 1690, "Web Practice", ["レスポンシブ対応のWebサイトを制作。", "レイアウトやUIの工夫を学習中です。"], ["HTML", "CSS", "JavaScript", "PHP"], responsiveIcon(720, 1776))}
  ${projectCard(958, 1690, "Learning Log", ["学習の記録と気づきをまとめるサイトです。", "継続的なアウトプットで理解を深めています。"], ["HTML", "CSS", "PHP"], logIcon(1151, 1776))}

  <line x1="96" y1="2160" x2="1344" y2="2160" stroke="${c.line}"/>
  ${sectionTitle(2244, "Illustration", "SECONDARY")}
  ${illustrationThumb(96, 2310, 0)}
  ${illustrationThumb(456, 2310, 1)}
  ${illustrationThumb(816, 2310, 2)}
  <rect x="1186" y="2366" width="158" height="60" rx="10" fill="${c.paper}" stroke="${c.navy}"/>
  ${text(1265, 2405, "More →", { size: 17, weight: 800, anchor: "middle" })}

  <line x1="96" y1="2552" x2="1344" y2="2552" stroke="${c.line}"/>
  ${sectionTitle(2636, "Contact", "GET IN TOUCH")}
  <rect x="96" y="2704" width="386" height="78" rx="10" fill="${c.paper}" stroke="${c.line}"/>
  ${mailMark(138, 2743)}
  ${text(184, 2749, "Email", { size: 18, weight: 800 })}
  ${text(438, 2751, "↗", { size: 24, weight: 700, anchor: "middle" })}
  <rect x="527" y="2704" width="386" height="78" rx="10" fill="${c.paper}" stroke="${c.line}"/>
  ${gitMark(569, 2743)}
  ${text(615, 2749, "GitHub", { size: 18, weight: 800 })}
  ${text(869, 2751, "↗", { size: 24, weight: 700, anchor: "middle" })}
  <rect x="958" y="2704" width="386" height="78" rx="10" fill="${c.paper}" stroke="${c.line}"/>
  ${wantedlyMark(1000, 2743)}
  ${text(1046, 2749, "Wantedly", { size: 18, weight: 800 })}
  ${text(1300, 2751, "↗", { size: 24, weight: 700, anchor: "middle" })}

  <rect x="0" y="2810" width="${W}" height="30" fill="${c.navy}"/>
  ${text(W / 2, 2829, "© 2026 Manatsu Sawada", { size: 13, fill: c.white, anchor: "middle", weight: 600 })}
</svg>`;

fs.writeFileSync(svgPath, svg, "utf8");
sharp(Buffer.from(svg))
  .png()
  .toFile(pngPath)
  .then(() => console.log(pngPath));
