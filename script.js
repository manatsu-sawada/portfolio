document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const i18nItems = document.querySelectorAll("[data-i18n]");
  const langButtons = document.querySelectorAll("[data-lang]");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  function setLanguage(lang) {
    const nextLang = lang === "en" ? "en" : "ja";

    html.setAttribute("lang", nextLang);

    i18nItems.forEach((item) => {
      const nextText = nextLang === "en" ? item.dataset.en : item.dataset.ja;

      if (nextText) {
        item.textContent = nextText;
      }
    });

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === nextLang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  // Smooth-scroll only real in-page links. "#" placeholder links keep default behavior.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    });
  });

  function closeMenu() {
    if (!menuToggle || !siteNav) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });
  }

  setLanguage("ja");
});
