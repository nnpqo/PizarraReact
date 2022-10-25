import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import "./App.css";

function App() {
const canvasRef = useRef(null);
const ctxRef = useRef(null);
var puedo=false,imgData;
const [x,cambiarx]=useState(10);
const [y,cambiary]=useState(10);
const [dibujando, cambiarDibujando] = useState(false);
const [grosor, cambiarGrosor] = useState(5);
const [color, cambiarColor] = useState("black");
const [herramienta,cambiarHerramienta] = useState("lapiz");


useEffect(() => {
	const canvas = canvasRef.current;
	const ctx = canvas.getContext("2d");
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeStyle = color;
	ctx.lineWidth = grosor;
	ctxRef.current = ctx;
}, [color,  grosor]);

const iniciarDibujo = (e) => {
  cambiarx(e.nativeEvent.offsetX);
  cambiary(e.nativeEvent.offsetY);
  cambiarDibujando(true);
  if(herramienta==="lapiz"){
	ctxRef.current.beginPath();
	ctxRef.current.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsety);
  console.log("x*" +x +"y="+y);
  }
};

const terminarDibujo = () => {
	puedo=false;
	cambiarDibujando(false);
  if(herramienta==="lapiz"){
    ctxRef.current.closePath();
  }
  
};

const dibujar = (e) => {
	if (!dibujando) {return;}
  
    if(herramienta==="lapiz"){
    ctxRef.current.lineTo(
    e.nativeEvent.offsetX,
    e.nativeEvent.offsetY
    );
    ctxRef.current.stroke();}
    if(herramienta==="cuadrado"){
      if(puedo){ctxRef.current.putImageData(imgData, 0, 0)}
      imgData = ctxRef.current.getImageData(0, 0, 1000, 700);
      ctxRef.current.fillRect(x,y,e.nativeEvent.offsetX-x,e.nativeEvent.offsetY-y);
      puedo=true;
      console.log("????"+x+"????"+y)
    }
  
  
	
	
};

const limpiar = () =>{
  const canvas = canvasRef.current;
  // eslint-disable-next-line
  canvas.width=canvas.width;  
}

return (
	<div className="App">
		
		<canvas
		onMouseDown={iniciarDibujo}
		onMouseUp={terminarDibujo}
		onMouseMove={dibujar}
		ref={canvasRef}
		width={1150}
		height={700}
		/>
    
    <Menu
		cambiarColor={cambiarColor}
		cambiarGrosor={cambiarGrosor}
    limpiar={limpiar}
    cambiarHerramienta={cambiarHerramienta}
		/>
	</div>
);
}

export default App;
