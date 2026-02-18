import {editarPlanilla, getPlanilla} from "../services/serviciosPlanilla.js";

const div = document.getElementById("listaEmpleados");

async function mostrarEmpleados(){
    const data = await getPlanilla();
    return data
}
async function editarEmpleado(datos, id){
    const data = await editarPlanilla(datos, id);
    return data
}

async function renderizarEmpleados(){
    const data = await mostrarEmpleados();
    data.forEach(element=>{
        const p =document.createElement("p");
        p.textContent = element.nombre + " " + element.puesto + " " + element.departamento + " " + element.salarioBase + " " + element.horasExtra + " " + element.rebajos + " " + element.salarioNeto;
        div.appendChild(p);
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar"
        div.appendChild(btnEditar);
        btnEditar.addEventListener("click", function (e){
            e.preventDefault();
            console.log("ed");
            let label = document.createElement("label");
            label.for = "nombre";
            label.textContent = "Nombre";
            div.appendChild(label);
            let input = document.createElement("input");
            input.type = "text";
            input.id = "nombre";
            input.value = element.nombre;
            div.appendChild(input);
            let label2 = document.createElement("label");
            label2.for = "puesto";
            label2.textContent = "Puesto";
            div.appendChild(label2);
            let input2 = document.createElement("input");
            input2.type = "text";
            input2.id = "puesto";
            input2.value = element.puesto;
            div.appendChild(input2);
            let label3 = document.createElement("label");
            label3.for = "departamento";
            label3.textContent = "Departamento";
            div.appendChild(label3);
            let input3 = document.createElement("input");
            input3.type = "text";
            input3.id = "departamento";
            input3.value = element.departamento;
            div.appendChild(input3);
            let label4 = document.createElement("label");
            label4.for = "salarioBase";
            label4.textContent = "Salario Base";
            div.appendChild(label4);
            let input4 = document.createElement("input");
            input4.type = "text";
            input4.id = "salarioBase";
            input4.value = element.salarioBase;
            div.appendChild(input4);
            let label5 = document.createElement("label");
            label5.for = "horasExtra";
            label5.textContent = "Horas Extra";
            div.appendChild(label5);
            let input5 = document.createElement("input");
            input5.type = "text";
            input5.id = "horasExtra";
            input5.value = element.horasExtra;
            div.appendChild(input5);
            let label6 = document.createElement("label");
            label6.for = "rebajos";
            label6.textContent = "Rebajos";
            div.appendChild(label6);
            let input6 = document.createElement("input");
            input6.type = "text";
            input6.id = "rebajos";
            input6.value = element.rebajos;
            div.appendChild(input6);
            let label7 = document.createElement("label");
            label7.for = "salarioNeto";
            label7.textContent = "Salario Neto";
            div.appendChild(label7);
            let input7 = document.createElement("input");
            input7.type = "text";
            input7.id = "salarioNeto";
            input7.value = element.salarioNeto;
            div.appendChild(input7);
            const Confirmar = document.createElement("button");
            Confirmar.textContent = "Confirmar";
            div.appendChild(Confirmar);
            Confirmar.addEventListener("click", function (e){
                e.preventDefault();
                console.log("confirma");
                const empleado ={
                    nombre: input.value,
                    puesto: input2.value,
                    departamento: input3.value,
                    salarioBase: input4.value,
                    horasExtra: input5.value,
                    rebajos: input6.value,
                    salarioNeto: input7.value
                }
                editarEmpleado(empleado, element.id)
            })
        })
    })   
}

renderizarEmpleados();

