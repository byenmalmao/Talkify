import User from "../Models/User.js";
import jwt from "jsonwebtoken";

export  async function signup (req, res){
  const {email,password,fullName} = req.body; 

  try{
    if(!email|| !password || !fullName){
      return res.status(400).json({message: "Todos los campos son requeridos"});
    }
    if(password.length < 6){
      return res.status(400).json({message: "Contrasena con mas de  6 digitos requerida"});
    }

    const emailRegex = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!emailRegex(email)){
      return res.status(400).json({message: "Invalid email"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({message: " Email is already in use, please try with another one."});
    }


    //numero random para el user icon
    
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomavatar = `https://avatar.iran.liara.run/public/${idx}`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomavatar,


    })

    //TODO STREAM: CREATE USER IN STREAM

    //JWT
    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    })

    res.cookie("jwt", token, {
      maxAge: 7*24 *60*1000,
      httpOnly: true, //prevent XSS attacts
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    res.status(201).json({success:true, user:newUser})
  }catch(error){
    console.log("Error in signup controller", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function login (req, res){
  res.send("Loguearse")    
}

export async function logout (req, res){
  res.send("Desloguear")    
}