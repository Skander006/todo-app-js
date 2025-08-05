//selectors
const addInput = document.getElementById("add__input");
const addButton = document.getElementById("add__button");
const todoList = document.getElementById("task-list");
const filterSelection = document.getElementById("filter");

//Events

document.addEventListener("DOMContentLoaded",loadTodos);
addButton.addEventListener("click", addTask);
todoList.addEventListener("click",handleClick);
filterSelection.addEventListener("change",filterTodos);

//dark mode

let darkmodeToggler = document.getElementById("dark-mode");
let hero = document.querySelector(".hero");
let moonIcon = document.getElementById("icon-moon");

if (localStorage.getItem("theme") == "dark"){
    document.body.classList.add("dark");
    moonIcon.classList.remove("fa-moon");
    moonIcon.classList.add("fa-sun");
}
darkmodeToggler.addEventListener("click",()=>{
    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")){
        moonIcon.classList.remove("fa-moon");
        moonIcon.classList.add("fa-sun");
        localStorage.setItem("theme","dark");
    } else{
        moonIcon.classList.remove("fa-sun");
        moonIcon.classList.add("fa-moon");
        localStorage.setItem("theme","light");
    }
});

//functions

function addTask(e){
    e.preventDefault();

    if (addInput.value.trim() === "") return;

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    const divContainer = document.createElement("div");
    //todo text
    const todo = document.createElement("li");
    todo.innerText = addInput.value;
    todo.classList.add("todo-item");
    todoDiv.appendChild(todo);

    //todo completed button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = "✔️";
    completedBtn.classList.add("completed-Btn");
    divContainer.appendChild(completedBtn);

    //todo trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = "❌";
    trashBtn.classList.add("trash-btn");
    divContainer.appendChild(trashBtn);

    divContainer.classList.add("button-container");

    todoDiv.appendChild(divContainer);
    //Animation
    todoDiv.classList.add("fade-in");

    //Append to list
    todoList.appendChild(todoDiv);

    //Save to localStorage
    saveLocalTodos({text : addInput.value, completed : false});

    //clear input
    addInput.value = "";
}

function handleClick(e){
    const item = e.target;
    const parent = item.parentElement;

    if (item.classList.contains("trash-btn")){
        console.log(JSON.parse(localStorage.getItem("todos")));
        parent.parentElement.classList.add("fall");
        removeTodo(parent.parentElement);
        parent.parentElement.addEventListener("transitionend",()=> parent.parentElement.remove());
        console.log(JSON.parse(localStorage.getItem("todos")));

    }
    else if (item.classList.contains("completed-Btn")){
        parent.parentElement.classList.toggle("completed");
        parent.parentElement.querySelector(".todo-item").classList.toggle("line-throughed");
        changeStatus(parent.parentElement);
    }

    
}

function filterTodos(e){
    const todos = todoList.childNodes;
    todos.forEach((todo)=>{
        if (todo.nodeType === 1){
            switch (e.target.value){
                case "all":
                    todo.style.display = "flex";
                break;
                case "completed":
                    todo.style.display = (todo.classList.contains("completed"))? "flex" : "none";
                    break;
                case "uncompleted":
                    todo.style.display = todo.classList.contains("completed")? "none" : "flex";
                    break;
            }
        }
    });
}

function loadTodos(){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo)=>{

        const divContainer = document.createElement("div");
        const todoList = document.getElementById("task-list");
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const todoItem = document.createElement("li");
        todoItem.innerText = todo.text;
        todoItem.classList.add("todo-item");
        todoDiv.appendChild(todoItem);

        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = "✔️";
        completedBtn.classList.add("completed-Btn");
        divContainer.appendChild(completedBtn);

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = "❌";
        trashBtn.classList.add("trash-btn");
        divContainer.appendChild(trashBtn);

        divContainer.classList.add("button-container");

        todoDiv.appendChild(divContainer);
        if (todo.completed) todoDiv.classList.add("completed");
        todoList.appendChild(todoDiv);

        todoList.classList.add("fade-in");
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function saveLocalTodos(todo){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function removeTodo(todo){
    const todos = JSON.parse(localStorage.getItem("todos"));
    const text = todo.querySelector(".todo-item").innerText;
    const updatedTodos = todos.filter((t)=> t.text !== text);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
}

function changeStatus(todo){
    const todos = JSON.parse(localStorage.getItem("todos"));
    const status = todo.completed;
    if (status == "completed"){
        todo.completed = "uncompleted";
    }  else{
        todo.completed = "completed";
    }
    localStorage.setItem("todos",JSON.stringify(todos));
}
