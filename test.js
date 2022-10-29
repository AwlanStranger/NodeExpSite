const prayerTimes = require('./prayerTimes');

console.log('Fajr: ' + prayerTimes.getFajrISNA(43, -79, 'America/Toronto'));
console.log('Sunrise: ' + prayerTimes.getSunrise(43, -79, 'America/Toronto'));
console.log('Dhuhr: ' + prayerTimes.getDhuhrISNA(43, -79, 'America/Toronto'));
console.log('Asr: ' + '');
console.log('Maghrib: ' + prayerTimes.getMaghribISNA(43, -79, 'America/Toronto'));
console.log('Isha: ' + prayerTimes.getIshaISNA(43, -79, 'America/Toronto'));