//===========================FUNCIONES PLANILLAS====================================================

//GET
async function getPlanilla() {
    try {
        const peticion = await fetch("http://localhost:3001/planillas");
        const datos = await peticion.json();
        console.log(datos);
        return datos;

    } catch (error) {
        console.error("Error al obtener los productos", error)
    }
};




// POST - PLANILLA


async function postPlanilla(info) {
    try {
        const respuesta = await fetch("http://localhost:3001/planillas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error de gestión", error);
    }
}

export { postPlanilla, getPlanilla };