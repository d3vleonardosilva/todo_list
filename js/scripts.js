//Element selection - Ações
const todoForm = document.querySelector("#todo-form");
const btnSubmitNewTask = document.querySelector("#btn-submet");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
//Functions

//Arrow function que cria no HTML a listagem das tarefas com os botões
//"text" é o parametro que recebe oque é digitado no todoInput.value
const saveTodo = (text) => {

    //cria <div class="todo">
    const todo = document.createElement("div");
    todo.classList.add("todo");

    //cria <h3>Texto digitado no input</h3>
    const todoTitle = document.createElement("h3");
    //Põe o texto no H3
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    //Cria <button class="finish-todo">
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    //Põe o icone no botão
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    //Cria <button class="edit-todo">
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    //Põe o icone no botão
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    //Cria <button class="remove-todo">
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    //Põe o icone no botão
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    //Limpa o value do input
    todoInput.value = "";

    //Põe o curso no input
    todoInput.focus();
};

//toggle adciona o nome "hide" na classe quando não tem e tira quando tem
//OBS o nome hide adcionado a class pucha o estilo no CSS ocultando a mesma
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

//Salva a alteração feita na tarefa
const updateTodo = (text) => {
    //Faz um seletor de todas as classes de nome "todo"
    const todos = document.querySelectorAll(".todo");
    //Varre atraves de um loop
    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")
        //se o conteudo de uma "todo" for igual a variavel oldInputValue, é substituido pelo valor passado pelo parametro.
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })


}

//Events

todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Front-end elimina o envio de form

    const inputValue = todoInput.value;
    // Mini validação, value do input fazio=fause, não fazio=true
    if (inputValue) {
        saveTodo(inputValue);
    }
})

//Eventos dos botoes da Lista
document.addEventListener("click", (e) => {
    //target é o evento de click do mouse ele pega o HTML  e joga numa variavel
    const targetEl = e.target
    //closest("div") pega a DIV que o item foi clicado
    const parentEl = targetEl.closest("div");

    //Botão check
    //contains que é boolean, valida pelo nome da classe
    if (targetEl.classList.contains("finish-todo")) {
        //A propriedade toggle add o nome junto ao existente e se ele já existe então é retirado
        parentEl.classList.toggle("done");
    }

    //Botão remover
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    //Botão Editar
    let todoTitle;
    //Valida se existe o elemento PAI e se tem o H3 tambem
    if (parentEl && parentEl.querySelector("h3")) {
        //se verdadeiro, é quardado o texto do h3 em todoTitle
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    if (targetEl.classList.contains("edit-todo")) {
        //chama a função que alterna a classlist.toggle("hide")
        toggleForms();

        //mostra o conteudo da lista no value do input e guarda na variavel oldInputValue
        editInput.value = todoTitle;
        oldInputValue = todoTitle;

    }

})

//Botão cancelar
cancelEditBtn.addEventListener("click", (e) => {
    //Front-end elimina o envio de form
    e.preventDefault();
    //chama a função que alterna a classlist.toggle("hide")
    toggleForms();
})

//Botao check atualizar do formulario de edição da tarefa
editForm.addEventListener("submit", (e) => {
    //Front-end elimina o envio de form
    e.preventDefault();

    const editInputValue = editInput.value;

    //Valida o input para não salvar vazio
    if (editInputValue) {
        //Chama a função passando o parametro com o conteúdo do value do input
        updateTodo(editInputValue);
    };
    //chama a função que alterna a classlist.toggle("hide")
    toggleForms();
})