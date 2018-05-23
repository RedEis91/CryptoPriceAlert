const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc1 = electron.ipcRenderer

const closeBtnEth = document.getElementById('closeBtnEth')


closeBtnEth.addEventListener('click', function (event) {
    var windowEth = remote.getCurrentWindow();
    windowEth.close();
})



//SAMPLE CODE
const updateBtnEth = document.getElementById('updateBtnEth')

updateBtnEth.addEventListener('click', function () {
  ipc1.send('update-notify-value-eth', document.getElementById('notifyValEth').value)

  // Close this window
  var windowEth = remote.getCurrentWindow();
  windowEth.close();
})
