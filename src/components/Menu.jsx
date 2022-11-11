import React from "react";
import { useState } from "react";
import Paletas from "./Paletas";
import "../App.css";


const Menu = ({ cambiarColor,cambiarRelleno, cambiarGrosor, limpiar, cambiarHerramienta, dibujarImagen,cambiarRotacion }) => {
	const [inputValue, setInputValue] = useState("");

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
			<button onClick={() => {cambiarColor("white");cambiarHerramienta("lapiz")}}>Borrador</button>
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
			<input
				className="Barra"
				type="range"
				min="0"
				max="360"
				onChange={(e) => {
					cambiarRotacion(e.target.value);
				}}
			/>
			
			</div>
		</div>
	);
};

export default Menu;
