import express, { application } from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import authenticateUser from './middlewares/authenticate.js'
import productRouter from './routes/productRouter.js'
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoUri = "mongodb://admin:1234@ac-441zki5-shard-00-00.g2t2i3c.mongodb.net:27017,ac-441zki5-shard-00-01.g2t2i3c.mongodb.net:27017,ac-441zki5-shard-00-02.g2t2i3c.mongodb.net:27017/?ssl=true&replicaSet=atlas-n8k8yd-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongoUri).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
)


const app = express()

app.use( express.json() )

app.use(authenticateUser)

app.use("/users", userRouter)
app.use("/products", productRouter)
 
app.listen( 3000 ,
    ()=>{
      console.log("Server is running!")  
    }
)