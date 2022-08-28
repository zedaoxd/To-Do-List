const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    return document.createElement('li');
}

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const listTasks = [];

    for (const task of liTasks) {
        let stringTask = task.innerText;
        stringTask = stringTask.replace('Delete', '').trim();
        listTasks.push(stringTask);
    }
    const taskJson = JSON.stringify(listTasks);
    localStorage.setItem('tasks', taskJson);
}

function readSaveTasks() {
    const task = localStorage.getItem('tasks');
    const listTasks = JSON.parse(task);

    for (const t of listTasks) {
        createTask(t);
    }
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    createDeleteButton(li);
    saveTasks();
}

function clearInput() {
    inputTask.value = null;
    inputTask.focus();
}

function createDeleteButton(li) {
    li.innerText += ' ';
    const btn = document.createElement('button');
    btn.innerText = 'Delete';
    btn.setAttribute('class', 'delete');
    btn.setAttribute('title', 'Delete this task');
    li.appendChild(btn);
}

inputTask.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
        clearInput();
    }
});

btnTask.addEventListener('click', () => {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    clearInput();
});

document.addEventListener('click', (event) => {
    const element = event.target;
    if (element.classList.contains('delete')) {
        element.parentElement.remove();
        saveTasks();
    }
});

readSaveTasks();