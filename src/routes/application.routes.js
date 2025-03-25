const express = require("express");
const {
    applyForJob,
    getAllApllications,
    updateApplicationStatus,
    filterApplicationsBySkills
} = require("../controllers/application.controller");

const { authverifyToken, isAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const router = express.Router(); // Changed from `require("./auth.routes")` to `express.Router()`

// Route to apply for a job (with resume upload)
router.post("/apply", authverifyToken, upload.single("resume"), applyForJob);

// Route to get all applications (admin only)
router.get("/all", authverifyToken, isAdmin, getAllApllications);

// Route to update the status of an application (admin only)
router.put("/update-status", authverifyToken, isAdmin, updateApplicationStatus);

// **New Route**: Admin can filter applications by skills for a specific job
router.post("/filter-by-skills", authverifyToken, isAdmin, filterApplicationsBySkills);

module.exports = router;
