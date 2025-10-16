const { app, BrowserWindow } = require('electron')
const onlyonewindow = app.requestSingleInstanceLock();

if (require('electron-squirrel-startup')) app.quit();
if (!onlyonewindow) app.quit();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1214,//970,
    height: 683,//725,
    icon: __dirname + '/Timericon.ico',
    //minWidth: 739,
    //minHeight: 599,
    //frame: false
    autoHideMenuBar: true
  })

  win.loadFile('index.html')
  //win.setResizable(false)
}

app.whenReady().then(() => {
  createWindow()
})