import React from 'react';
// import axios from 'axios';
import {useState} from "react"
import Autocomplete from 'react-google-autocomplete';

const URL = "http://localhost:3001/schedule"

const DEFAULT_TIMEZONE = "America/Toronto";
const DEFAULT_LONGITUDE = 43.653226;
const DEFAULT_LATITUDE = -79.3831843;
const MAPS_API_KEY = 'AIzaSyAL8tzB79ggC3maqd6LOsUzxRTKp7FXb50';

export default function Location(props) {

    function handlePlaceSelect(place) {
        console.log(place);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
        // console.log(place["get utc_offset"]());
        props.updateLocation(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address);
    }

    return (
    <div class="container">
        <Autocomplete
            apiKey={MAPS_API_KEY}
            onPlaceSelected={(place) => {
                handlePlaceSelect(place);
            }}/>
    </div>
  );
}