const request = require('request')
var cheerio = require('cheerio');



const gas = (callback) => {


 var gasData = [];
 var title;
 var diePrice;
 var diePriceDiff;
 var e95PriceDiff;
 var s98PriceDiff;
 var lpgPriceDiff;
 var e95Price;
 var s98Price;
 var lpgPrice;

  request('https://www.wnp.pl/nafta/ceny_paliw/', function (error, response, html) {
  if (!error && response.statusCode == 200) {

    var $ = cheerio.load(html);
    $('.table-3').each(function(i, element){

      if(i === 0) {
        $(this).find('tbody').each(function(z, element){
        $(this).find('tr').each(function(x, element){
          
          $(this).find('td').each(function(y, element){
            if(y===0 ||  y===1 || y===2 || y===3 || y===4) {
              var data = $(this).text();
              //console.log(data);
              
              y === 0 ? title = $(this).text() : null
              if(y === 1){
                diePrice = $(this).text().substring(0, 4)
                diePriceDifference = $(this).find('span').text().substring(0,2)
                diePriceDiff = diePriceDifference.replace(/\(|\)|\s/g, "")
              }
              if(y === 2) {
                e95Price = $(this).text().substring(0, 4)
                e95PriceDifference = $(this).find('span').text().substring(0,2)
                e95PriceDiff = e95PriceDifference.replace(/\(|\)|\s/g, "")
              }
              if(y === 3) {
                s98Price = $(this).text().substring(0, 4)
                s98PriceDifference = $(this).find('span').text().substring(0,2)
                s98PriceDiff = s98PriceDifference.replace(/\(|\)|\s/g, "")
              }
              if(y === 4) {
                lpgPrice = $(this).text().substring(0, 4)
                lpgPriceDifference = $(this).find('span').text().substring(0,2)
                lpgPriceDiff = lpgPriceDifference.replace(/\(|\)|\s/g, "")
              }
              
            }
          })

          if(title !== undefined || lpgPrice !== undefined) {
            if(title === "Podlaskie"){
              gasData.push({ 
                "title" : title, 
                "diePrice" : diePrice, 
                "diePriceDiff" : diePriceDiff,
                "e95Price" : e95Price,
                "e95PriceDiff" : e95PriceDiff,
                "s98Price" : s98Price,
                "s98PriceDiff" : s98PriceDiff,
                "lpgPrice" : lpgPrice,
                "lpgPriceDiff" : lpgPriceDiff 
              });
            }
          }
          

        })
      })
    }
    });

    

    callback(undefined,gasData);

  } else {
    callback('There was an error getting the cost of gas', undefined);
  }
});
    
}


module.exports = gas