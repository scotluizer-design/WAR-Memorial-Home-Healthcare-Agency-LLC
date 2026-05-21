const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const slides = [...document.querySelectorAll(".hero-slide")];
let slideIndex = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, 5600);
}

const animatedSelectors = [
  ".section-heading",
  ".service-card",
  ".feature",
  ".step-card",
  "blockquote",
  ".value-card",
  ".portal-card",
  ".gallery-item",
  ".legacy-card",
  ".rounded-image",
  ".check-card",
  ".contact-panel",
  ".care-form",
  ".timeline",
  ".cta-band"
].join(",");

document.querySelectorAll(animatedSelectors).forEach((item) => item.classList.add("reveal"));

document.querySelectorAll(".service-grid, .feature-grid, .step-grid, .quote-grid, .value-grid, .portal-grid, .gallery-grid").forEach((group) => {
  [...group.children].forEach((child, index) => {
    child.style.setProperty("--reveal-delay", `${Math.min(index * 90, 540)}ms`);
  });
});

const revealItems = [...document.querySelectorAll(".reveal")];

function updateReveals() {
  const trigger = window.innerHeight * 0.88;
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > 0) {
      item.classList.add("visible");
    } else if (rect.top > window.innerHeight) {
      item.classList.remove("visible");
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else if (entry.boundingClientRect.top > window.innerHeight) {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));
requestAnimationFrame(updateReveals);
window.addEventListener("load", updateReveals);
window.addEventListener("scroll", updateReveals, { passive: true });
window.addEventListener("resize", updateReveals);

const counters = [...document.querySelectorAll("[data-counter]")];
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = Number(el.dataset.counter);
      const duration = 1100;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(end * progress);
        el.textContent = String(value);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    if (message) {
      message.textContent = "Thank you. Your message is ready to be connected to a secure form service.";
    }
    form.reset();
  });
});

const filterButtons = [...document.querySelectorAll(".filter-btn")];
const galleryItems = [...document.querySelectorAll(".gallery-item")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    galleryItems.forEach((item) => {
      const show = filter === "All" || item.dataset.category === filter;
      item.hidden = !show;
    });
  });
});

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("p");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      lightboxImage.src = button.dataset.lightbox;
      lightboxImage.alt = button.dataset.caption || "Gallery preview";
      lightboxCaption.textContent = button.dataset.caption || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      lightboxClose.focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
}

document.querySelectorAll("[data-placeholder-login]").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Secure portal coming soon";
    button.disabled = true;
  });
});
