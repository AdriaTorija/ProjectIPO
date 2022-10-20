
const { app, BrowserWindow, ipcMain, ipcRenderer, NodeEventEmitter } = require('electron');
const { win32 } = require('path');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height:950,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'reserva.html'));
  
  
    //console.log('Enviant ' + arg + " " + arg2);
    var today= new Date();
    var arg = String(today.getDate()).padStart(2, '0');
    var arg2 = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    
    mainWindow.webContents.on('did-finish-load', () => {
      //console.log('Enviant ' + arg + " " + arg2);
      mainWindow.webContents.send('tReserves', arg, arg2);
    });
  
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('Reservas', (event, arg, arg2) => {
  // Create the browser window.
  const rWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  // Carreguem pagina reserves
  rWindow.loadFile(path.join(__dirname, 'reserva2.html'));
  //Enviem dia reserva
  rWindow.webContents.on('did-finish-load', () => {
    //console.log('Enviant ' + arg + " " + arg2);
    rWindow.webContents.send('tReserves', arg, arg2);
  });

  // Open the DevTools.
  //rWindow.webContents.openDevTools();
});








ipcMain.on('NewReserva', (event, arg, arg2) => {
  const rWindow = new BrowserWindow({
    width: 300,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  // Carreguem pagina reserves
  rWindow.loadFile(path.join(__dirname, 'addReserva.html'));
  //Enviem dia reserva
  rWindow.webContents.on('did-finish-load', () => {
    console.log('Enviant ' + arg + " " + arg2);
    rWindow.webContents.send('nReserva', arg, arg2);
  });
})




ipcMain.on('Login',() => {
  
  const window= require('electron').BrowserWindow;
  const focusedWindow= window.getFocusedWindow();
  focusedWindow.loadFile(path.join(__dirname,'index.html'));
  console.log("Perfecte");
});

ipcMain.on('close',() =>{
  const window= require('electron').BrowserWindow;
  const focusedWindow= window.getFocusedWindow();
  focusedWindow.close();
  console.log("Tancada");
});

ipcMain.on('update1',(event, arg)=>{
  const window= require('electron').BrowserWindow;
  const w = window.getFocusedWindow();
  //console.log(arg);
  w.webContents.send('update2',arg);
  console.log("Updated");
  
});

ipcMain.on('modificarReserva',(event,arg,i)=>{
  const rWindow = new BrowserWindow({
    width: 210,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  // Carreguem pagina reserves
  rWindow.loadFile(path.join(__dirname, 'modificarReserva.html'));
  //Enviem dia reserva
  //rWindow.webContents.openDevTools();

  rWindow.webContents.on('did-finish-load', () => {
    console.log('Enviant ' + arg + " " + i);
    rWindow.webContents.send('modificarR', arg, i);
  });
});

ipcMain.on('Calendari', (event) => {
  const window= require('electron').BrowserWindow;
  const focusedWindow= window.getFocusedWindow();
  focusedWindow.loadFile(path.join(__dirname,'index.html'));
  console.log("Perfecte");
})

ipcMain.on('Taules',(event,arg,i)=>{
  const rWindow = new BrowserWindow({
    width: 650,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  // Carreguem pagina reserves
  rWindow.loadFile(path.join(__dirname, 'taula.html'));
  //Enviem dia reserva
  //rWindow.webContents.openDevTools();
});