const User= require("../models/user.model")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail= require("../config/nodemailer")

exports.signup= async(req,res)=>{
    try{
      const{name,email,password}= req.body;
      const existingUser= await User.findOne({email});
      if(existingUser)return res.status(400).json({message:"aap already signup kr chuke hai kripya verify kre ya login kre"});
      const hashedPassword = await bcrypt.hash(password,10);
      const otp=Math.floor(100000+Math.random()*900000).toString();
      const otpExpires=new Date(Date.now()+10*60*1000);
      const user=new User({name,email,password:hashedPassword,otp,otpExpires})
      await user.save();
      await sendEmail(email,"verify your otp",`Your Otp is : ${otp}`);
      res.status(200).json({message:"THank You so much for registering. Please verify your otp "})
    }catch(err){
        return res.status(500).json({message:"Bhaiya ji error aa gyi "})
    }
}

exports.verifyOtp = async(req,res)=>{
    try{
       const{email,otp}=req.body;
       const user= await User.findOne({email});
       if(!user || user.otp !== otp || user.otpExpires<new Date()){
        return res.status(400).json({message:"Aaap ya to db me mile nahi ya otp galat hai ya otp expire ho gya"});
       }
       user.isVerified=true;
       user.otp=undefined;
       user.otpExpires=undefined;
       await user.save();
       await sendEmail(email,"Congratulations,OTP Verification Successfull","Hiii , Thank You So Much for Joining Our Organisation . You are now a verified User. Kindly Please login to our Portal Now........");
       return res.status(200).json({message:"Badhai ho otp verify aa gya hai login kr lo ab "});
    }catch(err){
        return res.status(500).json({message:"Otp verify se phle hi errror aa gyi hai "})
    }
}


/// Login ka controller

exports.login= async(req,res)=>{
    try{
      const {email,password}=req.body;
      const user= await User.findOne({email});
      if(!user||!(bcrypt.compare(password,user.password))){
        return res.status(400).json({message:"Ya to password galat hai ya tum register nahi ho "})
      }
      if(!user.isVerified){
        return res.status(403).json({message:"Bhai tu phle otp verify kar ke aa"})
      }
      const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
      return res.status(200).json({token,message:"Bhaiya login Safal Raha"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Login krnen se phle hi error aa gyi hai "})
    }
}