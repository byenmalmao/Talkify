import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  // useEffect(() => {
  //   toast.success("¡Bienvenido a Talkify!");
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center p-4 text-white">
      <Toaster />

      <div className="bg-base-100 shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-5xl font-bold mb-4">Talkify</h1>
        <p className="text-lg mb-8">Tu plataforma moderna de mensajería</p>

        <div className="flex flex-col gap-4">
          <Link to="/login" className="btn btn-primary w-full">
            Iniciar sesión
          </Link>
          <Link to="/signup" className="btn btn-outline btn-secondary w-full">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
