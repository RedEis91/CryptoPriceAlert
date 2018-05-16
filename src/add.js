const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeBtn = document.getElementById('closeBtn')

console.log("outside");

closeBtn.addEventListener('click', function (event) {
	console.log("clicked!");
    var window1 = remote.getCurrentWindow();
    window1.close();
})
