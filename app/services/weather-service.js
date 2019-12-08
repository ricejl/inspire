import Weather from "../models/weather.js";
import store from "../store.js";

// @ts-ignore
const weatherApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/weather",
  timeout: 3000
});

class WeatherService {
  async getWeatherAsync() {
    console.log("Calling the Weatherman");
    let res = await weatherApi.get();
    // get weather by id
    console.log("drilling down to icon", res.data.weather[0].id);
    let resWeather = await weatherApi.get("", res.data.weather[0].id);
    console.log("finding weather by id", resWeather);

    store.commit("weather", new Weather(res.data));
  }
}

const weatherService = new WeatherService();
export default weatherService;
