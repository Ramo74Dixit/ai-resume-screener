const jwt = require("jsonwebtoken");

exports.isAdmin= (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message:"Bhag jao access nahi h tumhare liye"});
    }
    next();
}



exports.authverifyToken = (req,res,next) =>{
    let token = req.header("Authorization");
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
    }
    if(!token) return res.status(401).json({message:"Bhaiya token to diya hi nahi ya access denied"});
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Invalid Token"})
    }
}