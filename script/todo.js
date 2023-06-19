// elementos DOM 
const formTask = document.querySelector("#formAddTask")
const inputTask = document.querySelector("#iadicionar")
const listAdd = document.querySelector(".listasAdd")
const formEditTask = document.querySelector("#formEditTask")
const inputEditTask = document.querySelector("#iadicionarSub")
const butonCancel = document.querySelector("#cancel")
const searchInput = document.querySelector("#ipesquisar")
const formSearch = document.querySelector("#formSearchTask")
const buttonSearch = document.querySelector("#search")
const selectFilter = document.querySelector("#ifiltros")

let oldTitleValue;

//function
const saveTodo = (text) => {
    const DivHtmlCreate = `
    <div class="sep">
        <span class="res">${inputTask.value}</span>
    </div>
    <button id="ifeito" class="check"></button>
    <button id="edit" class="edit"></button>
    <button id="delete" class="delete"></button>
    `
    const task = document.createElement('div')
    task.innerHTML = DivHtmlCreate
    task.classList.add('listasColocadas')
    task.classList.add('todo')
    listAdd.appendChild(task)
    inputTask.value = ""
    inputTask.focus()
}
const toggleForm = () => {
    formTask.classList.toggle("hide")
    formEditTask.classList.toggle("hide")
    listAdd.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("span")

        if(todoTitle.innerText === oldTitleValue){
            todoTitle.innerText = text
        }
    })
}
const filterTasks = (searchValue) => {
    const tasks = document.querySelectorAll(".listasColocadas")
  
    tasks.forEach((task) => {
      const taskTitle = task.querySelector(".res").innerText.toLowerCase()
      if (taskTitle.includes(searchValue.toLowerCase())) {
        task.style.display = "flex"; // Exibe a tarefa
      } else {
        task.style.display = "none"; // Oculta a tarefa
      }
    })
  }
const filterOption = (optionSelected) => {
    const tasks = document.querySelectorAll(".todo")
    if (optionSelected === "feitas"){
        tasks.forEach((task) => {
            if (task.classList.contains("done")) {
              task.style.display = "flex"; // Exibe a tarefa
            } else {
              task.style.display = "none"; // Oculta a tarefa
            }
          })
    }
    if (optionSelected === "a fazer"){
        tasks.forEach((task) => {
            if (!task.classList.contains("done")) {
              task.style.display = "flex"; // Exibe a tarefa
            } else {
              task.style.display = "none"; // Oculta a tarefa
            }
          })
    }
    if (optionSelected === "todas"){
        tasks.forEach((task) => {
            if (task.classList.contains("done")) {
              task.style.display = "flex"; // Exibe a tarefa
            } else {
              task.style.display = "flex"; // Oculta a tarefa
            }
          })
    }
  }
  

//eventos
formTask.addEventListener("submit", (e) => {
    e.preventDefault() // evita que mandemos para o backend ja que nao é o intuito
    const inputTaskvalue = inputTask.value
    if(inputTaskvalue) {
        saveTodo(inputTaskvalue)
    }
})

document.addEventListener("click", (e) =>{
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle

    if(parentEl && parentEl.querySelector("span")){
        todoTitle = parentEl.querySelector("span").innerText
    }

    if (targetEl.classList.contains("check")){
        parentEl.classList.toggle("done")
    }
    if (targetEl.classList.contains("delete")){
        parentEl.remove()
    }
    if (targetEl.classList.contains("edit")){
        toggleForm()
        inputEditTask.value = todoTitle
        oldTitleValue = todoTitle
    }
})
butonCancel.addEventListener("click", (e) =>{
    e.preventDefault()
    toggleForm()
})

formEditTask.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInput = inputEditTask.value

    if(editInput){
        updateTodo(editInput)
    }

    toggleForm()
})

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value
    filterTasks(searchValue)
  });
buttonSearch.addEventListener("click", (e) => {
    e.preventDefault()
    searchInput.value = ""
    searchInput.focus()
    filterTasks("")
})

selectFilter.addEventListener("change", (e) => {
    const optionSelected = e.target.options[e.target.selectedIndex].value
    
    if(optionSelected === "feitas"){
        filterOption(optionSelected)
    }
    if(optionSelected === "a fazer"){
        filterOption(optionSelected)
    }
    if(optionSelected === "todas"){
        filterOption(optionSelected)
    }
})