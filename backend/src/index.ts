import { PrismaClient } from '@prisma/client';
import cors from 'cors'
import helmet from 'helmet';
import route from './routes/router.js';
import ErrorMiddleware from './middleware/error.middleware.js';
import express from 'express';
import cookieParser from 'cookie-parser'
import { redisClient } from './utility/RedisClient.js';
import morgan from 'morgan';



const app = express();
const port: number = Number(process.env.PORT) || 3000;
const client = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());



client.$connect().then(() => {
    console.log("Db is connected")
    redisClient.connect().then(() => {
        console.log("Redis is connected")
        app.listen(port, () => console.log("server is running on " + port));

    })
}).catch((error:Error)=>console.log(error.message))

app.use(route)
app.use(ErrorMiddleware);



