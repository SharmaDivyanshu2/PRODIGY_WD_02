// JavaScript to handle to-do list functionality

// Retrieve tasks from local storage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render the tasks on the page
function renderTasks() {
  const taskList = document.getElementById('taskList');
  const remainingTasks = document.getElementById('remainingTasks');

  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    // Mark task as completed
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      updateLocalStorage();
      renderTasks();
    });

    // Edit task
    li.addEventListener('dblclick', () => {
      const newText = prompt('Edit task:', tasks[index].text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        updateLocalStorage();
        renderTasks();
      }
    });

    // Delete task
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
      updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    if (task.completed) {
      li.classList.add('completed');
    }
  });

  updateRemainingTasks();
}

// Function to add a new task
function addTask() {
  const newTaskInput = document.getElementById('newTask');
  const taskText = newTaskInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    updateLocalStorage();
    renderTasks();
    newTaskInput.value = '';
  }
}

// Function to update the remaining tasks count
function updateRemainingTasks() {
  const remainingTasks = document.getElementById('remainingTasks');
  const remainingCount = tasks.filter(task => !task.completed).length;
  remainingTasks.textContent = `${remainingCount} tasks remaining`;
}

// Function to update the local storage with the tasks
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial rendering of tasks
renderTasks();
