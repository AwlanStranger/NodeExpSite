const SunCalc = require('suncalc');
const DateFnsTz = require('date-fns-tz');

function getSolarNoon(latString, longString, timezone) {
    const lat = parseInt(latString);
    const long = parseInt(longString);
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = new Date();

    const times = SunCalc.getTimes(localDate, lat, long);
    // console.log(times);
    const solarNoonLocal = times.solarNoon;
    const solarNoonUTC = DateFnsTz.zonedTimeToUtc(solarNoonLocal, local)
    const solarNoonTZ = DateFnsTz.utcToZonedTime(solarNoonUTC, timezone)
    // const solarNoonStr = solarNoonTZ.getHours() + ':' + solarNoonTZ.getMinutes();
    console.log(local);
    console.log(localDate);
    console.log(localDate.toString());
    console.log("solarNoonLocal: " + solarNoonLocal);
    console.log("solarNoonUTC:   " + solarNoonUTC);
    console.log("solarNoonTZ:    " + solarNoonTZ);
    return solarNoonTZ;
}

// function getSunrise(latString, longString, timezone) {
//     const lat = parseInt(latString);
//     const long = parseInt(longString);

//     const times = SunCalc.getTimes(new Date(), lat, long);
//     const sunriseUTC = times.sunrise;
//     const sunriseTZ = DateFnsTz.utcToZonedTime(sunriseUTC, timezone)
//     const sunriseStr = sunriseTZ.getHours() + ':' + sunriseTZ.getMinutes();
//     return sunriseTZ;
// }

// Toronto Coords
// lat = 43.653225
// lon = -79.383186

// London UK Coords
// 51.5072
// 0.1276

// mymodule.js
module.exports = {
    getSolarNoon,
    // getSunrise,
}