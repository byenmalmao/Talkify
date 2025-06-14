import User from "../Models/User.js";
import {upsertStreamUser} from "../lib/stream.js";
import jwt from "jsonwebtoken";

export  async function signup (req, res){

  const {email,password,fullName} = req.body; 

  try{
    if(!email|| !password || !fullName){
      return res.status(400).json({message: "Todos los campos son requeridos"});
    }
    if(password.length < 6){
      return res.status(400).json({message: "Contrasena con mas de  6 digitos requerida!"});
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

   try{
     await upsertStreamUser({
      id:newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic || "",
    });
    console.log("New User Create: {newUser.fullName}");
   }catch(error){
    console.error("Error adding new user in steam. ", error);
   }

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
  try{

    const { email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message: "TOdos los campos son requeridos"});
    }

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message: "Email o PAssword no validos."});

    const isPasswordCorrect = await user.matchPAssword(password); //esta en modelos
    if(!isPasswordCorrect) return res.status(401).json({message: "Email or Password no validos"});

    //JWT
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    })

    res.cookie("jwt", token, {
      maxAge: 7*24 *60*1000,
      httpOnly: true, //prevent XSS attacts
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    res.status(200).json({success:true, user});
  }catch(error){

    console.log("Error in login controller ", error.message);
    res.status(500).json({message: "Internal Server Error"})
  }  
}

export async function logout (req, res){
  res.clearCookie("jwt");
  res.status(200).json({success: true, message:"LogOut successful"});
}

export async function onboard (req, res){
  try {
   const userId = req.user._id;

   const  {fullName, bio , nativelanguage, learninglanguage, location} = req.body;

   if (!fullName || !bio  || !nativelanguage || !learninglanguage || !location){
    return res.status(400).json({message: "All fields are required",
      missingFields: [
        !fullName && "fullName",
        !bio && "bio",
        !nativelanguage && "nativelanguage",
        !learninglanguage && "learninglanguage",
        !location && "location",
      ].filter(Boolean),
    })
   }
    const updatedUser =  await User.findByIdAndUpdate(userId,{
        ...req.body,
        isOnboarded: true,
      }, {new:true})

      if(!updatedUser) return res.status(404).json({message:"User not found"})

    //TODO: HUPDATE THE USER INFO IN STREAM

    try {
      await upsertStreamUser({
      id:updatedUser._id,
      name:updatedUser.fullName,
      image: updatedUser.profilePic || "",
    })
    console.log("Strema user updated after onboarding  for " + updatedUser.fullName);
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding", streamError.message);
    }

        res.status(200).json({success: true, user: updatedUser});
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({message: "Internal Server Error"});
    
  }
}