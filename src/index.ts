import express from "express"
import { Request,Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myuserRoute from "./routes/MyUserRoute"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=>{
    console.log("Connected to database");
}
    
);

const app=express()
app.use(express.json())
app.use(cors())

app.get("/health",async(req:Request,res:Response)=>{
    res.send( {message:"health ok!"});

});
app.use("/api/my/user",myuserRoute);

app.listen(7000,()=>{
    console.log("server started");
    
});
