import { PrismaClient } from '@prisma/client';
import cors from 'cors'
import helmet from 'helmet';
import route from './routes/router.js';
import ErrorMiddleware from './middleware/error.middleware.js';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser'
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http'
import url, { type UrlWithParsedQuery } from 'url'
import { createRoom } from './utility/Websocket.js';



const app = express();
const port: number = Number(process.env.PORT) || 3000;
const client = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });






client.$connect().then(() => {
    console.log("Db is connected")
    server.on('upgrade', (req, socket, head) => {
        console.log("websocket upgrade request");
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    })

    wss.on('connection', (socket, req) => {
        
        const parsedUrl = url.parse(socket.url,true);
        const {roomId,type} = parsedUrl.query;

        if(type=="create"){
            createRoom(socket);
        }else{

        }
    })

    server.listen(port, () => console.log("server is running on " + port));

})

app.use(route)
app.use(ErrorMiddleware);


export { wss };

