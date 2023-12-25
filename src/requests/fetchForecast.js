const axios = require("axios");

const URL = "https://api.weatherapi.com/v1/forecast.json";
const FORECAST_DAYS = 3;

async function fetchForecast(location) {
  return await axios({
    url: URL,
    method: "get",
    params: {
      q: location,
      days: FORECAST_DAYS,
      key: process.env.WEATHER_API_KEY,
    },
    responseType: "json",
  })
    .then((res) => {
      const city = res.data.location.name;
      const country = res.data.location.country;
      const locationName = `${city}, ${country}`;

      const weatherData = res.data.forecast.forecastday.map((day) => {
        return {
          date: day.date,
          maxTempC: day.day.maxtemp_c,
          maxTempF: day.day.maxtemp_f,
          minTempC: day.day.mintemp_c,
          minTempF: day.day.mintemp_f,

          sunriseTime: day.astro.sunrise,
          sunsetTime: day.astro.sunset,
          moonriseTime: day.astro.moonrise,
          moonsetTime: day.astro.moonset,
        };
      });
      return {
        locationName,
        weatherData,
      };
    })
    .catch((err) => {
      console.log("Error: ", err);
      throw new Error(`Failed to retrieve forecast data for ${location}...`);
    });
}

module.exports = {
  fetchForecast,
};
