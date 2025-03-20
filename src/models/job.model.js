const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title : {type:String,required:true},
    description:{type:String,required:true},
    company:{type:String,required:true},
    location:{type:String,required:true},
    status:{type:String,enum:["pending","approved","rejected"],default:"pending"},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
},{timestamps:true});

module.exports=mongoose.model("Job",JobSchema);