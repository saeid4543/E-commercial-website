document.addEventListener("DOMContentLoaded", () => {
  // LOGIN PAGE LOGIC
  const registerBtn = document.getElementById("register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      window.location.href = "signup.html";
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();
      if (email && password) {
        alert(`Logged in successfully as ${email}`);
        window.location.href = "shop.html";
      } else {
        alert("Please fill in both fields.");
      }
    });
  }

  // SIGNUP PAGE LOGIC
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value.trim();
      if (name && email && password) {
        alert(`Account created successfully for ${name}`);
        window.location.href = "login.html";
      } else {
        alert("Please fill in all fields.");
      }
    });
  }
});
