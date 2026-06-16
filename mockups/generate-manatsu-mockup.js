const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = path.join(__dirname);
const svgPath = path.join(outDir, "manatsu-portfolio-desktop-mockup.svg");
const pngPath = path.join(outDir, "manatsu-portfolio-desktop-mockup.png");

const W = 1440;
const H = 2968;

const colors = {
  bg: "#fbf8f2",
  panel: "#fffdf8",
  panel2: "#f5efe7",
  text: "#282522",
  muted: "#6f6860",
  line: "#ded7ce",
  accent: "#8c7464",
  blueGray: "#7d8b8f",
  taupe: "#b9a99c",
};

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function text(x, y, content, opts = {}) {
  const {
    size = 24,
    family = "Noto Sans JP",
    weight = 400,
    fill = colors.text,
    anchor = "start",
    letter = 0,
    opacity = 1,
  } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${letter}" opacity="${opacity}">${esc(content)}</text>`;
}

function lines(x, y, items, opts = {}) {
  const lineHeight = opts.lineHeight ?? 34;
  return items
    .map((item, index) => text(x, y + index * lineHeight, item, opts))
    .join("");
}

function sectionTitle(y, title, note = "") {
  return `
    ${text(92, y, title, { size: 38, family: "Noto Serif JP", weight: 500 })}
    <line x1="92" y1="${y + 24}" x2="132" y2="${y + 24}" stroke="${colors.accent}" stroke-width="2"/>
    ${note ? text(92, y + 54, note, { size: 12, fill: colors.muted, letter: 2.4, weight: 600 }) : ""}
  `;
}

function tag(x, y, label, width = null) {
  const tagWidth = width ?? Math.max(84, label.length * 13 + 34);
  return `
    <rect x="${x}" y="${y}" width="${tagWidth}" height="42" rx="21" fill="${colors.panel}" stroke="${colors.line}"/>
    ${text(x + tagWidth / 2, y + 27, label, { size: 18, anchor: "middle", fill: colors.text })}
  `;
}

function smallTag(x, y, label, width = null) {
  const tagWidth = width ?? Math.max(66, label.length * 10 + 24);
  return `
    <rect x="${x}" y="${y}" width="${tagWidth}" height="30" rx="6" fill="#fbf8f2" stroke="${colors.line}"/>
    ${text(x + tagWidth / 2, y + 20, label, { size: 13, anchor: "middle", fill: colors.muted })}
  `;
}

function projectCard(x, y, title, desc, tags, icon) {
  let offset = 0;
  const tagSvg = tags
    .map((t) => {
      const w = Math.max(66, t.length * 10 + 24);
      const svg = smallTag(x + 28 + offset, y + 338, t, w);
      offset += w + 12;
      return svg;
    })
    .join("");
  return `
    <rect x="${x}" y="${y}" width="384" height="410" rx="8" fill="${colors.panel}" stroke="${colors.line}"/>
    <rect x="${x}" y="${y}" width="384" height="190" rx="8" fill="#f2ede6"/>
    <line x1="${x}" y1="${y + 190}" x2="${x + 384}" y2="${y + 190}" stroke="${colors.line}"/>
    ${icon}
    ${text(x + 28, y + 240, title, { size: 26, family: "Noto Serif JP", weight: 500 })}
    ${lines(x + 28, y + 282, desc, { size: 15, fill: colors.muted, lineHeight: 27 })}
    ${tagSvg}
  `;
}

