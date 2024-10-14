// Getting references to elements
const addButton = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Function to add a new task
addButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create the task item
        const li = document.createElement('li');
        li.className = 'task-item';

        // Task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', function() {
            const newTask = prompt('Edit your task:', taskSpan.textContent);
            if (newTask !== null && newTask.trim() !== '') {
                taskSpan.textContent = newTask;
            }
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        // Append the task and buttons to the list item
        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }
});
