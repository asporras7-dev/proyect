import { getUsuarios, postUsuarios } from "../services/serviceslogin.js";

const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const mensaje = document.getElementById("mensaje");

async function iniciarSesion() {
    const correo = document.getElementById("correo");
    const contrasenha = document.getElementById("contrasenha");

    if (correo.value === "" || contrasenha.value === "") {
        mensaje.textContent = "Complete todos los campos"
        return // Freno
    }

    const usuariosRegistrados = await getUsuarios()

    const usuarioExiste = usuariosRegistrados.find((usuario) => usuario.correo === correo.value && usuario.contrasenha === contrasenha.value)

    if (!usuarioExiste) {
        mensaje.textContent = "Correo o contraseña incorrectos"
        return // Freno

    } else {
        localStorage.setItem("usuario", JSON.stringify(usuarioExiste))
        if (usuarioExiste.rol === "ciudadano") {
            window.location.href = "../pages/dashboard-ciudadano.html"
            return
        } else {
            window.location.href = "../pages/dashboard-admin.html"
            return
        }
    }

}

btnIniciarSesion.addEventListener("click", () => {
    iniciarSesion()
})