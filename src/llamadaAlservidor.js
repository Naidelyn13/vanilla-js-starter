
// GET tareas

const urlTareas="http://localhost:3000/api/task/";
export async function obtenerTareas(){
    let promesaTareas= fetch (urlTareas);
    let respuestaServidorTarea= await promesaTareas;
    let dataTareas= await respuestaServidorTarea.json();
    return dataTareas;
}

// POST tareas

export async function almacenamientoTareas(tareaParametro){
let promesaTarea= fetch(urlTareas,{
    method:"POST",
    body: JSON.stringify(
        {
            "task":tareaParametro,
            "check":"false"
        }
    ),
headers:{
    "Content-Type":"application/json"
}
});
let resultado= await promesaTarea;
if (resultado.status=== 200 && resultado.ok === true) {
    
let datosInsertados= await resultado.json();
return datosInsertados;


}else{
    console.log("No se logro insertar");
}

};



// PUT tareas

export async function marcarTarea(checkParametro,idTareaParametro) {
    let promesaTarea= fetch(urlTareas+ idTareaParametro,{
        method:"PUT",
        body: JSON.stringify(
            {
                "check":checkParametro
            }
        ),
    headers:{
        "Content-Type":"application/json"
    }
    });
    let resultado= await promesaTarea;
    if (resultado.status=== 200 && resultado.ok === true) {
        
    let datosActualizados= await resultado.json();
    return datosActualizados;
    
    
    }else{
        console.log("No se logro actualizar");
    }
}


// DELETE tareas
export async function borrarTareas(idTareasEliminar) {
    let promesaBorrar=fetch (urlTareas+ idTareasEliminar,{
        method:"DELETE"
    });
    let resultado = await promesaBorrar;
    if(resultado.status=== 200 && resultado.ok === true){
let datosEliminar= await resultado.json();
return datosEliminar;
    } else{
        console.log("algo anda mal")
    }
}



var inputBuscar= document.getElementById("inputBuscar");
export async function buscarTarea(texto) {
    let promesaTareas= fetch (urlTareas);
    let respuestaServidorTarea= await promesaTareas;
    let dataTareas= await respuestaServidorTarea.json();
    let tareasFiltradas= dataTareas.filter( (tarea)=>{
return tarea.task.includes(texto);
    }

    )
    return tareasFiltradas;
}

