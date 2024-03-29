import React from 'react';
import axios from 'axios';
import {useState} from "react"

const DEFAULT_TIMEZONE = "America/Toronto";
const DEFAULT_EVENT = "fajr";
const DEFAULT_LONGITUDE = 0;
const DEFAULT_LATITUDE = 0;

export default function SolarEvent(params) {

    const [state, setState] = useState({
        // Setting default values for state variables
        timezone : DEFAULT_TIMEZONE,
        event: DEFAULT_EVENT,
        latitude : DEFAULT_LATITUDE,
        longitude : DEFAULT_LONGITUDE
    })

    // function formSubmit(event) {
    //     event.preventDefault();
    // }

    function handleTimezoneChange(event) {
        console.log(event.target.value);
        setState((oldState) => {
            return {
                ...oldState, timezone: event.target.value
            }
        })
    }

    function handleEventChange(event) { // note how here event can either mean "onChange" or "a solar event"
        console.log(event.target.value);
        setState((oldState) => {
            return {
                ...oldState, event: event.target.value
            }
        })
    }

    function handleLatSubmit(event) {
        console.log(event.target.value);
        setState((oldState) => {
            return {
                ...oldState, latitude: event.target.value
            }
        })
    }

    function handleLongSubmit(event) {
        console.log(event.target.value);
        setState((oldState) => {
            return {
                ...oldState, longitude: event.target.value
            }
        });
    }

    // function handleSubmit() {
    function formSubmit(event) {
        event.preventDefault();
        console.log(state);
        /* const response = */axios.get (
            "http://localhost:3001/solarEvent",
            {
                params: {
                    timezone: state.timezone,
                    event: state.event, 
                    latitude: state.latitude,
                    longitude: state.longitude
                }
            }
        )
        .then((response) =>
            {
                params.updateSolarState(response.data);
    
                console.log(response);
                // console.log(params.updateSolarState);
            }
        )
        .catch(function (error){
            console.log("Found error in handleSubmit");
        })
    }


    return (
    <div class="container">
      <h1>Where is the Sun?</h1>

      <form onSubmit={formSubmit}>
          {/*
          <div class="form-group">
              <label for="Timezone">Timezone</label>
              <select class="form-control" name="timezone" value={state.timezone} onChange={handleTimezoneChange}>
                  <option value="America/Toronto">EDT</option>
                  <option value="America/Panama">EST</option>
                  <option value="Africa/Abidjan">UTC</option>
              </select>
          </div>
          */}

          {/* Event selector */}
          <div class="form-group">
              <label for="Event">Event</label>
              <select class="form-control" name="solarEvent" onChange={handleEventChange}>
                <option value="fajr">Fajr</option>
                <option value="sunrise">Sunrise</option>
                <option value="dhuhr">Dhuhr</option>
                <option value="asr">Asr</option>
                <option value="maghrib">Maghrib</option>
                <option value="isha">Isha</option>
              </select>
          </div>

          {/* Latitude input */}
          <div class="form-group">
              <label for="Latitude">Latitude</label>
              <input class="form-control" type="number" step=".000001" name="latitude" onChange={handleLatSubmit} placeholder={DEFAULT_LATITUDE}/>
          </div>

          {/* Longitude input */}
          <div class="form-group">
              <label for="Longitude">Longitude</label>
              <input class="form-control" type="number" step=".000001" name="longitude" onChange={handleLongSubmit} placeholder={DEFAULT_LONGITUDE}/>
          </div>

          {/* Submit button */}

          {/* CLICKING SUBMIT CALLS HANDLESUBMIT */}
          <button type="submit" class="btn btn-primary" /*onClick={handleSubmit}*/>Submit</button>
      </form>
    </div>
  );
}