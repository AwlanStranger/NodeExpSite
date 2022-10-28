import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import SolarEvent from './components/solarEvent';
import Output from './components/output';

const DEFAULT_TIME = "default time";

function updateAppState() {
  //
}

function App() {

  const [state, setState] = useState({
      // Setting default values for state variables
      isTimeSet: false,
      time: DEFAULT_TIME
    })

    return (
    <div>
        <SolarEvent updateData={updateAppState}/>
        {state.isTimeSet
          ? <Output/>
          : 'Please Fill out the form'
        }
    </div>
  );
}

export default App;
