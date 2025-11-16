import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import route from './routes/router.js';
const app = express();
const port = 3000;
const client = new PrismaClient();
app.use(cors());
app.use(helmet());
client.$connect().then(() => {
    console.log("Db is connected");
    app.listen(port, (error) => {
        if (error)
            console.log(error.message);
        console.log("Server is running on " + port);
    });
}).catch(error => console.log(error.message));
app.use(route);
//# sourceMappingURL=index.js.map