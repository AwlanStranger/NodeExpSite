const DateFnsTz = require('date-fns-tz');

const date = DateFnsTz.getDatePickerValue() // e.g. 2014-06-25 10:00:00 (picked in any time zone)
const timeZone = DateFnsTz.getTimeZoneValue() // e.g. America/Los_Angeles

const utcDate = DateFnsTz.zonedTimeToUtc(date, timeZone) // In June 10am in Los Angeles is 5pm UTC

postToServer(utcDate.toISOString(), timeZone) // post 2014-06-25T17:00:00.000Z, America/Los_Angeles