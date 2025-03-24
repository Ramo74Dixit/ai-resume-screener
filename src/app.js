const express= require("express");
const cors= require("cors");
require("dotenv").config();
const app=express();
const authRoutes= require("./routes/auth.routes")
const jobRoutes = require("./routes/job.routes")
const applicationRoutes= require("./routes/application.routes")
app.use(cors())
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/jobs",jobRoutes);
app.use("/api/applications",applicationRoutes)
app.get("/",(req,res)=>{
    res.send("✅ Ai Resume Screen Backend is Running")
});

module.exports= app;