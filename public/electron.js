const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow, welcomeWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 1280,
      height: 720,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    }
  );

  welcomeWindow = new BrowserWindow(
    {
      width: 440,
      height: 440,
      centered: true,
      frame: false,
      show: true,
    }
  );

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
    console.log("path", app.getAppPath);
  }

  welcomeWindow.loadURL(`file://${path.join(__dirname, '../src/static/welcomeWindow.html')}`);
  // mainWindow.maximize();
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      mainWindow.show();
      welcomeWindow.hide();
    }, 300);
  })
  mainWindow.on('closed', () => mainWindow = null);
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