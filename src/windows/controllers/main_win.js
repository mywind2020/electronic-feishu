const { app, Menu,BrowserWindow, Tray } = require('electron');


class MainWindow {
    constructor() {
        this.isShown = false;
        this.createWindow();
        // this.initWechatWindowShortcut();
        // this.initWindowEvents();
        // this.initWindowWebContent();
    }

    createWindow() {
        this.browserWindow = new BrowserWindow({
            width: 1024,
            height: 768
          });
    }
    
}