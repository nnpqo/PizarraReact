const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var cors = require('cors');

// intializations
const app = express();
const server = http.createServer(app);
const io = socketIO(server,{ 
  cors: {
    origin: 'http://localhost:3000'
  }
});

// settings
app.set('port', process.env.PORT || 5000);

// sockets

require('./sockets')(io);

// static files
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
