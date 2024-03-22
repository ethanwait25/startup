function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "index.html";
}

function register() {
  const nameEl = document.querySelector("#usernameRegister");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "create.html";
}
