(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Tabs
  const tabButtons = $$(".nav-link");
  const panels = $$(".tab-panel");

  function activateTab(targetId) {
    panels.forEach((p) => {
      const isActive = `#${p.id}` === targetId;
      p.toggleAttribute("hidden", !isActive);
      p.classList.toggle("active", isActive);
    });
    tabButtons.forEach((b) => {
      const isActive = b.getAttribute("data-tab-target") === targetId;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", String(isActive));
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab-target");
      activateTab(target);
    });
  });

  // Allow links to switch tabs via data-tab-link
  $$('[data-tab-link]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = el.getAttribute('data-tab-link');
      if (target) {
        e.preventDefault();
        activateTab(target);
      }
      const scrollTo = el.getAttribute('data-scroll-to');
      if (scrollTo) smoothScrollTo(scrollTo);
    });
  });

  function smoothScrollTo(hash) {
    const target = $(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Video ID via URL param: ?vsl=VIDEO_ID
  const params = new URLSearchParams(location.search);
  const vslId = params.get('vsl');
  if (vslId) {
    const iframe = $('#vslIframe');
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(vslId)}?rel=0&modestbranding=1`;
    }
  }

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Waitlist form: send to a placeholder endpoint or local storage
  const form = $("#waitlistForm");
  const message = $("#waitlistMessage");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form) return;
    const formData = new FormData(form);
    const email = (formData.get("email") || "").toString().trim();
    const instagram = (formData.get("instagram") || "").toString().trim();
    if (!email) {
      showMessage("Please enter a valid email.", true);
      return;
    }
    try {
      // Placeholder: store locally for now;
      // when backend is ready, replace with fetch('https://your-api/waitlist', { method: 'POST', body: JSON.stringify({ email, instagram }), headers: { 'Content-Type': 'application/json' } })
      const key = 'waitlistEntries';
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ email, instagram, ts: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr));
      form.reset();
      showMessage("You're on the list! We'll be in touch soon.");
    } catch (err) {
      showMessage("Something went wrong. Please try again.", true);
      console.error(err);
    }
  });

  function showMessage(text, isError = false) {
    if (!message) return;
    message.textContent = text;
    message.style.color = isError ? '#b91c1c' : '#065f46';
  }
})();


