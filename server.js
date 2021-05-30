const WebsocketServer = require("ws").Server;
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const wss = new WebsocketServer({ server });

wss.on('connection', (ws) => {
    ws.on('message', (raw) => {
        console.log('raw', JSON.parse(raw))
        wss.clients.forEach((client) => {
            if (client !== ws) {
                client.send(raw)
            }
        })
    })
    console.log('connection!')
    ws.send("hi i am websocket server")
})

server.listen(3000, () => {
    console.log('server started')
})
