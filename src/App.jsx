import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleTask() {
    if (task.trim() === '') return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
  }

  const handleDeleteTask = (index, e) => {
    e.stopPropagation();  // This stops the task from toggling when the delete button is clicked
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">My To-Do List</h1>
        <div className="flex mb-4">
          <input 
            type="text" 
            placeholder="Enter task" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleTask} 
            className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li 
              key={index} 
              onClick={() => toggleComplete(index)} 
              
            >
              <span className={`flex justify-between items-center p-4 bg-white border rounded-lg shadow-md cursor-pointer ${task.completed ? 'bg-gray-200 line-through text-gray-500' : ''}`}>{task.text}</span>
              <button 
                onClick={(e) => handleDeleteTask(index, e)} 
                className="text-red-500 hover:text-red-700 transition"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
