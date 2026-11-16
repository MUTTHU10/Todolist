# Ex03 To-Do List using JavaScript
## Date:16.11.2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM

~~~
index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskMaster - Full-Featured To-Do App</title>
    <link rel="stylesheet" href="style.css">
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="app-container">
        <header>
            <h1><i class="fas fa-check-double"></i> TaskMaster</h1>
            <button id="theme-toggle" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </button>
        </header>

        <!-- Task Input Section -->
        <form id="todo-form" class="input-group">
            <input type="text" id="todo-input" placeholder="What needs to be done?" required autocomplete="off">
            <div class="input-options">
                <select id="priority-select" title="Task Priority">
                    <option value="low">Low Priority</option>
                    <option value="medium" selected>Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <input type="date" id="date-input" title="Due Date">
                <button type="submit" id="add-btn">
                    <i class="fas fa-plus"></i> Add Task
                </button>
            </div>
        </form>

        <!-- Search and Filter Controls -->
        <div class="controls-container">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="search-input" placeholder="Search tasks...">
            </div>
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="pending">Pending</button>
                <button class="filter-btn" data-filter="completed">Completed</button>
            </div>
        </div>

        <!-- Task List -->
        <ul id="todo-list" class="todo-list">
            <!-- Tasks will be dynamically injected here -->
        </ul>

        <!-- Footer Stats & Clear Action -->
        <footer>
            <span id="task-counter">0 tasks remaining</span>
            <button id="clear-completed">Clear Completed</button>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>


style.css
:root {
    --bg-color: #f4f7f6;
    --container-bg: #ffffff;
    --text-color: #333333;
    --text-muted: #777777;
    --border-color: #e0e0e0;
    --primary-color: #4a90e2;
    --primary-hover: #357abd;
    --danger-color: #e74c3c;
    --low-priority: #2ecc71;
    --med-priority: #f39c12;
    --high-priority: #e74c3c;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

/* Dark Mode Variables */
body.dark-mode {
    --bg-color: #121212;
    --container-bg: #1e1e1e;
    --text-color: #f1f1f1;
    --text-muted: #aaaaaa;
    --border-color: #333333;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 40px 15px;
    transition: background-color 0.3s, color 0.3s;
}

.app-container {
    background-color: var(--container-bg);
    width: 100%;
    max-width: 650px;
    border-radius: 12px;
    padding: 25px 30px;
    box-shadow: var(--shadow);
    transition: background-color 0.3s;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

header h1 {
    font-size: 1.8rem;
    color: var(--primary-color);
}

#theme-toggle {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s;
}

#theme-toggle:hover {
    background-color: var(--border-color);
}

/* Form & Inputs */
.input-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 25px;
}

#todo-input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.input-options {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.input-options select,
.input-options input[type="date"] {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--bg-color);
    color: var(--text-color);
    flex: 1;
}

#add-btn {
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
}

#add-btn:hover {
    background-color: var(--primary-hover);
}

/* Search & Filter Controls */
.controls-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    flex: 1;
    min-width: 200px;
}

.search-box i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
}

#search-input {
    width: 100%;
    padding: 8px 12px 8px 35px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.filter-buttons {
    display: flex;
    gap: 5px;
}

.filter-btn {
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    background: none;
    color: var(--text-color);
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
}

.filter-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* Task List */
.todo-list {
    list-style: none;
    margin-bottom: 20px;
}

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.2s;
    gap: 10px;
}

.todo-item:hover {
    background-color: rgba(0, 0, 0, 0.02);
}

.todo-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
}

.todo-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.todo-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.todo-text {
    font-size: 1.05rem;
    word-break: break-word;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: var(--text-muted);
}

.todo-meta {
    display: flex;
    gap: 10px;
    font-size: 0.8rem;
    color: var(--text-muted);
    align-items: center;
}

.priority-badge {
    padding: 2px 8px;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    font-size: 0.7rem;
    text-transform: uppercase;
}

.priority-low { background-color: var(--low-priority); }
.priority-medium { background-color: var(--med-priority); }
.priority-high { background-color: var(--high-priority); }

