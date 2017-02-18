var mongoose = require('mongoose');

var StockEarning= mongoose.model('StockEarning', {
  symbol: { 
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  reportDateStr: {
    type: String,
    default: null
  },
  reportTimeStr: {
    type: String
  },
  confCallStr: {
    type: String
  },
});

module.exports = { StockEarning };