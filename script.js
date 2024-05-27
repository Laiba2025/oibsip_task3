let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        isCompleted: false,
        addedAt: new Date().toLocaleString(),
        completedAt: null
    };

    pendingTasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function completeTask(id) {
    const taskIndex = pendingTasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        const task = pendingTasks[taskIndex];
        task.isCompleted = true;
        task.completedAt = new Date().toLocaleString();
        pendingTasks.splice(taskIndex, 1);
        completedTasks.push(task);
        renderTasks();
    }
}

function editTask(id) {
    const newTaskText = prompt('Edit your task:');
    if (newTaskText === null || newTaskText.trim() === '') {
        return;
    }

    const task = pendingTasks.find(task => task.id === id);
    if (task) {
        task.text = newTaskText.trim();
        renderTasks();
    }
}

function deleteTask(id, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(task => task.id !== id);
    } else {
        pendingTasks = pendingTasks.filter(task => task.id !== id);
    }
    renderTasks();
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Added: ${task.addedAt})`;
        li.appendChild(createTaskActions(task.id, false));
        pendingTasksList.appendChild(li);
    });

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Completed: ${task.completedAt})`;
        li.classList.add('completed');
        li.appendChild(createTaskActions(task.id, true));
        completedTasksList.appendChild(li);
    });
}

function createTaskActions(id, isCompleted) {
    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    if (!isCompleted) {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => completeTask(id);
        actions.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(id);
        actions.appendChild(editButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(id, isCompleted);
    actions.appendChild(deleteButton);

    return actions;
}

