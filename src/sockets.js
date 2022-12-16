module.exports = io => {

  const usuarios= [];
  const connections = {};

  /*for(let [id,socket] of io.sockets){
    usuarios.push({
      userID: id,
      username: socket.data['username'] !== undefined ? socket.data.username : 'Guest User' + id
    })
  } */

  io.on('connection', socket => {
    console.log("nuevo cliente =",socket.id);
    socket.on('join room', (roomId) => {
      connections[socket.id] = roomId;
      console.log(socket.id+ 'se unio a sala '+roomId);
      socket.join(roomId);
      io.to(roomId).emit('terminado', { lienzoActual: data.lienzoActual });
    });

    socket.on('terminado', data=>{
      const roomId = connections[socket.id];
      io.to(roomId).emit('terminado', { lienzoActual: data.lienzoActual });
    })
  });

};
