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