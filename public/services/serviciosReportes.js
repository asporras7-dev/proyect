import { json } from "express";

async function reportarProblemas(problema){
    const reporte = await fetch("http://localhost:3004/reportes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })

    

}