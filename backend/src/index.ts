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
    users: WebSocket[];
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

        socket.send(200)
        const parsedUrl = url.parse(req.url || "", true);
        const query = parsedUrl.query;


        if (query.type === "create") {
         if(rooms.length==0){
                rooms.push({ roomId: Number(query.roomId), users: [socket] });
         }else{
            const isAvailable = rooms.find(data=>data.roomId===Number(query.roomId))
            !isAvailable && rooms.push({ roomId: Number(query.roomId), users: [socket] });
         }

        } else if (query.type === "join") {
            const filtered: Rooms[] = rooms.filter((e: Rooms) => e.roomId === Number(query.roomId));
            
            filtered[0]?.users?.length==0 && filtered[0].users.push(socket)
            !filtered[0]?.users.find(data=>data==socket)&& filtered[0]?.users.push(socket);
            

            socket.on("message", (data) => {
                filtered[0]?.users.forEach((user) => {
                    if (user.readyState === 1) {
                        if (socket != user) user.send(data.toString());
                    }
                })
            })
        }



    })

    server.listen(port, () => console.log("server is running on " + port));

})

app.use(route)
app.use(ErrorMiddleware);


export { wss };

