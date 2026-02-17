// POST - Registrar un nuevo proyecto
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

// GET - Obtener todos los proyectos
async function getServicio() {
    try {
        const respuesta = await fetch("http://localhost:3001/viales");
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener los proyectos:", error);
    }
}

// GET por ID - Obtener un proyecto específico
async function getServicioById(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/viales/${id}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener el proyecto:", error);
    }
}

// PATCH - Actualizar solo el estado de un proyecto
async function patchServicio(viales, id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/viales/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(viales)
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
    }
}

// DELETE - Eliminar un proyecto
async function deleteServicio(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/viales/${id}`, {
            method: "DELETE"
        });
        return respuesta.ok;
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
    }
}

export { postServicio, getServicio, getServicioById, patchServicio, deleteServicio };


