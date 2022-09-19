import logo from './logo.svg';
import './App.css';
import {useState} from "react"

function App() {
    const [state, setState] = useState(false);
    function functionOnSubmit(event) {
        event.preventDefault();
    }

    function handleTZChange(event) {
        console.log(event.target.value);
    }

    function handleSubmit() {
        setState(!state);
        console.log(state);
    }


    return (
    <div class="container">
      <hr/>
      <h1>Where is the Sun?</h1>
      <hr/>

      <form onSubmit={functionOnSubmit}>
        
          {/* Timezone selector */}
          <div class="form-group">
              <label for="Timezone">Timezone</label>
              {/* CHANGING THE OPTION IN THE DROPDOWN */}
              <select class="form-control" name="timezone" value={state.timezone} onChange={handleTZChange}>
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

export default App;
