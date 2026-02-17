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
        console.log(element);
        const p = document.createElement("p");
        p.textContent = element.descripcion;
        div.appendChild(p);
        const btn = document.createElement("button");
        btn.textContent = "Mostrar detalles";
        btn.classList.add("btn-outline");
        div.appendChild(btn);
        const p2 = document.createElement("p");
        p2.textContent = element.id + " " + element.tipo + " " + element.descripcion + " " + element.ubicacion + " " + element.estado;
        div.appendChild(p2);
        p2.style.display = "none";
        const btnQuitar = document.createElement("button");
        btnQuitar.textContent = "Quitar detalles";
        div.appendChild(btnQuitar);
        btnQuitar.style.display = "none";
        btn.addEventListener("click", function () {
            p2.style.display = "block";
            btnQuitar.style.display = "block";
        });
        btnQuitar.addEventListener("click", function(e){
            p2.style.display = "none";
            btnQuitar.style.display = "none";
        })
    });
    btnEditar.addEventListener("click", function (e) {
        e.preventDefault();
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
    })
    btnEliminar.addEventListener("click", function (e) {
        e.preventDefault();
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

btnEliminar.addEventListener("click", function (e) {
    e.preventDefault();
    EliminarReporte(idReporteDelete.value)
});

renderizarReportes();
