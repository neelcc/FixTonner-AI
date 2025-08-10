import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './db/index.js'
import userRouter from './routes/userRoutes.js'
import promptRouter from './routes/promptRoutes.js'


dotenv.config({
    path: './env'
})

ConnectDB()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())


app.use('/api/v1/user',userRouter)
app.use('/api/v1/prompt',promptRouter)

app.listen(PORT, ()=>{
    console.log("Server is running!");
})
