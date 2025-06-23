import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  // useEffect(() => {
  //   toast.success("¡Bienvenido a Talkify!");
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center p-4 text-white">
      <h1>Talkify</h1>
    </div>
  );
};

export default HomePage;
