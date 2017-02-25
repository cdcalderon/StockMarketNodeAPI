var schedule = require('node-schedule');
const {
    ObjectID
} = require('mongodb');
const {
    StockEarning
} = require('./../models/stockEarning');
const axios = require('axios');

var dateString2 = '2017-03-15';
//const earningUrl = 'https://www.bloomberg.com/markets/api/calendar/earnings/US?locale=en&date=';
const earningUrl = 'https://www.tipranks.com/api/earnings/getByDate/?name='
var populateEarnings = (startDateString, endDateString) => {
    let i = 0;
    let datesArray = getDatesArray(startDateString, endDateString);

    schedule.scheduleJob('*/1 * * * *', function() {
        getEarningInformation(datesArray[i++]).then((response) => {
            let dateString = response.config.dateString;
            if (response.status === 200) {
                // if (response.data.events == null) {
                //     throw new Error('Unable to find records');
                // }
                if (response.data == null) {
                    throw new Error('Unable to find records');
                }

                for (event of response.data) {
                    //let symbol = event.company.ticker.split(':')[0];
                    let symbol = event.ticker;

                    StockEarning.find({
                        symbol: symbol,
                        reportDateStr: response.config.dateString
                    }).then((earnings) => {
                        insertEarning(earnings, symbol, dateString);
                    });
                }
            }
        }).catch((e) => {
            if (e.code === '') {
                console.log('Unable to connect to API servers.')
            } else {
                console.log(e.message);
            }
        })
    });
}

var getEarningInformation = (dateString) => {
    return axios.get(`${earningUrl + dateString}`, {
        dateString
    });
}

var getDatesArray = (startDateString, endDateString) => {
    var start = new Date(startDateString);
    var end = new Date(endDateString);
    let datesArray = [];
    while (start < end) {
        var newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
        startDateString = `${start.getFullYear() + '-' + 
                           (start.getMonth() + 1) + '-' + 
                            start.getDate()}`;
        datesArray.push(startDateString);
    }
    return datesArray;
}

var insertEarning = (earnings, symbol, dateString) => {
    if (!earnings.length) {
        console.log('Dont exits, so i can add it');
        var stockEarning = new StockEarning({
            symbol: symbol,
            reportDateStr: dateString
        });

        stockEarning.save().then((doc) => {
            console.log('success saving.. : ', doc);
        }, (e) => {
            console.log('error saving.. : ', e);
        });
    } else {
        console.log('exits, so i can not add it');
    }
}

module.exports.populateEarnings = populateEarnings;