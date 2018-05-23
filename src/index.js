const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
//define variable to access h1 element where BTC price is displayed
var priceBtc = document.getElementById('priceBtc')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notification = {
	title: 'BTC Alert',
	body: 'BTC just beat your target price!'
}

const notifyBtnEth = document.getElementById('notifyBtnEth')
//define variable to access h2 element where ETH price is displayed
var priceEth = document.getElementById('priceEth')
var targetPriceEth = document.getElementById('targetPriceEth')
var targetPriceValEth

const notificationEth = {
	title: 'ETH Alert',
	body: 'Ethereum just beat your target price!'
}

const notifyBtnLtc = document.getElementById('notifyBtnLtc')
//define variable to access h2 element where ETH price is displayed
var priceLtc = document.getElementById('priceLtc')
var targetPriceLtc = document.getElementById('targetPriceLtc')
var targetPriceValLtc

const notificationLtc = {
	title: 'LTC Alert',
	body: 'Litecoin just beat your target price!'
}

//using axios library for get request
//get the current price of BTC in USD

function getBTC(){
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		.then(res => {
			const cryptos = res.data.BTC.USD
			priceBtc.innerHTML = cryptos.toLocaleString('en-US', {style: 'currency', currency: 'USD'})

			if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
				const myNotification = new window.Notification(notification.title, notification)
			}
	})
}

function getETH(){
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD')
		.then(res => {
			const cryptosETH = res.data.ETH.USD
			priceEth.innerHTML = cryptosETH.toLocaleString('en-US', {style: 'currency', currency: 'USD'})

			if (targetPriceEth.innerHTML != '' && targetPriceValEth < res.data.ETH.USD) {
				const myNotification = new window.Notification(notification.title, notificationEth)
			}
	})
}

function getLTC(){
	console.log('eth price loading...')
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=LTC&tsyms=USD')
		.then(res => {
			const cryptosLTC = res.data.LTC.USD
			priceLtc.innerHTML = cryptosLTC.toLocaleString('en-US', {style: 'currency', currency: 'USD'})

			if (targetPriceLtc.innerHTML != '' && targetPriceValLtc < res.data.LTC.USD) {
				const myNotification = new window.Notification(notification.title, notificationLtc)
			}
	})
}



//run getBTC() every 10 seconds (10,000 milliseconds)
getBTC();
setInterval(getBTC, 10000)

//run getETH() every 30 seconds (30,000 milliseconds)
getETH();
setInterval(getETH, 30000)

//run getLTC() every 30 seconds (30,000 milliseconds)
getLTC();
setInterval(getLTC, 30000)


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

notifyBtnEth.addEventListener('click', function(event){
	const modalPath = path.join('file://', __dirname, 'addeth.html')
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
ipc.on('targetPriceValEth', function(event, arg){
	targetPriceValEth = Number(arg)
	targetPriceEth.innerHTML = '$' + targetPriceValEth.toLocaleString('en')
})

notifyBtnLtc.addEventListener('click', function(event){
	const modalPath = path.join('file://', __dirname, 'addltc.html')
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
ipc.on('targetPriceValLtc', function(event, arg){
	targetPriceValLtc = Number(arg)
	targetPriceLtc.innerHTML = '$' + targetPriceValLtc.toLocaleString('en')
})
