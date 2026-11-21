const app = document.querySelector("#app");
const viewer = document.querySelector("#viewer");
const viewport = document.querySelector("#viewport");
const viewerImage = document.querySelector("#viewer-image");
const storageKey = "digital-electronics.wrong.v1";
const types = ["选择题", "填空题", "简答题"];
const modes = { practice: "顺序刷题", review: "错题回顾" };
const chapterName = number => `第 ${number} 章 ${chapters[number - 1]}`;
const ordered = chapters.map((_, index) => types.flatMap(type => questions
  .filter(q => q.chapter === index + 1 && q.type === type))
  .map((q, i) => ({ ...q, number: i + 1 })));
let wrong = new Set();
let storageIssue = false;
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(stored)) wrong = new Set(stored.filter(id => typeof id === "string"));
} catch {
  storageIssue = true;
}

function saveResult(id, isCorrect) {
  if (isCorrect) wrong.delete(id);
  else wrong.add(id);
  try {
    localStorage.setItem(storageKey, JSON.stringify([...wrong]));
  } catch {
    storageIssue = true;
  }
}

function inMode(number, mode) {
  const all = ordered[number - 1] || [];
  return mode === "review" ? all.filter(q => wrong.has(q.id)) : all;
}

const route = (mode, chapter, id) => "#" + [mode, chapter, id].filter(Boolean).join("/");
const backLink = (href, label) => `<a class="back" href="${href}">‹ ${label}</a>`;
const notice = () => storageIssue ? '<p class="note">浏览器存储不可用，错题记录可能无法在关闭后保留。</p>' : "";
const paperCount = new Set(questions.map(q => q.paper)).size;

function render() {
  const [mode, rawChapter, id] = location.hash.slice(1).split("/");
  const chapter = Number(rawChapter);
  window.scrollTo(0, 0);
  if (!Object.hasOwn(modes, mode)) {
    app.innerHTML = `<div class="cover"><h1>数字电子技术题库</h1><p>${paperCount} 套 · ${questions.length} 道题</p></div>
      <div class="modes"><a class="mode" href="#practice"><strong>顺序刷题</strong><span class="meta">按章节和题型练习</span></a>
      <a class="mode" href="#review"><strong>错题回顾</strong><span class="meta">${questions.filter(q => wrong.has(q.id)).length} 道错题</span></a></div>${notice()}`;
    return;
  }
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > chapters.length) {
    const rows = chapters.map((_, i) => {
      const count = inMode(i + 1, mode).length;
      if (!count) return "";
      return `<a class="row" href="${route(mode, i + 1)}"><strong>${chapterName(i + 1)}</strong><span class="meta">${count} 题 ›</span></a>`;
    }).join("");
    app.innerHTML = `${backLink("#", "首页")}<h1>${modes[mode]}</h1>
      ${rows ? `<div class="rows">${rows}</div>` : '<p class="empty">还没有错题。</p>'}${notice()}`;
    return;
  }
  const list = inMode(chapter, mode);
  const q = list.find(item => item.id === id);
  if (!q) {
    const groups = types.map(type => {
      const matches = list.filter(item => item.type === type);
      if (!matches.length) return "";
      return `<section class="group"><h2>${type}</h2><div class="rows">${matches.map(item =>
        `<a class="row" href="${route(mode, chapter, item.id)}"><strong>第 ${item.number} 题</strong><span class="meta">（${item.page}页） ›</span></a>`
      ).join("")}</div></section>`;
    }).join("");
    app.innerHTML = `${backLink(route(mode), modes[mode])}<h1>${chapterName(chapter)}</h1>
      ${groups || `<p class="empty">${mode === "review" ? "本章没有错题。" : "本章暂无题目。"}</p>`}${notice()}`;
    return;
  }
  renderQuestion(q, list, mode);
}

