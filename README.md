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
- Weather App requires at least two of these APIs – one to provide a location key according to user’s input and other to retrieve current weather data based on the location key.


## Making the Application
