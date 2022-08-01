const prayerTimes = require('./prayerTimes');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);
    let retval = "";

    time = prayerTimes.getSolarNoon(book.latitude, book.longitude, 'America/New_York')
    retval = retval + '\n' + time;

    console.log(time);

    res.send(retval);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));