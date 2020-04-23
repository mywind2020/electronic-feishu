const { app, Menu,BrowserWindow,nativeImage, Tray,ipcMain } = require('electron')
const path = require('path');
const MainWindow = require('./windows/main_window');
const AppTray = require('./tray/app_tray');


global.asserts = __dirname + "/../asserts/";


app.userAgentFallback = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3683.75 Safari/537.36";
app.on('ready', () => {
  mainWindow = new MainWindow();
  tray = new AppTray(mainWindow);
})
