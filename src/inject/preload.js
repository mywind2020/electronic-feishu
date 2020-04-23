const { ipcRenderer, webFrame } = require('electron');
const BadgeCount = require('./badge_count');


console.log("==========================");

// function initIPC() {
//     // clear currentUser to receive reddot of new messages from the current chat user
//     ipcRenderer.on('hide-wechat-window', () => {
//       this.lastUser = angular.element('#chatArea').scope().currentUser;
//       angular.element('.chat_list').scope().itemClick("");
//     });
//     // recover to the last chat user
//     ipcRenderer.on('show-wechat-window', () => {
//       if (this.lastUser != null) {
//         angular.element('.chat_list').scope().itemClick(this.lastUser);
//       }
//     });
// }

BadgeCount.init();