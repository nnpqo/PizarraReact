import React from "react";
const indexedDb = window.indexedDB;
let nElemts=0;
let db;
var guarda;
const conexion = indexedDb.open('listaLienzos', 1)
const consultar = () => {
    const trasaccion = db.transaction(['lienzos'], 'readonly')
    const coleccionObjetos = trasaccion.objectStore('lienzos')
    const conexion = coleccionObjetos.openCursor()

    console.log('Lista de lienzos')

    conexion.onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor) {
            var lienzo = cursor.value;
        var data = JSON.parse(lienzo);
        var image = new Image();

        image.onload = function () {

            guarda = <img src={image} width="50"
            height="50"></img>;
            console.log("data")
        }
        image.src = data.image;


            console.log(cursor.value)
            cursor.continue()
        } else {
            console.log('No hay lienzos en la lista')
        }
    }
}

const ListaLienzos=()=>{
    return( 
    <div className="lienzos">
        {guarda}

    </div>
    )
       
}
export default ListaLienzos 