'use strict'

class DataStore {
    getTodos() {
        return JSON.parse(window.localStorage.getItem('todos')) || []
    }

    saveTodos(todos) {
        window.localStorage.setItem('todos', JSON.stringify(todos))
    }

    addTodo() {
        const todos = [ ...this.getTodos(), todo ]
        this.saveTodos(todos)
        return todos
    }

    deleteTodo(todo) {
        const todos = this.getTodos()
        const found = todos.find((val, idx, obj) => val === todo)
        if (!found)
            console.log('todo not found!')
        todos = todos.filter(t => t !== todo)
        this.saveTodos(todos)
        return todos
    }
}