 import{obtenerTareas,almacenamientoTareas,marcarTarea,borrarTareas,buscarTarea}from'./llamadaAlservidor.js';




//  var misTareas= await obtenerTareas();
//  console.log("mis tareas",misTareas);

//  var postTareasResultado= await almacenamientoTareas("sacar a pasear al perro");
//  console.log("POST RESULTADO=",postTareasResultado);

//  var resultadoMarcartareas= await marcarTarea(true,"9bb9b166-02b7-4aec-ba59-911411dfe4fa");
// console.log("PUT RESULTADO= ",resultadoMarcartareas);


var listaTareasGlobal=[];

async function crearTareas() {
    listaTareasGlobal= await obtenerTareas();
    console.log("mi lista tareas global",listaTareasGlobal);

for (let indiceTareas = 0; indiceTareas < listaTareasGlobal.length; indiceTareas++) {
    const tareas = listaTareasGlobal[indiceTareas];
    const textoTareas= tareas.task;
if ((textoTareas+"").trim() != "" && tareaRepetida(textoTareas)== false) {
    addNewTask (textoTareas, tareas.id, tareas.check);



}
  
}

}


var tareasDiv = document.getElementById("tareas");
var fecha = document.getElementById("fecha");
var notaNoTareas = document.getElementById("mensajeTareas");


fecha.innerHTML = new Date().toLocaleDateString();
//informacion de la fecha
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');
var clicks = 0;
//contenedor

const tasksContainer = document.getElementById('tasksContainer');

function verTareas() {
    var listaDeTareas = document.querySelectorAll(".task");

    if (listaDeTareas.length == 0) {
        notaNoTareas.classList.remove("oculto");
    }

    else {
        notaNoTareas.classList.add("oculto");
    }
}



const SetDate = () => {
    const date = new Date();
    fecha.innerHTML = date.getDate;
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'log' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

function eliminar(event) {
    event.stopPropagation();
    console.log(event.target.parentElement.parentElement, "prueba")
    console.log("clasecss", event.target.parentElement.parentElement.className.includes("done"))



    var tareaRelizada = event.target.parentElement.parentElement.className.includes("done");

    if (tareaRelizada == true) {
        clicks -= 1;
    }
    document.getElementById("clicks").innerHTML = clicks;
    tareasDiv.removeChild(event.target.parentElement.parentElement);
    verTareas();
}

function tareaRepetida(textoBuscar) {
    var listaDeTareas = document.querySelectorAll(".task");

    console.log(listaDeTareas);
    if (listaDeTareas.length > 0) {

        for (let index = 0; index < listaDeTareas.length; index++) {
            console.log("Tarea repetida", listaDeTareas[index]);
            if (listaDeTareas[index].textContent.toLowerCase() == textoBuscar.toLowerCase()) {
                return true;


            }

        }
        return false
    }
    return false
}

document.getElementById("onclick").addEventListener("click",addNewTaskEvent);
async function addNewTaskEvent(event) {
    event.preventDefault()
   
    const value  = document.getElementById("inputTask"). value;
   var guardarTareas= await almacenamientoTareas(value);
   var tareasGuardada = guardarTareas.pop();
    addNewTask(value,tareasGuardada.id,tareasGuardada.check );

}


function addNewTask (value,tareasid,tareacheck=false){

if (value.trim().length==0) {
    alert("no tiene texto");
    return;
}



    console.log("tarea");
    var existeTarea = tareaRepetida(value)
    if (existeTarea == true) {
        alert("Esta tarea ya existe.")
        return;
    }

    if (value.length == 0) {
        alert ("Sin Texto.")
        return;
    }

    if (!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.id= tareasid;
    if (tareacheck== true) {
        task.classList.add("done");
        clicks ++;
    }
    task.addEventListener('click', changeTaskState,);
    task.textContent = value;
    var basurero = document.createElement("i");
    basurero.classList.add("bi", "bi-trash3");
    basurero.id = "basu"
    var boton = document.createElement("button");
    boton.classList.add("color-boton");
    boton.appendChild(basurero);
    boton.addEventListener("click",(event)=>{
        eliminar(event);
        borrarTareas(tareasid);
    })
    task.appendChild(boton);

    //  tareaRepetida();
    tareasDiv.appendChild(task);
  document.getElementById("inputTask").value="";
    verTareas();
};

const changeTaskState = event => {
    event.target.classList.toggle('done');
    if (event.target.classList.contains("done")) {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
        marcarTarea(true, event.target.id)
    }


    else {
        clicks -= 1;
        document.getElementById("clicks").innerHTML = clicks;
        marcarTarea(false, event.target.id)
    }

};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];

}


var MiBotonDeBuscar= document.getElementById("buscar");

MiBotonDeBuscar.addEventListener("click",async function(event){
    event.preventDefault()
var tareas= document.getElementById("tareas");
tareas.innerHTML=""
    var inputBuscar= document.getElementById("inputBuscar");
    listaTareasGlobal= await buscarTarea( inputBuscar.value);
    console.log("mi lista tareas global",listaTareasGlobal);
console.log("buscar",listaTareasGlobal)
 for (let indiceTareas = 0; indiceTareas < listaTareasGlobal.length; indiceTareas++) {
    const tareas = listaTareasGlobal[indiceTareas];
     const textoTareas= tareas.task;
if ((textoTareas+"").trim() != "" && tareaRepetida(textoTareas)== false) {
    addNewTask (textoTareas, tareas.id, tareas.check);

}
  
 }
})
crearTareas();






