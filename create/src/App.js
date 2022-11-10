import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import SolarEvent from './components/solarEvent';
import Output from './components/output';
import Location from './components/locationSelector'

const DEFAULT_TIME = 'Please fill out the form';

function App() {

  const [state, setState] = useState({
    // Setting default values for state variables
    isTimeSet: false,
    time: DEFAULT_TIME
  })

  function updateAppState(newTime) {
    setState({
      isTimeSet: true,
      time: newTime
    });
    // console.log(state);
  }

  return (
    <div>
        <SolarEvent updateAppState={updateAppState}/>
        <Output time={state.time}/>
        <Location/>
    </div>
  );
}

export default App;