function browserIcon(cx, cy) {
  return `
    <rect x="${cx - 92}" y="${cy - 54}" width="184" height="112" rx="4" fill="none" stroke="${colors.accent}" stroke-width="2"/>
    <line x1="${cx - 92}" y1="${cy - 25}" x2="${cx + 92}" y2="${cy - 25}" stroke="${colors.accent}" stroke-width="2"/>
    <circle cx="${cx - 70}" cy="${cy - 40}" r="3" fill="${colors.accent}"/>
    <circle cx="${cx - 56}" cy="${cy - 40}" r="3" fill="${colors.accent}"/>
    <circle cx="${cx - 42}" cy="${cy - 40}" r="3" fill="${colors.accent}"/>
    <rect x="${cx - 62}" y="${cy - 2}" width="58" height="42" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
    <path d="M${cx - 55} ${cy + 30} L${cx - 38} ${cy + 11} L${cx - 24} ${cy + 24} L${cx - 8} ${cy + 5} L${cx + 12} ${cy + 38}" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
    <line x1="${cx + 28}" y1="${cy + 5}" x2="${cx + 66}" y2="${cy + 5}" stroke="${colors.taupe}" stroke-width="2"/>
    <line x1="${cx + 28}" y1="${cy + 28}" x2="${cx + 66}" y2="${cy + 28}" stroke="${colors.taupe}" stroke-width="2"/>
  `;
}

function deviceIcon(cx, cy) {
  return `
    <rect x="${cx - 75}" y="${cy - 68}" width="142" height="104" rx="8" fill="none" stroke="${colors.accent}" stroke-width="2"/>
    <line x1="${cx - 28}" y1="${cy + 48}" x2="${cx + 20}" y2="${cy + 48}" stroke="${colors.accent}" stroke-width="2"/>
    <line x1="${cx - 8}" y1="${cy + 36}" x2="${cx - 8}" y2="${cy + 48}" stroke="${colors.accent}" stroke-width="2"/>
    <rect x="${cx + 62}" y="${cy - 18}" width="50" height="88" rx="8" fill="none" stroke="${colors.accent}" stroke-width="2"/>
    <circle cx="${cx + 87}" cy="${cy + 60}" r="2.5" fill="${colors.accent}"/>
  `;
}

function notebookIcon(cx, cy) {
  return `
    <rect x="${cx - 48}" y="${cy - 74}" width="92" height="134" rx="6" fill="none" stroke="${colors.accent}" stroke-width="2"/>
    <line x1="${cx - 34}" y1="${cy - 60}" x2="${cx - 58}" y2="${cy - 60}" stroke="${colors.accent}" stroke-width="2"/>
    <line x1="${cx - 34}" y1="${cy - 34}" x2="${cx - 58}" y2="${cy - 34}" stroke="${colors.accent}" stroke-width="2"/>
    <line x1="${cx - 34}" y1="${cy - 8}" x2="${cx - 58}" y2="${cy - 8}" stroke="${colors.accent}" stroke-width="2"/>
    <line x1="${cx - 34}" y1="${cy + 18}" x2="${cx - 58}" y2="${cy + 18}" stroke="${colors.accent}" stroke-width="2"/>
    <path d="M${cx + 74} ${cy - 62} L${cx + 100} ${cy - 50} L${cx + 58} ${cy + 58} L${cx + 37} ${cy + 78} L${cx + 35} ${cy + 48} Z" fill="none" stroke="${colors.accent}" stroke-width="2"/>
  `;
}

