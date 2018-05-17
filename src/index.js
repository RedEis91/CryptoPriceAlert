const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');

const notifyBtn = document.getElementById('notifyBtn')
//define variable to access h1 element where BTC price is displayed
var price = document.querySelector('h1')

var targetPrice = document.getElementById('targetPrice')

//using axios library for get request
//get the current price of BTC in USD

function getBTC(){
	console.log('btc price loading...')
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		.then(res => {
			const cryptos = res.data.BTC.USD
			console.log('btc price is: ' + cryptos);
			price.innerHTML = '$' +cryptos.toLocaleString('en')
	})
}


//run getBTC() every 30 seconds (30,000 milliseconds)
getBTC();
setInterval(getBTC, 30000)

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
