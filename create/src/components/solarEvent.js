import React from 'react';
import axios from 'axios';
import {useState} from "react"

const DEFAULT_TIMEZONE = "America/Toronto";
const DEFAULT_EVENT = "sunrise";
const DEFAULT_LONGITUDE = 0;
const DEFAULT_LATITUDE = 0;

export default function SolarEvent() {

    const [state, setState] = useState({
        // Setting default values for state variables
        timezone : DEFAULT_TIMEZONE,
        event: DEFAULT_EVENT,
        latitude : DEFAULT_LATITUDE,
        longitude : DEFAULT_LONGITUDE
    })

    function formSubmit(event) {
        event.preventDefault();
    }

    function handleTimezoneChange(event) {
        console.log(event.target.value);
    }

    function handleEventChange(event) {
        console.log(event.target.value);
    }

    function handleSubmit() {
        // setState(!state);
        console.log(state);
        axios.get
        (
            "http://localhost:3001/it",
            {
                data: {
                    timezone: state.timezone,
                    event: state.event, 
                    latitude: state.latitude,
                    longitude: state.longitude
                }
            }
        ).catch(function (error){
            console.log("Found error in handleSubmit");
        })
    }


    return (
    <div class="container">
      <hr/>
      <h1>Where is the Sun?</h1>
      <hr/>

      <form onSubmit={formSubmit}>
        
          {/* Timezone selector */}
          <div class="form-group">
              <label for="Timezone">Timezone</label>
              {/* CHANGING THE OPTION IN THE DROPDOWN */}
              <select class="form-control" name="timezone" value={state.timezone} onChange={handleTimezoneChange}>
                  <option value="America/Toronto">EDT</option>
                  <option value="America/Panama">EST</option>
                  <option value="Africa/Abidjan">UTC</option>
              </select>
          </div>

          {/* Event selector */}
          <div class="form-group">
              <label for="Event">Event</label>
              <select class="form-control" name="event">
                  <option value="sunrise">Sunrise</option>
                  <option value="solarNoon">Solar Noon</option>
                  <option value="sunset">Sunset</option>
              </select>
          </div>

          {/* Latitude input */}
          <div class="form-group">
              <label for="Latitude">Latitude</label>
              <input class="form-control" type="number" step=".000001" name="latitude"/>
          </div>

          {/* Longitude input */}
          <div class="form-group">
              <label for="Longitude">Longitude</label>
              <input class="form-control" type="number" step=".000001" name="longitude"/>
          </div>

          {/* Submit button */}

          {/* CLICKING SUBMIT CALLS HANDLESUBMIT */}
          <button type="submit" class="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
      </form>
    </div>
  );
}