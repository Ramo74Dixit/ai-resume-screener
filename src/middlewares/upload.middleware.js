// middlewares/upload.middleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
// Storage configuration for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "resumes", // Folder in Cloudinary
        format: async (req, file) => "pdf", // Ensure only PDFs are uploaded
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Public ID for Cloudinary
    },
});
// File filter to accept only PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Only pdf files are allowed"), false); // Reject the file
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
