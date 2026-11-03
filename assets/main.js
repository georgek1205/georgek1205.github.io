/* Renders content.js into the page. You normally don't need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var P = S.profile || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var isExternal = function (href) { return /^https?:\/\//.test(href || ""); };
  var extAttrs = function (href) { return isExternal(href) ? ' target="_blank" rel="noopener"' : ""; };

  /* --- deterministic placeholder artwork for publications without an image --- */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function placeholder(seed) {
    var h = hash(seed || "x"), r = function (n) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; return h % n; };
    var shapes = "", kind = r(3), i;
    if (kind === 0) {
      var cx = 40 + r(240), cy = 30 + r(140);
      for (i = 1; i <= 7; i++) shapes += '<circle cx="' + cx + '" cy="' + cy + '" r="' + i * 22 + '" fill="none" stroke="var(--accent)" stroke-opacity="' + (0.5 - i * 0.05).toFixed(2) + '" stroke-width="1.2"/>';
    } else if (kind === 1) {
      var hx = r(12), hy = r(7);
      for (var x = 0; x < 14; x++) for (var y = 0; y < 8; y++) {
        var d = Math.hypot(x - hx, y - hy), o = Math.max(0.12, 0.9 - d * 0.18);
        shapes += '<circle cx="' + (22 + x * 21) + '" cy="' + (22 + y * 20) + '" r="' + (d < 2.5 ? 3 : 1.8) + '" fill="var(--accent)" fill-opacity="' + o.toFixed(2) + '"/>';
      }
    } else {
      for (i = 0; i < 9; i++) shapes += '<rect x="24" y="' + (20 + i * 18) + '" width="' + (40 + r(200)) + '" height="8" rx="4" fill="var(--accent)" fill-opacity="' + (0.15 + (i % 3) * 0.2).toFixed(2) + '"/>';
    }
    return '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="320" height="200" fill="color-mix(in oklab, var(--accent) 6%, var(--surface))"/>' + shapes + "</svg>";
  }

  /* --- hero --- */
  document.title = P.name || document.title;
  $("brand").textContent = P.name || "";
  $("hero-eyebrow").textContent = P.eyebrow || "";
  $("hero-name").textContent = P.name || "";
  $("hero-name-local").textContent = P.nameLocal || "";
  $("hero-tagline").innerHTML = P.tagline || "";
  $("hero-links").innerHTML = (P.links || []).map(function (l) {
    return '<li><a href="' + esc(l.href) + '"' + extAttrs(l.href) + ' aria-label="' + esc(l.label) + '" title="' + esc(l.label) + '">' +
      '<i class="' + esc(l.icon || "fa-solid fa-link") + '" aria-hidden="true"></i></a></li>';
  }).join("");
  $("hero-photo").innerHTML = P.photo
    ? '<img src="' + esc(P.photo) + '" alt="' + esc(P.name) + '" />'
    : '<div class="avatar" role="img" aria-label="' + esc(P.name) + '">' + esc(P.initials || "") + "</div>";

  /* --- about --- */
  $("about-body").innerHTML = (S.about || []).map(function (p) { return "<p>" + p + "</p>"; }).join("");
  var interests = S.interests || [];
  $("interests").innerHTML = interests.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  if (!interests.length) document.querySelector(".interests").hidden = true;

  /* --- news --- */
  var NEWS_LIMIT = 6, news = S.news || [];
  $("news-list").innerHTML = news.map(function (n, i) {
    return '<li class="' + (i >= NEWS_LIMIT ? "is-hidden" : "") + '"><time>' + esc(n.date) + "</time><span>" + n.text + "</span></li>";
  }).join("");
  if (news.length > NEWS_LIMIT) {
    var more = $("news-more"), open = false;
    more.hidden = false;
    more.textContent = "+ Show all (" + news.length + ")";
    more.addEventListener("click", function () {
      open = !open;
      document.querySelectorAll("#news-list li").forEach(function (li, i) { if (i >= NEWS_LIMIT) li.classList.toggle("is-hidden", !open); });
      more.textContent = open ? "− Show less" : "+ Show all (" + news.length + ")";
    });
  }
  if (!news.length) hideSection("news");

  /* --- education / projects (shared "entry" layout) --- */
  function logo(e) {
    if (!e.logo && !e.logoText) return "";
    var badge = '<div class="logo logo--text" aria-hidden="true">' + esc(e.logoText || "") + "</div>";
    if (!e.logo) return badge;
    // if the logo file is missing, fall back to the text badge
    return '<div class="logo"><img src="' + esc(e.logo) + '" alt="' + esc(e.school || e.org || "") + ' logo" loading="lazy" data-fallback="' + esc(e.logoText || "") + '" /></div>';
  }
  function entry(o) {
    var lg = o.image
      ? '<button type="button" class="thumb" data-full="' + esc(o.image) + '" aria-label="Enlarge image"><img src="' + esc(o.image) + '" alt="' + esc(o.imageAlt || "") + '" loading="lazy" /></button>'
      : logo(o.raw);
    var cls = o.image ? " entry--thumb" : lg ? "" : " entry--nologo";
    return '<li class="entry' + cls + '">' + lg +
      '<div class="entry__body">' +
        '<p class="entry__title">' + (o.link ? '<a href="' + esc(o.link) + '"' + extAttrs(o.link) + ">" + esc(o.title) + "</a>" : esc(o.title)) + "</p>" +
        (o.local ? '<p class="entry__local">' + esc(o.local) + "</p>" : "") +
        (o.sub ? '<p class="entry__sub">' + esc(o.sub) + "</p>" : "") +
        (o.note ? '<p class="entry__note">' + o.note + "</p>" : "") +
        (o.desc ? '<p class="entry__desc">' + o.desc + "</p>" : "") +
      "</div>" +
      '<div class="entry__meta"><span class="entry__period">' + esc(o.period || "") + "</span>" +
        (o.place ? '<span class="entry__place">' + esc(o.place) + "</span>" : "") + "</div>" +
    "</li>";
  }
  var edu = S.education || [];
  $("education-list").innerHTML = edu.map(function (e) {
    return entry({ raw: e, title: e.school, sub: e.degree, note: e.note, period: e.period, place: e.place });
  }).join("");
  if (!edu.length) hideSection("education");

  var projects = S.projects || [];
  $("project-list").innerHTML = projects.map(function (p) {
    return entry({ raw: p, title: p.title, local: p.titleLocal, sub: p.org, desc: p.desc, period: p.period, link: p.link, image: p.image, imageAlt: p.imageAlt });
  }).join("");
  if (!projects.length) hideSection("projects");

  document.querySelectorAll(".logo img").forEach(function (img) {
    img.addEventListener("error", function () {
      var box = img.parentNode;
      box.className = "logo logo--text";
      box.textContent = img.dataset.fallback || "";
    });
  });

  /* --- image viewer --- */
  var viewer = $("viewer");
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".thumb");
    if (!t || !viewer.showModal) return;
    $("viewer-img").src = t.dataset.full;
    $("viewer-img").alt = (t.querySelector("img") || {}).alt || "";
    viewer.showModal();
  });
  viewer.addEventListener("click", function () { viewer.close(); });

  /* --- publications --- */
  var me = (P.authorName || P.name || "").toLowerCase();
  function authors(list) {
    return (list || []).map(function (a) {
      var bare = a.replace(/[*†‡]+$/, "").trim().toLowerCase();
      return bare === me ? '<span class="me">' + esc(a) + "</span>" : esc(a);
    }).join(", ");
  }
  function pubItem(p, idx) {
    var links = Object.keys(p.links || {}).map(function (k) {
      return '<a href="' + esc(p.links[k]) + '"' + extAttrs(p.links[k]) + ">" + esc(k) + "</a>";
    });
    if (p.bibtex) links.push('<button type="button" class="bib-toggle" aria-expanded="false" aria-controls="bib-' + idx + '">BibTeX</button>');
    var first = (p.links && (p.links.Paper || p.links.arXiv || p.links.Project)) || "";
    return '<li class="pub">' +
      '<div class="pub__thumb">' + (p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy" />' : placeholder(p.title)) + "</div>" +
      "<div>" +
        (p.venueTag ? '<span class="badge' + (p.highlight ? " hl" : "") + '">' + esc(p.venueTag) + "</span>" : "") +
        '<h3 class="pub__title">' + (first ? '<a href="' + esc(first) + '"' + extAttrs(first) + ">" + esc(p.title) + "</a>" : esc(p.title)) + "</h3>" +
        '<p class="pub__authors">' + authors(p.authors) + "</p>" +
        (p.venue ? '<p class="pub__venue">' + esc(p.venue) + (p.year ? ", " + esc(p.year) : "") + "</p>" : "") +
        (p.tldr ? '<p class="pub__tldr">' + p.tldr + "</p>" : "") +
        (links.length ? '<div class="pub__links">' + links.join("") + "</div>" : "") +
        (p.bibtex ? '<div class="bib" id="bib-' + idx + '" hidden><button type="button" class="copy">Copy</button><pre>' + esc(p.bibtex) + "</pre></div>" : "") +
      "</div></li>";
  }
  var pubs = (S.publications || []).map(function (p, i) { p._i = i; return p; });
  function renderPubs(filter) {
    var list = filter === "selected" ? pubs.filter(function (p) { return p.selected; }) : pubs.slice();
    var html = "", lastYear = null;
    list.forEach(function (p) {
      if (filter === "all" && p.year !== lastYear) { html += '<li class="year">' + esc(p.year) + "</li>"; lastYear = p.year; }
      html += pubItem(p, p._i);
    });
    $("pub-list").innerHTML = html;
  }
  if (!pubs.length) {
    $("pub-toolbar").hidden = true;
    $("pub-list").outerHTML = '<div class="empty"><b>Coming soon</b>Publications will be listed here.</div>';
  } else {
    var hasSelected = pubs.some(function (p) { return p.selected; });
    var tabs = document.querySelectorAll(".seg button");
    var setFilter = function (f) {
      tabs.forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.filter === f)); });
      renderPubs(f);
    };
    tabs.forEach(function (b) { b.addEventListener("click", function () { setFilter(b.dataset.filter); }); });
    if (!hasSelected) document.querySelector(".seg").hidden = true;
    setFilter(hasSelected ? "selected" : "all");

    $("pub-list").addEventListener("click", function (e) {
      var t = e.target;
      if (t.classList.contains("bib-toggle")) {
        var box = $(t.getAttribute("aria-controls")), opened = t.getAttribute("aria-expanded") === "true";
        t.setAttribute("aria-expanded", String(!opened));
        box.hidden = opened;
      } else if (t.classList.contains("copy")) {
        var text = t.nextElementSibling.textContent;
        var done = function () { t.textContent = "Copied"; setTimeout(function () { t.textContent = "Copy"; }, 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
      }
    });
  }

  /* --- footer --- */
  $("footer-copy").textContent = S.footer || "";
  var lm = new Date(document.lastModified);
  if (!isNaN(lm)) $("footer-updated").textContent = "Last updated " + lm.toISOString().slice(0, 10);

  function hideSection(id) { var s = $(id); if (s) s.remove(); }

  /* --- number sections + build top menu --- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main .sec"));
  sections.forEach(function (s, i) { var n = s.querySelector(".num"); if (n) n.textContent = String(i + 1).padStart(2, "0"); });
  $("menu").innerHTML = sections.map(function (s) {
    return '<a href="#' + s.id + '" data-id="' + s.id + '">' + esc(s.dataset.label) + "</a>";
  }).join("");

  /* --- sticky-bar state, scroll spy, reveal --- */
  var bar = $("topbar");
  var onScroll = function () { bar.classList.toggle("is-stuck", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var links = {};
    document.querySelectorAll("#menu a").forEach(function (a) { links[a.dataset.id] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-active", k === e.target.id); });
        var a = links[e.target.id], m = a && a.parentNode;
        if (m && m.scrollWidth > m.clientWidth) m.scrollTo({ left: a.offsetLeft - 24, behavior: "smooth" });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    var rev = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    sections.forEach(function (s) { s.classList.add("reveal"); rev.observe(s); });
  }
})();
