let cart = JSON.parse(localStorage.getItem("cart")) || [];
const updateCartCount = () => {
  document.getElementById("cartCount").innerText = cart.length;
};

updateCartCount();

const homeSection = document.getElementById("homeSection");
const productsSection = document.getElementById("productsSection");
const singleProductSection = document.getElementById("singleProductSection");

const productContainer = document.getElementById("productContainer");

const categoryContainer = document.getElementById("categoryContainer");

const homeBtn = document.getElementById("homeBtn");
const productsBtn = document.getElementById("productsBtn");

const setActiveNav = (activeBtn) => {
  [homeBtn, productsBtn].forEach((btn) => {
    btn.classList.remove("text-blue-700", "font-semibold");
    btn.classList.add("text-black");
  });

  activeBtn.classList.remove("text-black");
  activeBtn.classList.add("text-blue-700", "font-semibold");
};

homeBtn.addEventListener("click", () => {
  setActiveNav(homeBtn);

  homeSection.classList.remove("hidden");
  productsSection.classList.add("hidden");
  singleProductSection.classList.add("hidden");
});

productsBtn.addEventListener("click", () => {
  setActiveNav(productsBtn);

  homeSection.classList.add("hidden");
  productsSection.classList.remove("hidden");
  singleProductSection.classList.add("hidden");

  loadProducts();
  loadCategories();
  
});

async function loadProducts() {

  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  displayProducts(data);
}

function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class=" p-4 rounded-lg shadow">
        
      <div class= "bg-slate-200 rounded">
          <img src="${product.image}" 
             class="h-40  mx-auto object-contain mb-4" />
      </div>

        <h3 class="font-semibold text-sm mb-2">
          ${product.title.slice(0, 40)}...
        </h3>
            <div class="flex justify-between">
            <p class="text-blue-400 rounded-2xl bg-blue-100">${product.category}</p>
            <p class="text-yellow-500 font-medium">
          <i class="fa-solid fa-star"></i> ${product.rating.rate}
        </p>
        </div>
        

        <p class="text-lg font-bold my-2">$${product.price}</p>

        <div class= "flex justify-between">
        
        <button onclick="openProductModal(${product.id})"
          class=" px-4 py-2 border rounded-xl">
         <i class="fa-solid fa-eye"></i> Details
        </button>

        <button  onclick="addToCart(${product.id})"
          class="bg-blue-700 text-white px-4 py-2 rounded-xl ">
          <i class="fa-solid fa-cart-plus"></i> Add
        </button>
    </div>  
      </div>
    `;
  });

  
}
// cart function

const addToCart = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Product added to cart ✅");
};

// LOAD CATEGORIES

async function loadCategories() {
  //
  const loader = document.getElementById("categoryLoader");

  loader.classList.remove("hidden");
  categoryContainer.innerHTML = "";

  //

  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();

  categoryContainer.innerHTML = `
    <button onclick="setCategoryActive(this); loadProducts();"
      class="categoryBtn px-4 py-2 bg-blue-700 text-white rounded">
      All
    </button>
  `;

  categories.forEach((cat) => {


     const formattedName = cat
      
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(" ");



    categoryContainer.innerHTML += `
      <button  onclick="loadByCategory(\`${cat}\`);setCategoryActive(this)"
        class="categoryBtn px-4 py-2 bg-gray-200 rounded hover:bg-blue-600 hover:text-white">
         ${formattedName}
      </button>
    `;
  });

  loader.classList.add("hidden");
}

//ACTIVE CATEGORY


function setCategoryActive(clickedBtn) {

  document.querySelectorAll(".categoryBtn").forEach((btn) => {
    btn.classList.remove("bg-blue-700", "text-white");
    btn.classList.add("bg-gray-200");
  });

  clickedBtn.classList.remove("bg-gray-200");
  clickedBtn.classList.add("bg-blue-700", "text-white");
}

// FILTER CATEGORY

async function loadByCategory(category) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  );
  const data = await res.json();
  displayProducts(data);
  
}

// SINGLE PRODUCT

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
          class="bg-blue-600 text-white px-6 py-2 rounded">
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



setActiveNav(homeBtn);
