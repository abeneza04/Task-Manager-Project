const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const container = document.querySelector('.container');

const apiURL = 'http://localhost:3000/api/tasks'; 

function loadTasks() {
  fetch(apiURL)
    .then(res => res.json())
    .then(tasks => {
      document.querySelectorAll('.task-item').forEach(el => el.remove());

      tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.marginTop = '10px';

        const title = document.createElement('span');
        title.textContent = task.title;
        if (task.completed) {
          title.style.textDecoration = 'line-through';
        }

        title.style.cursor = 'pointer';
        title.onclick = () => toggleTask(task._id, !task.completed);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task._id);

        div.appendChild(title);
        div.appendChild(deleteBtn);
        container.appendChild(div);
      });
    });
}

function addTask(e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  fetch(apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  }).then(() => {
    taskInput.value = '';
    loadTasks();
  });
}

function toggleTask(id, completed) {
  fetch(`${apiURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  }).then(loadTasks);
}

function deleteTask(id) {
  fetch(`${apiURL}/${id}`, {
    method: 'DELETE'
  }).then(loadTasks);
}

taskForm.addEventListener('submit', addTask);
window.addEventListener('load', loadTasks);