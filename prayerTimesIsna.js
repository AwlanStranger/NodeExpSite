const SunCalc = require('suncalc');
// const Moment = require('moment')

// CONSTANTS //////////////////////////////////////////////////////////////////////////////////////

const DHUHR_DELAY = 0; // milliseconds
const TWENTYFOURHOURS_MS = 24*60*60*1000;

// Toronto Coords
const TORONTO_LAT = 43.653225;
const TORONTO_LONG = -79.383186;

// London UK Coords
const LONDONUK_LAT = 51.5072;
const LONDONUK_LONG = 0.1276;

// Helper functions ///////////////////////////////////////////////////////////////////////////////

function localizeTime(time, timezone) {
    return time.toLocaleTimeString("en-US", {timeZone: timezone, timeStyle: 'short'})
}

// THE FOLLOWING FUNCTIONS RETURN A DATE OBJECT IN UTC TIME. //////////////////////////////////////
// THEY ARE USED FOR CALCULATIONS AND SO THE VALUES ARE NOT FOR HUMAN READING.

function getSolarNoon(lat, long) {
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.solarNoon;
    // const localTime = localizeTime(utcTime, timezone);
    // return localTime;
    return utcTime;
}

function getSunset(lat, long) {
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
    // const localTime = localizeTime(utcTime, timezone);
    // return localTime;
    return utcTime;
}

function getNightEnd(lat, long) { // astronomical twilight begins
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.nightEnd;
    // const localTime = localizeTime(utcTime, timezone);
    // return localTime;
    return utcTime;
}

function getNauticalDawn(lat, long) { // nautical twilight begins
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.nauticalDawn;
    // const localTime = localizeTime(utcTime, timezone);
    // return localTime;
    return utcTime;
}

function getNauticalDusk(lat, long) { // nautical twilight begins
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.nauticalDusk;
    // const localTime = localizeTime(utcTime, timezone);
    // return localTime;
    return utcTime;
}

function getNight(lat, long) { // nautical twilight begins
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.night;
    // const localTime = localizeTime(utcTime, timezone);
    // return localTime;
    return utcTime;
}

// THESE FUNCTIONS RETURN A STRING INTENDED FOR READING BY HUMANS /////////////////////////////////

// Astronomical Dawn = nightEnd = 18 degrees
// Nautical Dawn = nauticalDawn = 12 degrees

function getFajrISNA(lat, long, timezone) {
    const astronomicalTwilight = getNightEnd(lat, long);
    // console.log(astronomicalTwilight.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false}))

    const nauticalTwilight = getNauticalDawn(lat, long);
    // console.log(nauticalTwilight.toLocaleTimeString("en-US", {timeZone: timezone, hour12: false}))

    const astronomicalTwilightMs = astronomicalTwilight.getTime();
    const nauticalTwilightMs = nauticalTwilight.getTime();
    const fajrMs = Math.round((nauticalTwilightMs + astronomicalTwilightMs)/2);
    
    const fajrUTC = new Date(fajrMs);
    return localizeTime(fajrUTC, timezone);
}

function getSunrise(lat, long, timezone) {
    const utcTimes = SunCalc.getTimes(new Date(), lat, long);
    const utcTime = utcTimes.sunrise;
    const localTime = localizeTime(utcTime, timezone);
    return localTime;
    // return utcTime;
}

function getDhuhrISNA(lat, long, timezone) {
    const solarNoon = getSolarNoon(lat, long);
    const solarNoonMs = solarNoon.getTime();
    const dhuhrUTC = new Date(solarNoonMs + DHUHR_DELAY);
    return localizeTime(dhuhrUTC, timezone);
}

