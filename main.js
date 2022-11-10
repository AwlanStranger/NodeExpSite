const prayerTimes = require('./prayerTimes');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/book', (req, res) => {
//     const solarEventRequest = req.body;

//     // Output the book to the console for debugging
//     console.log(solarEventRequest);
//     books.push(solarEventRequest);
//     let retval = "";

//     // default value for time
//     time = 0;
//     if (solarEventRequest.event == 'sunrise') {
//         time = prayerTimes.getSunrise(solarEventRequest.latitude, solarEventRequest.longitude, solarEventRequest.timezone);
//     } else if (solarEventRequest.event == 'solarNoon') {
//         time = prayerTimes.getSolarNoon(solarEventRequest.latitude, solarEventRequest.longitude, solarEventRequest.timezone);
//     } else if (solarEventRequest.event == 'sunset') {
//         time = prayerTimes.getSunset(solarEventRequest.latitude, solarEventRequest.longitude, solarEventRequest.timezone);
//     } else {
//         // failed. put try catch or fill in this else?
//         console.log(solarEventRequest.event);
//     }

//     retval = retval + '\n' + time;

//     console.log(time);

//     res.send(retval);
// });

app.get('/it', (req, res) => {
    const solarEventRequest = req.query;
    let event;
    let timezone;
    let latitude;
    let longitude;
    let time = 0;

    try {
        event = solarEventRequest.event;
        timezone = solarEventRequest.timezone;
        latitude = solarEventRequest.latitude;
        longitude = solarEventRequest.longitude;
    } catch {
        res.send('missing params');
    }


    if (event == 'fajr') {
        time = prayerTimes.getFajrISNA(latitude, longitude, timezone);

    } else if (event == 'sunrise') {
        time = prayerTimes.getSunrise(latitude, longitude, timezone);

    } else if (event == 'dhuhr') {
        time = prayerTimes.getDhuhrISNA(latitude, longitude, timezone);

    } else if (event == 'asr') {
        time = prayerTimes.getAsrISNA(latitude, longitude, timezone);

    } else if (event == 'maghrib') {
        time = prayerTimes.getMaghribISNA(latitude, longitude, timezone);

    } else if (event == 'isha') {
        time = prayerTimes.getIshaISNA(latitude, longitude, timezone);

    } else {
        res.send('Sad World.');
    }
    
    res.send(time);
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));