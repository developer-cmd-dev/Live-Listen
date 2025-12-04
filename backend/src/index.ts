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
import { createRoom, joinRoom } from './utility/Websocket.js';
import redisClient from './utility/RedisClient.js';



const app = express();
const port: number = Number(process.env.PORT) || 3000;
const client = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });



let rooms=new Map<string,WebSocket[]>();


client.$connect().then(() => {
    console.log("Db is connected")
    server.on('upgrade', (req, socket, head) => {
        console.log("websocket upgrade request");
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    })

    wss.on('connection',async (socket, req) => {
        
        const parsedUrl = url.parse(req.url||"",true);
        const {roomId,type} = parsedUrl.query;

        if(type=="create"){
         const roomData =await createRoom(socket,String(roomId));
         rooms=roomData;
        }else if(type=="join"){
           const roomData = await joinRoom(socket,String(roomId));
           rooms=roomData;
        } 

        socket.on('message',(message)=>{
                 const getUsers = rooms.get(String(roomId));
                 getUsers?.forEach((data:WebSocket)=>{
                    if(data!==socket){
                        data.send(message.toLocaleString());
                    }
                 })

        })
      
    })
    

    server.listen(port, () => console.log("server is running on " + port));

})

app.use(route)
app.use(ErrorMiddleware);


export { wss };

