// src/services/taskService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update a task
export const updateTask = async (taskId, updatedData) => {
  const response = await axios.put(`${API_URL}/${taskId}`, updatedData);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};
