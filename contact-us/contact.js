(() => {
  const a = ["mediaagni", "20"];
  const b = ["gmail", "com"];
  const at = "@";
  const dot = ".";

  const getEmail = () => a.join("") + at + b[0] + dot + b[1];

  const btn = document.getElementById("sendBtn");
  const subjectEl = document.getElementById("subject");
  const messageEl = document.getElementById("message");

  if (!btn || !subjectEl || !messageEl) return;

  btn.addEventListener("click", () => {
    const subject = subjectEl.value.trim();
    const message = messageEl.value.trim();

    if (!subject && !message) {
      alert("Silakan isi subject atau pesan terlebih dahulu.");
      return;
    }

    const email = getEmail();

    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (message) params.set("body", message);

    window.location.href = `mailto:${email}?${params.toString()}`;
  });
})();
