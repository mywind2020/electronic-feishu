const { app, Menu,BrowserWindow,nativeImage, Tray,ipcMain } = require('electron')

const path = require('path');
class SplashWindow {
  constructor() {
    this.initIpc();
    this.splashWindow = new BrowserWindow({
      width: 380,
      height: 120,
      title: "飞书",
      resizable: false,
      center: true,
      show: true,
      frame: false,
      autoHideMenuBar: true,
      alwaysOnTop: true,
      icon: path.join(assets, 'app_launcher_foreground.png'),
      titleBarStyle: 'hidden',
    });

    this.splashWindow.loadURL(`file://${path.join(__dirname, './views/splash.html')}`);
    //this.isShown = false;
  }

  initIpc() {
    //主窗口准备显示,splash页关闭
    ipcMain.once("main-window-ready-to-show",()=>{
      this.splashWindow.close();
    })
  }

  show() {
    this.splashWindow.show();
    this.isShown = true;
  }

  hide() {
    this.splashWindow.hide();
    this.isShown = false;
  }
}

module.exports = SplashWindow;