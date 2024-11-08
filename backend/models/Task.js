const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String },
   status: { type: String, default: "pending" }, // could be "pending", "in-progress", "completed"
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", taskSchema);
