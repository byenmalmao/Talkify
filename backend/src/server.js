import express from "express";
import dotenv from "dotenv"; //EXPORTA LA INSTRUCCION
import authRoutes from "./routes/auth.js"; //Ruta para lo que son el proceso de autenticacion, loguearse, registrarse y desloguearse.
import { connectDB } from "./lib/db.js"; //Ruta para la conexion de la base de datos
import cookieParser from "cookie-parser"; //esto permite autenticar al usuario con el token almacenado en la cookie.
dotenv.config(); //Se cargar las variables de entornos, todas las variables que estan en el archivo .env, process.env.NOMBRE_ARIEBLE


const app = express(); //Instacia EXPRESS, es decir aqui es el corazon del servidor de node.
const PORT = process.env.PORT; //Variabel en .env


//Middleware
app.use(express.json());
app.use(cookieParser());

//Es la URL DONDE SE VA CONSULTAR las rutas, 
app.use("/api/auth", authRoutes);



//Escucha el ppuerto donde el servidor se ejecutara
app.listen(PORT, () =>{
    console.log(`Esta corriendo el servidor en este puerto. ${PORT}`);
    connectDB();
})