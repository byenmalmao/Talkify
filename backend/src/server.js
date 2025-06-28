import express from "express";
import dotenv from "dotenv"; //EXPORTA LA INSTRUCCION
import authRoutes from "./routes/auth.js"; //Ruta para lo que son el proceso de autenticacion, loguearse, registrarse y desloguearse.
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js"; //Ruta para la conexion de la base de datos
import cookieParser from "cookie-parser"; //esto permite autenticar al usuario con el token almacenado en la cookie.

import path from "path";
dotenv.config(); //Se cargar las variables de entornos, todas las variables que estan en el archivo .env, process.env.NOMBRE_ARIEBLE


const app = express(); //Instacia EXPRESS, es decir aqui es el corazon del servidor de node.
const PORT = process.env.PORT; //Variabel en .env
const __dirname = path.resolve();

//Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //permite la url las request cokkies
}))
app.use(express.json());
app.use(cookieParser());

//Es la URL DONDE SE VA CONSULTAR las rutas, 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
} ;


//Escucha el ppuerto donde el servidor se ejecutara
app.listen(PORT, () =>{
    console.log(`Esta corriendo el servidor en este puerto. ${PORT}`);
    connectDB();
})