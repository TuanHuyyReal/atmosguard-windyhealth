const userSession = JSON.parse(localStorage.getItem("user_session")) || null;
const now = new Date().getTime();
const userBtnEle = document.querySelector("button.action-btn.btn.btn-light");
const handleLogout = () => {
  localStorage.removeItem("user_session");
  window.location.href = "index.html";
};
if (userSession && now < userSession.expiry) {
  // User is logged in
  console.log("User is logged in:", userSession);

  if (userBtnEle) {
    userBtnEle.textContent = `Hi, ${userSession.username.split("@")[0]}`;
  }

  const userMenu = `
    <div class="hidden user-menu position-fixed bg-light border rounded-3 shadow p-3" style="top: 90%; right: 7%;color:var(--primary-color)">
        <p class="mb-2">Username: <strong>${
          userSession.username.split("@")[0]
        }</strong></p>
        <button id="logout-btn" class="btn btn-danger w-100 fs-16" onclick="handleLogout()">Logout</button>
    </div>
  `;
  userBtnEle.addEventListener("click", () => {
    const menu = document.querySelector(".user-menu");
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    const menu = document.querySelector(".user-menu");
    if (!userBtnEle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  document.querySelector(".menu").innerHTML = userMenu;
} else {
  // User is not logged in
  console.log("User is not logged in");

  const userMenu = `
    <div class="hidden user-menu position-fixed bg-light border rounded-3 shadow p-3" style="top: 100%; right: 5%;color:var(--primary-color)">
        <a href="login.html" class="btn btn-primary w-100 fs-16 mb-2">Login</a>
        <a href="register.html" class="btn btn-success w-100 fs-16">Register</a>
    </div>
  `;
  userBtnEle.addEventListener("click", () => {
    const menu = document.querySelector(".user-menu");
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    const menu = document.querySelector(".user-menu");
    if (!userBtnEle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  document.querySelector(".menu").innerHTML = userMenu;
}
