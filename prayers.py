#!/usr/bin/python
from tracemalloc import start
import constants
import json
import math
import pytz
import requests
import suncalc
import time
from constants import *
from suncalc import get_position, get_times
from datetime import datetime, timedelta
from pytz import timezone,UTC

def getSunrise(lon, lat, tz):
    tzObject = timezone(tz)
    naive = datetime.now()
    # print(naive)
    utcAware = UTC.localize(datetime.utcnow())
    # print(utcAware)
    tzAware = utcAware.astimezone(tzObject)
    # print(tzAware)

    # test data
    # lon = -79.383186
    # lat = 43.653225

    sunrise = suncalc.get_times(naive, lon, lat)["sunrise"]
    utcSunrise = UTC.localize(sunrise)
    tzSunrise = utcSunrise.astimezone(tzObject)
    return tzSunrise

def getSunset(lon, lat, tz):
    tzObject = timezone('canada')
    naive = datetime.now()
    # print(naive)
    utcAware = UTC.localize(datetime.utcnow())
    # print(utcAware)
    tzAware = utcAware.astimezone(tzObject)
    # print(tzAware)

    # test data
    # lon = -79.383186
    # lat = 43.653225

    sunset = suncalc.get_times(naive, lon, lat)["sunset"]
    utcSunset = UTC.localize(sunset)
    tzSunset = utcSunset.astimezone(tzObject)
    return tzSunset
    
def getSolarEvent(lon, lat, tz, event):
    tzObject = timezone(tz)
    naive = datetime.now()
    # print(naive)
    utcAware = UTC.localize(datetime.utcnow())
    # print(utcAware)
    tzAware = utcAware.astimezone(tzObject)
    # print(tzAware)

    # test data
    # lon = -79.383186
    # lat = 43.653225

    solarEvent = suncalc.get_times(naive, lon, lat)[event]
    utcSolarEvent = UTC.localize(solarEvent)
    tzSolarEvent = utcSolarEvent.astimezone(tzObject)
    return tzSolarEvent

# def getTimeZone():
#     EST = timezone('Canada/Eastern')
#     naive = datetime.now()
#     print(naive)
#     aware = EST.localize(naive)
#     print(aware)
#     utcAware = UTC.localize(datetime.utcnow())
#     print(utcAware)
#     estAware = utcAware.astimezone(EST)
#     print(estAware)

#     lon = -79.383186
#     lat = 43.653225

#     sunrise = suncalc.get_times(naive, lon, lat)["sunrise"]
#     utcSunrise = UTC.localize(sunrise)
#     estSunrise = utcSunrise.astimezone(EST)
#     print(estSunrise)


# Getting prayer times

def getPrayer(lon, lat, tz, prayer):
    
    def findTimeOfRisingAngle(startTime, targetAngle):
        MINUTE_INCREMENT = 1
        currentTime = startTime
        while 1:
            angle = math.degrees(suncalc.get_position(currentTime, lon, lat)[ALTITUDE])
            if angle >= targetAngle:
                return currentTime
            currentTime = currentTime + timedelta(minutes = MINUTE_INCREMENT)
            if currentTime == startTime:
                break
        return startTime

    def findTimeOfSettingAngle(startTime, targetAngle):
        MINUTE_INCREMENT = 1
        currentTime = startTime
        while 1:
            angle = math.degrees(suncalc.get_position(currentTime, lon, lat)[ALTITUDE])
            if angle <= targetAngle:
                return currentTime
            currentTime = currentTime + timedelta(minutes = MINUTE_INCREMENT)
            if currentTime == startTime:
                break
        return startTime

    def printAngles(startTime, endTime, targetAngle):
        MINUTE_INCREMENT = 1
        currentTime = startTime
        for i in range(1440):
            angle = math.degrees(suncalc.get_position(currentTime, lon, lat)[ALTITUDE])
            print(currentTime)
            print(angle)
            currentTime = currentTime + timedelta(minutes=MINUTE_INCREMENT)

    if prayer == FAJR:
        fajrTime = findTimeOfRisingAngle(getSolarEvent(lon, lat, tz, NIGHT_END), FAJR_ANGLE)
        # printAngles(getSolarEvent(lon, lat, tz, NIGHT_END), getSolarEvent(lon, lat, tz, NAUTICAL_DAWN), FAJR_ANGLE)
        return fajrTime
    elif prayer == DHUHR:
        DHUHR_DELAY = 1 # minute
        dhuhrTime = getSolarEvent(lon, lat, tz, SOLAR_NOON) + timedelta(minutes = DHUHR_DELAY)
        return dhuhrTime
    elif prayer == ASR:
        DHUHR_DELAY = 1 # minute
        dhuhrTime = getSolarEvent(lon, lat, tz, SOLAR_NOON) + timedelta(minutes = DHUHR_DELAY)
        dhuhrAngleRadians = suncalc.get_position(dhuhrTime, lon, lat)[ALTITUDE]
        dhuhrShadowLength = 1/(math.tan(dhuhrAngleRadians)) # this is the shadow of a slim 1m tall object
        asrShadowLength = dhuhrShadowLength + 1
        asrAngleDegrees = math.degrees(math.atan(1/asrShadowLength))
        asrTime = findTimeOfSettingAngle(getSolarEvent(lon, lat, tz, SOLAR_NOON), asrAngleDegrees)
        return asrTime
    elif prayer == MAGHRIB:
        maghribTime = getSolarEvent(lon, lat, tz, SUNSET)
        return maghribTime
    elif prayer == ISHA:
        ishaTime = findTimeOfSettingAngle(getSolarEvent(lon, lat, tz, SUNSET), ISHA_ANGLE)
        # print(getSolarEvent(lon, lat, tz, SUNSET))
        # print(getSolarEvent(lon, lat, tz, NIGHT_END))
        # printAngles(getSolarEvent(lon, lat, tz, SUNSET), getSolarEvent(lon, lat, tz, NAUTICAL_DAWN), FAJR_ANGLE)
        return ishaTime

def main():
    torontoLon = -79.383186
    torontoLat = 43.653225
    # print(getSunrise(torontoLon, torontoLat, 'Canada/Eastern'))
    # print(getSolarEvent(torontoLon, torontoLat, CANADA_EAST, NIGHT_END))
    # print(getSolarEvent(torontoLon, torontoLat, CANADA_EAST, NAUTICAL_DAWN))
    print("Fajr Time: ")
    print("-------------")
    print(getPrayer(torontoLon, torontoLat, CANADA_EAST, FAJR))
    print("-------------")
    print("Dhuhr Time: ")
    print("-------------")
    print(getPrayer(torontoLon, torontoLat, CANADA_EAST, DHUHR))
    print("-------------")
    print("Asr Time: ")
    print("-------------")
    print(getPrayer(torontoLon, torontoLat, CANADA_EAST, ASR))
    print("-------------")
    print("Maghrib Time: ")
    print("-------------")
    print(getPrayer(torontoLon, torontoLat, CANADA_EAST, MAGHRIB))
    print("-------------")
    print("Isha Time: ")
    print("-------------")
    print(getPrayer(torontoLon, torontoLat, CANADA_EAST, ISHA))
    print("-------------")

main()