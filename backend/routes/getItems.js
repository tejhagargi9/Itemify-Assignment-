const express = require("express");
const router = express.Router();
const Item = require("../models/itemsModel");

router.get("/getItems", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error: error.message });
  }
});

module.exports = router;
