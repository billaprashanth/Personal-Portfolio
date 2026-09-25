/* ===========================================================*

*   PRASHANTH BILLA — PORTFOLIO INTERACTIONS*

*   Smooth / Animated / Recruiter-focused*

*   =========================================================== */

(() => {
  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ===========================================================*

*     Footer year*

*     =========================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ===========================================================*

*     Mobile navigation*

*     =========================================================== */

  const navToggle = document.getElementById("navToggle");

  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      navToggle.classList.toggle("is-open", isOpen);

      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");

        navToggle.classList.remove("is-open");

        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        window.innerWidth <= 760 &&
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navLinks.classList.remove("is-open");

        navToggle.classList.remove("is-open");

        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===========================================================*

*     Navigation scroll state + scroll progress*

*     =========================================================== */

  const nav = document.getElementById("nav");

  const progress = document.getElementById("scrollProgress");

  let ticking = false;

  function updateScrollUI() {
    const scrollY = window.scrollY || window.pageYOffset;

    /**

*       Add stronger background/shadow to navbar*

*       once the user starts scrolling.*

*     */

    if (nav) {
      nav.classList.toggle("scrolled", scrollY > 20);
    }

    /**

*       Calculate page scroll percentage.*

*     */

    if (progress) {
      const documentElement = document.documentElement;

      const maxScroll = documentElement.scrollHeight - window.innerHeight;

      const percentage = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

      progress.style.width = `${Math.min(100, percentage)}%`;
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",

    () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollUI);

        ticking = true;
      }
    },

    { passive: true },
  );

  updateScrollUI();

  /* ===========================================================*

*     Scroll reveal animations*

*     =========================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if (reducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },

      {
        threshold: 0.12,

        rootMargin: "0px 0px -60px 0px",
      },
    );

    revealElements.forEach((element, index) => {
      /**

*       Small stagger between elements.*

*     */

      element.style.setProperty("--delay", `${Math.min(index % 5, 4) * 65}ms`);

      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* ===========================================================*

*     Active navigation based on visible section*

*     =========================================================== */

  const navAnchors = [...document.querySelectorAll(".nav-links a")];

  const trackedSections = navAnchors

    .map((link) => {
      const target = link.getAttribute("href");

      return target ? document.querySelector(target) : null;
    })

    .filter(Boolean);

  if ("IntersectionObserver" in window && trackedSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navAnchors.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("is-active", isActive);
          });
        });
      },

      {
        rootMargin: "-35% 0px -55% 0px",

        threshold: 0,
      },
    );

    trackedSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* ===========================================================*

*     Project filters*

