const btnCerrarSesion = document.getElementById("btnCerrarSesion");


btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "../pages/home.html"; // o la página de login
});