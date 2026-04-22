declare global {
  interface Window {
    __sebasScrollEffectsCleanup?: () => void;
    __sebasScrollEffectsInit?: boolean;
  }
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function initScrollEffects(): void {
  if (typeof window === "undefined") {
    return;
  }

  if (window.__sebasScrollEffectsCleanup) {
    window.__sebasScrollEffectsCleanup();
  }

  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
  const parallaxElements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]")
  );

  let revealObserver: IntersectionObserver | null = null;
  let rafId: number | null = null;

  if (reducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else if (revealElements.length > 0) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    revealElements.forEach((element, index) => {
      if (!element.style.getPropertyValue("--reveal-delay")) {
        const defaultDelay = Math.min(index * 34, 170);
        element.style.setProperty("--reveal-delay", `${defaultDelay}ms`);
      }
      revealObserver?.observe(element);
    });
  }

  const updateScrollStates = (): void => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    }

    if (progress) {
      const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScrollable > 0 ? window.scrollY / maxScrollable : 0;
      progress.style.setProperty("--scroll-progress", ratio.toFixed(4));
    }

    if (!reducedMotion && parallaxElements.length > 0) {
      parallaxElements.forEach((element) => {
        const speedRaw = Number(element.dataset.parallaxSpeed ?? "0.12");
        const speed = Number.isFinite(speedRaw) ? speedRaw : 0.12;
        const shift = Math.min(36, window.scrollY * speed);
        element.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
      });
    }
  };

  const handleScroll = (): void => {
    if (rafId !== null) {
      return;
    }

    rafId = window.requestAnimationFrame(() => {
      updateScrollStates();
      rafId = null;
    });
  };

  updateScrollStates();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });

  window.__sebasScrollEffectsCleanup = () => {
    revealObserver?.disconnect();
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

if (!window.__sebasScrollEffectsInit) {
  window.__sebasScrollEffectsInit = true;
  document.addEventListener("astro:page-load", initScrollEffects);
}

initScrollEffects();

export {};
