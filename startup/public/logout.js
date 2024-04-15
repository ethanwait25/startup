async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    await fetch("/api/auth/logout", {
      method: 'delete',
    }).then(() => window.location.href = "index.html");
}