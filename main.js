const homeSection = document.getElementById("homeSection");
const productsSection = document.getElementById("productsSection");
const singleProductSection = document.getElementById("singleProductSection");

const productContainer = document.getElementById("productContainer");
const categoryContainer = document.getElementById("categoryContainer");

const homeBtn = document.getElementById("homeBtn");
const productsBtn = document.getElementById("productsBtn");


// ------------------- NAVIGATION -------------------

homeBtn.addEventListener("click", () => {
  homeSection.classList.remove("hidden");
  productsSection.classList.add("hidden");
  singleProductSection.classList.add("hidden");
});

productsBtn.addEventListener("click", () => {
  homeSection.classList.add("hidden");
  productsSection.classList.remove("hidden");
  singleProductSection.classList.add("hidden");

  loadProducts();
  loadCategories();
});


// ------------------- LOAD ALL PRODUCTS -------------------

async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  displayProducts(data);
}

function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(product => {
    productContainer.innerHTML += `
      <div class="bg-white p-4 rounded-lg shadow">
        <img src="${product.image}" 
             class="h-40 mx-auto object-contain mb-4" />

        <h3 class="font-semibold text-sm mb-2">
          ${product.title.slice(0, 40)}...
        </h3>

        <p class="text-lg font-bold mb-2">$${product.price}</p>

        <button onclick="loadSingleProduct(${product.id})"
          class="bg-blue-700 text-white px-4 py-2 rounded w-full">
          Details
        </button>
      </div>
    `;
  });
}


// ------------------- LOAD CATEGORIES -------------------

async function loadCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();

  categoryContainer.innerHTML = `
    <button onclick="loadProducts()" 
      class="px-4 py-2 bg-blue-600 text-white rounded">
      All
    </button>
  `;

  categories.forEach(cat => {
    categoryContainer.innerHTML += `
      <button onclick="loadByCategory('${cat}')"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-blue-600 hover:text-white">
        ${cat}
      </button>
    `;
  });
}


// ------------------- FILTER BY CATEGORY -------------------

async function loadByCategory(category) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = await res.json();

  displayProducts(data);
}


// ------------------- SINGLE PRODUCT -------------------

async function loadSingleProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  homeSection.classList.add("hidden");
  productsSection.classList.add("hidden");
  singleProductSection.classList.remove("hidden");

  singleProductSection.innerHTML = `
    <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
      
      <img src="${product.image}" 
           class="h-80 object-contain mx-auto" />

      <div>
        <h2 class="text-2xl font-bold mb-4">${product.title}</h2>
        <p class="text-gray-600 mb-4">${product.description}</p>
        <p class="text-2xl font-bold mb-4">$${product.price}</p>

        <button onclick="goBackToProducts()"
          class="bg-purple-600 text-white px-6 py-2 rounded">
          Back
        </button>
      </div>

    </div>
  `;
}

function goBackToProducts() {
  singleProductSection.classList.add("hidden");
  productsSection.classList.remove("hidden");
}