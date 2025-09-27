import express from "express";
import upload from "../utils/multer.js";
import fs from "fs";
import imagekit from "../imagekit.js";

const router = express.Router();

// Upload route
router.post("/upload", upload.array("images", 6), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploadedUrls = [];

      // Read from local storage (if using diskStorage)
      const fileBuffer = fs.readFileSync(file.path);

      // Upload to ImageKit
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: file.originalname,
        folder: "/listings",
      });

      // Generate optimized URL
      const optimizeImageURL = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      uploadedUrls.push(optimizeImageURL);

      // Clean up temp file
      fs.unlinkSync(file.path);
    return res.json({ success: true, urls: uploadedUrls });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default router;
