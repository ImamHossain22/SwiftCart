

const openCart = () => {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="flex justify-between items-center border p-3 rounded">

        <div>
          <h4 class="font-semibold text-sm">
            ${item.title}
          </h4>
          <p>$${item.price}</p>
        </div>

        <button onclick="removeFromCart(${index})"
                class="btn btn-soft btn-sm btn-error">
          Remove
        </button>

      </div>
    `;
  });

  cartTotal.innerText = total.toFixed(2);

  document.getElementById("cartModal").showModal();
};

const removeFromCart = (index) => {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  

  updateCartCount();

  openCart();
};


