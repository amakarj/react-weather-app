# Guide to simple Weather App using AccuWeather's API
**Creator: [Amanda Karjalainen](https://github.com/amakarj)**

## Introduction

This guide is step-by-step guide for a simple Weather App. Weather data has been fetched from AccuWeather's Locations and Current Conditions API. Main emphasis is on how you work with APIs - how to fetch data and display it. There will be a visual example of the app at the end, but it's not the guide's main focus, therefore, it's only a short look. 

This is the final task of a school project about React fundamentals. It's been done alone, but we worked in pairs on first three tasks. Some explanations or stages, e.g. pre-installations and definitions of fundamentals, have been excluded from this task as they have already been explained elsewhere. To get introduced on earlier tasks, you can visit **[here](https://github.com/jenhakk/React.js_Fundamentals)**.

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

Before the actual data fetching, let’s add an empty function `fetchWeather()` and connect it to the button by `onClick` event.  
*Remember, F12 is a friend. You’ll get to see the actual responses before your site is displaying it.*

Below you can see a beginning of response from Locations API. The user has searched for Helsinki and API returns the data according to it.  
There you can see the location key **Key** we need. We can access it with `${result[0].Key}`.

`[{"Version":1,"Key":"133328","Type":"City","Rank":30,"LocalizedName":"Helsinki","EnglishName":"Helsinki",`

![Browser view of fetching response](/screenshots/browser-view.png)

