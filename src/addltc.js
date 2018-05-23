const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipcLtc = electron.ipcRenderer

const closeBtnLtc = document.getElementById('closeBtnLtc')


closeBtnLtc.addEventListener('click', function (event) {
    var windowLtc = remote.getCurrentWindow();
    windowLtc.close();
})



//SAMPLE CODE
const updateBtnLtc = document.getElementById('updateBtnLtc')

updateBtnLtc.addEventListener('click', function () {
  ipcLtc.send('update-notify-value-ltc', document.getElementById('notifyValLtc').value)

  // Close this window
  var windowLtc = remote.getCurrentWindow();
  windowLtc.close();
})
