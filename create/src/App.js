import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="container">
      <hr/>
      <h1>Where is the Sun?</h1>
      <hr/>

      <form action="http://localhost:3001/book" method="POST">
        
          {/* Timezone selector */}
          <div class="form-group">
              <label for="Timezone">Timezone</label>
              <select class="form-control" name="timezone">
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
          <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
