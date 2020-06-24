/**
 * Main process
 *  - Writing data — adds todos, removes todos
 *  - Reading data — reads todos
 *  - Sending data — send todos to the Todo List window on
 *    initial load and when updated
 *  - Receives data — from both windows and handles communicating 
 *    between windows
 *  - Creating Windows — creates the Todo List window and an Add 
 *    Todo window when requested by the main window
 */

'use strict'

const { BrowserWindow } = require('electron')

const defaultProps = {
    width: 500,
    height: 800,
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
}

class Window extends BrowserWindow {
    constructor({ file, ...windowSettings }) {
        super({ ...defaultProps, ...windowSettings })

        this.loadFile(file)
        this.webContents.openDevTools()

        this.once('ready-to-show', () => this.show())
    }
}

exports = module.exports = Window
