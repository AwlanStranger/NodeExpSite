const SunCalc = require('suncalc');
const DateFnsTz = require('date-fns-tz');

// function convertTZ(date, tzString) {
//     return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
// }

// THE FOLLOWING FUNCTIONS RETURN A DATE OBJECT IN UTC TIME.
// THEY ARE USED FOR CALCULATIONS AND SO THE VALUES ARE NOT FOR HUMAN READING.

function getSolarNoon(lat, long, timezone) {
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.solarNoon;
    const localTime = utcTime.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false})
    // return localTime;
    return utcTime;
}

function getSunrise(lat, long, timezone) {
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.sunrise;
    const localTime = utcTime.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false})
    // return localTime;
    return utcTime;
}

function getSunset(lat, long, timezone) {
    /* THIS IS THE OLD IMPLEMENTATION*/
    // const lat = parseInt(latString);
    // const long = parseInt(longString);
    // const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const localDate = new Date();

    // const times = SunCalc.getTimes(localDate, lat, long);
    // // console.log(times);
    // const sunsetLocal = times.sunset;

    // sunsetFinal = convertTZ(sunsetLocal, timezone); // this works kinda.
    // // it says the wrong timezone but the time is right for the most part it seems.

    // return sunsetFinal;

    /* THIS IS THE NEW IMPLEMENTATION*/
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.sunset;
    const localTime = utcTime.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false})
    // return localTime;
    return utcTime;
}

function getNightEnd(lat, long, timezone) { // astronomical twilight begins
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.nightEnd;
    const localTime = utcTime.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false})
    // return localTime;
    return utcTime;
}

function getNauticalDawn(lat, long, timezone) { // nautical twilight begins
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.nauticalDawn;
    const localTime = utcTime.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false})
    // return localTime;
    return utcTime;
}


// Toronto Coords
// lat = 43.653225
// lon = -79.383186

// London UK Coords
// 51.5072
// 0.1276

// THESE FUNCTIONS RETURN A STRING INTENDED FOR READING BY HUMANS

// Astronomical Dawn = nightEnd = 18 degrees
// Nautical Dawn = nauticalDawn

function getFajr(lat, long, timezone) {
    const astronomicalTwilight = getNightEnd(lat, long, timezone);
    // console.log(astronomicalTwilight.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false}))

    const nauticalTwilight = getNauticalDawn(lat, long, timezone);
    // console.log(nauticalTwilight.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false}))

    const astronomicalTwilightMs = astronomicalTwilight.getTime();
    const nauticalTwilightMs = nauticalTwilight.getTime();
    const midpointMs = Math.round((nauticalTwilightMs - astronomicalTwilightMs)/2);
    
    const retval = new Date(astronomicalTwilightMs + midpointMs);
    return retval.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false})
}

function getDhuhr(lat, long, timezone) {
    
}

// mymodule.js
module.exports = {
    getSolarNoon,
    getSunrise,
    getSunset,
    getFajr
}