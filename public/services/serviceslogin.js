//GET
async function getUsuarios() {
    try {
        const peticion = await fetch("http://localhost:3001/usuarios");
        const datos = await peticion.json();
        console.log(datos);
        return datos;

    } catch (error) {
        console.error("Error al obtener los productos", error)
    }
};


//POST
async function postUsuarios(producto) {
    try {
        const peticion = await fetch("http://localhost:3001/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        const datos = await peticion.json();
        console.log(datos);
        return datos;

    } catch (error) {
        console.error("Error al obtener los productos", error)
    }
};


//EXPORTACION
export { getUsuarios, postUsuarios };


