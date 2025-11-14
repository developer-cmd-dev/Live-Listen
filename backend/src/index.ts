import express,{type Request,type Response} from 'express';


const app = express();
const port:number = 3000;


app.listen(port,(error)=>{
    if(error)console.log(error.message);
    console.log("Server is running on "+ port);
})

