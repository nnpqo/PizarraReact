import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import "./App.css";

function App() {
const canvasRef = useRef(null);
const ctxRef = useRef(null);
var puedo=false,imgData;
let x1,y1;
const [x,cambiarx]=useState(100);
const [y,cambiary]=useState(100);
const [dibujando, cambiarDibujando] = useState(false);
const [grosor, cambiarGrosor] = useState(5);
const [color, cambiarColor] = useState("black");
const [relleno, cambiarRelleno] = useState("black");
const [herramienta,cambiarHerramienta] = useState("lapiz");


useEffect(() => {
	const canvas = canvasRef.current;
	const ctx = canvas.getContext("2d");
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeStyle = color;
  ctx.fillStyle = relleno;
	ctx.lineWidth = grosor;
	ctxRef.current = ctx;
}, [color,  grosor,relleno]);

const iniciarDibujo = (e) => {
  cambiarx(e.nativeEvent.offsetX);
  cambiary(e.nativeEvent.offsetY);
  x1=e.nativeEvent.offsetX;
  y1=e.nativeEvent.offsetY;
  console.log(x1+"y"+y1);
  cambiarDibujando(true);
  ;
  if(herramienta==="lapiz"){	
    ctxRef.current.beginPath()
	ctxRef.current.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsety);
  }
  if(herramienta==="triangulo"){	
    }
};

const terminarDibujo = () => {
	puedo=false;
	cambiarDibujando(false);
    ctxRef.current.closePath();
  
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
      if(puedo){ctxRef.current.putImageData(imgData, 0, 
        0)}
      imgData = ctxRef.current.getImageData(0, 0, 1000, 700);
      ctxRef.current.strokeRect(x,y,e.nativeEvent.offsetX-x,e.nativeEvent.offsetY-y);
      ctxRef.current.fillRect(x,y,e.nativeEvent.offsetX-x,e.nativeEvent.offsetY-y);
      puedo=true;
      console.log("????"+x+"????"+y)
    }
    if(herramienta==="triangulo"){
      ctxRef.current.beginPath()
      if(puedo){ctxRef.current.putImageData(imgData, 0, 0);}
      imgData = ctxRef.current.getImageData(0, 0, 1000, 700);
      
      ctxRef.fillStyle="black";
      ctxRef.current.moveTo(x,e.nativeEvent.offsetY);
      ctxRef.current.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
      ctxRef.current.lineTo(e.nativeEvent.offsetX - (e.nativeEvent.offsetX-x)/2,y);
      ctxRef.current.fill();
      ctxRef.current.closePath();      
      ctxRef.current.stroke();
      puedo=true;
      console.log((e.nativeEvent.offsetX-x1)+"y"+y1);
    }
  
  
	
	
};



const dibujarImagen = (url) => {
  console.log(url)

  const ctx = canvasRef.current.getContext('2d');

  var imageObj1 = new Image();
  imageObj1.src = url
  imageObj1.onload = function() {
      ctx.drawImage(imageObj1,0,0);
  }
}
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
    cambiarRelleno={cambiarRelleno}
		cambiarGrosor={cambiarGrosor}
    limpiar={limpiar}
    cambiarHerramienta={cambiarHerramienta}
    dibujarImagen={dibujarImagen}
		/>
	</div>
);
}

export default App;
