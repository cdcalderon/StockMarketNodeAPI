var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { StockEarning } = require('./models/stockEarning');

var app = express();

app.use(bodyParser.json());

app.post('/earnings', (req, res) => {
  var stockEarning = new StockEarning({
    symbol: req.body.symbol
  });

  stockEarning.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000...')
});

module.exports = { app };




















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