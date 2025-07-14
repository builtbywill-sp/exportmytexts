document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger-menu");
  const navLinks = document.getElementById("nav-links");

  if (burger && navLinks) {
    // Toggle on click or keyboard
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    burger.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        navLinks.classList.toggle("open");
      }
    });

    // Close on outside click
    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !burger.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        navLinks.classList.remove("open");
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
      }
    });
  }
});

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  document.body.classList.toggle("dark-theme", contrastToggle);
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");

  loading.classList.add("modal__overlay--visible");

  fetch("http://localhost:3000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: event.target.user_name.value,
      email: event.target.user_email.value,
      message: event.target.message.value,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to send");
      return res.json();
    })
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      Toastify({
        text: "Email service is down. Contact us directly ~ help@exportmytexts.com",
        duration: 5000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#FF6B6B",
        stopOnFocus: true,
      }).showToast();
    });
}

function toggleModal() {
  isModalOpen = !isModalOpen;
  document.body.classList.toggle("modal--open", isModalOpen);
}