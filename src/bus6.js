const request = require('request')
var cheerio = require('cheerio');


const bus6 = (callback) => {
  var hour;
  var minute = [];
  var busData = [];

  request('https://www.komunikacja.bialystok.pl/?page=przystanek&nrl=6&nrp=200&k=1&rozklad=', function (error, response, html) {
  if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('#rozklad_1').each(function(i, element){
        if(i === 0) {
          $(this).find('tr').each(function(x, element){
            $(this).find('td').each(function(y, element){
              $(this).find('span').each(function(z, element){
                  z === 0 ? hour = $(this).text() : null
                  z !== 0 ? minute = minute.concat($(this).text().substring(0, 2)) : null
              })
            })
            if(busData !== undefined) {
              busData.push({ 
                "hour" : hour,
                "minute" : minute
              });
            }
            minute = []
          })
        }
      });
      callback(undefined, busData);
    } else {
      callback('There was an error getting the cost of bus', undefined);
    }
  });
}


module.exports = bus6