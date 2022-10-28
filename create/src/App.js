import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import SolarEvent from './components/solarEvent';
import Output from './components/output';

const DEFAULT_TIME = "default time";

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
    console.log(state);
  }

  return (
    <div>
        <SolarEvent updateAppState={updateAppState}/>
        {state.isTimeSet
          ? <Output time={state.time}/>
          : 'Please Fill out the form'
        }
    </div>
  );
}

export default App;
