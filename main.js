// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const ipcMain = require('electron').ipcMain;
var client = require('electron-connect').client;
var gulp = require('gulp');
var electron = require('electron-connect').server.create();
// 监听 ‘blabla’ 通道，收到消息后输出，并向 'blibli' 通道发送消息
ipcMain.on('blabla', function(event, arg) {
  console.log(arg);
  event.sender.send('blibli', 'hello client!');
})
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      resizable: false
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  gulp.task('watch:electron', function () {
    electron.start();
    gulp.watch(["./*.js"], electron.restart);
    gulp.watch(['./*.{html,js,css}'], electron.reload);
  });
// client.create(new BrowserWindow());
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.