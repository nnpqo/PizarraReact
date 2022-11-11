import React from "react";
const indexedDb = window.indexedDB;
let db
let nElem=0;
const conexion = indexedDb.open('listaLienzos', 1)

conexion.onsuccess = () => {
    db = conexion.result
    
    console.log('Base de datos abierta', db)
}

conexion.onupgradeneeded = (e) => {
    db = e.target.result
    console.log('Base de datos creada', db)
    const coleccionObjetos = db.createObjectStore('lienzos',{ autoIncrement: true })
}

conexion.onerror = (error) => {
    console.log('Error ', error)
}

const agregar = (canvas) => {
    const trasaccion = db.transaction(['lienzos'], 'readwrite')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents };
    var string = JSON.stringify(data);
    const conexion = coleccionObjetos.put(string,nElem)
    nElem++
    consultar()
}

const obtener = (clave, canvas) => {
    const trasaccion = db.transaction(['lienzos'], 'readonly')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.get(clave)


    conexion.onsuccess = (e) => {
        var lienzo = conexion.result;
        var data = JSON.parse(lienzo);
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

const actualizar = (data) => {
    const trasaccion = db.transaction(['lienzos'], 'readwrite')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.put(data)

    conexion.onsuccess = () => {
        consultar()
    }
}

const eliminar = (clave) => {
    const trasaccion = db.transaction(['lienzos'], 'readwrite')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.delete(clave)

    conexion.onsuccess = () => {
        consultar()
    }
}

const consultar = () => {
    const trasaccion = db.transaction(['lienzos'], 'readonly')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.openCursor()

    console.log('Lista de lienzos')

    conexion.onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor) {
            console.log(cursor.value)
            cursor.continue()
        } else {
            console.log('No hay lienzos en la lista')
        }
    }
}



const Guardado = ({ canvas }) => {
    return (
        <div className="DB">
        <div className="Botones">
            <button id="botonGuardar" onClick={() => agregar(canvas)}>Guardar</button>
            
            <button id="botonCargar" onClick={() => obtener(nElem-1, canvas)}>Cargar Ultimo</button>
            <label></label>
        </div>
        </div>
    )
}

export default Guardado;