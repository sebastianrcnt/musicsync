const WebsocketServer = require("ws").Server;
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Websocket Config
const websocketServer = new WebsocketServer({ server });
const shortid = require("shortid");

// on-memory database(?)
const CLIENTS = {}; // map(dictionary)
const ROOMS = {};

websocketServer.on("connection", (socket) => {
  // Connection 시작됐을때
  socket.id = shortid.generate();
  CLIENTS[socket.id] = socket;

  socket.send(`Connection Established`);
  console.log(`Connection Established for ${socket.id}`);

  // Connection 끝났을때
  socket.on("close", () => {
    console.log(`Connection Terminated for ${socket.id}`);
    delete CLIENTS[socket.id];
  });

  // Message Parsing을 한 후 응답 혹은 예외처리
  socket.on("message", (rawMessageData) => {
    let messageData;
    try {
      messageData = JSON.parse(rawMessageData);
    } catch (error) {
      socket.send(
        JSON.stringify({
          success: false,
          reason: "JSON Parse Failed",
          error,
        })
      );
    }

    handleMessage(socket, messageData);
  });
});

/*
type MessageData {
  type: string;
  payload: any;
}
*/

function handleMessage(client, messageData) {
  switch (messageData.type) {
    case "broadcast":
      MessageHandlers.broadcast(client, messageData.payload);
      break;
    default:
      client.send(JSON.stringify({
        success: false,
        reason: `Invalid Action type ${messageData.type}`
      }))
  }
}

const MessageHandlers = {
  broadcast(currentClient, payload) {
    websocketServer.clients.forEach((client) => {
      if (client !== currentClient) {
        client.send(JSON.stringify(payload));
      }
    });
  },
};

server.listen(3000, () => {
  console.log("[Server Started]");
});
