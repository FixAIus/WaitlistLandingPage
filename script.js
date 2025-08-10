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
      const scrollTarget = btn.getAttribute('data-scroll-to');
      if (scrollTarget) {
        smoothScrollTo(scrollTarget);
        return;
      }
      if (target) activateTab(target);
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navItems = document.querySelector('.main-nav .nav-items');
  const navClose = null; // removed X button
  const navBackdrop = null; // removed backdrop
  if (navToggle && navItems) {
    navToggle.addEventListener('click', () => {
      const isOpen = navItems.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      // no backdrop
    });
    // no X button or backdrop handlers
    // Close when clicking a nav item
    navItems.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && (target.matches('.nav-link') || target.matches('.btn'))) {
        navItems.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        if (navBackdrop) navBackdrop.style.display = 'none';
      }
    });
  }

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

  // Demo GIF via URL param: ?gif=URL
  const gifUrl = params.get('gif');
  const demoImage = $('#demoImage');
  if (demoImage) {
    const fallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#0ea5e9"/>
            <stop offset="100%" stop-color="#10b981"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-family="sans-serif">Demo GIF placeholder — add ?gif=URL</text>
      </svg>`
    );
    demoImage.src = gifUrl || fallback;
  }

  // New media placeholders + URL params
  const metricsUrl = params.get('metrics');
  const bookingGifUrl = params.get('bookgif');
  const complexGifUrl = params.get('complex');
  const simpleGifUrl = params.get('simple');

  const metricsImage = $('#metricsImage');
  if (metricsImage && metricsUrl) {
    metricsImage.src = metricsUrl;
  }

  const bookingGif = $('#bookingGif');
  if (bookingGif && bookingGifUrl) {
    bookingGif.src = bookingGifUrl;
  }

  const complexWorkflowGif = $('#complexWorkflowGif');
  if (complexWorkflowGif && complexGifUrl) {
    complexWorkflowGif.src = complexGifUrl;
  }

  const simpleInstallGif = $('#simpleInstallGif');
  if (simpleInstallGif && simpleGifUrl) {
    simpleInstallGif.src = simpleGifUrl;
  }

  // Side-follow models parallax tilt
  const sideMonkey = $('#sideMonkey');
  function onScroll() {
    const y = window.scrollY || 0;
    const monkey = Math.cos(y / 280) * 14;
    if (sideMonkey) sideMonkey.style.transform = `translateY(${monkey}px) rotate(${monkey/40}deg)`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // (Removed chat demo logic)

  // Give emojis subtle depth without following scroll position
  const emojiEls = $$('.emoji3d');
  // Constrain emoji container height to the footer bottom so emojis stop at page end
  const footer = document.getElementById('footer');
  const bgKeycaps = document.querySelector('.bg-keycaps');
  function animateEmojis() {
    const t = performance.now() / 1000;
    emojiEls.forEach((el) => {
      const seed = parseFloat(el.getAttribute('data-seed') || '1');
      const tilt = Math.sin(t + seed) * 4;
      const bob = Math.cos(t * 0.7 + seed) * 6;
      el.style.transform = `translateY(${bob}px) rotate(${tilt}deg)`;
    });
    requestAnimationFrame(animateEmojis);
  }
  animateEmojis();

  function resizeEmojiField() {
    if (!bgKeycaps || !footer) return;
    const footerTopDoc = footer.getBoundingClientRect().top + window.scrollY;
    const docTop = 0;
    const maxHeight = Math.max(0, footerTopDoc - docTop);
    bgKeycaps.style.height = `${maxHeight}px`;
  }
  window.addEventListener('load', resizeEmojiField);
  window.addEventListener('resize', resizeEmojiField);
  window.addEventListener('scroll', resizeEmojiField, { passive: true });
  resizeEmojiField();

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


