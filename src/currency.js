const request = require('request');

const currency = (callback) => {
    var url = 'https://api.exchangeratesapi.io/latest?base=PLN&symbols=USD,GBP,EUR,CHF';
    var bodyData = [];


    request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to currency service!', undefined)
            } else if (body.error) {
                callback('Unable to load currency', undefined)
            } else {
                    bodyData.push({
                        "base": body.base,
                        "rates":{
                            "CHF": (1/body.rates.CHF).toFixed(2),
                            "USD": (1/body.rates.USD).toFixed(2),
                            "EUR": (1/body.rates.EUR).toFixed(2),
                            "GBP": (1/body.rates.GBP).toFixed(2)
                        }
                    })
                callback(undefined, bodyData)
            }
        });

}
module.exports = currency;