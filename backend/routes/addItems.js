const express = require("express");
const router = express.Router();
const multer = require("multer");
const Item = require("../models/itemsModel");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) return reject(err);
      resolve(result.secure_url);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

router.post(
  "/addItems",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { name, type, description } = req.body;

      const coverImageBuffer = req.files["coverImage"]?.[0]?.buffer;
      const additionalImageBuffers = req.files["additionalImages"] || [];

      if (!name || !coverImageBuffer) {
        return res.status(400).json({ message: "Item name and cover image are required." });
      }

      const coverImageUrl = await uploadToCloudinary(coverImageBuffer, "itemify/cover");

      const additionalImageUrls = await Promise.all(
        additionalImageBuffers.map(file =>
          uploadToCloudinary(file.buffer, "itemify/additional")
        )
      );

      const newItem = new Item({
        name,
        type,
        description,
        coverImage: coverImageUrl,
        additionalImages: additionalImageUrls,
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);

    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
