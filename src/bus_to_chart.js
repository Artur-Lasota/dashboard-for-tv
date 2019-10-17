const request = require('request')

const bus_to_chart = (busNum, callback) => {

    var hour = [];
    var minute = [];
    var minuteChart = [];
    var iterator = 0;
    var percentsData = [];
    var url = 'http://localhost:5000/api/bus'+busNum
    var currentTime = new Date();
    var modifiedTime = new Date();
    
    function convertToEpoch(hour, minute){
        modifiedTime.setHours(hour)
        modifiedTime.setMinutes(minute)
        modifiedTime.setSeconds(0)
         var diff = new Date(modifiedTime.getTime() - currentTime.getTime()).getMinutes()
         var diffToPercents = ((diff/60)*100).toFixed(0)
         percentsData.push({
             "percent": diffToPercents,
             "minute": diff
         })
    }
    
    request({url, json: true}, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            hour = html.bus
            if(hour !== undefined){
                for(i=1; i < hour.length; i++){
                   if(hour[i].hour == currentTime.getHours()){
                       if((hour[i] !== undefined || hour[i+1] !== undefined) && i !=0 ){
                           if(hour[i].hour != 23)
                        {
                            minute.push({
                            "minute":  hour[i].minute,
                            "minuteAfterHour": hour[i+1].minute
                         })
                        } else
                        {
                            minute.push({
                                "minute":  hour[i].minute,
                                "minuteAfterHour": hour[1].minute
                             })
                        }
                       }
                         for(j=0; j < minute[0].minute.length; j++){
                            if(minute[0].minute[j] > currentTime.getMinutes()){
                               iterator++;
                               minuteChart.push({
                                   "hour": hour[i].hour,
                                   "minute": minute[0].minute[j]
                               })
                                var length = (minute[0].minuteAfterHour.length)-iterator
                            } else {
                                var length = 0;
                            }
                         }
                            if(length == 2){
                               minuteChart.push({
                                   "hour": hour[i+1].hour,
                                   "minute": (minute[0].minuteAfterHour[0])
                               })
                               minuteChart.push({
                                   "hour": hour[i+1].hour,
                                   "minute": (minute[0].minuteAfterHour[1])
                               })
                           } else if(length == 1){
                              minuteChart.push({
                                    "hour": hour[i+1].hour,
                                  "minute": (minute[0].minuteAfterHour[0])
                             })
                           } else if(length == 0){
                            minuteChart.push({
                                "hour": hour[i+1].hour,
                                "minute": (minute[0].minuteAfterHour[0])
                            })
                            minuteChart.push({
                                "hour": hour[i+1].hour,
                                "minute": (minute[0].minuteAfterHour[1])
                            })
                            minuteChart.push({
                                "hour": hour[i+1].hour,
                                "minute": (minute[0].minuteAfterHour[2])
                            })
                           }
                   }
                }
            }

             for(i=0; i<minuteChart.length; i++){
                convertToEpoch(minuteChart[i].hour, minuteChart[i].minute)
             }
            callback(undefined, percentsData);
        } else {
            callback('There was an error getting the time of bus', undefined);
        }
        });
    }
module.exports = bus_to_chart