const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}
checkEmptyList();

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  tasks.push(newTask);
  renderTask(newTask);
  taskInput.value = "";
  taskInput.focus();
  checkEmptyList();
  saveLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  const parentNode = event.target.closest(".list-group-item");
  const id = Number(parentNode.id);
  tasks = tasks.filter((task) => {
    if (task.id === id) {
      return false;
    } else {
      return true;
    }
  });

  parentNode.remove();
  checkEmptyList();
  saveLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parentNode = event.target.closest(".list-group-item");
  const id = Number(parentNode.id);
  const task = tasks.find((task) => {
    if (task.id === id) {
      return true;
    }
  });
  task.done = !task.done;
  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
  saveLocalStorage();
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `
    <li id="emptyList" class="list-group-item empty-list">
    <div class="empty-list__title">To-do list is empty</div>
  </li>
    `;
    tasksList.innerHTML = emptyListHTML;
  }

  if (tasks.length > 0) {
    const emptyListElement = document.querySelector("#emptyList");
    emptyListElement ? emptyListElement.remove() : null;
  }
}

function saveLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";
  const taskHTML = `
          <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action">
                <img src="img/pngegg.png" alt="Done" width="18" height="18">
              </button>
              <button type="button" data-action="delete" class="btn-action">
                <img src="img/pngegg (1).png" alt="Done" width="18" height="18">
              </button>
            </div>
				  </li>`;
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
