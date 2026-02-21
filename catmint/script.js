
  // ===== Elements =====
  const overlay = document.getElementById("runOverlay");
  const out = document.getElementById("runOutput");
  const closeBtn = document.getElementById("closeOverlay");

  // ===== Demo outputs (hardcode) =====
  const DEMOS = {
    hash: [
      "$ catmint hash -f porto.html -a md5\n",
      "MD5 hash of file porto.html: 7e12ac023f78bfd35c5d7a70a93b86ab\n"
    ],
    verify: [
      "$ catmint verify -f porto.html -a md5 -hash 7e12ac023f78bfd35c5d7a70a93b86ab\n",
      "File porto.html: hash matches!\n"
    ]
  };

  // ===== Typing control =====
  let typingTimer = null;
  let lastFocusedElement = null;

  // Kecepatan (ms per karakter) -> makin besar makin lambat
  const SPEED_CMD = 38;    // command typing
  const SPEED_OUT = 24;    // output typing
  const PAUSE_AFTER_CMD = 350;

  function stopTyping() {
    if (typingTimer) clearTimeout(typingTimer);
    typingTimer = null;
  }

  // ===== Overlay open/close (A11y safe) =====
  function setInert(el, value) {
    // inert supported on modern browsers; fallback to aria-hidden
    if ("inert" in el) {
      el.inert = value;
      // keep aria-hidden in sync (optional but fine)
      el.setAttribute("aria-hidden", value ? "true" : "false");
    } else {
      el.setAttribute("aria-hidden", value ? "true" : "false");
    }
  }

  function openOverlay() {
    lastFocusedElement = document.activeElement;

    overlay.classList.add("is-open");
    setInert(overlay, false);
    document.body.style.overflow = "hidden";

    // Pindahkan fokus ke tombol close agar tidak ada warning
    // (gunakan timeout kecil biar setelah overlay tampil)
    setTimeout(() => closeBtn?.focus(), 0);
  }

  function closeOverlay() {
    stopTyping();

    overlay.classList.remove("is-open");
    setInert(overlay, true);
    document.body.style.overflow = "";
    out.textContent = "";

    // Balikin fokus ke tombol Run yang terakhir diklik
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      setTimeout(() => lastFocusedElement.focus(), 0);
    }
  }

  // Set initial hidden state
  setInert(overlay, true);

  // ===== Typewriter =====
  function typeText(text, speed, done) {
    let i = 0;

    function tick() {
      out.textContent += text[i];
      i += 1;

      if (i < text.length) {
        typingTimer = setTimeout(tick, speed);
      } else {
        done && done();
      }
    }

    tick();
  }

  function runDemo(key) {
    stopTyping();
    out.textContent = "";

    openOverlay();

    const parts = DEMOS[key] || ["No demo output.\n"];
    const cmd = parts[0] || "";
    const output = parts[1] || "";

    typeText(cmd, SPEED_CMD, () => {
      typingTimer = setTimeout(() => {
        typeText(output, SPEED_OUT);
      }, PAUSE_AFTER_CMD);
    });
  }

  // ===== Events =====
  // Click Run (works for multiple buttons)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".run-btn");
    if (btn) {
      e.preventDefault();
      runDemo(btn.dataset.demo);
      return;
    }

    // Click backdrop to close
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  // Close button
  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeOverlay();
  });

  // Escape to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeOverlay();
    }
  });
