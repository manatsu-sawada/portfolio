const categoryLabels = {
  fanart: "Fan Art",
  anime: "Anime",
  original: "Original",
  food: "Food",
};

const works = [
  {
    id: "fanart-stage-study-2025",
    title: "Tokyo Idol Festival 2025",
    category: "fanart",
    year: "2025",
    tags: ["idol", "TIF2025"],
    image: "../assets/images/idol/tif_idol.PNG",
    alt: "Fan art illustration with a stage-inspired composition",
  },
  {
    id: "fanart-soft-portrait-2024",
    title: "Norotte Norotte",
    category: "fanart",
    year: "2024",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/noronoro.PNG",
    alt: "Soft portrait-style fan art illustration",
  },
  {
    id: "fanart-sweets-motif-2024",
    title: "Nakanaori Syu-kuri-mu",
    category: "fanart",
    year: "2024",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/kou2_choucreme.PNG",
    alt: "Fan art illustration with a sweets motif",
  },
  {
    id: "fanart-amu-mosha",
    title: "Nigemizu Amu",
    category: "fanart",
    year: "2025",
    tags: ["idol", "Replicating", "Kyurushite"],
    image: "../assets/images/idol/amu_mosha.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-date-requiem",
    title: "Requiem on the Eve of a Date",
    category: "fanart",
    year: "2024",
    tags: ["idol", "≠ME"],
    image: "../assets/images/idol/date_requiem.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-iko-no3",
    title: "Your Third Button",
    category: "fanart",
    year: "2024",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/iko_no3.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-iori-hbd-2024",
    title: "Birthday Art 2024",
    category: "fanart",
    year: "2024",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/ioriHBD2024.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-iori-set",
    title: "LIVE Memories",
    category: "fanart",
    year: "2024",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/iori_set.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-iori-tour-2025",
    title: "Timeless Tales Memories",
    category: "fanart",
    year: "2025",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/Iori_tour2025.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-kiara-neko",
    title: "Cat Costume",
    category: "fanart",
    year: "2024",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/kiara_neko.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-love-8th",
    title: "8th Anniversary Art",
    category: "fanart",
    year: "2025",
    tags: ["idol", "=LOVE"],
    image: "../assets/images/idol/love_8th.png",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-maika-mosha",
    title: "Love Create -Maika-",
    category: "fanart",
    year: "2023",
    tags: ["idol", "Replicating", "=LOVE"],
    image: "../assets/images/idol/maika_mosha.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-maika-shukipi",
    title: "Shukipi -Maika-",
    category: "fanart",
    year: "2023",
    tags: ["idol", "Replicating", "=LOVE"],
    image: "../assets/images/idol/maika_shukipi.JPG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-miri-shinamon",
    title: "Cinnamon -Mirinya-",
    category: "fanart",
    year: "2024",
    tags: ["idol", "Replicating", "=LOVE"],
    image: "../assets/images/idol/miri_shinamon.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-zetsuai-2024",
    title: "Zettai Idol Yamenaide",
    category: "fanart",
    year: "2024",
    tags: ["idol", "Replicating", "=LOVE"],
    image: "../assets/images/idol/zetsuai-2024.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-miri-lovesong-2025",
    title: "Love-Song Ni Osowareru -Mirinya-",
    category: "fanart",
    year: "2025",
    tags: ["idol", "Replicating", "=LOVE"],
    image: "../assets/images/idol/Miri_Lovesong_2025.png",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-noronoro-2024",
    title: "NoroNoro Mini-Character",
    category: "fanart",
    year: "2024",
    tags: ["idol",  "=LOVE"],
    image: "../assets/images/idol/Noronoro_2024.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-iori-shukipi-2024",
    title: "Shukipi -Iori-",
    category: "fanart",
    year: "2024",
    tags: ["idol",  "=LOVE"],
    image: "../assets/images/idol/iori_shukipi_2024.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-hirointo-okami-2023",
    title: "Heroine and the Wolf",
    category: "fanart",
    year: "2023",
    tags: ["idol", "≠ME"],
    image: "../assets/images/idol/hirointoOkami_2023.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "fanart-hitomi-mosha",
    title: "Natumatope -Hitomi-",
    category: "fanart",
    year: "2023",
    tags: ["idol", "Replicating", "=LOVE"],
    image: "../assets/images/idol/Hitomi_mosha.PNG",
    alt: "Fan art illustration archive item",
  },
  {
    id: "original-apple-girl-2024",
    title: "Apple Girl",
    category: "original",
    year: "2024",
    tags: ["original"],
    image: "../assets/images/original/apple_girl.PNG",
    alt: "Original character illustration with an apple motif",
  },
  {
    id: "original-mendako-blue-2024",
    title: "Mendako-chan After School",
    category: "original",
    year: "2024",
    tags: ["original", "mendako"],
    image: "../assets/images/original/mendako_dsk.png",
    alt: "Original mini character illustration",
  },
  {
    id: "original-mendako-soft-2024",
    title: "Crying Mendako-chan",
    category: "original",
    year: "2024",
    tags: ["original", "mendako"],
    image: "../assets/images/original/mendako_naki.png",
    alt: "Original mascot-style illustration",
  },
  {
    id: "original-mendako-seihuku-2025",
    title: "Mendako-chan School uniform",
    category: "original",
    year: "2025",
    tags: ["original", "mendako"],
    image: "../assets/images/original/Mendako_seihuku_2025.png",
    alt: "Original illustration archive item",
  },
  {
    id: "original-angel-2022",
    title: "Dark Angel",
    category: "original",
    year: "2022",
    tags: ["original", "girl"],
    image: "../assets/images/original/original_angel.PNG",
    alt: "Original illustration archive item",
  },
  {
    id: "original-mendako-hikari-2025",
    title: "Mendako Sun-Light",
    category: "original",
    year: "2025",
    tags: ["original", "mendako"],
    image: "../assets/images/original/mendako_hikari_2025.JPG",
    alt: "Original illustration archive item",
  },
  {
    id: "anime-character-study-2024",
    title: "Anime Character Study",
    category: "anime",
    year: "2022",
    tags: ["anime", "character"],
    image: "../assets/images/anime/favorite_chara.PNG",
    alt: "Anime-style character illustration",
  },
  {
    id: "anime-blue-character-2024",
    title: "Blue achieve Hosino",
    category: "anime",
    year: "2024",
    tags: ["anime", "Blue Archive"],
    image: "../assets/images/anime/hoshino.PNG",
    alt: "Anime-style character illustration with blue tones",
  },
  {
    id: "anime-digital-study-2024",
    title: "Hatsune Miku AIMAINA",
    category: "anime",
    year: "2024",
    tags: ["anime", "digital"],
    image: "../assets/images/anime/miku_fa.PNG",
    alt: "Anime-style digital character illustration",
  },
  {
    id: "anime-flandre-scarlet-2022",
    title: "Flandre Scarlet",
    titleUrl: "https://en.touhouwiki.net/wiki/Flandre_Scarlet",
    category: "anime",
    year: "2022",
    tags: ["Touhou"],
    image: "../assets/images/anime/flandal.JPG",
    alt: "Flandre Scarlet anime-style illustration",
  },
  {
    id: "food-filipino-plate-2026",
    title: "Filipino Food",
    category: "food",
    year: "2026",
    tags: ["food", "Philippines"],
    image: "../assets/images/food/fillipino_food1.png",
    alt: "Food illustration inspired by a meal",
  },
  {
    id: "food-taiwan-dessert-2025",
    title: "Taiwan Food 1",
    category: "food",
    year: "2025",
    tags: ["food", "Taiwan"],
    image: "../assets/images/food/taiwan_food2.JPG",
    alt: "Food illustration from a Taiwan-inspired sketch",
  },
  {
    id: "food-taiwan-note-2025",
    title: "Taiwan Food 2",
    category: "food",
    year: "2025",
    tags: ["food", "Taiwan"],
    image: "../assets/images/food/taiwan_food1.JPG",
    alt: "Food illustration archive note",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const modal = document.querySelector("[data-modal]");
  const modalImage = modal?.querySelector("img");
  const modalClose = modal?.querySelector(".modal-close");

  function createWorkCard(work) {
    const article = document.createElement("article");
    article.className = "work-card";
    article.dataset.category = work.category;

    const tags = (work.tags ?? [])
      .filter(Boolean)
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
    const meta = [
      `<span class="tag">${categoryLabels[work.category]}</span>`,
      work.year ? `<span class="tag">${work.year}</span>` : "",
    ].join("");
    const title = work.titleUrl
      ? `<h3><a href="${work.titleUrl}" target="_blank" rel="noopener noreferrer">${work.title}</a></h3>`
      : work.title
        ? `<h3>${work.title}</h3>`
        : "";
    const tagRow = tags ? `<p>${tags}</p>` : "";

    article.innerHTML = `
      <button class="work-image js-open-modal" type="button" data-src="${work.image}" data-alt="${work.alt}">
        <img src="${work.image}" alt="${work.alt}" onerror="this.parentElement.classList.add('is-missing'); this.remove()" />
      </button>
      <div class="work-body">
        <div class="work-meta">
          ${meta}
        </div>
        ${title}
        ${tagRow}
      </div>
    `;

    return article;
  }

  function renderGallery() {
    const grid = document.querySelector("[data-gallery-grid]");

    if (!grid) {
      return;
    }

    const displayWorks = works
      .map((work, index) => ({ ...work, index }))
      .sort((a, b) => {
        if (a.category === "fanart" && b.category === "fanart") {
          return Number(b.year || 0) - Number(a.year || 0) || a.index - b.index;
        }

        if (a.category === "fanart") {
          return -1;
        }

        if (b.category === "fanart") {
          return 1;
        }

        return a.index - b.index;
      });

    grid.replaceChildren(...displayWorks.map(createWorkCard));
    setupFilters(grid);
  }

  function setupFilters(grid) {
    const buttons = document.querySelectorAll("[data-filter]");
    const emptyState = document.querySelector("[data-empty-state]");
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get("category") || "all";

    function applyFilter(category) {
      let visibleCount = 0;

      grid.querySelectorAll(".work-card").forEach((card) => {
        const shouldShow = category === "all" || card.dataset.category === category;
        card.hidden = !shouldShow;

        if (shouldShow) {
          visibleCount += 1;
        }
      });

      buttons.forEach((button) => {
        const isActive = button.dataset.filter === category;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        applyFilter(button.dataset.filter);
      });
    });

    applyFilter(categoryLabels[initialCategory] ? initialCategory : "all");
  }

  function openModal(src, alt) {
    if (!modal || !modalImage) {
      return;
    }

    modalImage.src = src;
    modalImage.alt = alt;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modalClose?.focus();
  }

  function closeModal() {
    if (!modal || !modalImage) {
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.removeAttribute("src");
    modalImage.alt = "";
  }

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest(".js-open-modal");

    if (trigger) {
      openModal(trigger.dataset.src, trigger.dataset.alt);
    }

    if (event.target === modal) {
      closeModal();
    }
  });

  modalClose?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  if (page === "gallery") {
    renderGallery();
  }
});
