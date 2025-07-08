// CART PAGE LOGIC

// Global event listener for add-to-cart buttons (works for dynamically added buttons too)
document.addEventListener("click", (e) => {
  // If the clicked element has the 'add-to-cart' class
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    // Create an item object from button data attributes
    const item = {
      name: btn.dataset.name,
      price: btn.dataset.price,
      image: btn.dataset.image,
      qty: 1,
    };
    // Retrieve cart from localStorage or initialize as empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check if item already exists in cart
    const existing = cart.find((i) => i.name === item.name);
    if (existing) {
      existing.qty += 1; // Increment quantity if exists
    } else {
      cart.push(item); // Add new item if not exists
    }
    // Save updated cart and show toast
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`${item.name} added!`);
  }
});

// When the DOM is fully loaded, set up cart page logic
document.addEventListener("DOMContentLoaded", () => {
  // Get references to cart table body, total element, and checkout button
  const cartBody = document.getElementById("cart-body");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.querySelector(".btn-black");
  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Arrow function to calculate total price of cart
  const calculateTotal = (cartArr) =>
    cartArr.reduce((sum, item) => {
      const qty = item.qty && item.qty > 0 ? item.qty : 1;
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return sum + qty * priceNum;
    }, 0);

  // Render the cart table and update total
  function renderCart() {
    cartBody.innerHTML = "";
    let total = calculateTotal(cart);

    // If cart is empty, show message and set total to $0.00
    if (cart.length === 0) {
      cartBody.innerHTML = `<tr id="empty-cart-msg"><td colspan="6" class="text-center py-4">Your cart is empty.</td></tr>`;
      totalEl.textContent = `Total: $0.00`;
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }

    // For each item in cart, create a table row
    cart.forEach((item, index) => {
      const qty = item.qty && item.qty > 0 ? item.qty : 1;
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      const subtotal = qty * priceNum;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${
        item.name
      }" style="width:60px;border-radius:8px;"></td>
        <td>${item.name}</td>
        <td class="text-end">$${priceNum.toFixed(2)}</td>
        <td class="text-center">
          <input type="number" min="1" value="${qty}" data-index="${index}" class="form-control form-control-sm qty-input" style="width:50px;display:inline-block;">
        </td>
        <td class="text-end">$${subtotal.toFixed(2)}</td>
        <td><button class="btn btn-sm btn-danger remove-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button></td>
      `;
      cartBody.appendChild(row);
    });

    // Update total element and save cart
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Listen for quantity input changes for live price update
  cartBody.addEventListener("input", (e) => {
    if (e.target.classList.contains("qty-input")) {
      const idx = e.target.dataset.index;
      let qty = parseInt(e.target.value);
      if (isNaN(qty) || qty < 1) qty = 1; // Prevent invalid quantity
      cart[idx].qty = qty;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(); // Update cart and total live
    }
  });

  // Listen for remove button clicks only
  cartBody.addEventListener("click", (e) => {
    // Handle remove button
    if (e.target.closest(".remove-btn")) {
      const idx = e.target.closest(".remove-btn").dataset.index;
      const removedItemName = cart[idx].name;
      cart.splice(idx, 1); // Remove item from cart
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      showToast(`${removedItemName} removed from cart!`); // Show toast
      alert(`${removedItemName} removed from cart!`); // Show alert
    }
  });

  // Prevent checkout if cart is empty
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        e.preventDefault();
        showToast("The cart is empty");
      }
    });
  }

  // Initial render of cart
  renderCart();
});


// Function to show a temporary toast message
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1000);
}
