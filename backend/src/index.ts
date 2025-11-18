import { PrismaClient } from '@prisma/client';
import cors from 'cors'
import helmet from 'helmet';
import route from './routes/router.js';
import ErrorMiddleware from './middleware/error.middleware.js';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser'


const app = express();
const port:number = 3000;
const client = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());


client.$connect().then(()=>{
    console.log("Db is connected")
    app.listen(port,()=>{
    console.log("Server is running on "+ port);
})
}).catch(error=>console.log(error.message));

app.use(route)
app.use(ErrorMiddleware);
