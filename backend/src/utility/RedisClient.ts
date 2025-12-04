import { createClient } from "redis";
const redisClient =await createClient()
    .on("connect",()=>console.log("Redis connected"))
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()


  export default redisClient;