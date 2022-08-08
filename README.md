# Guide to simple Weather App using AccuWeather's API
**Creator: [Amanda Karjalainen](https://github.com/amakarj)**

## Introduction

This guide is step-by-step guide for a simple Weather App. Weather data has been fetched from AccuWeather's Locations and Current Conditions API. Main emphasis is on how you work with APIs - how to fetch data and display it. There will be a visual example of the app at the end, but it's not the guide's main focus, therefore, it's only a short look. 

It is the final task of a school project about React fundamentals. This part's been done alone, but on the other tasks we worked in pairs. Some explanations or stages, e.g. pre-installations and definitions of fundamentals, have been excluded from this task as they have already been explained elsewhere. To get introduced on earlier tasks, you can visit [here](https://github.com/jenhakk/React.js_Fundamentals).

In the future, visualisation, usage of different libraries and APIs is possible. 

## Making Preparations

### 1. Sign in to AccuWeather and create your own API key

-	To fetch any data from AccuWeather API, **you'll need your own API key**. You can registrate to AccuWeather [here](https://developer.accuweather.com/).
-	After registration and logging in, you can create a new key on **My Apps** tab by clicking a button **Add a new App**. See the image below.

![My Apps on AccuWeather](/screenshots/my-apps-accuweather.png)

*Notice that you can add only one API key at time on a free account!* 


### 2.	AccuWeather’s APIs

-	When you’ve got your API key, the next step is to get suitable API for your weather application. 
-	You can see a partial listing of APIs provided by AccuWeather in the image below. 
- Weather App **requires at least two** of these APIs – one to provide a location key according to user’s input and other to retrieve current weather data based on the location key.

![API listing on AccuWeather](/screenshots/api-listing-accuweather.png)

#### Locations API - required location key
  - In the Weather App of this guide, we’ll get the location as text by user’s input. Therefore, choose a method **City Search** under **Text Search**, like in the image below.

![Locations API](/screenshots/locations-api.png)

  - On the opening site, there’s a form which gives the straight URL for fetching data of this API after clicking a button **Send this request**. 

![City Search method form and URL](/screenshots/city-search-method.png)

URL’s in form of:

```
http://dataservice.accuweather.com/locations/v1/cities/search?apikey=YOUR_API_KEY&q=LOCATION
```

*Notice that you need to replace apikey and q's values with your personal key and location query (location state in the code)!  
Both API key and location query are required parameters!*

#### Current Conditions API - weather data
- Now that URL for the location key has been got, let’s get one for the other API – Current Conditions. 
- The used method goes by the same name, Current Conditions, like in the image below.

![Current Conditions API on AccuWeather](/screenshots/current-conditions-api.png)

URL's in form of:

```
https://dataservice.accuweather.com/currentconditions/v1/LOCATION_KEY?apikey=YOUR_API_KEY
```

*Notice that this time AccuWeather's form requires only API key! **The location key must be included to URL as well**, otherwise the second fetch won't work properly.*

## Making the Application
