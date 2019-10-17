const request = require('request');

const currency = (callback) => {
    var url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    var bodyData = [];

    
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to currency service!', undefined)
            } else if (body.error) {
                callback('Unable to load currency', undefined)
            } else {
                if(body !== undefined)
                    {
                        bodyData.push({
                        "rates":{
                            "BTC": (Math.round(body.bpi.USD.rate_float)).toString()
                            }
                        })
                        callback(undefined, bodyData)
                    }
                else {
                    console.log("Error with price")
                }
            }
        })
}
module.exports = currency;