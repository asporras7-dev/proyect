export {reportarProblemas}

async function reportarProblemas(problema){
    try{const reporte = await fetch("http://localhost:3004/reportes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await  response.json();
    return data;
    }
    catch{
        throw new error("Error al reportar el problema")
    }
    

}