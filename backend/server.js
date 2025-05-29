import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;



app.get('/api/auth/signup', (req, res)=>{
    res.send('HELLO WORD');
})
app.get('/api/auth/login', (req, res)=>{
    res.send('HELLO WORD');
})
app.get('/api/auth/logout', (req, res)=>{
    res.send('HELLO WORD');
})

app.listen(PORT, () =>{
    console.log(`Esta corriendo el servidor en este puerto. ${PORT}`);
})