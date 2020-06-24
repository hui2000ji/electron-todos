'use strict'

const { ipcRenderer } = require('electron')

// delete todo by its text value ( used below in event listener)
const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

document.getElementById('todoForm').addEventListener('submit', e => {
    e.preventDefault()
    const input = e.target[0]
    ipcRenderer.send('add-todo', input.value)
    input.value = ''
})

// on receive todos
ipcRenderer.on('todos', (event, todos) => {
    // get the todoList ul
    const todoList = document.getElementById('todoList')

    // create html string
    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`

        return html
    }, '')

    // set list html to the todo items
    todoList.innerHTML = todoItems

    // add click handlers to delete the clicked todo
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})