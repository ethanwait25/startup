async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    console.log("Logging out");
    await fetch("/api/auth/logout", {
      method: 'delete',
    }).then(() => window.location.href = "index.html");
}