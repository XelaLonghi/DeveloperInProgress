// Obtener elementos del DOM
const input = document.getElementById("input");
const enterButton = document.getElementById("enter");
const taskList = document.getElementById("lista");
const dateElement = document.getElementById("fecha");
const timeElement = document.getElementById("hora");
const timeInput = document.getElementById("timeInput");

// Mostrar fecha actual
function showDateTime() {
  const currentDate = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const formattedTime = currentDate.toLocaleTimeString("en-US");
  dateElement.textContent = formattedDate;
  timeElement.textContent = formattedTime;
}

setInterval(showDateTime, 1000);
showDateTime();

// Agregar tarea
function addTask() {
  const taskText = input.value.trim();
  const taskTime = timeInput.value;

  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <i class="far fa-circle co" data="realizado"></i>
      <p class="text">${taskText}</p>
      <p class="task-time">${taskTime}</p>
      <i class="fas fa-trash de" data="eliminado"></i>
    `;
    taskList.appendChild(taskItem);
    input.value = "";
    timeInput.value = "";
    addTaskListeners(taskItem);
  }
}

// Marcar tarea como completada o eliminarla
function taskActions(event) {
  const target = event.target;

  if (target.classList.contains("co")) {
    target.classList.toggle("fas");
    target.classList.toggle("far");
    target.parentNode.querySelector(".text").classList.toggle("line-through");
  } else if (target.classList.contains("de")) {
    target.parentNode.remove();
  }
}

// Agregar eventos a las tareas
function addTaskListeners(taskItem) {
  const checkboxes = taskItem.querySelectorAll(".co");
  const trashIcons = taskItem.querySelectorAll(".de");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", taskActions);
  });

  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener("click", taskActions);
  });
}

// Agregar evento al botón de agregar tarea
enterButton.addEventListener("click", addTask);

// Agregar evento al presionar la tecla "Enter"
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addTask();
  }
});
