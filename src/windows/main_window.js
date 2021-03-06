const { app, Menu, BrowserWindow, Tray,ipcMain } = require('electron');
const path = require('path');

/**
 * 主窗口
 */
class MainWindow {

  constructor() {
    console.log("assert:" + assets);
    this.isShown = false;
    this.createWindow();
  }

  createWindow() {
    this.browserWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      autoHideMenuBar: true,
      show: false,
      icon: path.join(assets, 'app_launcher_foreground.png'),
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: false,
        webSecurity: false,
        preload: path.join(__dirname, '../inject/preload.js'),
      }
    });
    this.browserWindow.loadURL("https://www.feishu.cn/messenger");
    // this.browserWindow.loadURL("https://www.baidu.com");
    this.browserWindow.on('close', (event) => {
      if (this.browserWindow.isVisible()) {
        this.browserWindow.minimize()
        event.preventDefault();
      }
    });

    this.browserWindow.on('restore', () => {
      console.log("restore");
    })
    this.browserWindow.on('ready-to-show', () => {
      console.log("restore");
    })

    this.browserWindow.on('show', () => {
      //tray.setHighlightMode('always')
      console.log("show");
    })

    this.browserWindow.on('hide', () => {
      //tray.setHighlightMode('never')
      console.log("hide");
    })

    //页面准备好,隐藏加载界面,显示主界面
    this.browserWindow.on('ready-to-show',() => {
      this.show();
      //发送主窗口准备显示事件,splash页接收到该事件后,自动关闭.
      ipcMain.emit("main-window-ready-to-show");
    });
  }

  show() {
    this.browserWindow.show();
  }
}
module.exports = MainWindow;