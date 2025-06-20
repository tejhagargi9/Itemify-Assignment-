// routes/addItems.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Item = require("../models/itemsModel"); // Adjust path if needed
const uploadImage = require("../utils/uploadImage"); // 1. Import your Cloudinary helper

// --- Multer Configuration ---
// 2. Change storage to memoryStorage to get file buffers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Route Definition ---
router.post(
  "/addItems",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      // Text fields are still in req.body
      const { name, type, description } = req.body;

      // File objects (with buffers) are in req.files
      const coverImageFile = req.files["coverImage"] ? req.files["coverImage"][0] : null;
      const additionalImageFiles = req.files["additionalImages"] || [];

      // Validation
      if (!name || !coverImageFile) {
        return res.status(400).json({ message: "Item name and cover image are required." });
      }

      // 3. Upload cover image to Cloudinary
      // The `uploadImage` function takes the buffer from the file object
      const coverImageUrl = await uploadImage(coverImageFile.buffer, "item-images/covers");
      
      // 4. Upload all additional images to Cloudinary in parallel
      const additionalImagePromises = additionalImageFiles.map(file => 
        uploadImage(file.buffer, "item-images/additional")
      );
      
      // Wait for all upload promises to resolve
      const additionalImageUrls = await Promise.all(additionalImagePromises);

      // 5. Create new item with Cloudinary URLs
      const newItem = new Item({
        name,
        type,
        description,
        coverImage: coverImageUrl,
        additionalImages: additionalImageUrls,
      });

      const savedItem = await newItem.save();
      
      // Send back the complete item object with Cloudinary URLs
      res.status(201).json(savedItem);

    } catch (error) {
      console.error("Error creating item with Cloudinary upload:", error);
      res.status(500).json({ message: "Server error during file upload.", error: error.message });
    }
  }
);

module.exports = router;