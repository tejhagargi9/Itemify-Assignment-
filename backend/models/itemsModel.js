const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String, required: true }, // URL or path
    additionalImages: [String], // Array of image URLs or paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
