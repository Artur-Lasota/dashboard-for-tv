const express = require('express')
const cors = require('cors');
const path = require('path');
const forecast = require('./src/weather')
const gas = require('./src/gas')
const bus6 = require('./src/bus6')
const bus13 = require('./src/bus13')
const bus18 = require('./src/bus18')
const aqi = require('./src/aqi')
const news = require('./src/news')
const currency = require('./src/currency')
const bitcoin = require('./src/bitcoin')
const bus_to_chart6 = require('./src/bus_to_chart6')
const bus_to_chart13 = require('./src/bus_to_chart13')
const bus_to_chart18 = require('./src/bus_to_chart18')

const app = express()
const port = process.env.PORT || 5000

if(process.env.NODE_ENV === 'production') {
    console.log('ENVIRONMENT: PRODUCTION')
    app.use(cors({ origin: 'https://dashboard-for-tv.herokuapp.com/', credentials: true}));
    // https://dashboard-for-tv.herokuapp.com/
} else {
    console.log('ENVIRONMENT: DEVELOPMENT')
    app.use(cors({ origin: 'http://localhost:3000', credentials: true}));
}




app.get('/api/weather', (req, res) => {

    forecast(53.132, 23.168, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
        })
    })
})


app.get('/api/gas', (req, res) => {

    gas((error, gasData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            gas: gasData,
        })
    })
})


app.get('/api/bus6', (req, res) => {

    bus6((error, busData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus: busData,
        })
    })
})

app.get('/api/bus13', (req, res) => {

    bus13((error, busData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus: busData,
        })
    })
})

app.get('/api/bus18', (req, res) => {

    bus18((error, busData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus: busData,
        })
    })
})

app.get('/api/bus_to_chart6', (req, res) => {

    bus_to_chart6((error, percentData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus_to_chart6: percentData,
        })
    })
})

app.get('/api/bus_to_chart13', (req, res) => {

    bus_to_chart13((error, percentData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus_to_chart13: percentData,
        })
    })
})

app.get('/api/bus_to_chart18', (req, res) => {

    bus_to_chart18((error, percentData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus_to_chart18: percentData,
        })
    })
})

app.get('/api/aqi', (req,res) => {

    aqi((error, aqiData) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            aqi: aqiData
        })
    })
})

app.get('/api/news', (req,res) => {
    news((error, newsData) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            news: newsData
        })
    })
})

app.get('/api/currency', (req,res) => {
    currency((error, currencyData) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            currency: currencyData
        })
    })
})

app.get('/api/bitcoin', (req,res) => {
    bitcoin((error, bitcoinData) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            bitcoin: bitcoinData
        })
    })
})



// use static folder to start the app in the production
app.use(express.static(__dirname + '/client/build/' ));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))