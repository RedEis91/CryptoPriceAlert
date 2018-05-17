const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
//define variable to access h1 element where BTC price is displayed
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notification = {
	title: 'BTC Alert',
	body: 'BTC just beat your target price!'
}

//using axios library for get request
//get the current price of BTC in USD

function getBTC(){
	console.log('btc price loading...')
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		.then(res => {
			const cryptos = res.data.BTC.USD
			price.innerHTML = '$' +cryptos.toLocaleString('en')

			if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
				const myNotification = new window.Notification(notification.title, notification)
			}
	})
}


//run getBTC() every 30 seconds (30,000 milliseconds)
getBTC();
setInterval(getBTC, 10000)

notifyBtn.addEventListener('click', function(event){
	const modalPath = path.join('file://', __dirname, 'add.html')
	//modal that displays when prompting user for target price
	let win = new BrowserWindow({
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		width: 400,
		height: 200
	})
	win.on('close', function(){ win = null })
	win.loadURL(modalPath)
	win.show()
})
//get price from modal window and pass back into main window of app as a number
//sends and receives messages from window to window
ipc.on('targetPriceVal', function(event, arg){
	targetPriceVal = Number(arg)
	targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})
