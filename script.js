let tasks = [];

loadTasks();
renderTodo();

document.getElementById("addBtn").addEventListener("click", addTodo);

function addTodo(){
    let input = document.getElementById("taskInput");
    if(input.value === ""){
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        text: input.value,
        completed: false
    };

    tasks.push(task);
    input.value = "";

    saveTasks();
    renderTodo();
}

function renderTodo(){
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    for(let i = 0; i < tasks.length; i++){
        let li = createTodoItem(tasks[i]);
        list.appendChild(li);
    }
}

function createTodoItem(task){
    let li = document.createElement("li");

    if(task.completed){
        li.classList.add("completed");
    }

    let checkedAttr = task.completed ? "checked" : "";

    li.innerHTML = `
        <input type="checkbox" ${checkedAttr} onchange="toggleComplete(${task.id})">
        <span>${task.text}</span>
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

    return li;
}

function deleteTask(id){
    tasks = tasks.filter(function(task){
        return task.id != id;
    });

    saveTasks();
    renderTodo();
}

function editTask(id){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == id){
            let newText = prompt("Edit task", tasks[i].text);

            if(newText != ""){
                tasks[i].text = newText;
            }
            break;
        }
    }

    saveTasks();
    renderTodo();
}

function toggleComplete(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }

    saveTasks();
    renderTodo();
}

function saveTasks(){
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks(){
    let saved = localStorage.getItem("todoTasks");

    if(saved){
        tasks = JSON.parse(saved);
    }
}