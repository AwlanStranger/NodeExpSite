import React from 'react';
// import axios from 'axios';
import {useState} from "react"
import Autocomplete from 'react-google-autocomplete';

const URL = "http://localhost:3001/schedule"

const DEFAULT_TIMEZONE = "America/Toronto";
const DEFAULT_LONGITUDE = 0;
const DEFAULT_LATITUDE = 0;
const MAPS_API_KEY = 'AIzaSyAL8tzB79ggC3maqd6LOsUzxRTKp7FXb50';

function handlePlaceSelect(place) {
    console.log(place);
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
}

export default function Location(params) {

    const [state, setState] = useState({
        // Setting default values for state variables
        latitude : DEFAULT_LATITUDE,
        longitude : DEFAULT_LONGITUDE,
        timezone : DEFAULT_TIMEZONE,
    })

    return (
    <div class="container">
        <h1>Where are you?</h1>
        <Autocomplete
            apiKey={MAPS_API_KEY}
            onPlaceSelected={(place) => {
                handlePlaceSelect(place);
            }}/>
    </div>
  );
}