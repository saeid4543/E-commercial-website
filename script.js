// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // Highlight the active navbar link based on the current page
  const navbarLinks = document.querySelectorAll("#navbar a");
  const currentPage = window.location.pathname.split("/").pop();

  navbarLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
//orginal
  // Add product to cart when cart button is clicked
  const cartButtons = document.querySelectorAll(".cart"); 
  cartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      // Find the closest product element
      const product = button.closest(".pro"); 
      // Get product details: name, price, and image
      const name = product.querySelector(".des h5").textContent.trim();
      const price = product.querySelector(".des h4").textContent.trim();
      const image = product.querySelector("img").src;
         
      // Retrieve cart from localStorage or initialize as empty array
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // Check if product already exists in cart
      const existing = cart.find((item) => item.name === name);
      if (existing) {
        // If exists, increment quantity
        existing.qty += 1;
      } else {
        // If not, add new product with qty 1
        cart.push({ name, price, image, qty: 1 });
      }
      // Save updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Show a toast notification
      showToast(`${name} added to cart!`);
    });
  });


});
// Add product detail redirect
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pro").forEach((product) => {
    product.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart")) return; // ignore cart clicks

      const name = product.querySelector(".des h5").textContent;
      const price = product.querySelector(".des h4").textContent;
      const image = product.querySelector("img").src;

      const description = "Experience cutting-edge performance, sleek design, and all-day battery life — perfect for work, play, and everything in between.";

      localStorage.setItem("productDetail", JSON.stringify({ name, price, image, description }));
      window.location.href = "product.html";
    });
  });
});
// Add single product to cart from product details page
  const addSingleCartBtn = document.querySelector(".add-single-cart");
if (addSingleCartBtn) {
  addSingleCartBtn.addEventListener("click", () => {
    const productImage = document.querySelector("#product-image").src;
    const productName = document.querySelector("#product-name").textContent;
    const productPrice = document.querySelector("#product-price").textContent;
    const qty = parseInt(document.querySelector("input[type='number']").value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.name === productName);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name: productName, price: productPrice, image: productImage, qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`${productName} added to cart!`);
  });
}
// Show a temporary toast message on the screen
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1000); // Remove after 1 second
}
