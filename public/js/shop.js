const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll('#menu a');
const navbar = document.getElementById("top-navbar");

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

//API FOR products

async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const container = document.querySelector("#products");

  container.innerHTML = products.map(product => `
    <div class="product-card lato-light">
      <img src="${product.image}" alt="${product.name}">

      <div class="product-info">
        <h3>${product.name}</h3>
        <strong>€${product.price}</strong>
      </div>
    </div>
  `).join("");
}

loadProducts();


//PRODUCT ON CLICK OPENS

const overlay = document.querySelector('.product-overlay');

document.addEventListener('click', e => {
  const card = e.target.closest('.product-card');

  if (!card) return;

      overlay.classList.add('active');
      
});


document.addEventListener('click', e => {

  // if overlay not open stop
  if (!overlay.classList.contains('active')) return;

  // clicked INSIDE overlay
  if (overlay.contains(e.target)) return;

  // clicked a card
  if (e.target.closest('.product-card')) return;

  // otherwise close
  overlay.classList.remove('active');

});