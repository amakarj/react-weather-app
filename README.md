# Guide to simple Weather App using AccuWeather's API
Creator: [Amanda Karjalainen](https://github.com/amakarj)

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
  - In the Weather App of this guide, we’ll get the location as text by user’s input.
  - So, choose method **City Search** under **Text Search**, like in the image below.

![Locations API](/screenshots/locations-api.png)

-	On the opening site, there’s a form which gives the straight URL for fetching data of this API. 
URL’s in form of:

```
http://dataservice.accuweather.com/locations/v1/cities/search?apikey=YOUR_API_KEY&q=LOCATION
```

*Notice that you need to replace apikey and q's values with your personal key and location query!  
Both API key and location query are required parameters!*

#### Current Conditions API - weather data
- Now that URL for the location key has been got, let’s get one for the other API – Current Conditions. 
- The used method goes by the same name, Current Conditions, like in the image below.


## Making the Application
