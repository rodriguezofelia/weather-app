### Project Notes

This is a weather app that calls the Open Weather One Call 3.0 API. It returns weather data for the given Cities in the data.json file.

If I had more time to work on this I would:

- Add unit tests to test for api calls and rendering
- Spend more time styling the application with images, color formating, etc
- Add routing so I could easily have mulitple pages to display the data
- Add a navigation bar and footer

### Necessary Info to Run Project

You will need your own API key in order to run this app. In order to do so you will need:

- To create an account at https://openweathermap.org/
- Generate an API key within the API keys tab
- Enter valid credit card information to get an Activated status
  - While it's free, Open Weather still requires your CC information
  - I recommend setting the "Calls per day" to 1000 to not get charged
- Once you have your API key and your status is Activated, create an file to store the API KEY and URL
- I called mine "api.js" and stored them as follows
  - export const WEATHER_APP_API_URL = "https://api.openweathermap.org/data/3.0/onecall";
  - export const WEATHER_APP_API_KEY = "api-key-goes-here"

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
