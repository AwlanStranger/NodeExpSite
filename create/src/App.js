import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react"
import SolarEvent from './components/solarEvent';
import Output from './components/output';
import Location from './components/locationSelector'
import Timetable from './components/timetable'
import axios from 'axios';

import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const DEFAULT_TIME = 'Please fill out the form';
const DEFAULT_LAT = 0;
const DEFAULT_LONG = 0;

function App() {

  const [state, setState] = useState({
    time: DEFAULT_TIME, // this is for the single prayer calculator, test-framework implementation
    lat: DEFAULT_LAT,
    long: DEFAULT_LONG,
    city: "",
  })

  function updateSolarState(newTime) {
    setState((oldState) => {
        return {
            ...oldState, time: newTime
        }
    });
  }
  


  function updateLocation(newLat, newLong) {
    setState((oldState) => {
        return {
            ...oldState, lat: newLat, long: newLong
        }
    });
  }

  return (
    <div>

      {/* <SolarEvent updateSolarState={updateSolarState}/>
      <Output time={state.time}/> */}
      <Location updateLocation={updateLocation}/>
      <Timetable lat={state.lat} long={state.long}/>

      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer> */}

    </div>
  );
}

export default App;
