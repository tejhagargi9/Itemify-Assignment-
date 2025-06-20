const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const path = require("path"); 

require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

  
const addItems = require("./routes/addItems");
const getItems = require("./routes/getItems");


app.use(addItems);
app.use(getItems);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from backend with MongoDB!");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});