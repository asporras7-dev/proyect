export { reportarProblemas }
export {getReportes}
async function reportarProblemas(problema) {
    try {
        const reporte = await fetch("http://localhost:3004/reportes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problema),
        });
        const data = await reporte.json();
        return data;
    }
    catch (error) {
        throw new Error("Error al reportar el problema")
    }


}

async function getReportes(){
    try{
        const reporte = await fetch("http://localhost:3004/reportes");
        const data = await reporte.json();
        return data;
    }catch (error){
        throw new Error("Error al obtener los reportes")
    }
}