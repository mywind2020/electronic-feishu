const { app, Menu,BrowserWindow,nativeImage, Tray,ipcMain } = require('electron')
const path = require('path');

let tray = null;
let mainWindow = null;
let trayIconUnread = nativeImage.createFromPath(path.join(__dirname,'../asserts/app_launcher_foreground_unread.png'));
let trayIcon = nativeImage.createFromPath(path.join(__dirname,'../asserts/app_launcher_foreground.png'));
lastUnreadStat = 0;

app.userAgentFallback = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3683.75 Safari/537.36";
app.on('ready', () => {

  console.log(__dirname);
  console.log(path.join('asserts/','app_launcher_foreground.png'));

  function setUnreadStat(stat) {
    if (stat === lastUnreadStat) return;
    lastUnreadStat = stat;
    if (stat === 0) {
      tray.setImage(trayIcon);
    } else {
      tray.setImage(trayIconUnread);
    }
  }
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    icon: path.join(__dirname,'../asserts/app_launcher_foreground.png'),
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: path.join(__dirname, 'inject/preload.js'),
    }
  });
  mainWindow.loadURL("https://www.feishu.cn/messenger");
  //mainWindow.webContents.openDevTools();

  mainWindow.on('close', (event) => { 
    if (mainWindow.isVisible()) {
      mainWindow.minimize()
      event.preventDefault();
    }
  });



  mainWindow.on('restore',()=>{
    console.log("restore");
  })
  mainWindow.on('ready-to-show',()=>{
    console.log("restore");
  })

  mainWindow.on('show', () => {
    //tray.setHighlightMode('always')
    console.log("show");
  })

  mainWindow.on('hide', () => {
    //tray.setHighlightMode('never')
    console.log("hide");
  })

  ipcMain.on('badge-changed', (event, num) => {
    if (process.platform == "darwin") {
      app.dock.setBadge(num);
      if (num) {
        tray.setTitle(` ${num}`);
      } else {
        tray.setTitle('');
      }
    } else if (process.platform === "linux" || process.platform === "win32") {
//        app.setBadgeCount(num * 1);
        if(num * 1 > 0 && !mainWindow.isFocused()) {
          setUnreadStat(1);
        }
        if(mainWindow.isFocused && num * 1==0) {
          setUnreadStat(0);
        }
    }
  });


  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '显示', click: function(){
        mainWindow.show();
      }
    },
    { 
      label: '退出', click: function(){
        console.log("退出!");
        app.exit(0);
      }
    }
  ]);

  tray.setToolTip('飞书');
  tray.setContextMenu(contextMenu);
})
