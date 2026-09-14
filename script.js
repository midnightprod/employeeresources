const state = {
  documents: [],
  activeCategory: "All",
  query: "",
};

const listEl = document.getElementById("doc-list");
const tabsEl = document.getElementById("tabs");
const searchEl = document.getElementById("search");

function formatDate(isoString) {
  const d = new Date(isoString);
  if (isNaN(d)) return isoString;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function renderTabs() {
  const categories = ["All", ...new Set(state.documents.map((d) => d.category))];
  tabsEl.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "tab";
    btn.type = "button";
    btn.textContent = cat;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-pressed", String(state.activeCategory === cat));
    btn.addEventListener("click", () => {
      state.activeCategory = cat;
      renderTabs();
      renderList();
    });
    tabsEl.appendChild(btn);
  });
}

function renderList() {
  const query = state.query.trim().toLowerCase();

  const filtered = state.documents.filter((doc) => {
    const matchesCategory = state.activeCategory === "All" || doc.category === state.activeCategory;
    const matchesQuery =
      !query ||
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  listEl.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `<strong>No documents found</strong>Try a different search term or category.`;
    listEl.appendChild(empty);
    return;
  }

  filtered.forEach((doc) => {
    const row = document.createElement("div");
    row.className = "doc-row";
    row.innerHTML = `
      <div class="doc-main">
        <h2>${escapeHtml(doc.title)}</h2>
        <p>${escapeHtml(doc.description)}</p>
      </div>
      <div class="doc-category">${escapeHtml(doc.category)}</div>
      <div class="doc-updated">${formatDate(doc.updated)}</div>
      <a class="doc-download" href="${encodeURI(doc.file)}" download>Download</a>
    `;
    listEl.appendChild(row);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

searchEl.addEventListener("input", (e) => {
  state.query = e.target.value;
  renderList();
});

fetch("documents.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load documents.json");
    return res.json();
  })
  .then((data) => {
    state.documents = data;
    renderTabs();
    renderList();
  })
  .catch((err) => {
    listEl.innerHTML = `<div class="empty-state"><strong>Couldn't load documents</strong>${escapeHtml(err.message)}</div>`;
  });
