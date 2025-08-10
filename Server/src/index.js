import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './db/index.js'

dotenv.config({
    path: './env'
})

ConnectDB()

const app = express()
const PORT = process.env.PORT || 4000
console.log(process.env.PORT);


app.get('/' , (req,res) => {
    res.send("Server is ready")
} )

app.listen(PORT, ()=>{
    console.log("Server is running!");
})
