const { app, Menu, BrowserWindow,nativeImage,Tray,ipcMain } = require('electron');
const path = require('path');
/**
 * 系统托盘图标
 */
class AppTray {

  constructor(mainWindow) {
      this.trayIconUnread = nativeImage.createFromPath(path.join(assets,'app_launcher_foreground_unread.png'));
      this.trayIcon = nativeImage.createFromPath(path.join(assets,'app_launcher_foreground.png'));
      this.mainWindow = mainWindow;
      this.initTray();
      this.initIpc();
      //this.splashWindow = splashWindow;
      this.lastUnreadStat = 0;
      
    }

    /**
     * 初始化ipc
     */
    initIpc() {
      ipcMain.on('badge-changed', (event, num) => {
        if (process.platform == "darwin") {
          app.dock.setBadge(num);
          if (num) {
            this.tray.setTitle(` ${num}`);
          } else {
            this.tray.setTitle('');
          }
        } else if (process.platform === "linux" || process.platform === "win32") {
    //        app.setBadgeCount(num * 1);
            console.log("num=" + num);
            if (num*1>0) {
              this.setUnreadStat(1);
            } else {
              this.setUnreadStat(0);
            }
            // if(num * 1 > 0 && !this.mainWindow.isFocused) {
            //   this.setUnreadStat(1);
            // }
            // if(this.mainWindow.isFocused && num * 1==0) {
            //   this.setUnreadStat(0);
            // }
        }
      });
    }

    /**
     * 初始化窗体
     */
    initTray() {
        this.tray = new Tray(this.trayIcon);
        const contextMenu = Menu.buildFromTemplate([
            {
                label: '显示',
                click: () => {
                  this.mainWindow.show();
                }
            },
            {
                label: '退出',
                click: ()=> {
                    console.log("退出!");
                    app.exit(0);
                }
            }
        ]);
        this.tray.setToolTip('飞书');
        this.tray.setContextMenu(contextMenu);
    }

    setUnreadStat(stat) {
      console.log("stat:" + stat + " lastUnread:" + this.lastUnreadStat);
      if (stat === this.lastUnreadStat) {
        return;
      }
      if (stat === 0) {
        this.tray.setImage(this.trayIcon);
      } else {
        this.tray.setImage(this.trayIconUnread);
      }
      this.lastUnreadStat = stat;
    }
}
module.exports = AppTray;

