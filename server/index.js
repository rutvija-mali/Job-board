import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import UserRouter from './routes/User.js'
import JobRouter from "./routes/Jobs.js";
import log from './middlewares/log.js'
import cookieParser from "cookie-parser";


dotenv.config()
const port = process.env.PORT||5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(
  {
    origin:'http://localhost:5173',
    credentials:true
  }
))
app.use(log)
app.use(express.urlencoded({extended:true}))
app.use('/api/users',UserRouter)
app.use('/api/jobs',JobRouter)

const connect = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
       // useNewUrlParser:true,
       // useUnifiedTopology:true

        // useNewUrlParser
        // It was introduced in Mongoose 5 to handle new MongoDB connection string formats.
        // Mongoose 6+ no longer needs it, as it's the default behavior.
        // useUnifiedTopology
        // It was introduced to improve server discovery and monitoring.
        // Since Mongoose 6+, it's enabled by default, so it's not needed anymore.

    })
    console.log('connected to mongodb');
    
  } catch (error) {
    console.error('Error connecting mongodb',error)
  }
}
connect();

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    
})
