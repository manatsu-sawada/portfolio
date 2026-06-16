document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const i18nItems = document.querySelectorAll("[data-i18n]");
  const langButtons = document.querySelectorAll("[data-lang]");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const imageModal = document.querySelector(".image-modal");
  const modalImage = imageModal?.querySelector("img");
  const modalClose = imageModal?.querySelector(".modal-close");

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

  function closeImageModal() {
    if (!imageModal || !modalImage) {
      return;
    }

    imageModal.classList.remove("is-open");
    imageModal.setAttribute("aria-hidden", "true");
    modalImage.removeAttribute("src");
    modalImage.alt = "";
  }

  document.querySelectorAll(".illustration-trigger img").forEach((image) => {
    image.parentElement.addEventListener("click", () => {
      if (!imageModal || !modalImage) {
        return;
      }

      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      imageModal.classList.add("is-open");
      imageModal.setAttribute("aria-hidden", "false");
      modalClose?.focus();
    });
  });

  modalClose?.addEventListener("click", closeImageModal);

  imageModal?.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeImageModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeImageModal();
    }
  });

  setLanguage("ja");
});