function illustrationThumb(x, y, variant) {
  const drawings = [
    `<path d="M${x + 80} ${y + 110} C${x + 128} ${y + 42}, ${x + 162} ${y + 50}, ${x + 202} ${y + 116}" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
     <path d="M${x + 115} ${y + 85} C${x + 92} ${y + 70}, ${x + 90} ${y + 48}, ${x + 117} ${y + 58}" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
     <path d="M${x + 142} ${y + 76} C${x + 164} ${y + 57}, ${x + 186} ${y + 63}, ${x + 170} ${y + 88}" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
     <ellipse cx="${x + 178}" cy="${y + 110}" rx="56" ry="38" fill="#e9ded3" opacity=".55"/>`,
    `<ellipse cx="${x + 96}" cy="${y + 95}" rx="44" ry="38" fill="#cfc6bc"/>
     <ellipse cx="${x + 176}" cy="${y + 56}" rx="44" ry="28" fill="#e7ddd2"/>
     <path d="M${x + 132} ${y + 128} C${x + 196} ${y + 38}, ${x + 270} ${y + 78}, ${x + 220} ${y + 150} C${x + 190} ${y + 190}, ${x + 134} ${y + 176}, ${x + 132} ${y + 128} Z" fill="none" stroke="${colors.taupe}" stroke-width="2"/>`,
    `<path d="M${x + 170} ${y + 146} C${x + 146} ${y + 102}, ${x + 154} ${y + 60}, ${x + 178} ${y + 35} C${x + 202} ${y + 62}, ${x + 210} ${y + 104}, ${x + 186} ${y + 146} Z" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
     <path d="M${x + 178} ${y + 58} C${x + 122} ${y + 20}, ${x + 96} ${y + 50}, ${x + 86} ${y + 82}" fill="none" stroke="${colors.blueGray}" stroke-width="2"/>
     <circle cx="${x + 94}" cy="${y + 78}" r="4" fill="${colors.blueGray}"/>
     <circle cx="${x + 116}" cy="${y + 54}" r="4" fill="${colors.blueGray}"/>
     <circle cx="${x + 144}" cy="${y + 44}" r="4" fill="${colors.blueGray}"/>
     <circle cx="${x + 230}" cy="${y + 96}" r="42" fill="#e5d9cd"/>`,
  ];
  return `
    <rect x="${x}" y="${y}" width="326" height="178" rx="8" fill="${colors.panel}" stroke="${colors.line}"/>
    ${drawings[variant]}
  `;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      @font-face { font-family: 'Noto Sans JP'; src: url('C:/Windows/Fonts/NotoSansJP-VF.ttf'); }
      @font-face { font-family: 'Noto Serif JP'; src: url('C:/Windows/Fonts/NotoSerifJP-VF.ttf'); }
      text { dominant-baseline: alphabetic; }
    </style>
    <linearGradient id="heroWash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffdf9"/>
      <stop offset="1" stop-color="#f2ebe2"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#8c7464" flood-opacity=".08"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${colors.bg}"/>

  <rect x="0" y="0" width="${W}" height="116" fill="rgba(255,253,248,.95)"/>
  <line x1="0" y1="116" x2="${W}" y2="116" stroke="${colors.line}"/>
  ${text(92, 72, "Manatsu Sawada", { size: 27, family: "Noto Serif JP", weight: 500 })}
  ${text(675, 72, "About", { size: 16, fill: colors.text })}
  ${text(775, 72, "Skills", { size: 16, fill: colors.text })}
  ${text(873, 72, "Works", { size: 16, fill: colors.text })}
  ${text(981, 72, "Illustration", { size: 16, fill: colors.text })}
  ${text(1120, 72, "Contact", { size: 16, fill: colors.text })}
  <rect x="1260" y="43" width="52" height="38" rx="10" fill="#eee7df"/>
  ${text(1286, 68, "JP", { size: 15, anchor: "middle", fill: colors.text, weight: 600 })}
  ${text(1324, 68, "/", { size: 18, fill: colors.muted })}
  ${text(1350, 68, "EN", { size: 15, fill: colors.text })}

  <rect x="0" y="116" width="${W}" height="620" fill="url(#heroWash)"/>
  <path d="M0 116 C180 210, 200 548, 0 736 Z" fill="#ffffff" opacity=".48"/>
  <circle cx="1148" cy="328" r="190" fill="#e9ded3" opacity=".36"/>
  <rect x="860" y="388" width="245" height="152" rx="10" fill="#cfc6bc" opacity=".72" transform="skewY(6)"/>
  <rect x="872" y="396" width="220" height="134" rx="8" fill="#bfb5aa" opacity=".55" transform="skewY(6)"/>
  <ellipse cx="1180" cy="550" rx="210" ry="20" fill="#d9cec3" opacity=".52"/>
  <rect x="1168" y="415" width="55" height="118" rx="22" fill="none" stroke="${colors.taupe}" stroke-width="3"/>
  <path d="M1196 414 C1168 302, 1098 238, 1062 180 M1196 414 C1218 300, 1284 238, 1322 178 M1196 414 C1198 286, 1192 214, 1182 160" fill="none" stroke="${colors.taupe}" stroke-width="2" opacity=".75"/>
  <g fill="${colors.taupe}" opacity=".78">
    <circle cx="1062" cy="180" r="4"/><circle cx="1090" cy="214" r="4"/><circle cx="1128" cy="246" r="4"/>
    <circle cx="1322" cy="178" r="4"/><circle cx="1284" cy="238" r="4"/><circle cx="1244" cy="266" r="4"/>
    <circle cx="1182" cy="160" r="4"/><circle cx="1204" cy="230" r="4"/><circle cx="1190" cy="292" r="4"/>
  </g>
  <rect x="1228" y="448" width="96" height="78" rx="16" fill="#ffffff" stroke="${colors.line}"/>
  <path d="M1323 468 C1372 466, 1367 516, 1323 510" fill="none" stroke="${colors.taupe}" stroke-width="3"/>

  ${text(92, 330, "Manatsu Sawada", { size: 84, family: "Noto Serif JP", weight: 500 })}
  ${text(96, 412, "Web Learner / Nurse / Illustrator", { size: 30, fill: colors.accent, weight: 400 })}
  ${lines(96, 474, ["看護の経験を活かしながら、Web制作とAIツールを学んでいます。", "実用的で、使う人に寄り添うデジタル制作を目指しています。"], { size: 22, fill: colors.text, lineHeight: 40 })}
  <rect x="96" y="588" width="172" height="44" rx="22" fill="${colors.text}"/>
  ${text(182, 617, "Worksを見る", { size: 16, fill: "#ffffff", anchor: "middle", weight: 500 })}
  <rect x="282" y="588" width="174" height="44" rx="22" fill="none" stroke="${colors.accent}"/>
  ${text(369, 617, "Contact", { size: 16, fill: colors.accent, anchor: "middle", weight: 500 })}

  <line x1="0" y1="736" x2="${W}" y2="736" stroke="${colors.line}"/>

  ${sectionTitle(830, "About", "PROFILE")}
  <circle cx="279" cy="1036" r="150" fill="#efe8df"/>
  <circle cx="279" cy="1036" r="150" fill="#fffdf8" opacity=".52"/>
  <path d="M276 1100 C244 1040, 247 990, 282 940 C320 986, 324 1040, 292 1100 Z" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
  <path d="M280 965 C228 910, 184 938, 166 990 M282 965 C340 914, 384 944, 398 1000" fill="none" stroke="${colors.taupe}" stroke-width="2"/>
  <g fill="${colors.taupe}"><circle cx="166" cy="990" r="5"/><circle cx="202" cy="952" r="5"/><circle cx="398" cy="1000" r="5"/><circle cx="360" cy="956" r="5"/></g>

  ${lines(520, 910, ["看護師としての臨床経験を活かし、人の役に立つ情報や仕組みを", "Webで届けたいと考えています。現在はWeb制作とAIツールを学び、", "実践を重ねながら、わかりやすい制作物づくりに取り組んでいます。"], { size: 20, fill: colors.text, lineHeight: 36 })}
  <line x1="520" y1="1042" x2="1320" y2="1042" stroke="${colors.line}"/>
  ${text(572, 1104, "Healthcare Background", { size: 17, fill: colors.muted, weight: 500 })}
  ${text(812, 1090, "看護師として患者さんやチームと丁寧に関わり、", { size: 18, fill: colors.text })}
  ${text(812, 1122, "相手の状況を考える姿勢を大切にしてきました。", { size: 18, fill: colors.text })}
  <line x1="520" y1="1160" x2="1320" y2="1160" stroke="${colors.line}"/>
  ${text(572, 1222, "English Ability", { size: 17, fill: colors.muted, weight: 500 })}
  ${text(812, 1208, "日常会話・読み書きが可能です。", { size: 18, fill: colors.text })}
  ${text(812, 1240, "海外の情報やドキュメントも積極的に活用しています。", { size: 18, fill: colors.text })}
  <line x1="520" y1="1278" x2="1320" y2="1278" stroke="${colors.line}"/>
  ${text(572, 1340, "Learning Now", { size: 17, fill: colors.muted, weight: 500 })}
  ${text(812, 1326, "HTML / CSS / JavaScript / PHP などのWeb制作と、", { size: 18, fill: colors.text })}
  ${text(812, 1358, "AIツールの活用スキルを学んでいます。", { size: 18, fill: colors.text })}

  <line x1="92" y1="1430" x2="1348" y2="1430" stroke="${colors.line}"/>
  ${sectionTitle(1496, "Skills")}
  ${tag(92, 1542, "HTML", 132)}
  ${tag(248, 1542, "CSS", 118)}
  ${tag(390, 1542, "JavaScript", 172)}
  ${tag(586, 1542, "PHP", 118)}
  ${tag(728, 1542, "GitHub", 142)}
  ${tag(894, 1542, "AI Tools", 152)}
  ${tag(1070, 1542, "English", 150)}
  ${tag(1244, 1542, "Healthcare", 168)}

  <line x1="92" y1="1648" x2="1348" y2="1648" stroke="${colors.line}"/>
  ${sectionTitle(1714, "Works", "MAIN PORTFOLIO")}
  ${projectCard(92, 1770, "Portfolio Project", ["ポートフォリオサイトを自分で設計・制作しました。", "情報を整理し、読みやすく伝えることを意識しています。"], ["HTML", "CSS", "JavaScript"], browserIcon(284, 1860))}
  ${projectCard(528, 1770, "Web Practice", ["レスポンシブ対応のコーポレートサイトを制作。", "レイアウトやUIの工夫、スムーズな動きを学習中です。"], ["HTML", "CSS", "JavaScript", "PHP"], deviceIcon(720, 1860))}
  ${projectCard(964, 1770, "Learning Log", ["学習の記録と気づきをまとめたブログサイトです。", "継続的にアウトプットし、理解を深めることを目指しています。"], ["HTML", "CSS", "PHP"], notebookIcon(1156, 1860))}

  <line x1="92" y1="2228" x2="1348" y2="2228" stroke="${colors.line}" opacity=".0"/>
</svg>`;

const lowerSvg = svg.replace(
  '<line x1="92" y1="2228" x2="1348" y2="2228" stroke="#ded7ce" opacity=".0"/>',
  `
  <line x1="92" y1="2228" x2="1348" y2="2228" stroke="${colors.line}"/>
  ${sectionTitle(2294, "Illustration", "SECONDARY GALLERY")}
  `
);

const finalSvg = lowerSvg.replace(
  `</svg>`,
  `
  ${illustrationThumb(92, 2350, 0)}
  ${illustrationThumb(452, 2350, 1)}
  ${illustrationThumb(812, 2350, 2)}
  <rect x="1176" y="2417" width="170" height="62" rx="8" fill="${colors.panel}" stroke="${colors.accent}"/>
  ${text(1261, 2457, "More  →", { size: 18, fill: colors.text, anchor: "middle" })}

  <line x1="92" y1="2586" x2="1348" y2="2586" stroke="${colors.line}"/>
  ${sectionTitle(2652, "Contact", "GET IN TOUCH")}
  <rect x="92" y="2708" width="384" height="86" rx="8" fill="${colors.panel}" stroke="${colors.line}"/>
  ${text(160, 2762, "Email", { size: 19, weight: 600 })}
  ${text(430, 2762, "↗", { size: 24, fill: colors.text, anchor: "middle" })}
  <rect x="528" y="2708" width="384" height="86" rx="8" fill="${colors.panel}" stroke="${colors.line}"/>
  ${text(596, 2762, "GitHub", { size: 19, weight: 600 })}
  ${text(866, 2762, "↗", { size: 24, fill: colors.text, anchor: "middle" })}
  <rect x="964" y="2708" width="384" height="86" rx="8" fill="${colors.panel}" stroke="${colors.line}"/>
  ${text(1032, 2762, "Wantedly", { size: 19, weight: 600 })}
  ${text(1302, 2762, "↗", { size: 24, fill: colors.text, anchor: "middle" })}
  <rect x="0" y="2878" width="${W}" height="90" fill="#f4eee6"/>
  ${text(W / 2, 2932, "© 2026 Manatsu Sawada", { size: 16, fill: colors.muted, anchor: "middle" })}
  </svg>`
);

fs.writeFileSync(svgPath, finalSvg, "utf8");

sharp(Buffer.from(finalSvg)).png().toFile(pngPath).then(() => {
  console.log(pngPath);
});
