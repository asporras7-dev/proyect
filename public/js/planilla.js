import { postPlanilla, getPlanilla } from "../services/planilla.js";

//DOM
const datoEmpleado = document.getElementById("empleado");
const puesto = document.getElementById("puesto");
const departamento = document.getElementById("departamento");
const salarioBase = document.getElementById("salarioBase");
const horasExtra = document.getElementById("horasExtra");
const rebajos = document.getElementById("rebajos");
const salarioNeto = document.getElementById("salarioNeto");
const horasMensuales = document.getElementById("horasMensuales");
const btnGuardar = document.getElementById("btnGuardar");
const btnVer = document.getElementById("btnVer");
const btnActualizar = document.getElementById("btnActualizar");
const btnEliminar = document.getElementById("btnEliminar");


// POST
// EVENTO BOTÓN GUARDAR
btnGuardar.addEventListener("click", async function () {
    if (!datoEmpleado.value || !puesto.value || !departamento.value || !salarioBase.value || !horasExtra.value || !rebajos.value) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }
    // Cálculo automático del salario neto
    const calculoSalarioNeto = parseFloat(salarioBase.value) + parseFloat(horasExtra.value) - parseFloat(rebajos.value);
    salarioNeto.value = calculoSalarioNeto;


    const info = {
        datoEmpleado: datoEmpleado.value,
        puesto: puesto.value,
        departamento: departamento.value,
        salarioBase: parseFloat(salarioBase.value), // parseFloat para convertir a número
        horasExtra: parseFloat(horasExtra.value),
        rebajos: parseFloat(rebajos.value),
        horasMensuales: parseFloat(horasMensuales.value),
        salarioNeto: calculoSalarioNeto
    };

    console.log("1. Enviando planilla al servidor...", info);
    const resultado = await postPlanilla(info);
    console.log("2. El servidor respondió con:", resultado);
    if (resultado && resultado.id) {
        Swal.fire({
            title: "¡Éxito!",
            text: "Registro con éxito",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }
});

//GET

async function llenarPlanilla() {

    const tabla = document.getElementById("tablaPlanilla");
    const datosPlanilla = await getPlanilla();

    datosPlanilla.forEach((planilla) => {
        const fila = document.createElement("tr");
        const tdNombre = document.createElement("td")
        const tdPuesto = document.createElement("td")
        const tdDepartamento = document.createElement("td")
        const tdSalarioBase = document.createElement("td")
        const tdHorasExtra = document.createElement("td")
        const tdRebajos = document.createElement("td")
        const tdSalarioNeto = document.createElement("td")
        const tdMontoHoras = document.createElement("td")

        tdNombre.style.cursor = "pointer"


        fila.appendChild(tdNombre);
        fila.appendChild(tdPuesto);
        fila.appendChild(tdDepartamento);
        fila.appendChild(tdSalarioBase);
        fila.appendChild(tdHorasExtra);
        fila.appendChild(tdRebajos);
        fila.appendChild(tdSalarioNeto);

        tabla.appendChild(fila);

        tdNombre.textContent = planilla.datoEmpleado;
        tdPuesto.textContent = planilla.puesto;
        tdDepartamento.textContent = planilla.departamento;
        tdSalarioBase.textContent = planilla.salarioInteligente;
        tdHorasExtra.textContent = planilla.horasExtra;
        tdRebajos.textContent = planilla.rebajos;
        tdSalarioNeto.textContent = planilla.salarioInteligente - planilla.rebajos;
    });

}

llenarPlanilla()
//EVENTO BOTÓN VER PLANILLA
