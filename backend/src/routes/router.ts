import { Router } from "express";
import { type Response,type Request } from "express";
const route = Router();



route.get("/",(req,res)=>{
    res.json({
        message:"Health is ok"
    })
})




export default route;