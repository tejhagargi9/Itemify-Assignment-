const express = require('express');
const router = express.Router();
const Item = require('../models/itemsModel');

// Changed from '/' to '/items'.
// The full URL will be /api/items because of how it's mounted in index.js
router.get('/getItems', async (req, res) => {
  try {
    // Fetch items and sort by creation date, newest first
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error: error.message });
  }
});

module.exports = router;