import { PrismaClient } from '@prisma/client';
import cors from 'cors'
import helmet from 'helmet';
import route from './routes/router.js';
import ErrorMiddleware from './middleware/error.middleware.js';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser'
import { WebSocketServer } from 'ws';
import http from 'http'
import url, { type UrlWithParsedQuery } from 'url'
import type { ParsedUrlQuery } from 'querystring';
import { unknown } from 'zod';



const app = express();
const port: number = Number(process.env.PORT) || 3000;
const client = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

interface Rooms {
    roomId: number;
    users: string[];
}
interface Query{
    roomId:number;
    type:string;
    user:string;
}

const rooms: Rooms[] = [];


client.$connect().then(() => {
    console.log("Db is connected")
    server.on('upgrade', (req, socket, head) => {
        console.log("websocket upgrade request");
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    })

    wss.on('connection', (socket, req) => {
        console.log("socket connected")
        const parsedUrl = url.parse(req.url || "", true);
        const query = parsedUrl.query;


        switch (query.type) {
            case "create":
                rooms.push({ roomId: Number(query.roomId), users: [] });
                console.log(rooms)
                break;
            case "join":
                const filtered:Rooms[]= rooms.filter((e:Rooms) => e.roomId === Number(query.roomId));
                socket.on("message",(data)=>{
                    filtered[0]?.users.forEach((user)=>{
                        socket.send(data);
                    })
                })
            default:
                break;
        }
    })

    server.listen(port, () => console.log("server is running on " + port));

})

app.use(route)
app.use(ErrorMiddleware);


export { wss };

