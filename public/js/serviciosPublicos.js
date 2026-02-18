//=================================PROCESO GESTIÓN DE SERVICIOS=======================================

import { postGestion, getGestion, getGestionById, patchGestion, deleteGestion } from "../services/serviciosPublicos.js";

// DOM
const servicio = document.getElementById("servicio");
const descripcion = document.getElementById("descripcion");
const responsable = document.getElementById("responsable");
const estado = document.getElementById("estado");
const guardar = document.getElementById("guardar");
const mensaje = document.getElementById("mensaje");
const btnMostrar = document.getElementById("Mostrar");
const divServicios = document.getElementById("divServicios");


// POST - Registrar servicio
guardar.addEventListener("click", async function () {

    if (!servicio.value || !descripcion.value || !responsable.value || !estado.value) {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    const servicioDatos = {
        tipoServicio: servicio.value,
        descripcion: descripcion.value,
        responsable: responsable.value,
        estado: estado.value
    };

    const resultado = await postGestion(servicioDatos);

    if (resultado && resultado.id) {
        Swal.fire({
            title: "¡Éxito!",
            text: "Proyecto registrado con éxito",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }
});


// GET - Mostrar todos los servicios
btnMostrar.addEventListener("click", async function () {

    divServicios.textContent = "";

    const resultado = await getGestion();

    resultado.forEach((serv) => {

        const div = document.createElement("div");
        const p = document.createElement("p");

        const btnDetalle = document.createElement("button");
        const btnEditar = document.createElement("button");
        const btnEliminar = document.createElement("button");

        p.textContent = `🔧 ${serv.tipoServicio} - ${serv.estado}`;
        btnDetalle.textContent = "Ver detalle";
        btnEditar.textContent = "Editar";
        btnEliminar.textContent = "Eliminar";

        div.appendChild(p);
        div.appendChild(btnDetalle);
        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
        divServicios.appendChild(div);


        // GET por ID - Ver detalle
        // GET por ID - Ver detalle
        btnDetalle.addEventListener("click", async () => {
            const detalle = await getGestionById(serv.id);

            // Limpiar detalles previos
            const detalleAnterior = div.querySelector(".detalle-info");
            if (detalleAnterior) detalleAnterior.remove();

            const divDetalle = document.createElement("div");
            divDetalle.className = "detalle-info";

            divDetalle.innerHTML = `
        <p>🔧 Tipo: ${detalle.tipoServicio}</p>
        <p>📝 Descripción: ${detalle.descripcion}</p>
        <p>👤 Responsable: ${detalle.responsable}</p>
        <p>🔄 Estado: ${detalle.estado}</p>
    `;

            div.appendChild(divDetalle);
        });


        
      // PATCH - Editar todos los campos
btnEditar.addEventListener("click", async () => {

    // Limpiar detalles si existen
    const detalleAnterior = div.querySelector(".detalle-info");
    if (detalleAnterior) detalleAnterior.remove();

    const inputTipo         = document.createElement("input");
    const inputDescripcion  = document.createElement("input");
    const inputResponsable  = document.createElement("input");
    const inputEstado       = document.createElement("input");
    const btnConfirmar      = document.createElement("button");

    inputTipo.value         = serv.tipoServicio;
    inputDescripcion.value  = serv.descripcion;
    inputResponsable.value  = serv.responsable;
    inputEstado.value       = serv.estado;
    btnConfirmar.textContent = "Confirmar";

    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(inputTipo);
    div.appendChild(document.createElement("br"));
    div.appendChild(inputDescripcion);
    div.appendChild(document.createElement("br"));
    div.appendChild(inputResponsable);
    div.appendChild(document.createElement("br"));
    div.appendChild(inputEstado);
    div.appendChild(document.createElement("br"));
    div.appendChild(btnConfirmar);

    btnConfirmar.addEventListener("click", async () => {
        const actualizado = {
            tipoServicio: inputTipo.value,
            descripcion:  inputDescripcion.value,
            responsable:  inputResponsable.value,
            estado:       inputEstado.value
        };

        await patchGestion(actualizado, serv.id);

        p.textContent = `🔧 ${actualizado.tipoServicio} - ${actualizado.estado}`;

        inputTipo.style.display = "none";
        inputDescripcion.style.display = "none";
        inputResponsable.style.display = "none";
        inputEstado.style.display = "none";
        btnConfirmar.style.display = "none";

                Swal.fire({
                    title: "¡Actualizado!",
                    text: "EL servicio se actualizó con éxito",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            });
        });


        // DELETE - Eliminar servicio
        btnEliminar.addEventListener("click", async () => {

            Swal.fire({
                title: "¿Estás seguro?",
                text: `Se eliminará el servicio "${serv.tipoServicio}"`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteGestion(serv.id);
                    div.remove();

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El servicio ha sido eliminado con éxito",
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    });
                }
            });
        });



    });
});