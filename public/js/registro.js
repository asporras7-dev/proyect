import { getUsuarios, postUsuarios } from "../services/serviceslogin.js";

const btnRegistrarse = document.getElementById("btnRegistrarse");
const mensaje = document.getElementById("mensaje");


async function guardarUsuarios() {
    const nombreCompleto = document.getElementById("nombreCompleto");
    const cedula = document.getElementById("cedula");
    const correo = document.getElementById("correo");
    const numero = document.getElementById("numero");
    const contrasenha = document.getElementById("contrasenha");


    if (nombreCompleto.value === "" || cedula.value === "" || correo.value === "" || numero.value === "" || contrasenha.value === "") {
        mensaje.textContent = "Complete todos los campos"
        return // Freno
    }
    const objUsuario = {
        nombreCompleto: nombreCompleto.value,
        cedula: cedula.value,
        correo: correo.value,
        numero: numero.value,
        contrasenha: contrasenha.value,
        rol: "ciudadano"
    }
   
    const usuariosRegistrados = await getUsuarios()

    const correoExiste = usuariosRegistrados.find((usuario) => usuario.correo === correo.value)

    if (correoExiste) {
        mensaje.textContent = "El correo ya existe"
        return // Freno
    } else {
        const peticion = await postUsuarios(objUsuario)
        console.log(peticion);
        window.location.href = "../pages/login.html"
        // limpiarForm()

    }
}

btnRegistrarse.addEventListener("click", () => {
    guardarUsuarios()
})


function limpiarForm() {
    const nombreCompleto = document.getElementById("nombreCompleto");
    const cedula = document.getElementById("cedula");
    const correo = document.getElementById("correo");
    const numero = document.getElementById("numero");
    const contrasenha = document.getElementById("contrasenha");

    nombreCompleto.value = "";
    cedula.value = "";
    correo.value = "";
    numero.value = "";
    contrasenha.value = "";

}