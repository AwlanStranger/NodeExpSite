import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import SolarEvent from './components/solarEvent';
import Output from './components/output';
import Location from './components/locationSelector'
import Timetable from './components/timetable'

const DEFAULT_TIME = 'Please fill out the form';
const DEFAULT_LAT = 0;
const DEFAULT_LONG = 0;

function App() {

  const [state, setState] = useState({
    // Setting default values for state variables
    // isTimeSet: false,
    time: DEFAULT_TIME,
    lat: DEFAULT_LAT,
    long: DEFAULT_LONG,
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
    console.log(state);
  }

  return (
    <div>
      <SolarEvent updateSolarState={updateSolarState}/>
      <Output time={state.time}/>
      <Location updateLocation={updateLocation}/>
      <Timetable lat={state.lat} long={state.long}/>
    </div>
  );
}

export default App;
