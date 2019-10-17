const request = require('request');

const news = (callback) => {
    var url = 'https://newsapi.org/v2/top-headlines?country=pl&apiKey=7e80e5e99323496ab2a5723ae56764db';
    var bodyData = [];

   


    request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to news service!', undefined)
            } else if (body.error) {
                callback('Unable to load news', undefined)
            } else {
                var articles = [];

                articles = body.articles

                for( i=0; i<articles.length; i++){
                    bodyData.push({
                        "source": {
                            "id": articles[i].source.id,
                            "name": articles[i].source.name
                        },
                        "author": articles[i].author,
                        "title": articles[i].title,
                        "description": articles[i].description,
                        "url": articles[i].url,
                        "urlToImage": articles[i].urlToImage,
                        "publishedAt": articles[i].publishedAt,
                        "content": articles[i].content
                    })
                };
                

               
                callback(undefined, bodyData)
            }
        })
}
module.exports = news;