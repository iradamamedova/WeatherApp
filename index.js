weatherDataService.getWeather().then((dayList) => {
  if (dayList) {
    const widgetRoot = document.querySelector(".app__weather");
    const weatherWidget = new WeatherComponent(
      widgetRoot,
      "Baku, Azerbaijan",
      dayList
    );
  } else {
    console.error("API is not working");
  }
});
