const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const shortid = require("shortid");

const app = express();

app.get("/rooms", (req, res) => {
  res.json(ROOMS);
});

const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("ADD_USER", (username) => {
    socket.username = username;
  });

  socket.on("CREATE_ROOM", (roomName) => {
    const roomId = shortid.generate();
    ROOMS[roomId] = { roomName };
    socket.emit("CREATE_ROOM:SUCCESS", roomId);
  });
  
  socket.on("DELETE_ROOM", (roomId) => {
    if (!ROOMS[roomId]) socket.emit("DELETE_ROOM:FAIL");
    else {
      delete ROOMS[roomId];
      socket.emit('DELETE_ROOM:SUCCESS')
    }
  });

  socket.on('JOIN_ROOM', (roomId) => {

  })
});

// on-memory database(?)
const CLIENTS = {}; // map(dictionary)
const ROOMS = {};

server.listen(3000, () => {
  console.log("[Server Started]");
});
