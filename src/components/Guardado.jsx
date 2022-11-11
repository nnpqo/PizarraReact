import React from "react";
const cargarImagenes=()=>{
    
    var lienzo = localStorage.getItem('lienzo'+n)
    var data = JSON.parse(lienzo);
    var image = new Image();
}

const Guardado=({guardar,cargar})=>{
    return (
    <div className="guardado">
        <button id="botonGuardar" onClick={() => guardar()}>Guardar</button>
        <button id="botonCargar" onClick={() => cargar(1)}>Cargar</button>
        {cargarImagenes()}
    </div>
    )
}

export default Guardado;