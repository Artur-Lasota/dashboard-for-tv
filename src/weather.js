const request = require('request')



 const forecast = (latitude, longitude, callback) => {
    var url = 'https://api.darksky.net/forecast/3752cd032be86263d304c3b286ef212b/' + latitude + ',' + longitude + '?units=si'
    var weatherData = [];



    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location for temp', undefined)
        } else {
            if(weatherData !== undefined)
            {
                weatherData.push({
                'icon': body.daily.data[0].icon,
                'temperature': body.currently.temperature.toFixed(1),
                'highTemp': body.daily.data[0].temperatureHigh.toFixed(1),
                'lowTemp': body.daily.data[0].temperatureLow.toFixed(1),
                'rainProb': body.currently.precipProbability * 100
            })
            }
            callback(undefined, weatherData[0])
        }
    })
    
}


module.exports = forecast