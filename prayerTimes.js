const SunCalc = require('suncalc');
const DateFnsTz = require('date-fns-tz');

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

function getSolarNoon(latString, longString, timezone) {
    const lat = parseInt(latString);
    const long = parseInt(longString);
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = new Date();

    const times = SunCalc.getTimes(localDate, lat, long);
    // console.log(times);
    const solarNoonLocal = times.solarNoon;

    solarNoonFinal = convertTZ(solarNoonLocal, timezone); // this works kinda.
    // it says the wrong timezone but the time is right for the most part it seems.

    return solarNoonFinal;
}

function getSunrise(latString, longString, timezone) {
    const lat = parseInt(latString);
    const long = parseInt(longString);
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = new Date();

    const times = SunCalc.getTimes(localDate, lat, long);
    // console.log(times);
    const sunriseLocal = times.sunrise;

    sunriseFinal = convertTZ(sunriseLocal, timezone); // this works kinda.
    // it says the wrong timezone but the time is right for the most part it seems.

    return sunriseFinal;
}

function getSunset(latString, longString, timezone) {
    const lat = parseInt(latString);
    const long = parseInt(longString);
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = new Date();

    const times = SunCalc.getTimes(localDate, lat, long);
    // console.log(times);
    const sunsetLocal = times.sunset;

    sunsetFinal = convertTZ(sunsetLocal, timezone); // this works kinda.
    // it says the wrong timezone but the time is right for the most part it seems.

    return sunsetFinal;
}

// Toronto Coords
// lat = 43.653225
// lon = -79.383186

// London UK Coords
// 51.5072
// 0.1276

// mymodule.js
module.exports = {
    getSolarNoon,
    getSunrise,
    getSunset,
}