import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        require: true,
    },
    password:{
        type:String,
        required: true,
        minlength: 6,
    },
    bio:{
        type:String,
        default: "",
    },
    profilePic:{
        type:String,
        default: "",
    },
    nativelanguage:{
        type: String,
        default: "",
    },
    learninglanguage:{
        type: String,
        default: "",
    },
    location:{
        type:String,
        default: "",
    },
    isOnboarded:{
        type:Boolean,
        default: false,
    },
    friends:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
       },
    ],


},{timestamps:true});




// Hashing the password
userSchema.pre("save", async function (next) {

    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error){
        next(error);
    }
    
});

//Comparar contrasenas, la ingresada y la que esta en la base de datos.
userSchema.methods.matchPAssword = async function (enteredPassword){
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;    
};
const User = mongoose.model("User",userSchema);


export default User;