function getAsrISNA(lat, long, timezone) {
    function findTimeOfSettingAngle(startTimeDate, targetAngle) { // i have no idea if this function works
        const MINUTE_INCREMENT = 1;
        let currentTimeDate = startTimeDate;
        while (true) {
            let currentAngle = SunCalc.getPosition(currentTimeDate, lat, long).altitude;

            // TEST OUTPUT
            // console.log("-- " + currentTimeDate);
            // console.log(currentAngle);

            if (currentAngle <= targetAngle) return currentTimeDate;

            currentTimeDate = new Date(currentTimeDate.getTime() + MINUTE_INCREMENT*60000);

            if (currentTimeDate == startTimeDate.setHours(startTimeDate.getHours() + 24)) break;
        }
        return startTimeDate
    }

    const solarNoon = getSolarNoon(lat, long);
    const solarNoonAngle = SunCalc.getPosition(solarNoon, lat, long).altitude;
    const solarNoonShadow = 1/Math.tan(solarNoonAngle); // this is the length
                                                        // of a shadow of
                                                        // a 1 m tall object
                                                        // at solar noon
    const asrShadow = solarNoonShadow + 1; // this is the same shadow at shafi asr time
    const asrAngle = Math.atan(1/asrShadow);
    const asrMs = findTimeOfSettingAngle(solarNoon, asrAngle).getTime();
    const asrUTC = new Date(asrMs);

    // TEST OUTPUT
    // console.log("solar noon angle:" + solarNoonAngle);
    // console.log("solar noon shadow:" + solarNoonShadow);
    // console.log("asr shadow:" + asrShadow);
    // console.log("asr angle:" + asrAngle);

    return localizeTime(asrUTC, timezone);

}

function getAsrHANAFI(lat, long, timezone) {
    function findTimeOfSettingAngle(startTimeDate, targetAngle) { // i have no idea if this function works
        const MINUTE_INCREMENT = 1;
        let currentTimeDate = startTimeDate;
        while (true) {
            let currentAngle = SunCalc.getPosition(currentTimeDate, lat, long).altitude;
            if (currentAngle <= targetAngle) return currentTimeDate;
            currentTimeDate.setSeconds(currentTimeDate.getSeconds() + (60 * MINUTE_INCREMENT));
            if (currentTimeDate == startTimeDate.setHours(startTimeDate.getHours() + 24)) break;
        }
        return startTimeDate
    }
    const solarNoon = getSolarNoon(lat, long);
    const solarNoonAngle = SunCalc.getPosition(solarNoon, lat, long).altitude;
    const solarNoonShadow = 1/Math.tan(solarNoonAngle); // this is the length
                                                        // of a shadow of
                                                        // a 1 m tall object
                                                        // at solar noon
    const asrShadow = solarNoon + 2; // this is the same shadow at hanafi asr time
}

function getMaghribISNA(lat, long, timezone) {
    const sunset = getSunset(lat, long);
    const maghribUTC = sunset;
    return localizeTime(maghribUTC, timezone);
}

function getIshaISNA(lat, long, timezone) {
    const nauticalTwilight = getNauticalDusk(lat, long); // dusk starts here (12 degrees)

    const astronomicalTwilight = getNight(lat, long); // night starts here (18 degrees)

    const nauticalTwilightMs = nauticalTwilight.getTime();
    const astronomicalTwilightMs = astronomicalTwilight.getTime();
    const ishaMs = Math.round((astronomicalTwilightMs + nauticalTwilightMs)/2);
    
    const ishaUTC = new Date(ishaMs);
    return localizeTime(ishaUTC, timezone);
}

function getQiyamISNA(lat, long, timezone) { // CURRENTLY THIS IS LAST HALF OF NIGHT, NOT LAST THIRD
    const astronomicalDawn = getNightEnd(lat, long);

    const nauticalDawn = getNauticalDawn(lat, long);

    const astronomicalDawnMs = astronomicalDawn.getTime();
    const nauticalDawnMs = nauticalDawn.getTime();
    const fajrMs = Math.round((nauticalDawnMs + astronomicalDawnMs)/2);

    ///

    const nauticalDusk = getNauticalDusk(lat, long); // dusk starts here (12 degrees)

    const astronomicalDusk = getNight(lat, long); // night starts here (18 degrees)

    const nauticalDuskMs = nauticalDusk.getTime();
    const astronomicalDuskMs = astronomicalDusk.getTime();
    const ishaMs = Math.round((astronomicalDuskMs + nauticalDuskMs)/2);

    const qiyamMs = Math.round((ishaMs + fajrMs + TWENTYFOURHOURS_MS)/2);
    const qiyamUTC = new Date(qiyamMs);
    return localizeTime(qiyamUTC, timezone);
}

// EXPORT /////////////////////////////////////////////////////////////////////////////////////////

// mymodule.js
module.exports = {
    getSolarNoon,
    getSunset,
    getFajrISNA,
    getSunrise,
    getDhuhrISNA,
    getAsrISNA,
    getMaghribISNA,
    getIshaISNA,
    getQiyamISNA
}