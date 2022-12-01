import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import Guardado from "./components/DB";
import ListaLienzos from "./components/ListaLienzos";
import "./App.css";
import { io } from 'socket.io-client';


function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  var puedo = false, imgData;
  //var numCaptura=0;
  let x1, y1;
  
  
  const [numCaptura, cambiarNum] = useState(0);
  const [x, cambiarx] = useState(null);
  const [y, cambiary] = useState(null);
  const [dibujando, cambiarDibujando] = useState(false);
  const [grosor, cambiarGrosor] = useState(5);
  const [color, cambiarColor] = useState("black");
  const [relleno, cambiarRelleno] = useState("black");
  const [herramienta, cambiarHerramienta] = useState("lapiz");
  const [rotacion, cambiarRotacion] = useState("0")
  const [m,cambiarM] = useState({ x: 0, y: 0 })
  const [presionado, cambiarPresionado] = useState(false);
  const [img, cambiarImg] = useState(new Image());
  const [ctx, cambiarCtx] = useState(null)
  const [url, cambiarUrl] = useState("")
  
  
  // var m = { x: 0, y: 0 }; // la posición del ratón
  var dx = 0, dy = 0;
  var startX;
  var startY;
  var selectedText = -1;
  var textos = [];


  useEffect(() => {
    // const socket = io('http://localhost:5000')
    // socket.on('connect', () => console.log(socket.id))
    // socket.on('connect_error', () => {
    //   //setTimeout(()=>socket.connect(),5000)
    // })
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.fillStyle = relleno;
    ctx.lineWidth = grosor;
    ctxRef.current = ctx;
  }, [color, grosor, relleno]);

