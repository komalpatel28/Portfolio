/* ===== Edit your content here ===== */

const CONTACT_EMAIL = "komalpatel0728@gmail.com";

const PROJECTS = [
  {
    title: "Job Application Tracker",
    type: "Web app",
    desc: "A Kanban board to track job applications across countries, with drag and drop, search and filters.",
    situation: "Applying to jobs in several countries made it hard to keep track of every application.",
    action: "Built a board in plain JavaScript with drag and drop, a country filter, search and notes, and saved data with localStorage.",
    result: "Applications stay saved after a refresh, and the layout works on both mobile and desktop.",
    live: " https://komalpatel28.github.io/Job-Tracker/",
    code: "https://github.com/komalpatel28/Job-Tracker",
    tags: ["JavaScript", "HTML5", "CSS3", "localStorage"],
  },
  {
    title: "Weather Dashboard",
    type: "API + charts",
    desc: "Search any city to see the current weather and a 5-day temperature forecast chart.",
    situation: "Raw weather data is hard to read quickly, so it needed a clear visual layout.",
    action: "Fetched live data from the Open-Meteo API with async/await, drew a line chart with Chart.js, and handled loading and error states.",
    result: "Shows current conditions and a 5-day forecast for any city, with a clear message when a city is not found.",
    live: " https://komalpatel28.github.io/Weather-Dashboard/",
    code: "https://github.com/komalpatel28/Weather-Dashboard",
    tags: ["JavaScript", "Chart.js", "REST API", "async/await"],
  },
  {
    title: "Resume Builder",
    type: "Tool",
    desc: "Fill in a form, watch the resume update live, and download it as a PDF.",
    situation: "Different countries expect different resume formats, and editing them by hand is slow.",
    action: "Built a form with live preview, two templates (Canada ATS and Switzerland EU CV), auto-save and print-to-PDF styling.",
    result: "The resume updates as you type, switches templates in one click, and exports a clean PDF.",
    live: " https://komalpatel28.github.io/Resume-Builder/",
    code: "https://github.com/komalpatel28/Resume-Builder",
    tags: ["JavaScript", "Print CSS", "Responsive UI"],
  },
];

// Only add skills you can talk about in an interview.
const SKILLS_USED = ["HTML5", "CSS3 (Grid & Flexbox)", "JavaScript (ES6+)", "DOM & Events", "Fetch / REST APIs", "localStorage", "Chart.js", "Responsive Design", "Git & GitHub"];
const SKILLS_NEXT = ["React", "Tailwind CSS", "TypeScript", "Testing basics"];

// Add a resume only after you have saved its PDF in the "resumes" folder.
const RESUMES = [
  { label: "Canada (ATS format)", file: "resumes/Komal-Patel-Canada.pdf" },
  { label: "Switzerland (EU CV)", file: "resumes/Komal-Patel-Switzerland.pdf" },
];

const REGIONS = [
  {
    id: "canada", label: "Canada",
    title: "Canada", badge: "Clean code and clear impact",
    text: "Canadian employers usually run applicant tracking systems, so I use a simple one-column resume, clear section names and project results written in plain words.",
    tip: "Focus: semantic HTML, accessibility, responsive layouts and a link to live projects.",
  },
  {
    id: "switzerland", label: "Switzerland",
    title: "Switzerland", badge: "Precision and detail",
    text: "Swiss and European CVs are more detailed and structured. I add personal details, work permit status and clear dates, and show polished, careful UI work.",
    tip: "Focus: pixel-level care, maintainable code and well-organised projects.",
  },
  {
    id: "gulf", label: "UAE / Saudi Arabia",
    title: "UAE and Saudi Arabia", badge: "Speed and delivery",
    text: "Gulf recruiters often value quick delivery and clear availability. I keep the CV short, highlight what I can build fast and state my notice period.",
    tip: "Focus: quick prototypes, API integration and a short, direct CV.",
  },
  {
    id: "korea", label: "South Korea",
    title: "South Korea", badge: "Fundamentals and details",
    text: "Korean tech teams look for strong fundamentals and careful execution. I show clean JavaScript, cross-browser checks and neat, consistent styling.",
    tip: "Focus: JavaScript basics, tidy CSS and working demos.",
  },
  {
    id: "india", label: "India",
    title: "India", badge: "Versatility and growth",
    text: "The Indian market is large and competitive for freshers. I lead with projects, keep the resume to one page and show how fast I learn new tools.",
    tip: "Focus: hands-on projects, problem solving and a one-page resume.",
  },
];

/* ===== Helpers ===== */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function safeUrl(url) {
  try {
    const u = new URL(url, location.href);
    return ["http:", "https:"].includes(u.protocol) ? url : "#";
  } catch { return "#"; }
}

/* ===== Theme ===== */

const root = document.documentElement;
const themeBtn = document.getElementById("theme-btn");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0b1020" : "#f8fafc");
}

(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch {}
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(saved || (prefersLight ? "light" : "dark"));
})();

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch {}
});

/* ===== Mobile menu ===== */

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ===== Projects ===== */