*     =========================================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");

  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      /**

*       Update active filter button.*

*     */

      filterButtons.forEach((btn) => {
        const active = btn === button;

        btn.classList.toggle("is-active", active);

        btn.setAttribute("aria-selected", String(active));
      });

      /**

*       Show/hide matching projects.*

*     */

      projectCards.forEach((card, index) => {
        const shouldShow = filter === "all" || card.dataset.cat === filter;

        if (shouldShow) {
          card.classList.remove("is-hidden");

          /**

*           Animate cards when filter changes.*

*         */

          if (!reducedMotion) {
            card.animate(
              [
                {
                  opacity: 0,

                  transform: "translateY(18px) scale(.98)",
                },

                {
                  opacity: 1,

                  transform: "translateY(0) scale(1)",
                },
              ],

              {
                duration: 430,

                delay: index * 35,

                easing: "cubic-bezier(.22,1,.36,1)",

                fill: "both",
              },
            );
          }
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  /* ===========================================================*

*     Mouse-follow ambient glow*

*     =========================================================== */

  const cursorGlow = document.querySelector(".cursor-glow");

  if (
    cursorGlow &&
    !reducedMotion &&
    window.matchMedia("(pointer:fine)").matches
  ) {
    let mouseX = window.innerWidth / 2;

    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;

    let glowY = mouseY;

    window.addEventListener(
      "pointermove",

      (event) => {
        mouseX = event.clientX;

        mouseY = event.clientY;
      },

      { passive: true },
    );

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.09;

      glowY += (mouseY - glowY) * 0.09;

      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* ===========================================================*

*     Subtle 3D hero card tilt*

*     =========================================================== */

  const heroVisual = document.querySelector(".hero-visual");

  if (
    heroVisual &&
    !reducedMotion &&
    window.matchMedia("(pointer:fine)").matches
  ) {
    heroVisual.addEventListener("pointermove", (event) => {
      const rect = heroVisual.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroVisual.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-2px)`;
    });

    heroVisual.addEventListener("pointerleave", () => {
      heroVisual.style.transform = "";
    });
  }

  /* ===========================================================*

*     Magnetic buttons*

*     =========================================================== */

  if (!reducedMotion && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;

        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.08}px, ${y * 0.08 - 2}px)`;
      });

      button.addEventListener("pointerleave", () => {
        button.style.transform = "";
      });
    });
  }

  /* ===========================================================*

*     Animated AI / ML signal canvas*

*     =========================================================== */

  function initSignalCanvas() {
    const canvas = document.getElementById("signalCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;

    let height = 0;

    let dpr = 1;

    let points = [];

    let animationFrame = 0;

    const POINT_COUNT = 64;

    /* ---------------------------------------------------------*

*       Canvas resize*

*       --------------------------------------------------------- */

    function resize() {
      const rect = canvas.getBoundingClientRect();

      /**

*       Limit DPR to 2 for better performance*

*       on high-resolution screens.*

*     */

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;

      height = rect.height;

      canvas.width = Math.max(1, Math.floor(width * dpr));

      canvas.height = Math.max(1, Math.floor(height * dpr));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ---------------------------------------------------------*

*       Generate model-performance curve*

*       --------------------------------------------------------- */

    function buildSeries(time = 0) {
      points = [];

      for (let i = 0; i < POINT_COUNT; i++) {
        const progress = i / (POINT_COUNT - 1);

        /**

*         Decaying curve resembling*

*         a model training/validation curve.*

*       */

        const decay = Math.pow(1 - progress, 1.65);

        /**

*         Small moving wave.*

*       */

        const wave =
          Math.sin(progress * 18 + time * 0.0007) * 0.018 * (1 - progress);

        /**

*         Deterministic noise.*

*       */

        const noise = Math.sin(i * 4.17) * 0.012 * decay;

        const value = 0.075 + decay * 0.77 + wave + noise;

        points.push(Math.max(0.055, Math.min(0.94, value)));
      }
    }

    /* ---------------------------------------------------------*

*       Grid*

*       --------------------------------------------------------- */

    function drawGrid() {
      ctx.strokeStyle = "rgba(232,234,237,.055)";

      ctx.lineWidth = 1;

      /**

*       Horizontal grid.*

*     */

      for (let row = 0; row <= 4; row++) {
        const y = (height / 4) * row + 0.5;

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(width, y);

        ctx.stroke();
      }

      /**

*       Vertical grid.*

*     */

      for (let col = 0; col <= 6; col++) {
        const x = (width / 6) * col + 0.5;

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, height);

        ctx.stroke();
      }
    }

    /* ---------------------------------------------------------*

*       Draw signal*

*       --------------------------------------------------------- */

    function drawSeries(time) {
      if (!points.length) return;

      const step = width / (POINT_COUNT - 1);

      /**

*       Draw line.*

*     */

      ctx.beginPath();

      points.forEach((value, index) => {
        const x = index * step;

        const y = height - value * (height - 18) - 9;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      /**

*       Gradient from amber to teal.*

*     */

      const gradient = ctx.createLinearGradient(0, 0, width, 0);

      gradient.addColorStop(0, "#f0b429");

      gradient.addColorStop(0.62, "#f0b429");

      gradient.addColorStop(1, "#4fd1c5");

      ctx.strokeStyle = gradient;

      ctx.lineWidth = 2;

      ctx.lineJoin = "round";

      ctx.lineCap = "round";

      ctx.stroke();

      /**

*       Fill below curve.*

*     */

      const fill = ctx.createLinearGradient(0, 0, 0, height);

      fill.addColorStop(0, "rgba(240,180,41,.14)");

      fill.addColorStop(1, "rgba(240,180,41,0)");

      ctx.lineTo(width, height);

      ctx.lineTo(0, height);

      ctx.closePath();

      ctx.fillStyle = fill;

      ctx.fill();

      /**

*       Animated leading point.*

*     */

      const last = points[POINT_COUNT - 1];

      const x = width;

      const y = height - last * (height - 18) - 9;

      const pulse = 3 + Math.sin(time * 0.005) * 1.1;

      /**

*       Outer glow.*

*       */

      ctx.beginPath();

      ctx.arc(x, y, pulse + 4, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(79,209,197,.10)";

      ctx.fill();

      /**

*       Main point.*

*       */

      ctx.beginPath();

      ctx.arc(x, y, pulse, 0, Math.PI * 2);

      ctx.fillStyle = "#4fd1c5";

      ctx.fill();
    }

    /* ---------------------------------------------------------*

*       Render animation*

*       --------------------------------------------------------- */

    function render(time) {
      ctx.clearRect(0, 0, width, height);

      buildSeries(time);

      drawGrid();

      drawSeries(time);

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    }

    /**

*     Initial setup.*

*   */

    resize();

    render(performance.now());

    /**

*     Responsive canvas.*

*   */

    window.addEventListener(
      "resize",

      () => {
        resize();

        if (reducedMotion) {
          render(performance.now());
        }
      },

      { passive: true },
    );

    /**

*     Stop animation when page is hidden.*

*   */

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && animationFrame) {
        cancelAnimationFrame(animationFrame);

        animationFrame = 0;
      } else if (!document.hidden && !reducedMotion && !animationFrame) {
        animationFrame = requestAnimationFrame(render);
      }
    });
  }

  initSignalCanvas();

  /* ===========================================================*

*     Keyboard accessibility*

*     =========================================================== */

  document.addEventListener("keydown", (event) => {
    /**

*       Escape closes mobile navigation.*

*     */

    if (event.key === "Escape" && navLinks && navToggle) {
      navLinks.classList.remove("is-open");

      navToggle.classList.remove("is-open");

      navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();
