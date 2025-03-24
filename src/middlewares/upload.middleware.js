const multer= require("multer");
const {CloudinaryStorage}= require("multer-storage-cloudinary");
const cloudinary=require("../config/cloudinary");
// Storage configuaration
const storage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"resumes",
        format:async(req,file)=>"pdf",
        public_id:(req,file)=>`${Date.now()}-${file.originalname}`
    }
});
// filtering files
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === "application/pdf"){
        cb(null,true);
    }
    else{
        cb(new Error("Only pdf files are allowed"),false);
    }
}
const upload = multer({storage,fileFilter});

module.exports=upload;