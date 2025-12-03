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
const app = express();
const port = Number(process.env.PORT) || 3000;
const client = new PrismaClient();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
client.$connect().then(() => {
    console.log("Db is connected");
    server.on('upgrade', (req, socket, head) => {
        console.log("websocket upgrade request");
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    });
    wss.on("connection", (ws) => {
        console.log("WS connected");
        ws.on("message", (msg) => {
            console.log("Message:", msg.toString());
            ws.send("Hello from WebSocket");
        });
    });
    server.listen(port, () => console.log("server is running on " + port));
});
app.use(route);
app.use(ErrorMiddleware);
//# sourceMappingURL=index.js.map