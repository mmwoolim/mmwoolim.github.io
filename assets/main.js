/* Minwoo Lim — site interactions. No dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* tells the head-script failsafe that reveal handling is live */
  window.__mlReady = true;

  /* ---------- theme ---------- */
  var toggle = document.getElementById("themeToggle");
  var stored = null;
  try { stored = localStorage.getItem("ml-theme"); } catch (e) {}
  if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("ml-theme", next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next === "dark" ? "#0B120F" : "#FBFAF6");
    });
  }

  /* ---------- mobile menu ---------- */
  var menuButton = document.getElementById("menuButton");
  var nav = document.getElementById("primaryNav");

  function closeMenu() {
    if (!nav || !menuButton) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- contact modal ---------- */
  var modal = document.getElementById("contactModal");
  var modalClose = document.getElementById("contactModalClose");

  if (modal && typeof modal.showModal === "function") {
    var openModal = function () {
      closeMenu();
      root.classList.add("modal-open");
      modal.showModal();
    };

    /* The scroll lock is released here rather than only in the "close" handler.
       Leaving it on would make the page unscrollable, so every dismissal path
       clears it directly instead of trusting a single event to arrive. */
    var closeModal = function () {
      root.classList.remove("modal-open");
      if (modal.open) modal.close();
    };

    document.querySelectorAll("[data-contact-open]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();       // the href="#contact" is the no-JS fallback
        openModal();
      });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);

    // click on the backdrop (i.e. outside the dialog box) dismisses it
    modal.addEventListener("click", function (e) {
      if (e.target !== modal) return;
      var r = modal.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right &&
                   e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) closeModal();
    });

    // picking an option should not leave the dialog hanging open behind it
    modal.querySelectorAll(".contact-options a").forEach(function (a) {
      a.addEventListener("click", closeModal);
    });

    // Esc is handled natively; catch it here too so the lock lifts with it
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") root.classList.remove("modal-open");
    });
    modal.addEventListener("cancel", function () { root.classList.remove("modal-open"); });
    modal.addEventListener("close", function () { root.classList.remove("modal-open"); });
  }

  /* ---------- sticky header state ---------- */
  var header = document.querySelector(".site-header");
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      if (header) header.classList.toggle("scrolled", window.scrollY > 12);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- active nav link ---------- */
  var sections = ["ventures", "press", "experience", "about"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = {};
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
    navLinks[a.getAttribute("href").slice(1)] = a;
  });

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinks[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
