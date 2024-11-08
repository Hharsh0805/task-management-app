import React, { useState, useRef, useEffect } from 'react';
import { FaTrashAlt, FaPen, FaArrowLeft, FaArrowRight, FaBell, FaSave, FaPlus } from 'react-icons/fa';

import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupColor, setPopupColor] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 10;
  const inputRef = useRef(null);

  const showPopup = (message, color) => {
    setPopupMessage(message);
    setPopupColor(color);
    setTimeout(() => setPopupMessage(null), 1500);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    if (editingTaskId) {
      handleSaveEditedTask();
    } else {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    const taskExists = tasks.some(task => task.title.toLowerCase() === inputValue.toLowerCase());
    
    if (taskExists) {
      showPopup('Task already exists!', 'blue');
    } else {
      const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: inputValue,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      showPopup('Task added successfully!', 'green');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const reIndexedTasks = updatedTasks.map((task, index) => ({
      ...task,
      id: index + 1,
    }));
    setTasks(reIndexedTasks);
    showPopup('Task deleted successfully!', 'red');
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setInputValue(taskToEdit.title);
    }
  };

  const handleSaveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, title: inputValue } : task
    );
    setTasks(updatedTasks);
    setInputValue('');
    setEditingTaskId(null);
    showPopup('Task updated successfully!', 'blue');
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * tasksPerPage < filteredTasks.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const currentTasks = filteredTasks.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage);

  useEffect(() => {
    if (editingTaskId !== null) {
      inputRef.current.focus();
    }
  }, [editingTaskId]);

  return (
    <div className="app-container">
      <h1 className="app-title">Task Management</h1>

      {popupMessage && (
        <div className={`popup-message ${popupColor}`}>
          <FaBell className="popup-icon" /> {popupMessage}
        </div>
      )}

      <form onSubmit={handleInputSubmit} className="input-container">
        <input
          type="text"
          placeholder="Add or filter tasks..."
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
          className="main-input"
        />
        <button type="submit" className="submit-btn">
          {editingTaskId ? <FaSave /> : <FaPlus />}
        </button>
      </form>

      <div className="task-list-container">
        {currentTasks.map((task) => (
          <div className="task-item" key={task.id}>
            <div className="task-info">
              <span className="task-serial">{task.id}.</span>
              <span className="task-title">{task.title}</span>
            </div>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => handleEditTask(task.id)}>
                <FaPen />
              </button>
              <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length > tasksPerPage && (
        <div className="pagination-controls">
          <button
            className="pagination-btn previous-btn"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          <button
            className="pagination-btn next-btn"
            onClick={handleNextPage}
            disabled={(currentPage + 1) * tasksPerPage >= filteredTasks.length}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;