const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskText.textContent = todo;
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      displayTodos();
    });

    li.appendChild(taskText);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

addButton.addEventListener("click", () => {
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  todos.push(task);
  saveTodos();

  input.value = "";
  displayTodos();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addButton.click();
  }
});

displayTodos();
