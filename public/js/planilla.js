import { postPlanilla, getPlanilla, editarPlanilla, eliminarPlanilla } from "../services/planilla.js";

//DOM
const datoEmpleado = document.getElementById("empleado");
const puesto = document.getElementById("puesto");
const departamento = document.getElementById("departamento");
const salarioBase = document.getElementById("salarioBase");
const horasExtra = document.getElementById("horasExtra");
const rebajos = document.getElementById("rebajos");
const horasMensuales = document.getElementById("horasMensuales");
const precioHora = document.getElementById("precioHora");
const btnGuardar = document.getElementById("btnGuardar");
const btnVer = document.getElementById("btnVer");
const btnActualizar = document.getElementById("btnActualizar");
const btnEliminar = document.getElementById("btnEliminar");
const divActualizar = document.getElementById("divActualizar");
const divEliminar = document.getElementById("divEliminar");
const btnPost= document.getElementById("btnPost");
const divPost= document.getElementById("divPost");
const btnCancelar = document.getElementById("btnCancelar");
divPost.style.display = "none";

// POST
// EVENTO BOTÓN GUARDAR

btnPost.addEventListener("click",function(e){
    e.preventDefault();
    divPost.style.display = "block";
    btnGuardar.addEventListener("click", async function () {
        if (!datoEmpleado.value || !puesto.value || !departamento.value || !salarioBase.value || !horasExtra.value || !rebajos.value) {
            alert("⚠️ Todos los campos son obligatorios");
            return;
        }
        // Cálculo automático del salario neto
        const calculoSalarioNeto = parseFloat(salarioBase.value) + parseFloat(horasExtra.value)*(parseFloat(precioHora.value)*1.5) - parseFloat(rebajos.value)*4000;
        console.log(calculoSalarioNeto);

        const info = {
            nombre: datoEmpleado.value,
            puesto: puesto.value,
            departamento: departamento.value,
            salarioBase: parseFloat(salarioBase.value), // parseFloat para convertir a número
            horasExtra: parseFloat(horasExtra.value),
            rebajos: parseFloat(rebajos.value),
            horasMensuales: parseFloat(horasMensuales.value),
            salarioNeto: calculoSalarioNeto
        };
        console.log(info);

        console.log("1. Enviando planilla al servidor...", info);
        const resultado = await postPlanilla(info);
        console.log("2. El servidor respondió con:", resultado);
        if (resultado && resultado.id) {
            Swal.fire({
                title: "¡Éxito!",
                text: "Registro con éxito",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
        }
    });
    btnCancelar.addEventListener("click", function (e){
        divPost.style.display = "none";
    });
});
//GET

async function llenarPlanilla() {

    const tabla = document.getElementById("tablaPlanilla");
    const datosPlanilla = await getPlanilla();

    datosPlanilla.forEach((planilla) => {
        const fila = document.createElement("tr");
        const tdNombre = document.createElement("td")
        const tdPuesto = document.createElement("td")
        const tdDepartamento = document.createElement("td")
        const tdSalarioBase = document.createElement("td")
        const tdHorasExtra = document.createElement("td")
        const tdRebajos = document.createElement("td")
        const tdSalarioNeto = document.createElement("td")
        const tdMontoHoras = document.createElement("td")

        tdNombre.style.cursor = "pointer"


        fila.appendChild(tdNombre);
        fila.appendChild(tdPuesto);
        fila.appendChild(tdDepartamento);
        fila.appendChild(tdSalarioBase);
        fila.appendChild(tdHorasExtra);
        fila.appendChild(tdRebajos);
        fila.appendChild(tdSalarioNeto);
        tabla.appendChild(fila);

        tdNombre.textContent = planilla.nombre;
        tdPuesto.textContent = planilla.puesto;
        tdDepartamento.textContent = planilla.departamento;
        tdSalarioBase.textContent = planilla.salarioBase;
        tdHorasExtra.textContent = planilla.horasExtra;
        tdRebajos.textContent = planilla.rebajos;
        tdSalarioNeto.textContent = planilla.salarioNeto;
    });

}
    btnActualizar.addEventListener("click", async function (e){
        e.preventDefault();
        const data = await getPlanilla();
        const label = document.createElement("label");
        label.for = "id";
        label.textContent = "Ingrese id a modificar";
        divActualizar.appendChild(label);
        const inputEmpleado = document.createElement("input");
        inputEmpleado.id = "idEmpleado";
        divActualizar.appendChild(inputEmpleado);
        const botonBuscar = document.createElement("button");
        botonBuscar.textContent = "Buscar";
        divActualizar.appendChild(botonBuscar);
        const btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar"
        divActualizar.appendChild(btnCancelar);
        btnCancelar.addEventListener("click", function(e){
            e.preventDefault();
            divActualizar.textContent = ""
        });
        botonBuscar.addEventListener("click", async function (e){
            e.preventDefault();
            data.forEach(element => {
                if(element.id == inputEmpleado.value){
                    console.log("ed");     
                    let label = document.createElement("label");
                    label.for = "nombre";
                    label.textContent = "Nombre";
                    divActualizar.appendChild(label);
                    let input = document.createElement("input");
                    input.type = "text";
                    input.id = "nombre";
                    input.value = element.nombre;
                    divActualizar.appendChild(input);
                    let label2 = document.createElement("label");
                    label2.for = "puesto";
                    label2.textContent = "Puesto";
                    divActualizar.appendChild(label2);
                    let input2 = document.createElement("input");
                    input2.type = "text";
                    input2.id = "puesto";
                    input2.value = element.puesto;
                    divActualizar.appendChild(input2);
                    let label3 = document.createElement("label");
                    label3.for = "departamento";
                    label3.textContent = "Departamento";
                    divActualizar.appendChild(label3);
                    let input3 = document.createElement("input");
                    input3.type = "text";
                    input3.id = "departamento";
                    input3.value = element.departamento;
                    divActualizar.appendChild(input3);
                    let label4 = document.createElement("label");
                    label4.for = "salarioBase";
                    label4.textContent = "Salario Base";
                    divActualizar.appendChild(label4);
                    let input4 = document.createElement("input");
                    input4.type = "number";
                    input4.id = "salarioBase";
                    input4.value = element.salarioBase;
                    divActualizar.appendChild(input4);
                    let label5 = document.createElement("label");
                    label5.for = "horasExtra";
                    label5.textContent = "Horas Extra";
                    divActualizar.appendChild(label5);
                    let input5 = document.createElement("input");
                    input5.type = "number";
                    input5.id = "horasExtra";
                    input5.value = element.horasExtra;
                    divActualizar.appendChild(input5);
                    let label6 = document.createElement("label");
                    label6.for = "rebajos";
                    label6.textContent = "Rebajos";
                    divActualizar.appendChild(label6);
                    let input6 = document.createElement("input");
                    input6.type = "number";
                    input6.id = "rebajos";
                    input6.value = element.rebajos;
                    divActualizar.appendChild(input6);
                    let label7 = document.createElement("label");
                    label7.for = "salarioNeto";
                    label7.textContent = "Salario Neto";
                    divActualizar.appendChild(label7);
                    let input7 = document.createElement("input");
                    input7.type = "number";
                    input7.id = "salarioNeto";
                    input7.value = element.salarioNeto;
                    divActualizar.appendChild(input7);
                    const Confirmar = document.createElement("button");
                    Confirmar.textContent = "Confirmar";
                    divActualizar.appendChild(Confirmar);
                    const btnCancelar = document.createElement("button");
                    btnCancelar.textContent = "Cancelar";
                    divActualizar.appendChild(btnCancelar);
                    btnCancelar.addEventListener("click", function (e){
                        e.preventDefault();
                        divActualizar.textContent = "";
                    })
                    Confirmar.addEventListener("click", function (e){
                        e.preventDefault();
                        console.log("confirma");
                        const planilla ={
                            nombre: input.value,
                            puesto: input2.value,
                            departamento: input3.value,
                            salarioBase: input4.value,
                            horasExtra: input5.value,
                            rebajos: input6.value,
                            salarioNeto: input7.value
                        }
                        Swal.fire({
                            title: "Cambios actualizados",
                            confirmButtonText: "Ok",
                            position: "top-end",
                            icon: "success",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Editar(planilla, element.id)
                                divActualizar.innerHTML = "";
                            }
                        });
                    })
                }
            })
        })
    })
    btnEliminar.addEventListener("click", async function(){
        const data = await getPlanilla();
        const lable = document.createElement("label");
        lable.for="idEliminar"   
        lable.textContent = "Ingrese id a eliminar";
        divEliminar.appendChild(lable);
        const input = document.createElement("input");
        input.type = "text";
        input.id = "idEliminar";
        divEliminar.appendChild(input);
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        divEliminar.appendChild(botonEliminar);
        botonEliminar.addEventListener("click", function(e){
            e.preventDefault();
            console.log("eliminar");
            data.forEach(empleado => {
                if(input.value == empleado.id){
                    console.log("eliminar");
                    Eliminar(empleado.id)
                }
            })
        })
    })

    const f = document.createElement("p")
    f.textContent = "Foto";
    divFoto.appendChild(f);
    

async function Editar(pago, id) {
    const data = await editarPlanilla(pago, id)
    return data;
}

async function Eliminar(id){
    const data = await eliminarPlanilla(id)
    return data;
}



llenarPlanilla()
//EVENTO BOTÓN VER PLANILLA

const foto = document.createElement("button");
foto.addEventListener("change",function (evento) {
    let url = URL.createObjectURL(evento.target.files[0]);
    console.log(url);

    //almaceno la imagen en un servidor

    const img = document.createElement("img");
    img.src = url;
    img.style.maxWidth = "200px";
    contenedor.appendChild(img);
})

//en actualizar hacemos un div diferente dentro del div grande
//para cada dato en el ejemplo del profe para que pueda salir
//un espacio de forma individual por cada dato y almacenamos el espacio
//a mostrarse en el div individual para poder editar el dato
//en específico almacenado en ese div diferente