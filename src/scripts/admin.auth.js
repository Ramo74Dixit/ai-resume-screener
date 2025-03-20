const mongoose= require("mongoose");
const bcrypt= require("bcrypt");

const User= require("../models/user.model")

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});

const createAdmin = async()=>{
    const existingAdmin= await User.findOne({role:"admin"});
    if(existingAdmin){
        console.log("Admin Already exists");
        return process.exit(1);
    }

    const hashedPassword=await bcrypt.hash("R@mmoha77dix",10);
    const admin= new User({
        name:"Admin",
        email:"code.for.mode@gmail.com",
        password:"R@mmoha77dix",
        role:"admin",
        isVerified:true
    })
    await admin.save();
    console.log("✅Admin is created successfully");
    process.exit(0);
}

createAdmin();