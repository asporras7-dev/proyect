//POST
async function postServicio(viales) {
    try {
        const respuesta = await fetch("http://localhost:3001/viales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(viales)
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error de registro", error);
    }
}

// GET
export async function getProyectos() {
    try {
        const respuesta = await fetch(URL);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener los proyectos:", error);
    }
}