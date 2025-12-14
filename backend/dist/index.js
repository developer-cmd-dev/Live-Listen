import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import route from './routes/router.js';
import ErrorMiddleware from './middleware/error.middleware.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import url, {} from 'url';
const app = express();
const port = Number(process.env.PORT) || 3000;
const client = new PrismaClient();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
client.$connect().then(() => {
    console.log("Db is connected");
    app.listen(port, () => console.log("server is running on " + port));
});
app.use(route);
app.use(ErrorMiddleware);
//# sourceMappingURL=index.js.map