module.exports = io => {
  const mongoose = require('./database');
  const usuarios= [];
  const connections = {};

  /*const DataSchema = new mongoose.Schema({
    // Aquí definirías el esquema de tu documento, con sus campos y tipos de datos
  });
  const Data = mongoose.model('Data', DataSchema);*/

  const jsonSchema = new mongoose.Schema({
    // Aquí puedes definir los campos que quieras incluir en tu documento
    // Por ejemplo:
    sala: String,
    lienzo: String,
  });
  const JsonModel = mongoose.model('Json', jsonSchema);

  io.on('connection', socket => {
    console.log("nuevo cliente =",socket.id);
    socket.on('join room', (roomId) => {
      connections[socket.id] = roomId;
      console.log(socket.id+ 'se unio a sala '+roomId);
      socket.join(roomId);
      //io.to(roomId).emit('terminado', { lienzoActual: data.lienzoActual });
    });

    socket.on('terminado', data=>{
      const roomId = connections[socket.id];
      io.to(roomId).emit('terminado', { lienzoActual: data.lienzoActual });

      

      


      JsonModel.find((error, resultados) => {
  if (error) {
    console.log(error);
  } else {
    console.log(resultados);
  }
});


      
    })

    socket.on('guardar', data => {
      const jsonData = new JsonModel({
        sala: roomId,
        lienzo: data.lienzoActual

      });
      jsonData.save((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Documento guardado con éxito');
        }
      });
    });
  });

};
