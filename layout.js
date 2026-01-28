function initMobileNav() {
  const headerHost = document.getElementById("header");
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  if (!headerHost || !btn || !nav) return;

  const setOpen = (open) => {
    headerHost.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.innerHTML = open
      ? '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="rgba(15,23,42,.85)" stroke-width="2" stroke-linecap="round"/></svg>'
      : '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="rgba(15,23,42,.85)" stroke-width="2" stroke-linecap="round"/></svg>';
  };

  btn.addEventListener("click", () => {
    setOpen(!headerHost.classList.contains("is-open"));
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (!headerHost.classList.contains("is-open")) return;
    if (headerHost.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

Promise.all([
  fetch("/header.html").then(r => r.text()).then(t => (document.getElementById("header").innerHTML = t)),
  fetch("/footer.html").then(r => r.text()).then(t => (document.getElementById("footer").innerHTML = t)),
]).then(() => {
  initMobileNav();
});