const iniciarDibujo = (e) => {
  e.preventDefault();
    startX = parseInt(e.clientX - e.nativeEvent.offsetX);
    startY = parseInt(e.clientY - e.nativeEvent.offsetY);

    console.log("imprimiendo tamano" + textos.length)
    for (var i = 0; i < textos.length; i++) {
      console.log("checking hit")
      if (textHittest(startX, startY, i)) {
        console.log("hitted")
        selectedText = i;
      }
    }

    cambiarx(e.nativeEvent.offsetX);
    cambiary(e.nativeEvent.offsetY);
    x1 = e.nativeEvent.offsetX;
    y1 = e.nativeEvent.offsetY;
    console.log("x=" + x + "y=" + y);
    console.log("x1=" + x1 + "y1=" + y1);
    cambiarDibujando(true);
    ;
    if (herramienta === "lapiz") {
      ctxRef.current.beginPath()
      ctxRef.current.moveTo(x1, y1);
    }
    if (herramienta === "triangulo") {
    }
  };

  const terminarDibujo = (e) => {
    puedo = false;
    cambiarDibujando(false);
    ctxRef.current.closePath();
    e.preventDefault();
    selectedText = -1;
  };
  function draw() {
    var ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (var i = 0; i < textos.length; i++) {
      var text = textos[i];
      ctx.fillText(text.text, text.x, text.y);
    }
  }
  const dibujar = (e) => {
    if (!dibujando) {
      if (selectedText < 0) { return; }
      e.preventDefault();
      // const canvasOffset=canvasRef.current.offset;
      // var offsetX=canvasOffset.left;
      // var offsetY=canvasOffset.top;
      var mouseX = parseInt(e.clientX - e.nativeEvent.offsetX);
      var mouseY = parseInt(e.clientY - e.nativeEvent.offsetY);

      // Put your mousemove stuff here
      var dx = mouseX - startX;
      var dy = mouseY - startY;
      startX = mouseX;
      startY = mouseY;

      var text = textos[selectedText];
      text.x += dx;
      text.y += dy;
      draw();
      return;
    }

    if (herramienta === "lapiz") {
      ctxRef.current.lineTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      ctxRef.current.stroke();
    }
    if (herramienta === "cuadrado") {
      if (puedo) {
        ctxRef.current.putImageData(imgData, 0,
          0)
      }
      imgData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

      ctxRef.current.translate(x, y);
      ctxRef.current.rotate(rotacion * Math.PI / 180);
      ctxRef.current.translate(-x, -y);
      ctxRef.current.strokeRect(x, y, e.nativeEvent.offsetX - x, e.nativeEvent.offsetY - y);
      ctxRef.current.fillRect(x, y, e.nativeEvent.offsetX - x, e.nativeEvent.offsetY - y);
      ctxRef.current.translate(x, y);
      ctxRef.current.rotate(-rotacion * Math.PI / 180);
      ctxRef.current.translate(-x, -y);
      puedo = true;
      console.log("????" + x + "????" + y)
    }
    if (herramienta === "triangulo") {
      ctxRef.current.beginPath()
      if (puedo) { ctxRef.current.putImageData(imgData, 0, 0); }
      imgData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

      ctxRef.fillStyle = "black";
      ctxRef.current.moveTo(x, e.nativeEvent.offsetY);
      ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctxRef.current.lineTo(e.nativeEvent.offsetX - (e.nativeEvent.offsetX - x) / 2, y);
      ctxRef.current.fill();
      ctxRef.current.closePath();
      ctxRef.current.stroke();
      puedo = true;
      console.log((e.nativeEvent.offsetX - x1) + "y" + y1);
    }




  };



  function cargarImagenFuncion(event, ctx) {
    const canvas = canvasRef.current;


    ctx.drawImage(img, 0, 0);

    var down = false;

    // canvas.addEventListener(
    //   "mousedown",
    //   function() {
    //     down = true;
    //     var punto_de_agarre = oMousePos(canvas, event);
    //     dx -= punto_de_agarre.x;
    //     dy -= punto_de_agarre.y;
    //   },
    //   false
    // );
    // canvas.addEventListener(
    //   "mouseup",
    //   function() {
    //     down = false;
    //     m = oMousePos(canvas, event);
    //     dx += m.x;
    //     dy += m.y;
    //   },
    //   false
    // );
    // canvas.addEventListener(
    //   "mousemove",
    //   function(event) {
    //     if (down) {
    //       clear();
    //       m = oMousePos(canvas, event);
    //       ctx.drawImage(img, m.x + dx, m.y + dy);
    //     }
    //   },
    //   false
    // );

    // function clear() {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   //ctx.fillRect(200, 200, 0, 200);
    // }
  }
  function failed() {
    console.error(
      "El archivo proporcionado no se pudo cargar como un medio de imagen"
    );
  }

  function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
      //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top)
    };
  }
  

  const cargarImagen = (e) => {
    cambiarImg(new Image())
    
    const canvas = canvasRef.current;
    console.log(e)
    img.onerror = failed;
    img.src = URL.createObjectURL(e.target.files[0]);
    cambiarUrl(e.target.files[0])
    // img.onload = cargarImagenFuncion(e,ctx);
    img.onload = function () {
      var ctx2 = (canvasRef.current.getContext('2d'));
      ctx2.drawImage(img, m.x + dx, m.y + dy);
      // ctx.drawImage(img, 0, 0);
      var down = false;

      // canvas.addEventListener(
      //   "mousedown",
      //   function () {
      //     down = true;
      //     var punto_de_agarre = oMousePos(canvas, e);
      //     dx -= punto_de_agarre.x;
      //     dy -= punto_de_agarre.y;
      //     console.log("PUNTO DE AGARRE "+ punto_de_agarre )
      //   },
      //   false
      // );
      // canvas.addEventListener(
      //   "mouseup",
      //   function () {
      //     down = false;
      //     cambiarM(oMousePos(canvas, e));
      //     dx += m.x;
      //     dy += m.y;
      //   },
      //   false
      // );
      // canvas.addEventListener(
      //   "mousemove",
      //   function (e) {
      //     if (down) {
      //       clear();
      //       cambiarM(oMousePos(canvas, e));
      //       ctx.drawImage(img, m.x + dx, m.y + dy);
      //       console.log(m.x + dx + " " + m.y + dy)
      //     }
      //   },
      //   false
      // );

      // function clear() {
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      //   ctx.fillRect(200, 200, 0, 200);
      // }
    }
  };

  const dibujarImagen = (url) => {
    console.log(url)

    var imageObj1 = new Image();
    imageObj1.src = url
    imageObj1.setAttribute('crossOrigin', '');
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0);
    }
  }
  const dibujarTexto = (texto) => {
    textos.push({ text: texto, x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 1000) });
    const canvas = canvasRef.current;

    var ctx = canvas.getContext("2d");
    ctx.font = "16px verdana";


    for (var i = 0; i < textos.length; i++) {
      var text = textos[i];
      text.width = ctx.measureText(text.text).width;
      text.height = 16;
    }

    console.log(textos)
    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
    for (var i = 0; i < textos.length; i++) {
      var text = textos[i];
      ctx.fillText(text.text, text.x, text.y);
    }
  }

  function textHittest(x, y, textIndex) {
    var text = textos[textIndex];
    return (x >= text.x &&
      x <= text.x + text.width &&
      y >= text.y - text.height &&
      y <= text.y);
  }
  const limpiar = () => {
    const canvas = canvasRef.current;
    // eslint-disable-next-line
    canvas.width = canvas.width;
  }
  const onMouseDown = (e) => {
    cambiarPresionado(true)
    

    const canvas = canvasRef.current;
    var punto_de_agarre = oMousePos(canvas, e);
    dx -= punto_de_agarre.x;
    dy -= punto_de_agarre.y;
    console.log("PUNTO DE AGARRE "+ punto_de_agarre )
  }

  const onMouseMove = (e) => {

    const canvas = canvasRef.current;
      console.log("onMouseMove "+ presionado)
    if (presionado) {
      clear();
      cambiarM(oMousePos(canvas, e));
      var ctx2 = (canvasRef.current.getContext('2d'));
    
      ctx2.drawImage(img, m.x + dx, m.y + dy);
      cambiarImg(new Image())
      img.src = URL.createObjectURL(url);
      // img.onload = cargarImagenFuncion(e,ctx);
      // ctx2.drawImage(img, m.x + dx, m.y + dy);
      img.onload = function () {
        var ctx2 = (canvasRef.current.getContext('2d'));
        ctx2.drawImage(img, m.x + dx, m.y + dy);
      }
      // ctx.drawImage(img, 10430, 4700);
      console.log("On mouse move " + m.x + dx + " " + m.y + dy)
      // ctx.drawImage(img, m.x + dx, m.y + dy);
    }
  }
  
  function clear() {
    const canvas = canvasRef.current;

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(200, 200, 0, 200);
  }
  return (
    <div className="App">
      <ListaLienzos />
      <Guardado
        canvas={canvasRef.current}
      />
      <canvas
        onMouseDown={onMouseDown}
        // onMouseUp={terminarDibujo}
        onMouseMove={onMouseMove}
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
        cambiarRotacion={cambiarRotacion}
        agregarTexto={dibujarTexto}
        cargarImagen={cargarImagen}
      />
    </div>
  );
}

export default App;
