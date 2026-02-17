import { getReportes, editReportes } from "../services/serviciosReportes.js";
import { deleteReportes } from "../services/serviciosReportes.js";
const div = document.getElementById("reportes");
const idReporte = document.getElementById("reporte-id");
const estadoReporte = document.getElementById("estado-reporte");
const btnEditar = document.getElementById("btn-editar");
const idReporteDelete = document.getElementById("reporte-id-delete");
const btnEliminar = document.getElementById("btn-eliminar")

async function renderizarReportes() {
    console.log("entra");
    const data = await getReportes();
    div.textContent = "";
    data.forEach(element => {
        const reportCard = document.createElement("div");
        reportCard.classList.add("report-card");
        div.appendChild(reportCard);

        const title = document.createElement("p");
        title.innerHTML = `<strong>${element.descripcion}</strong>`;
        reportCard.appendChild(title);

        const btn = document.createElement("button");
        btn.textContent = "Mostrar detalles";
        btn.classList.add("btn-outline");
        reportCard.appendChild(btn);

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("report-details");
        detailsDiv.style.display = "none";

        detailsDiv.innerHTML = `
            <p><span>ID:</span> ${element.id}</p>
            <p><span>Tipo:</span> ${element.tipo}</p>
            <p><span>Ubcación:</span> ${element.ubicacion}</p>
            <p><span>Estado:</span> ${element.estado}</p>
        `;
        reportCard.appendChild(detailsDiv);

        const btnQuitar = document.createElement("button");
        btnQuitar.textContent = "Quitar detalles";
        btnQuitar.classList.add("btn-ghost");
        btnQuitar.style.display = "none";
        reportCard.appendChild(btnQuitar);

        btn.addEventListener("click", function () {
            detailsDiv.style.display = "block";
            btnQuitar.style.display = "block";
            btn.style.display = "none";
        });

        btnQuitar.addEventListener("click", function (e) {
            detailsDiv.style.display = "none";
            btnQuitar.style.display = "none";
            btn.style.display = "block";
        })
    });
    btnEditar.addEventListener("click", function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Quieres editar el reporte?",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Reporte editado",
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        EditReporte(idReporte.value)
                        renderizarReportes();
                        window.location.reload();
                    }
                })
            }
        })
    })
    btnEliminar.addEventListener("click", async function (e) {
        e.preventDefault();
        data.forEach(element => {
            if (element.id == idReporteDelete.value) {
                if (element.estado !== "rechazado") {
                    Swal.fire({
                        icon: "error",
                        title: "No se puede eliminar el reporte",
                        text: "El reporte no se puede eliminar porque no esta rechazado",
                        confirmButtonText: "Ok"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            renderizarReportes();
                            window.location.reload();
                        }
                    })
                    console.log("entra en el NO");
                    return;
                }
               // console.log("sale del no");
                else {
                    console.log("Entra en el si");
                    Swal.fire({
                        title: "Quieres eliminar el reporte?",
                        showCancelButton: true,
                        confirmButtonText: "Si",
                        cancelButtonText: "No"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Reporte eliminado",
                                confirmButtonText: "Ok"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    EliminarReporte(idReporteDelete.value)
                                    renderizarReportes();
                                    window.location.reload();
                                }
                            })
                        }
                    })
                }
            }
        }
        )
    })
}
async function EditReporte(id) {
    const dataReporte = await getReportes();
    let reporte = {};
    dataReporte.forEach(element => {
        if (element.id == id) {
            reporte = {
                tipo: element.tipo,
                descripcion: element.descripcion,
                ubicacion: element.ubicacion,
                estado: estadoReporte.value
            };
        }
    });
    const data = await editReportes(reporte, id)
    return data;
}

async function EliminarReporte(id) {
    const data = await deleteReportes(id)
    return data;
}

btnEditar.addEventListener("click", function (e) {
    e.preventDefault();
    EditReporte(idReporte.value)
});

// btnEliminar.addEventListener("click", function (e) {
//     e.preventDefault();
//     EliminarReporte(idReporteDelete.value)
// });

renderizarReportes();
