module.exports = io => {

  const usuarios= [];

  /*for(let [id,socket] of io.sockets){
    usuarios.push({
      userID: id,
      username: socket.data['username'] !== undefined ? socket.data.username : 'Guest User' + id
    })
  } */

  io.on('connection', socket => {
    console.log("nuevo cliente =",socket.id);
   
    usuarios.push(socket.id);
    socket.emit('control', { control: usuarios[0] });
    for (let i in usuarios) {
      console.log('usuario',usuarios[i]);
    }
    socket.on('terminado', data=>{
      socket.broadcast.emit('terminado', { lienzoActual: data.lienzoActual });
    })
  });

};
