import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import route from './routes/router.js';
import ErrorMiddleware from './middleware/error.middleware.js';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import { WebSocketServer } from 'ws';
import http from 'http';
import url from 'url';
const app = express();
const port = Number(process.env.PORT) || 3000;
const client = new PrismaClient();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
const rooms = [];
client.$connect().then(() => {
    console.log("Db is connected");
    server.on('upgrade', (req, socket, head) => {
        console.log("websocket upgrade request");
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    });
    wss.on('connection', (socket, req) => {
        console.log("socket connected");
        const parsedUrl = url.parse(req.url || "", true);
        const query = parsedUrl.query;
        switch (query.type) {
            case "create":
                rooms.push({ roomId: Number(query.roomId), users: ["A"] });
                console.log(rooms);
                break;
            case "join":
                const filtered = rooms.filter((e) => e.roomId === Number(query.roomId));
                console.log(filtered, "this is join");
            default:
                break;
        }
    });
    server.listen(port, () => console.log("server is running on " + port));
});
app.use(route);
app.use(ErrorMiddleware);
export { wss };
//# sourceMappingURL=index.js.map