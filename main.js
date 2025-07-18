const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1214,//970,
    height: 683,//725,
    //minWidth: 739,
    //minHeight: 599,
    //frame: false
  })

  win.loadFile('index.html')
  //win.setResizable(false)
}

app.whenReady().then(() => {
  createWindow()
})