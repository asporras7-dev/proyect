import { postServicio, getServicio, getServicioById, patchServicio, deleteServicio } from "../services/serviciosViales.js";

// DOM
const nombreProyecto = document.getElementById("nombreProyecto");
const descripcion = document.getElementById("decripcion");
const presupuesto = document.getElementById("presupuesto");
const fecha = document.getElementById("fecha");
const estado = document.getElementById("estado");
const guardar = document.getElementById("guardar");
const mensaje = document.getElementById("mensaje");
const fechaBuscar = document.getElementById("fechaBuscar");
const btnBuscarFecha = document.getElementById("btnBuscarFecha");
const divBusqueda = document.getElementById("divBusqueda");
const btnMostrar = document.getElementById("Mostrar");
const divProyecto = document.getElementById("divProyecto");


// EVENTO - Registrar proyecto (POST)
guardar.addEventListener("click", async function () {
    if (!nombreProyecto.value || !descripcion.value || !presupuesto.value || !fecha.value || !estado.value) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }
    const viales = {
        nombreProyecto: nombreProyecto.value,
        descripcion: descripcion.value,
        presupuesto: presupuesto.value,
        fecha: fecha.value,
        estado: estado.value
    };

    console.log("1. Enviando proyecto al servidor...", viales);
    const resultado = await postServicio(viales);
    console.log("2. El servidor respondió con:", resultado);
    if (resultado && resultado.id) {
        Swal.fire({
            title: "¡Éxito!",
            text: "Proyecto registrado con éxito",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }
});


// EVENTO - FECHA
btnBuscarFecha.addEventListener("click", async () => {

    if (!fechaBuscar.value) {
        alert("⚠️ Debe seleccionar una fecha para buscar");
        return;
    }
    divBusqueda.innerHTML = "";
    const resultado = await getServicio();
    resultado.forEach((proyecto) => {
        if (proyecto.fecha === fechaBuscar.value) {
            divBusqueda.innerHTML = `
                <p>📌 Nombre: ${proyecto.nombreProyecto}</p>
                <p>📝 Descripción: ${proyecto.descripcion}</p>
                <p>💰 Presupuesto: ${proyecto.presupuesto}</p>
                <p>📅 Fecha: ${proyecto.fecha}</p>
                <p>🔄 Estado: ${proyecto.estado}</p>
            `;
        }
    });

    if (divBusqueda.innerHTML === "") {
        divBusqueda.innerHTML = "<p>⚠️ No se encontró ningún proyecto con esa fecha</p>";
    }
});

// EVENTO - MOSTRAR TODOS LOS PROYECTOS (GET)
btnMostrar.addEventListener("click", async function () {

    divProyecto.textContent = "";

    const resultado = await getServicio();

    resultado.forEach((proyecto) => {

        const div = document.createElement("div");
        const p = document.createElement("p");

        const btnDetalle = document.createElement("button");
        const btnEditar = document.createElement("button");
        const btnEliminar = document.createElement("button");

        p.textContent = `📋 ${proyecto.nombreProyecto} - Estado: ${proyecto.estado}`;
        btnDetalle.textContent = "Ver detalle";
        btnEditar.textContent = "Editar estado";
        btnEliminar.textContent = "Eliminar";

        div.appendChild(p);
        div.appendChild(btnDetalle);
        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
        divProyecto.appendChild(div);


        // GET por ID - Ver detalle del proyecto
        btnDetalle.addEventListener("click", async () => {
            const detalle = await getServicioById(proyecto.id);

            // Limpiar detalles previos
            const detalleAnterior = div.querySelector(".detalle-info");
            if (detalleAnterior) detalleAnterior.remove();

            const divDetalle = document.createElement("div");
            divDetalle.className = "detalle-info"; // agregar la clase para que sea

            divDetalle.innerHTML = `
        <p>📌 Nombre: ${detalle.nombreProyecto}</p>
        <p>📝 Descripción: ${detalle.descripcion}</p>
        <p>💰 Presupuesto: ${detalle.presupuesto}</p>
        <p>📅 Fecha: ${detalle.fecha}</p>
        <p>🔄 Estado: ${detalle.estado}</p>
    `;

            div.appendChild(divDetalle);
        });


        // PATCH - Va a editar el estado del proyecto
        btnEditar.addEventListener("click", async () => {
            console.log(proyecto.id);

            // Se limpia el detalle antes de que se edite
            const detalleAnterior = div.querySelector(".detalle-info");
            if (detalleAnterior) detalleAnterior.remove();

            const selectEstado = document.createElement("select");
            const btnConfirmar = document.createElement("button");
            btnConfirmar.textContent = "Confirmar edición";

            ["Pendiente", "En Proceso", "Resuelto"].forEach((opcion) => {
                const opt = document.createElement("option");
                opt.value = opcion;
                opt.textContent = opcion;
                selectEstado.appendChild(opt);
            });

            div.appendChild(selectEstado);
            div.appendChild(btnConfirmar);

            btnConfirmar.addEventListener("click", async () => {
                const estadoActualizado = {
                    estado: selectEstado.value
                };

                await patchServicio(estadoActualizado, proyecto.id);
                console.log("Estado actualizado a:", selectEstado.value);

                p.textContent = `📋 ${proyecto.nombreProyecto} - Estado: ${selectEstado.value}`;
                mensaje.textContent = "✅ Edición con éxito";
                selectEstado.remove();
                btnConfirmar.remove();
                // Sweet Alert minimalista
    Swal.fire({
        title: "¡Actualizado!",
        text: "El proyecto se actualizó con éxito",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
            });
        });
        });

        // DELETE - Eliminar proyecto
        btnEliminar.addEventListener("click", async () => {

            Swal.fire({
                title: "¿Estás seguro?",
                text: `Se eliminará el proyecto "${proyecto.nombreProyecto}"`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteServicio(proyecto.id);
                    console.log("Eliminado, ID:", proyecto.id);
                    div.remove();

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El proyecto ha sido eliminado con éxito",
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    });
                }
            });
        });

    });
});
