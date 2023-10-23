//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
//later
const filterOption = document.querySelector(".filter-todo");

///event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
//later
filterOption.addEventListener("change", filterTodo);

//functions
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  // console.log('hello')

  // Check if the input field is empty
  if (todoInput.value.trim() === "") {
    alert("Please enter a todo.");
    return;
  }

  //create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add todo to localStorage
  saveLocalTodos(todoInput.value);

  //create check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //append to todo-list
  todoList.appendChild(todoDiv);

  //clear todoInput
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo)
    //  todo.remove()
    //remove function after the animation
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  //check todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//function filter todo
function filterTodo() {
  const todos = document.querySelectorAll(".todo");
  console.log(todos);
  const filter = document.querySelector(".filter-todo");

  todos.forEach(function (todo) {
    switch (filter.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save todos to local storage
function saveLocalTodos(todo) {
  //check if todo is already there
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//get todos from localStorage
function getTodos() {
  let todos;
  //check if todo is already there
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //check if todo is already there
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // console.log(todo.children[0].innerText)
  // console.log(todos.indexOf("apple"))
  const todoIndex = todo.children[0].innerText
  // console.log(todoIndex)
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));

}
