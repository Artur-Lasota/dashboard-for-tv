const request = require('request')
var cheerio = require('cheerio');

const aqi = (callback) => {

    var aqivalue;
    var aqidata = [];
    var color;

    request('https://aqicn.org/city/poland/bialystok/bialystok-miejska/pl', function (error, response, html) {

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);

                $('#aqiwgtvalue.aqivalue').each(function(i, element){
                    aqivalue = ($(this).text());
                });

                if(aqidata !== undefined) {
                    if(aqivalue !== undefined){
                        if(aqivalue < 40){
                            color = 'green'
                        } else if (aqivalue >= 40 && aqivalue <= 70){
                            color = 'yellow'
                        } else {
                            color = 'red'
                        }
                    }
                    
                    aqidata.push({
                    "aqivalue" : aqivalue,
                    "color" : color
                    });
                }
                callback(undefined, aqidata[0]);

            } else
            {
                return callback('error with air quality.', undefined);
            }
    });
}

module.exports = aqi;