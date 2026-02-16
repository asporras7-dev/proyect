import { reportarProblemas } from "../services/serviciosReportes.js";

const tipo = document.getElementById("tipo");
const descripcion = document.getElementById("descripcion");
const ubicacion = document.getElementById("ubicacion");
const btnReportar = document.getElementById("btnReportar");


btnReportar.addEventListener("click", async function (e) {
    const problema = {
        tipo: tipo.value,
        descripcion: descripcion.value,
        ubicacion: ubicacion.value
    }
    e.preventDefault();
    const data = await reportarProblemas(problema)
    console.log(data);
});

