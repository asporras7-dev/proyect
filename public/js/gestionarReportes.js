import { getReportes } from "../services/serviciosReportes.js";

function renderizarProductos(){
    let reporte = getReportes();
    const p = document.createElement("p");
    p.textContent =      ;
    const reportes = getReportes();
    reportes.forEach(reporte => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>Tipo:</strong> ${reporte.tipo}</p>
            <p><strong>Descripción:</strong> ${reporte.descripcion}</p>
            <p><strong>Ubicación:</strong> ${reporte.ubicacion}</p>
        `;
        p.appendChild(div);
    });
}