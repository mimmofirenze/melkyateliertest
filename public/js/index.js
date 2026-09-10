const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll('#menu a');
const navbar = document.getElementById("top-navbar");

const loader = document.getElementById('loader');

const track = document.getElementById("track");
const pages = track.querySelectorAll(".grid-wrapper");
const prev = document.getElementById("prev-button");
const next = document.getElementById("next-button");
const indicators = document.querySelectorAll(".galleria-page-indicator");
const imgExpandable = document.querySelectorAll('.img-container img');

const revealEls = document.querySelectorAll(".bio-content-wrapper, .bio-citazioni, .su-misura-wrapper, .galleria-navbar, .galleria h1");

const navLinks = document.querySelectorAll('.top-navbar-menu a');

//PAGE LOADER ANIMATION
function hideLoader() {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.querySelector('.hero-content').classList.add('animated');
    revealEls.forEach(item => {
      item.classList.remove('show');
    })
  }, 2000);
}

loader.addEventListener("transitionend", () => {
  loader.classList.add('noindex');
});

window.addEventListener('load', hideLoader);

//ON LOAD AUTOSCROLL TO TOP
window.addEventListener("load", () => {
  const hash = window.location.hash;

  window.scrollTo(0, 0);

  if (hash) {
    setTimeout(() => {
      const target = document.querySelector(hash);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 2000);
  }
});

//HERO SCALE ON SCROLL
const heroBg = document.querySelector(".hero");

const startScale = 1.0;
const endScale = 1.15;
const maxScroll = 400;

window.addEventListener("scroll", () => {
  const scroll = Math.min(window.scrollY, maxScroll);
  const progress = scroll / maxScroll;

  const scale = startScale - (startScale - endScale) * progress;

  heroBg.style.transform = `scale(${scale})`;
}, { passive: true });

//HERO BACKGROUND IMAGE CHANGES
const heroBackgroundsDesktop = [
  "../images/DSCF2116.webp",
  "../images/1769096489432.webp",
  "../images/1768813041199.webp"
];

const heroBackgroundsMobile = [
  "../images/1768813041164.webp",
  "../images/1768813174880.webp",
  "../images/1768812680435.webp"
];

const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");

let indexHero = 0;
let showingBg1 = true;

// detect mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// choose correct set
const heroBackgrounds = isMobile ? heroBackgroundsMobile : heroBackgroundsDesktop;

// preload images
heroBackgrounds.forEach(src => {
  const img = new Image();
  img.src = src;
});

// init
bg1.style.backgroundImage = `url("${heroBackgrounds[indexHero]}")`;
bg2.style.backgroundImage = `url("${heroBackgrounds[(indexHero + 1) % heroBackgrounds.length]}")`;

setInterval(() => {
  const nextIndexHero = (indexHero + 1) % heroBackgrounds.length;

  if (showingBg1) {
    bg2.style.backgroundImage = `url("${heroBackgrounds[nextIndexHero]}")`;
    bg2.style.opacity = "1";
    bg1.style.opacity = "0";
  } else {
    bg1.style.backgroundImage = `url("${heroBackgrounds[nextIndexHero]}")`;
    bg1.style.opacity = "1";
    bg2.style.opacity = "0";
  }

  showingBg1 = !showingBg1;
  indexHero = nextIndexHero;

}, 6000);


//ON SCROLL NAVBAR OPACITY CHANGE
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // scrolling DOWN
    navbar.classList.add("scrolled");
  } else {
    // scrolling UP
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

//HAMBURGER MENU ANIMATION
let menuOpen = false;

hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
    hamburger.classList.toggle("active");
    navbar.classList.toggle("menu-open");
});

//MENU CLOSES AFTER REDIRECTING
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    hamburger.classList.remove("active");
    console.log('ecco mimmo');
    navbar.classList.remove("scrolled");
    navbar.classList.remove("menu-open");
  });
});

//ELEMENTS NICE FADEIN WHEN SCROLLING
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -30% 0px"
});

revealEls.forEach(el => observer.observe(el));

//GALLERIA PRE-LOAD IMAGES
const images = [
  "../images/1768812680435.webp",
  "../images/1768812680459.webp",
  "../images/1768812817426.webp",
  "../images/1768812817451.webp",
  "../images/1768813041164.webp",
  "../images/1768813041199.webp",
  "../images/1768813088695.webp",
  "../images/1768813088714.webp",
  "../images/1768813174862.webp",
  "../images/1768813174880.webp",
  "../images/1768813308857.webp",
  "../images/1769096489432.webp",
  "../images/1769098610432.webp",
  "../images/DSCF1614.webp",
  "../images/DSCF1624.webp",
  "../images/DSCF1634.webp",
  "../images/DSCF1694.webp",
  "../images/DSCF1700.webp",
  "../images/DSCF1749.webp",
  "../images/DSCF1845.webp",
  "../images/DSCF1888.webp",
  "../images/DSCF1979.webp",
  "../images/DSCF2077.webp",
];

function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
  console.log('imgs loaded');
});

//GALLERIA SCROLL ON ARROW CLICK
let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    prev.disabled = index === 0;
    next.disabled = index === pages.length - 1;

    indicators.forEach((line, i) => {
    line.classList.toggle("active", i === index);
  });
  }

  prev.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    update();
  });

  next.addEventListener("click", () => {
    index = Math.min(pages.length - 1, index + 1);
    update();
  });

  update();

//IMG EXPAND AND CLOSE ON CLICK 
imgExpandable.forEach(img => {
    img.addEventListener("click", () => {
      console.log("johnny");
      img.classList.toggle("expanded");
    })
});

//LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.addEventListener("click", (e) => {
  const img = e.target.closest(".img-container img");
  if (!img) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

//REVIEWS SECTION

let currentIndex = 0;
let reviewsTrack;
let total;

function loadReviews() {
  const service = new google.maps.places.PlacesService(document.createElement("div"));

  service.getDetails(
    {
      placeId: "ChIJA_ya4olVKhMRJ9ethvdidDI",
      fields: ["name", "rating", "reviews"]
    },
    (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) return;

      const container = document.querySelector(".reviews");

      container.innerHTML = `
        <div class="reviews-track">
          ${place.reviews.map(review => `
            <div class="review-card lato-light">
              <h3>${review.author_name}</h3>
              <p>${"⭐".repeat(review.rating)}</p>
              <p>${review.text}</p>
              <small>${review.relative_time_description}</small>
            </div>
          `).join("")}
        </div>
      `;

      reviewsTrack = document.querySelector(".reviews-track");
      total = place.reviews.length;

      startReviewsSlider();
    }
  );
}

function showReview(index) {
  reviewsTrack.style.transform = `translateX(-${index * 100}%)`;
}

function startReviewsSlider() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    showReview(currentIndex);
  }, 4000);
}

window.addEventListener("load", loadReviews);