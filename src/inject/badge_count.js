/**
 * Created by Zhongyi on 4/12/16.
 */
'use strict';
const { ipcRenderer } = require('electron');

class BadgeCount {
  static init() {
    setInterval(() => {
      let count = 0;
      if(document.getElementsByClassName("larkc-badge-count").length>0) {
        count = 1;
      }
      console.log("count:" + count);
      if (count > 0) {
        ipcRenderer.send('badge-changed', count.toString());
      } else {
        ipcRenderer.send('badge-changed', '0');
      }
    }, 1500);
  }
}

module.exports = BadgeCount;
