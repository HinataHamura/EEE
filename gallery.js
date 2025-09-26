"use strict";

/** Gallery container */
const galleryContainer = document.getElementById("gallery");
let memes = [];
let currentIndex = 0;

/** Load memes from JSON */
fetch("memes.json")
  .then(response => response.json())
  .then(data => {
    memes = data;
    renderGallery();
  })
  .catch(err => console.error("Error loading memes:", err));

/** Render gallery */
function renderGallery() {
  memes.forEach((src, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `<img src="${src}" alt="Meme ${index + 1}" loading="lazy">`;
    galleryContainer.appendChild(item);

    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });
}

/** Lightbox structure */
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <span class="close">&times;</span>
  <span class="prev">&#10094;</span>
  <img class="lightbox-content" id="lightbox-img">
  <span class="next">&#10095;</span>
`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = lightbox.querySelector(".close");
const nextBtn = lightbox.querySelector(".next");
const prevBtn = lightbox.querySelector(".prev");

/** Open lightbox at given index */
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = memes[currentIndex];
}

/** Navigation */
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % memes.length;
  lightboxImg.src = memes[currentIndex];
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + memes.length) % memes.length;
  lightboxImg.src = memes[currentIndex];
};

/** Close lightbox */
closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

lightbox.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};

/** Keyboard support */
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.onclick();
    if (e.key === "ArrowLeft") prevBtn.onclick();
    if (e.key === "Escape") closeBtn.onclick();
  }
});
