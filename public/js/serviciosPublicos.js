//=================================PROCESO GESTIÓN DE SERVICIOS=======================================

import { postGestion, getGestion, getGestionById, patchGestion, deleteGestion } from "../services/serviciosPublicos.js";

// DOM
const servicio      = document.getElementById("servicio");
const descripcion   = document.getElementById("descripcion");
const responsable   = document.getElementById("responsable");
const estado        = document.getElementById("estado");
const guardar       = document.getElementById("guardar");
const mensaje       = document.getElementById("mensaje");
const btnMostrar    = document.getElementById("Mostrar");
const divServicios  = document.getElementById("divServicios");


// POST - Registrar servicio
guardar.addEventListener("click", async function () {

    if (!servicio.value || !descripcion.value || !responsable.value || !estado.value) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }

    const servicioDatos = {
        tipoServicio: servicio.value,
        descripcion:  descripcion.value,
        responsable:  responsable.value,
        estado:       estado.value
    };

    const resultado = await postGestion(servicioDatos);

    if (resultado && resultado.id) {
        mensaje.textContent = "✅ Servicio registrado con éxito";
    }
});


// GET - Mostrar todos los servicios
btnMostrar.addEventListener("click", async function () {

   divServicios.textContent = "";

    const resultado = await getGestion();

    resultado.forEach((serv) => {

        const div = document.createElement("div");
        const p   = document.createElement("p");

        const btnDetalle  = document.createElement("button");
        const btnEditar   = document.createElement("button");
        const btnEliminar = document.createElement("button");

        p.textContent           = `🔧 ${serv.tipoServicio} - ${serv.estado}`;
        btnDetalle.textContent  = "Ver detalle";
        btnEditar.textContent   = "Editar";
        btnEliminar.textContent = "Eliminar";

        div.appendChild(p);
        div.appendChild(btnDetalle);
        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
        divServicios.appendChild(div);


        // GET por ID - Ver detalle
        btnDetalle.addEventListener("click", async () => {
            const detalle = await getGestionById(serv.id);
            alert(
                `🔧 Tipo: ${detalle.tipoServicio}\n` +
                `📝 Descripción: ${detalle.descripcion}\n` +
                `👤 Responsable: ${detalle.responsable}\n` +
                `🔄 Estado: ${detalle.estado}`
            );
        });


        // PATCH - Editar responsable
        btnEditar.addEventListener("click", async () => {
            const inputResponsable = document.createElement("input");
            const btnConfirmar     = document.createElement("button");
            
            inputResponsable.value       = serv.responsable;
            btnConfirmar.textContent     = "Confirmar";

            div.appendChild(inputResponsable);
            div.appendChild(btnConfirmar);

            btnConfirmar.addEventListener("click", async () => {
                const actualizado = {
                    responsable: inputResponsable.value
                };

                await patchGestion(actualizado, serv.id);

                inputResponsable.remove();
                btnConfirmar.remove();
            });
        });


        // DELETE - Eliminar servicio
        btnEliminar.addEventListener("click", async () => {
            const confirmar = confirm(`¿Eliminar "${serv.tipoServicio}"?`);

            if (confirmar) {
                await deleteGestion(serv.id);
                div.remove();
            }
        });

    });
});