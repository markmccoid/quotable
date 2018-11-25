const electron = require('electron');
const app = electron.app;
const { BrowserWindow, ipcMain } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  if (isDev) {
    //--- Work
    // let reactDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/mark.mccoid/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.3.1_0`);
    // let reduxDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/mark.mccoid/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.3_1`);
    //--- Home
    let reactDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/Mark/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.4.2_0`);
    let reduxDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/Mark/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.3_0`);
  } 
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// ipcMain.on('file-read', (event, arg) => {
//   console.log(arg);
//   nfa.getQuoteAuthors()
//     .then(data => {
//       event.sender.send('file-result', data)
//     })
// })