function renderQuestion(q, list, mode) {
  const multipleChoice = q.type === "选择题";
  const multipleAnswers = multipleChoice && Array.isArray(q.answer);
  const keys = multipleAnswers ? q.answer : [q.answer];
  const autoGrade = multipleChoice && keys.length > 0 && keys.every(key => choices.includes(key));
  const index = list.indexOf(q);
  const adjacent = (offset, label) => list[index + offset]
    ? `<a class="button" href="${route(mode, q.chapter, list[index + offset].id)}">${label}</a>`
    : `<a class="button" href="${route(mode, q.chapter)}">返回题目列表</a>`;
  const answer = autoGrade ? keys.map(key => `${key}. ${q.options[choices.indexOf(key)]}`).join("<br>") : q.answerText ?? q.answer;
  const scanPages = q.scans ?? (q.image ? [q.page] : []);
  const scanLinks = scanPages.map(page =>
    `<a target="_blank" rel="noopener" href="https://chatgpt.com/library?file_id=${originalScans[page]}&amp;account_id=personal">核对第 ${page} 页原图</a>`
  ).join("　");
  app.innerHTML = `${backLink(route(mode, q.chapter), "返回本章")}
    <article class="card"><header class="question-head"><strong>${chapterName(q.chapter)}</strong><span class="meta">${q.type}</span></header>
    <div class="prompt"><span class="qnumber">${q.number}.（${q.page}页）</span>${q.prompt}</div>
    ${q.promptMedia ? `<img class="zoomable" src="${q.promptMedia}" alt="第 ${q.page} 页辅助配图">` : ""}
    ${q.image ? `<img class="zoomable" src="${q.image}" alt="第 ${q.page} 页题目配图">` : ""}
    ${scanLinks ? `<p class="meta">${scanLinks}</p>` : ""}
    ${multipleChoice ? `<form id="choice-form"><div class="options">${q.options.map((option, i) =>
      `<label class="option"><input ${multipleAnswers ? 'type="checkbox"' : 'required type="radio"'} name="option" value="${choices[i]}"><span>${choices[i]}. ${option}</span></label>`
    ).join("")}</div><button type="${autoGrade ? "submit" : "button"}" ${autoGrade ? "" : 'id="reveal"'} class="button primary">${autoGrade ? "提交答案" : "查看解析"}</button></form>`
    : '<div class="actions"><button id="reveal" class="button primary" type="button">查看答案</button></div>'}
    <div class="result" id="result" hidden>
      <p class="status" id="feedback" role="status"></p>
      <section><h2>答案</h2><div>${answer}</div></section>
      ${q.explanation ? `<section><h2>解析</h2><div>${q.explanation}</div></section>` : ""}
      ${q.note ? `<p class="note">${q.note}</p>` : ""}
      ${multipleChoice ? "" : '<div class="actions" id="mark"><button class="button primary" type="button" data-correct="true">标为正确</button><button class="button" type="button" data-correct="false">标为错误</button></div>'}
    </div><div id="storage-note">${notice()}</div></article>
    <nav class="pager" aria-label="题目导航">${index ? adjacent(-1, "上一题") : "<span></span>"}${adjacent(1, "下一题")}</nav>`;
  const result = document.querySelector("#result");
  const feedback = document.querySelector("#feedback");
  const report = correct => {
    const wasWrong = wrong.has(q.id);
    saveResult(q.id, correct);
    feedback.classList.toggle("wrong", !correct);
    feedback.textContent = correct ? (wasWrong ? "答对了，已移出错题。" : "答对了。") : "答错了，已记入错题。";
    document.querySelector("#storage-note").innerHTML = notice();
    result.hidden = false;
  };
  if (autoGrade) {
    document.querySelector("#choice-form").addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const selected = new FormData(form).getAll("option");
      if (selected.length === 0) return;
      form.querySelectorAll("input, button").forEach(control => control.disabled = true);
      report(selected.length === keys.length && keys.every(key => selected.includes(key)));
    });
  } else {
    document.querySelector("#reveal").addEventListener("click", event => {
      result.hidden = false;
      event.currentTarget.disabled = true;
    });
    document.querySelectorAll("#mark button").forEach(button => button.addEventListener("click", () => {
      report(button.dataset.correct === "true");
      document.querySelectorAll("#mark button").forEach(control => control.disabled = true);
    }));
  }
  document.querySelectorAll("img.zoomable").forEach(img => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "media";
    img.replaceWith(button);
    button.append(img, Object.assign(document.createElement("span"), { textContent: "查看大图" }));
    button.addEventListener("click", () => openImage(img));
  });
}

let zoom = 1;
const smaller = document.querySelector("#smaller");
const larger = document.querySelector("#larger");
function resizeImage(value) {
  zoom = Math.max(1, Math.min(4, value));
  viewerImage.style.width = `${viewport.clientWidth * zoom}px`;
  smaller.disabled = zoom === 1;
  larger.disabled = zoom === 4;
}
function openImage(img) {
  viewerImage.src = img.src;
  viewerImage.alt = img.alt;
  viewer.showModal();
  resizeImage(1);
  viewport.scrollTo(0, 0);
}
smaller.addEventListener("click", () => resizeImage(zoom - .5));
larger.addEventListener("click", () => resizeImage(zoom + .5));
document.querySelector("#close-viewer").addEventListener("click", () => viewer.close());
window.addEventListener("resize", () => { if (viewer.open) resizeImage(zoom); });
window.addEventListener("hashchange", render);
render();
