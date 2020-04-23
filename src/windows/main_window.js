const { app, Menu, BrowserWindow, Tray } = require('electron');
const path = require('path');

/**
 * 主窗口
 */
class MainWindow {

  constructor() {
    console.log("assert:" + asserts);
    this.isShown = false;
    this.createWindow();
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      autoHideMenuBar: true,
      icon: path.join(asserts, 'app_launcher_foreground.png'),
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: false,
        webSecurity: false,
        preload: path.join(__dirname, '../inject/preload.js'),
      }
    });
    this.mainWindow.loadURL("https://www.feishu.cn/messenger");
    this.mainWindow.on('close', (event) => {
      if (this.mainWindow.isVisible()) {
        this.mainWindow.minimize()
        event.preventDefault();
      }
    });

    this.mainWindow.on('restore', () => {
      console.log("restore");
    })
    this.mainWindow.on('ready-to-show', () => {
      console.log("restore");
    })

    this.mainWindow.on('show', () => {
      //tray.setHighlightMode('always')
      console.log("show");
    })

    this.mainWindow.on('hide', () => {
      //tray.setHighlightMode('never')
      console.log("hide");
    })
  }

  show() {
    this.mainWindow.show();
  }
}
module.exports = MainWindow;