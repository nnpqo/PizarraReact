import React from "react";
const indexedDb = window.indexedDB;

let db

const conexion = indexedDb.open('listaLienzos',1)

conexion.onsuccess = () =>{
    db = conexion.result
    console.log('Base de datos abierta', db)
}

conexion.onupgradeneeded = (e) =>{
    db = e.target.result
    console.log('Base de datos creada', db)
    const coleccionObjetos = db.createObjectStore('lienzos')
}

conexion.onerror = (error) =>{
    console.log('Error ', error)
}

const agregar = (canvas) => {
    const trasaccion = db.transaction(['lienzos'],'readwrite')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.add(canvas.toDataURL(),1)
    consultar()
}

const obtener = (clave,canvas) =>{
    const trasaccion = db.transaction(['lienzos'],'readonly')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.get(clave)
   
    
    conexion.onsuccess = (e) =>{
        var data=conexion.result;
        var image = new Image();
        const ctx = canvas.getContext("2d");
        
         image.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0); 
            console.log("data") 
         }
         image.src = data.image;
         
        
    }
    
    
    
}

const actualizar = (data) =>{    
    const trasaccion = db.transaction(['lienzos'],'readwrite')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.put(data)
    
    conexion.onsuccess = () =>{
        consultar()
    }
}

const eliminar = (clave) =>{      
    const trasaccion = db.transaction(['lienzos'],'readwrite')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.delete(clave)

    conexion.onsuccess = () =>{
        consultar()
    }
}

const consultar = () =>{
    const trasaccion = db.transaction(['lienzos'],'readonly')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.openCursor()

    console.log('Lista de lienzos')
    
    conexion.onsuccess = (e) =>{
        const cursor = e.target.result        
        if(cursor){
            console.log(cursor.value)
            cursor.continue()
        }else{
            console.log('No hay lienzos en la lista')
        }
    }
}



const Guardado=({guardar,cargar,canvas})=>{
    return (
    <div className="guardado">
        <button id="botonGuardar" onClick={() => agregar(canvas)}>Guardar</button>
        <button id="botonCargar" onClick={() => obtener(1,canvas)}>Cargar</button>
        
    </div>
    )
}

export default Guardado;