function renderProjects() {
  const grid = document.getElementById("project-grid");
  grid.replaceChildren(
    ...PROJECTS.map((p) => {
      const card = el("article", "project reveal");
      const top = el("div");
      top.append(el("span", "type", p.type), el("h3", "", p.title), el("p", "desc", p.desc));

      const star = el("div", "star");
      [["Situation", p.situation], ["Action", p.action], ["Result", p.result]].forEach(([k, v]) => {
        const row = el("p");
        row.append(el("strong", "", k + ": "), document.createTextNode(v));
        star.append(row);
      });
      top.append(star);

      const bottom = el("div");
      const links = el("div", "links");
      const live = el("a", "btn btn-small", "Live demo");
      live.href = safeUrl(p.live); live.target = "_blank"; live.rel = "noreferrer";
      live.setAttribute("aria-label", `${p.title}: live demo`);
      const code = el("a", "btn btn-small btn-ghost", "Source code");
      code.href = safeUrl(p.code); code.target = "_blank"; code.rel = "noreferrer";
      code.setAttribute("aria-label", `${p.title}: source code on GitHub`);
      links.append(live, code);

      const tags = el("ul", "tags");
      p.tags.forEach((t) => tags.append(el("li", "", t)));
      bottom.append(links, tags);

      card.append(top, bottom);
      return card;
    })
  );
}

/* ===== Skills ===== */

function renderSkills() {
  document.getElementById("skills-used").replaceChildren(...SKILLS_USED.map((s) => el("li", "", s)));
  document.getElementById("skills-next").replaceChildren(...SKILLS_NEXT.map((s) => el("li", "", s)));
}

/* ===== Region tabs (keyboard accessible) ===== */

function renderRegions() {
  const list = document.getElementById("region-tabs");
  const panel = document.getElementById("region-panel");
  const tabs = [];

  function select(index, focus) {
    const r = REGIONS[index];
    tabs.forEach((t, i) => {
      t.setAttribute("aria-selected", String(i === index));
      t.tabIndex = i === index ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", `tab-${r.id}`);
    panel.id = "region-panel";
    const tip = el("div", "tip");
    tip.append(el("strong", "", "Key focus: "), document.createTextNode(r.tip.replace(/^Focus:\s*/, "")));
    panel.replaceChildren(el("h3", "", r.title), el("span", "badge", r.badge), el("p", "", r.text), tip);
    if (focus) tabs[index].focus();
  }

  REGIONS.forEach((r, i) => {
    const btn = el("button", "tab", r.label);
    btn.type = "button";
    btn.id = `tab-${r.id}`;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-controls", "region-panel");
    btn.addEventListener("click", () => select(i, false));
    btn.addEventListener("keydown", (e) => {
      let n = null;
      if (e.key === "ArrowRight") n = (i + 1) % REGIONS.length;
      if (e.key === "ArrowLeft") n = (i - 1 + REGIONS.length) % REGIONS.length;
      if (e.key === "Home") n = 0;
      if (e.key === "End") n = REGIONS.length - 1;
      if (n !== null) { e.preventDefault(); select(n, true); }
    });
    tabs.push(btn);
    list.append(btn);
  });
  select(0, false);
}

/* ===== Resume downloads ===== */

function renderResumes() {
  if (!RESUMES.length) return;
  const links = document.getElementById("resume-links");
  RESUMES.forEach((r) => {
    const a = el("a", "btn btn-small btn-ghost", r.label);
    a.href = r.file;
    a.setAttribute("download", "");
    links.append(a);
  });
  document.getElementById("resume-box").hidden = false;
}

/* ===== Contact form (opens the visitor's email app) ===== */

function openMail(url) { window.location.href = url; }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("cf-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cf-name");
  const email = document.getElementById("cf-email");
  const subject = document.getElementById("cf-subject");
  const message = document.getElementById("cf-message");

  [name, email, message].forEach((f) => f.classList.remove("invalid"));
  const problems = [];
  if (!name.value.trim()) { name.classList.add("invalid"); problems.push("your name"); }
  if (!EMAIL_RE.test(email.value.trim())) { email.classList.add("invalid"); problems.push("a valid email"); }
  if (!message.value.trim()) { message.classList.add("invalid"); problems.push("a message"); }

  if (problems.length) {
    statusEl.classList.add("error");
    statusEl.textContent = "Please add " + problems.join(", ") + ".";
    form.querySelector(".invalid").focus();
    return;
  }

  statusEl.classList.remove("error");
  const body = `${message.value.trim()}\n\n- ${name.value.trim()} (${email.value.trim()})`;
  const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject.value.trim() || "Portfolio enquiry")}&body=${encodeURIComponent(body)}`;
  openMail(url);
  statusEl.textContent = `Opening your email app. If nothing opens, write to ${CONTACT_EMAIL} directly.`;
});

/* ===== Scroll reveal + active nav link ===== */

function setupObservers() {
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((i) => io.observe(i));

    const links = [...document.querySelectorAll(".menu a")];
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          map.get(en.target.id)?.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  } else {
    items.forEach((i) => i.classList.add("visible"));
  }
}

/* ===== Start ===== */

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects();
renderSkills();
renderRegions();
renderResumes();
setupObservers();