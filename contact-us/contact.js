(function () {
  // === EMAIL OBFUSCATION (anti scraping) ===
  // mediaagni20@gmail.com
  const a = ["mediaagni", "20"];
  const b = ["gmail", "com"];
  const at = String.fromCharCode(64);   // "@"
  const dot = String.fromCharCode(46);  // "."

  function getEmail() {
    return a.join("") + at + b[0] + dot + b[1];
  }

  document.getElementById("sendBtn").addEventListener("click", function () {
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!subject && !message) {
      alert("Silakan isi subject atau pesan terlebih dahulu.");
      return;
    }

    const mailto =
      "mailto:" + encodeURIComponent(getEmail()) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(message);

    window.location.href = mailto;
  });
})();