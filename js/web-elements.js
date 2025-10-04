// search bar
const logo = document.getElementById("logo");
const search_bar = document.querySelector(".search-bar");
logo.addEventListener("click", function () {
  search_bar.classList.toggle("active");
});


// close chatbot when clicking outside
document.addEventListener("click", function (event) {
  const chatbot = document.getElementById("chatbot");
  if (chatbot.style.display === "block" && !chatbot.contains(event.target)) {
    chatbot.style.display = "none";
  }
  const searchBar = document.querySelector(".search-bar");
  if (
    searchBar.classList.contains("active") &&
    !searchBar.contains(event.target) &&
    event.target !== logo
  ) {
    searchBar.classList.remove("active");
  }
});

// animation
document.querySelectorAll("a.bare-link").forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.animation = "scaleOut 0.5s ease-in-out";
  });
  link.addEventListener("mouseleave", () => {
    link.style.animation = "";
  });
});
