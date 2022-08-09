# Guide to simple Weather App using AccuWeather's API
**Creator: [Amanda Karjalainen](https://github.com/amakarj)**

## Introduction

This guide is step-by-step guide for a simple Weather App. Weather data has been fetched from AccuWeather's Locations and Current Conditions API. Main emphasis is on how you work with APIs - how to fetch data and display it. There will be a visual example of the app at the end, but it's not the guide's main focus, therefore, it's only a short look. 

This is the final task of a school project about React fundamentals. Notice that programming isn't done by the best practice and there'll be most definitely more simple or shorter way to do something (the student just didn't figure it out yet). It's been done alone, but is worked in pairs on first three tasks. Some explanations or stages, e.g. pre-installations and definitions of fundamentals, have been excluded from this task as they have already been explained elsewhere. To get introduced on earlier tasks, you can visit **[here](https://github.com/jenhakk/React.js_Fundamentals)**.

In the future, visualisation, usage of different libraries and APIs is possible. 

## Making Preparations

### 1. Sign in to AccuWeather and create your own API key

To fetch any data from AccuWeather API, **you'll need your own API key**. You can registrate to AccuWeather **[here](https://developer.accuweather.com/)**.  
After registration and logging in, you can create a new key on **My Apps** tab by clicking a button **Add a new App**.

![My Apps on AccuWeather](/screenshots/my-apps-accuweather.png)

*Notice that you can add only one API key at time on a free account!* 


### 2.	AccuWeather’s APIs

When you’ve got your API key, the next step is to get suitable API for your weather application.
You can see a partial listing of APIs provided by AccuWeather in the image below.  

*Weather App **requires at least two** of these APIs – one to provide a location key according to user’s input and other to retrieve current weather data based on the location key.*

![API listing on AccuWeather](/screenshots/api-listing-accuweather.png)

#### Locations API - required location key
In the Weather App of this guide, we’ll get the location as text by user’s input. Therefore, choose a method **City Search** under **Text Search**, like in the image below.

![Locations API](/screenshots/locations-api.png)

On the site that opens, there’s a form which gives the straight URL for fetching data of this API after clicking a button **Send this request**. 

![City Search method form and URL](/screenshots/city-search-method.png)

URL’s in form of:

```
http://dataservice.accuweather.com/locations/v1/cities/search?apikey=YOUR_API_KEY&q=LOCATION
```

*Notice that you need to replace apikey and q's values with your personal key and location query (location state in the code).  
Both API key and location query are required parameters!*

#### Current Conditions API - weather data
Now that URL for the location key has been got, let’s get one for the other API – Current Conditions. The used method goes by the same name, Current Conditions, like in the image below.

![Current Conditions API on AccuWeather](/screenshots/current-conditions-api.png)

URL's in form of:

```
https://dataservice.accuweather.com/currentconditions/v1/LOCATION_KEY?apikey=YOUR_API_KEY
```

*Notice that this time AccuWeather's form requires only API key. **The location key must be included to URL as well**, otherwise the second fetch won't work properly!*

## Making the Application

### 1.	Searching a city

#### States

Let’s start by importing useState Hook from React and then declare the states.
There's a need for two states: 
- **location** - stores user's input
- **weather** - stores the weather data fetched from Current Conditions API

App.js

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  
...
```

#### Search bar
On this app, there’s a simple search bar (**a text typed input** and **a button**), where the user can type the name of the city. By clicking the button, value is sent to Locations API via URL we’ve got earlier.  
- The input element's value is **location** state, so we need to set value to it. Create a function `inputChanged()` and connect it to the input element by `onChange` event. This enables typing to element. The given function stores the typed value to the state by `setLocation()` whenever site renders.  

Code looks something like this now: 

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  
  const inputChanged = (event) => {
    setLocation(event.target.value);
  }
  
  return(
    <div className = 'background'>
      <div className = 'content'>
        <div className = 'box searchbox'>
          <h1>WEATHER APP</h1>
          <p>See current weather by locality</p>

          <input type = 'text' name = 'location' placeholder = 'Search for a locality' value = {location} />{' '}
          <button>Search</button><br />
        </div>
      </div>
    </div>
  );
}

export default App;
```

*Notice that there are div elements with classes to wrap different types of contents so we can apply some CSS to them later.*

### 2. Fetching data

#### API key

Now that user can type the location, it should be sent forward next.  
- First let’s create a new folder **components** inside **src** folder. 
-	Then add a new file **Api.js** inside the new folder and import it to **App.js**. 
-	The new component we created stores the AccuWeather’s API key, we need when fetching data.

Api.js
 
```
const API_key = 'YOUR_API_KEY';

export default API_key;
```

App.js

```
import React, { useState } from 'react';
import './App.css';
import API_key from './components/Api.js';

function App() {

...
```

Remember, F12 is a friend. You’ll get to see the actual responses before displaying on the site.  
Below you can see a beginning of response from Locations API. The user has searched for Helsinki and API returns the data according to it.  
The location key **Key** we need is the second a key-value pair. It can be accessed it with **`${result[0].Key}`**.

`[{"Version":1,"Key":"133328","Type":"City","Rank":30,"LocalizedName":"Helsinki","EnglishName":"Helsinki",`

![Browser view of fetching response](/screenshots/browser-view.png)

#### Fetching

Let’s add an empty function `fetchWeather()` and connect it to the button by `onClick` event.
Now let’s start building the actual function. 
- Fetch **location key** using `fetch()` method by adding Locations API's URL inside it.  
  - URL: `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_key}&q=${location}`
- Then change response to JSON and direct the result to next `fetch()` method to get the **weather data**.  
  - URL: `https://dataservice.accuweather.com/currentconditions/v1/${result[0].Key}?apikey=${API_key}`
- Then change response to JSON, again.
- Finally set the result to **weather** state with `setWeather()` to wait for usage.

App.js

```
import React, { useState } from 'react';
import './App.css';
import API_key from './components/Api.js';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  
  const fetchWeather = () => {
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_key}&q=${location}`)
    .then(response => response.json())
    .then(result => {
      fetch(`https://dataservice.accuweather.com/currentconditions/v1/${result[0].Key}?apikey=${API_key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result[0]);
      })
    })   
  };

...

<button onClick = {fetchWeather}>Search</button><br />

...
```

### 3. Displaying the data

#### Temperature and description of weather

Now that data is fetched, we can display it on the page. This weather app will be simple and doesn’t contain other than key information of current weather. Data we’ll get and their keys are:
- **temperature** - Temperature.Metric.Value
- **description of weather** - WeatherText
- **icon for described weather** - WeatherIcon

Data is stored in an object in API, so it consists of key and value pairs. The object is fetched and set to the **weather** state, so we’ll get values we want by typing `{weather.keyname}`. You can form your weather data as you want on the site - this is how it is arranged in this Weather App: 

```
...

{(typeof weather.WeatherText != 'undefined') ? (
<div>
  <div className = 'box weatherbox'>

    <div className = 'row-city'>
      <div>{location}</div>
    </div>

    <div className = 'row-temp'>
      <div className = 'temp'>
        {Math.round(weather.Temperature.Metric.Value)}
      </div>

      <div className = 'unit'> 
        °C
      </div>
    </div>

    <div className = 'row-desc'>          
      {weather.WeatherText}{' '}
    </div>
  </div>
</div>
) : ('')}
        
...
```

*Notice the conditonal structure around HTML. It is there to check if data is already fetched from API and if it is, the HTML gets run. Otherwise it returns empty string and error is avoided.*  

#### Icon

Since temperature and description have been fetched, let's add the icons. AccuWeather provides an individual icon for each description **[here](https://developer.accuweather.com/weather-icons)**. Saving them to your computer by their icon number, ease their usage. After you're done, copy paste icons inside your project folder under **public**. For example, add icon next to description, like so:

```
...

<div className = 'row-desc'>          
  {weather.WeatherText}{' '}<img src = {process.env.PUBLIC_URL + getIcon(weather.WeatherIcon)} alt = 'WeatherIcon'></img>
</div>

...
```
*Notice `process.env.PUBLIC_URL` before `getIcon()` function! When deploying React application to GitHub, it stops reading from **public** folder and icons won't work anymore. This way the problem is fixed and icons show alright.*  

The `<img>` element is now in place, but you still need the function `getIcon()` to get the actual icon based. It happens with a icon number we got from API response. 
Add the function behind some other function before `return()`. The function gets **WeatherIcon** as the parameter, which is numeral, and returns responsive picture from the icons saved to the computer.

```
...

const getIcon = (i) => {
  return `/icons/${i}.png`;
}

...
```
#### Date

Everything we wanted, is now fetched. So, let's add some additional elements to the application, like date.  

```
...

<div className = 'row-date'>
  {dateBuilder(new Date())}
</div>

...
```

```
...

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

...
```

### 4. Styling the application


