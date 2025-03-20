const express= require("express");
const router= express.Router();
const {postJob,reviewJob,getJobs}= require("../controllers/job.controller")

const {authverifyToken, isAdmin}= require("../middlewares/auth.middleware")

router.post("/post",authverifyToken,postJob);
router.put("/review",authverifyToken,isAdmin,reviewJob)
router.get("/all",getJobs);


module.exports=router;