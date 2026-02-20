async function loadTrendingProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const topRated = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 3);

  const trendingContainer = document.getElementById("trendingContainer");

  trendingContainer.innerHTML = "";

  topRated.forEach((product) => {
    trendingContainer.innerHTML += `
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

        <button onclick="addToCart(${product.id})"
          class="bg-blue-700 text-white px-4 py-2 rounded-xl ">
          <i class="fa-solid fa-cart-plus"></i> Add
        </button>
    </div>  
      </div>
    `;
  });
}

loadTrendingProducts();
