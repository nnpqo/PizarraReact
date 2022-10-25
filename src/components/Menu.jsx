import React from "react";
import "../App.css";

const Menu = ({ cambiarColor, cambiarGrosor, limpiar, cambiarHerramienta }) => {
	return (
		<div className="Menu">
			<div id="Colores">
				<h1>Color</h1>
				<button id="rojo" onClick={() => cambiarColor("red")}></button>
				<button id="amarillo" onClick={() => cambiarColor("yellow")}></button>
				<button id="verde" onClick={() => cambiarColor("green")}></button>
				<button id="azul" onClick={() => cambiarColor("blue")}></button>
				<button id="naranja" onClick={() => cambiarColor("orange")}></button>
				<button id="negro" onClick={() => cambiarColor("black")}></button>
			</div>
			<input
				className="Colorea"
				type="color"
				onChange={(e) => {
					cambiarColor(e.target.value);
				}}
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
			<div className="Botones">
			<button onClick={() => cambiarColor("white")}>Borrador</button>
			<button onClick={() => limpiar()}>Limpiar</button>
			<h2>Herramientas </h2>
			<button onClick={() => cambiarHerramienta("lapiz")}>Lapiz</button>
			<button onClick={() => cambiarHerramienta("cuadrado")}>Cuadrado</button>
			</div>
		</div>
	);
};

export default Menu;
