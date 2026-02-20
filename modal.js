async function openProductModal(id) {

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">

      <img src="${product.image}"
           class="h-60 object-contain mx-auto" />

      <div>
        <h2 class="text-xl font-bold mb-3">
          ${product.title}
        </h2>

        <p class="text-gray-600 mb-4">
          ${product.description}
        </p>

        <p class="text-lg font-semibold mb-2">
          💲 ${product.price}
        </p>

        <p class="text-yellow-500 mb-4">
          ⭐ ${product.rating.rate} 
          (${product.rating.count} reviews)
        </p>

        <div class="flex gap-3">
          <button class="btn btn-primary">
            Add to Cart
          </button>

          <button class="btn btn-success">
            Buy Now
          </button>
        </div>
      </div>

    </div>
  `;

  document.getElementById("productModal").showModal();
}