export { reportarProblemas }
export { getReportes }
export { getReportesId }
export { editReportes }
export { deleteReportes }

async function reportarProblemas(problema) {
    try {
        const reporte = await fetch("http://localhost:3001/reportes", {
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

async function getReportes() {
    try {
        const reporte = await fetch("http://localhost:3001/reportes");
        const data = await reporte.json();
        return data;
    } catch (error) {
        throw new Error("Error al obtener los reportes")
    }
}

async function getReportesId(id) {
    try {
        const reporte = await fetch("http://localhost:3001/reportes/" + id);
        const data = await reporte.json();
        return data;
    } catch (error) {
        throw new Error("Error al obtener el reporte")
    }
}

async function editReportes(reporte, id) {
    try {
        const reportes = await fetch("http://localhost:3001/reportes/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reporte),
        });
        const data = await reportes.json();
        return data;
    } catch (error) {
        throw new Error("Error al editar el reporte")
    }
}

async function deleteReportes(id) {
    try {
        const reporte = await fetch("http://localhost:3001/reportes/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await reporte.json();
        return data;
    } catch (error) {
        throw new Error("Error al eliminar el reporte")
    }
}
