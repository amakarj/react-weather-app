import React, { useState } from 'react';
import './App.css';
import API_key from './components/api';

function App() {
  const [location, setLocation] = useState(''); // user types the city and it is saved to this state
  const [weather, setWeather] = useState(''); // weather fetched from AccuWeather API

  // Function to fetch location and forecast information from AccuWeather API. Sets response to weather state and calls getDateTime function.
  const fetchWeather = () => {
    // Fetching a city according to user input and API key.
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_key}&q=${location}`)
    .then(response => response.json())
    // Fetching forecast information according to the given city's location key, and API key.
    .then(result => {
      fetch(`https://dataservice.accuweather.com/currentconditions/v1/${result[0].Key}?apikey=${API_key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result[0]);
      })
    })    
  };

  // Function that set written city to the location state. 
  const inputChanged = (event) => {
    setLocation(event.target.value);
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  const getIcon = (i) => {
    return `/icons/${i}.png`;
  }

  return (
    <div className = {(typeof weather.WeatherText != 'undefined') 
      ? ((weather.Temperature.Metric.Value <= 5)
        ? 'background cold'
        : ((weather.Temperature.Metric.Value > 20)
          ? 'background hot'
          : 'background') )
      : 'background'}>

      {/* Content starts here - the top of the background. */}
      <div  className = 'content'>

        {/* Search card starts here. */}
        <div className = 'box searchbox'>
          <h1>WEATHER APP</h1>
          <p>See current weather by locality</p>

          <div className = 'search'>
            <input 
              type = 'text' 
              name = 'location' 
              placeholder = 'Search for locality' 
              value = {location} 
              onChange = {inputChanged} />{' '}
            <button onClick = {fetchWeather}>Search</button><br />
          </div>
        </div>
        {/* Search card ends here. */}
    
      {(typeof weather.WeatherText != 'undefined') ? (
        <div>
          {/* WeatherCard starts here. */}
          {/* Date, Time, City */}
          <div className = 'box weatherbox'>
            
            <div className = 'row-date'>
              {dateBuilder(new Date())}
            </div>

            <div className = 'row-city'>
              <div>{location}</div>
            </div>

            {/* Temperature both in metric and fahrenheit */}
            <div className = 'row-temp'>
              <div className = 'temp'>
                {Math.round(weather.Temperature.Metric.Value)}
              </div>

              <div className = 'unit'> 
                °C
              </div>
              
              <div className = 'slash'>
                / 
              </div> 

              <div className = 'temp'>
                {Math.round(weather.Temperature.Imperial.Value)}
              </div>
              
              <div className = 'unit'> 
                °F
              </div>
            </div>

            {/* Described weather */}
            <div className = 'row-desc'>          
              {weather.WeatherText}{' '}<img src = {getIcon(weather.WeatherIcon)} alt = 'Weather Icon'></img>
            </div>
          </div>
          {/* WeatherCard ends here. */}
        </div>
      ) : ('')} 
      </div>
      {/* Content ends here - the bottom of background. */}
    </div>
    
  );
}

export default App;
