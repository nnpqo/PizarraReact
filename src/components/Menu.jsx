import React from "react";
import { useState } from "react";
import Paletas from "./Paletas";
import "../App.css";
import Guardado from "./DB";


const Menu = ({ cambiarColor,cambiarRelleno, cambiarGrosor, limpiar, cambiarHerramienta, dibujarImagen,agregarTexto, canvas}) => {
	const [inputValue, setInputValue] = useState("");
	const [inputValueText, setInputValueText] = useState("");


	const onChangeHandlerTexto = event => {
		setInputValueText(event.target.value);
	};
	const onChangeHandler = event => {
		setInputValue(event.target.value);
	};

	return (
		<div className="Menu">
			<Paletas
			titulo={"Colores"}
			cambio={cambiarColor}
			/>
			<h1>Grosor</h1>
			<input
				className="Barra"
				type="range"
				min="3"
				max="20"
				onChange={(e) => {
					cambiarGrosor(e.target.value);
				}}
			/>
			<Paletas
			titulo={"Relleno"}
			cambio={cambiarRelleno}
			/>

			<div className="Botones">
			<button onClick={() => cambiarColor("white")}>Borrador</button>
			<button onClick={() => limpiar()}>Limpiar</button>
			<h2>Herramientas </h2>
			<button onClick={() => cambiarHerramienta("lapiz")}>Lapiz</button>
			<button onClick={() => cambiarHerramienta("cuadrado")}>Cuadrado</button>
			<button onClick={() => cambiarHerramienta("triangulo")}>Triangulo</button>
			<h2>Imagenes </h2>
			<input type="text" value={inputValue}
			      onCopy={onChangeHandler}
				  onChange={onChangeHandler} name="name" />
			<button onClick={() => dibujarImagen(inputValue)}>Agregar imagen</button>

			<h2>Texto </h2>
			<input type="text" value={inputValueText}
			      onCopy={onChangeHandlerTexto}
				  onChange={onChangeHandlerTexto} name="name" />
			<button onClick={() => agregarTexto(inputValueText)}>Agregar texto</button>
			<Guardado
      		  canvas={canvas}
      		/>
			</div>
		</div>
	);
};

export default Menu;
