import {weatherDataService} from './components/weather/weather.data.service';
import {WeatherComponent} from "./components/weather/weather.component";

weatherDataService.getWeather().then((dayList) => {
  if (dayList) {
    const widgetRoot: HTMLElement = document.querySelector(".app__weather");
    const weatherWidget = new WeatherComponent(
      widgetRoot,
      "Baku, Azerbaijan",
      dayList
    );
  } else {
    console.error("API is not working");
  }
});
