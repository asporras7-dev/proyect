import { getReportes } from "../services/serviciosReportes.js";
const div = document.getElementById("reportes");

async function renderizarReportes(){
    const data = await getReportes();
    data.forEach(element => {
        console.log(element);
        const p = document.createElement("p");
        p.textContent = element.descripcion;
        div.appendChild(p);
        const btn = document.createElement("button");
        btn.textContent = "Mostrar detalles";
        div.appendChild(btn);
        const p2 = document.createElement("p");
        p2.textContent = element.id + " " + element.tipo + " " + element.descripcion + " " + element.ubicacion;
        div.appendChild(p2);
        p2.style.display = "none";
        btn.addEventListener("click", function(){
            p2.style.display = "block";
        });
    });
}

renderizarReportes();
