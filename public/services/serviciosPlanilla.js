async function editarPlanilla(datos, id) {
    try{
        const empleado = await fetch("http://localhost:3001/empleados/"+id,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
    const data = await empleado.json();
    return data;
    }catch(error){
        throw new Error("Error al editar el empleado");
    }
}

async function getPlanilla() {
    try {
        const empleado = await fetch("http://localhost:3001/empleados");
        const data = await empleado.json();
        return data;
    } catch (error) {
        throw new Error("Error al obtener los empleados");
    }
}


export {editarPlanilla, getPlanilla}