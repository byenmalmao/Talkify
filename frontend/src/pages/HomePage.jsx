import React from 'react'

import toast ,{ Toaster } from "react-hot-toast";

const  HomePage = () => {
  return (
    <div> Hola
                  <button className="btn btn-active btn-neutral" onClick={ ()=>toast.success('Successfully toasted!')}  >Neutral</button> 
 </div>
      
  )
}

export default  HomePage;