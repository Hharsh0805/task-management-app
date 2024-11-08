const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// POST /api/tasks - Create a new task
router.post("/", async (req, res) => {
   const { title, description } = req.body;
   try {
      const newTask = new Task({ title, description });
      await newTask.save();
      res.status(201).json(newTask);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

// GET /api/tasks - Get all tasks
router.get("/", async (req, res) => {
   try {
      const tasks = await Task.find();
      res.json(tasks);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// PUT /api/tasks/:id - Update a task
router.put("/:id", async (req, res) => {
   const { id } = req.params;
   const { title, description, status } = req.body;
   try {
      const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
      res.json(updatedTask);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", async (req, res) => {
   const { id } = req.params;
   try {
      await Task.findByIdAndDelete(id);
      res.json({ message: "Task deleted" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

module.exports = router;
