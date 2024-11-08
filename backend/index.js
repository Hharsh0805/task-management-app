const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to check server status
app.get("/", (req, res) => res.send("Task Management Backend is running!"));

// Task routes
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
mongoose
   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("MongoDB connected");
      // Start the server after successful MongoDB connection
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   })
   .catch((error) => console.log("MongoDB connection error:", error));
