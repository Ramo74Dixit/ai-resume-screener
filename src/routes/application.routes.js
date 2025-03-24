const express= require("express");
const  {applyForJob,getAllApllications,updateApplicationStatus} = require("../controllers/application.controller");
const {authverifyToken,isAdmin} = require("../middlewares/auth.middleware");

const upload= require("../middlewares/upload.middleware");
const router = require("./auth.routes");

router.post("/apply",authverifyToken,upload.single("resume"),applyForJob);
router.get("/all",authverifyToken,isAdmin,getAllApllications);
router.put("/update-status",authverifyToken,isAdmin,updateApplicationStatus);

module.exports=router;
