var schedule = require('node-schedule');
const { ObjectID } = require('mongodb');
const { StockEarning } = require('./../models/stockEarning');
const axios = require('axios');

var dateString2 = '2017-03-15';
var earningUrl = 'https://www.bloomberg.com/markets/api/calendar/earnings/US?locale=en&date=';

var populateEarnings = (startDateString, endDateString) => {
  let i = 0;
    let datesArray = getDatesArray(startDateString, endDateString);

    schedule.scheduleJob('*/1 * * * *', function(){
      getEarningInformation(datesArray[i++]).then((response) => {
         let dateString = response.config.dateString;
          if(response.status === 200) {
            if(response.data.events == null){
              throw new Error('Unable to find records');
            }
      
            for(event of response.data.events) {
              console.log(`${dateString + event.company.ticker.split(':')}`);
            }
          }
       }).catch((e) => {
            if(e.code === '') {
            console.log('Unable to connect to API servers.')
            } else {
            console.log(e.message);
            }
          })
    });
}

var getEarningInformation = (dateString) => {
    return axios.get(`${earningUrl + dateString}`, {dateString});
}

var getDatesArray = (startDateString, endDateString) => {
  var start = new Date(startDateString);
    var end = new Date(endDateString);
  let datesArray = [];
  while(start < end){
       var newDate = start.setDate(start.getDate() + 1);
       start = new Date(newDate);
       startDateString = `${start.getFullYear() + '-' + 
                           (start.getMonth() + 1) + '-' + 
                            start.getDate()}`;
       datesArray.push(startDateString);
  }
  return datesArray;
}

module.exports.populateEarnings = populateEarnings;