const express = require('express')
const cors = require('cors');

const forecast = require('./src/weather')
const gas = require('./src/gas')
const bus = require('./src/bus')
const aqi = require('./src/aqi')
const news = require('./src/news')
const currency = require('./src/currency')
const bitcoin = require('./src/bitcoin')
const bus_to_chart = require('./src/bus_to_chart')

const app = express()
const port = process.env.PORT || 3000

if(process.env.NODE_ENV === 'production') {
app.use(cors({ origin: 'https://dashboard-for-tv.herokuapp.com/', credentials: true}));
} else {
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

    bus(6,(error, busData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus: busData,
        })
    })
})

app.get('/api/bus13', (req, res) => {

    bus(13,(error, busData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus: busData,
        })
    })
})

app.get('/api/bus18', (req, res) => {

    bus(18,(error, busData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus: busData,
        })
    })
})

app.get('/api/bus_to_chart6', (req, res) => {

    bus_to_chart(6,(error, percentData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus_to_chart6: percentData,
        })
    })
})

app.get('/api/bus_to_chart13', (req, res) => {

    bus_to_chart(13,(error, percentData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            bus_to_chart13: percentData,
        })
    })
})

app.get('/api/bus_to_chart18', (req, res) => {

    bus_to_chart(18,(error, percentData) => {
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



// use different static folders for different env
/*
app.use(express.static(__dirname + '/app/build/' ));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/app/build/index.html'));
});
*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))