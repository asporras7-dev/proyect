//===========================FUNCIONES GESTIÓN DE SERVICIOS====================================================

// POST - Gestión servicios
async function postGestion(servicios) {
    try {
        const respuesta = await fetch("http://localhost:3001/publicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicios)
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error de gestión", error);
    }
}

// GET - Gestión servicios
async function getGestion() {
    try {
        const respuesta = await fetch("http://localhost:3001/publicos");
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al gestionar los proyectos:", error);
    }
}

// GET por ID - Obtener un servicio
async function getGestionById(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/publicos/${id}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al gestionar servicio:", error);
    }
}

// PATCH - Actualizar un servicio
async function patchGestion(servicios, id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/publicos/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicios)
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al actualizar:", error);
    }
}

// DELETE - Eliminar un servicio
async function deleteGestion(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/publicos/${id}`, {
            method: "DELETE"
        });
        return respuesta.ok;
    } catch (error) {
        console.error("Error al eliminar el servicio:", error);
    }
}

export {postGestion, getGestion, getGestionById, patchGestion, deleteGestion};