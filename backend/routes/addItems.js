// routes/addItems.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Item = require("../models/itemsModel");

// --- Multer Configuration ---
// 1. Change storage to diskStorage to save files to the server
const storage = multer.diskStorage({
  // Define the destination folder for uploads
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Define how the files should be named to avoid conflicts
  filename: function (req, file, cb) {
    // A unique name: fieldname-timestamp.extension
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

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

      // 2. File objects now contain path information, not buffers
      const coverImageFile = req.files["coverImage"] ? req.files["coverImage"][0] : null;
      const additionalImageFiles = req.files["additionalImages"] || [];

      // Validation
      if (!name || !coverImageFile) {
        return res.status(400).json({ message: "Item name and cover image are required." });
      }

      // 3. Get the path of the saved cover image.
      // We replace backslashes with forward slashes for URL compatibility.
      const coverImageUrl = coverImageFile.path.replace(/\\/g, "/");

      // 4. Get the paths of all saved additional images.
      const additionalImageUrls = additionalImageFiles.map(file =>
        file.path.replace(/\\/g, "/")
      );

      // 5. Create a new item with the file paths
      const newItem = new Item({
        name,
        type,
        description,
        coverImage: coverImageUrl, // e.g., "uploads/coverImage-1678886400000.jpg"
        additionalImages: additionalImageUrls, // e.g., ["uploads/additionalImages-1678886400001.png"]
      });

      const savedItem = await newItem.save();

      // Send back the complete item object with the file paths
      res.status(201).json(savedItem);

    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ message: "Server error during item creation.", error: error.message });
    }
  }
);

module.exports = router;