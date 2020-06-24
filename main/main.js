'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')
const DataStore = require('./dataStoreElectron')
const todos = new DataStore({ name: 'Todos Main' })
const Window = require('./Window')

function main() {
    let win = new Window({
        file: path.join('renderer', 'index.html')
    })

    win.once('show', () => win.webContents.send('todos', todos.todos))

    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todos.addTodo(todo).todos
        win.send('todos', updatedTodos)
    })

    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todos.deleteTodo(todo).todos
        win.send('todos', updatedTodos)
    })
}

app.whenReady().then(main)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})