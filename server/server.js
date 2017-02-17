var { mongoose } = require('./db/mongoose');
var { StockEarning } = require('./models/stockEarning');






















// const axios = require('axios');





// var newStockEarning = new StockEarning({
//   symbol: 'aapl',
//   reportDateStr: "Mar 9",
//   reportTimeStr: "BeforeMarketOpen",
//   confCallStr: "Mar 9, 11:00 AM"
// });

// newStockEarning.save().then((doc) => {
//   console.log('Saved Stock Earning', doc);
// }, (e)=> {
//   console.log('Unable to save Earning')
// });

// let earningsUrl = 'https://www.jbloomberg.com/markets/api/calendar/earnings/US?locale=en&date=2017-03-15';
// axios.get(earningsUrl).then((response) => {
//   console.log(response.data.events);
// }).catch((e) => {
//   if(e.code == 'ECONNRESET'){
//     console.log('Unable to connect to API servers.');
//   }
//   console.log(e);
// });