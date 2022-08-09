import React, { useState } from 'react';
import './App.css';
import API_key from './components/Api.js';

function App() {
  const [location, setLocation] = useState(''); // The city typed by user.
  const [weather, setWeather] = useState(''); // Weather fetched from AccuWeather API.

  // Fetches location key and weather data from AccuWeather APIs. Changes responses to JSON and sets acquired weather data to weather state.
  const fetchWeather = () => {
    // Fetches a location key according to user input and API key.
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_key}&q=${location}`)
    .then(response => response.json())
    // Fetches weather data according to the given city's location key, and API key.
    .then(result => {
      fetch(`https://dataservice.accuweather.com/currentconditions/v1/${result[0].Key}?apikey=${API_key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result[0]);
      })
    })   
  };

  // Sets input element's value to location state whenever the value renders.
  const inputChanged = (event) => {
    setLocation(event.target.value);
  }

  // Constructs date in form of week day, day, month and year
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
    // div -> brings background to the site
    <div className = {(typeof weather.WeatherText != 'undefined') 
      ? ((weather.Temperature.Metric.Value <= 5)
        ? 'background cold'
        : ((weather.Temperature.Metric.Value > 20)
          ? 'background hot'
          : 'background') )
      : 'background'}>
      {/* div -> wraps all the content inside. Background covers this area. */}
      <div className = 'content'>
        {/* div -> wraps all city search elements inside */}
        <div className = 'box searchbox'>
          <h1>WEATHER APP</h1>
          <p>See current weather by locality</p>

          <input type = 'text' name = 'location' placeholder = 'Search for a locality' value = {location} onChange = {inputChanged} />{' '}
          <button onClick = {fetchWeather}>Search</button><br />
        </div>
        {/* Searchbox ends here. */}

        {/* Without this line, weather data below brings up error, if location isn't searched up before-hand. 
        The line checks if weather description is fetched, if it is -> HTML below is run. Otherwise it returns empty string. */}
        {(typeof weather.WeatherText != 'undefined') ? (
        <div>
          {/* div -> wraps all weather data inside. */}
          <div className = 'box weatherbox'>

            {/* Date, City name */}
            <div className = 'row-date'>
              {dateBuilder(new Date())}
            </div>

            <div className = 'row-city'>
              <div>{location}</div>
            </div>

            {/* Temperature in number and its unit */}
            <div className = 'row-temp'>
              <div className = 'temp'>
                {Math.round(weather.Temperature.Metric.Value)}
              </div>

              <div className = 'unit'> 
                °C
              </div>
            </div>

            {/* Described weather */}
            <div className = 'row-desc'>          
              {weather.WeatherText}{' '}<img src = {process.env.PUBLIC_URL + getIcon(weather.WeatherIcon)} alt = 'WeatherIcon'></img>
            </div>
          </div>
          {/* WeatherCard ends here. */}
        </div>
        ) : ('')} 
      </div>
      {/* Content ends here. */}
    </div>
    // Background ends here.
  );
}

export default App;