.todo-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--text-muted);
    padding: 5px;
    transition: color 0.2s;
}

.edit-btn:hover { color: var(--primary-color); }
.delete-btn:hover { color: var(--danger-color); }

/* Footer */
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-muted);
    padding-top: 10px;
}

#clear-completed {
    background: none;
    border: none;
    color: var(--danger-color);
    cursor: pointer;
    font-size: 0.9rem;
}

#clear-completed:hover {
    text-decoration: underline;
}

/* Mobile Responsiveness */
@media (max-width: 500px) {
    .app-container { padding: 20px 15px; }
    .controls-container { flex-direction: column; align-items: stretch; }
    .filter-buttons { justify-content: space-between; }
    .filter-btn { flex: 1; }
}


script.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const taskCounter = document.getElementById('task-counter');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // State Management
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    let searchQuery = '';

    // Initialize Theme
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Save tasks to LocalStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Render Tasks to the DOM
    const renderTasks = () => {
        todoList.innerHTML = '';

        // Filter and Search Logic
        const filteredTasks = tasks.filter(task => {
            const matchesFilter = 
                currentFilter === 'all' ||
                (currentFilter === 'completed' && task.completed) ||
                (currentFilter === 'pending' && !task.completed);

            const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        // Empty State Check
        if (filteredTasks.length === 0) {
            todoList.innerHTML = `<li style="text-align:center; padding: 20px; color: var(--text-muted);">No tasks found.</li>`;
        } else {
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `todo-item ${task.completed ? 'completed' : ''}`;
                li.dataset.id = task.id;

                const formattedDate = task.dueDate ? `<span><i class="far fa-calendar-alt"></i> ${task.dueDate}</span>` : '';

                li.innerHTML = `
                    <div class="todo-content">
                        <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''}>
                        <div class="todo-details">
                            <span class="todo-text">${escapeHTML(task.text)}</span>
                            <div class="todo-meta">
                                <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                                ${formattedDate}
                            </div>
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button class="action-btn edit-btn" title="Edit Task"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" title="Delete Task"><i class="fas fa-trash"></i></button>
                    </div>
                `;

                todoList.appendChild(li);
            });
        }

        updateCounter();
    };

    // Update Pending Tasks Counter
    const updateCounter = () => {
        const pendingCount = tasks.filter(task => !task.completed).length;
        taskCounter.textContent = `${pendingCount} task${pendingCount !== 1 ? 's' : ''} remaining`;
    };

    // Prevent XSS attacks on user input
    const escapeHTML = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    // Add New Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (!text) return;

        const newTask = {
            id: Date.now().toString(),
            text: text,
            priority: prioritySelect.value,
            dueDate: dateInput.value,
            completed: false
        };

        tasks.unshift(newTask);
        saveTasks();
        renderTasks();

        // Reset Form
        todoInput.value = '';
        dateInput.value = '';
        prioritySelect.value = 'medium';
    });

    // Handle Check, Edit, and Delete Actions via Event Delegation
    todoList.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;
        const id = item.dataset.id;

        // Toggle Completion
        if (e.target.classList.contains('todo-checkbox')) {
            tasks = tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            saveTasks();
            renderTasks();
        }

        // Delete Task
        if (e.target.closest('.delete-btn')) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }

        // Edit Task
        if (e.target.closest('.edit-btn')) {
            const taskToEdit = tasks.find(task => task.id === id);
            const newText = prompt('Edit your task:', taskToEdit.text);
            if (newText !== null && newText.trim() !== '') {
                tasks = tasks.map(task => 
                    task.id === id ? { ...task, text: newText.trim() } : task
                );
                saveTasks();
                renderTasks();
            }
        }
    });

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderTasks();
    });

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Clear Completed Tasks
    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    });

    // Dark Mode Toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Initial Render
    renderTasks();
});

~~~

## OUTPUT

![alt text](<Screenshot 2026-11-16 222302.png>)

## RESULT
The program for creating To-do list using JavaScript is executed successfully.
