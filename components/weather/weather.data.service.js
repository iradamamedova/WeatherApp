const weatherDataService = (function () {
  class WeatherDataService {
    static apiKey = "98c87e77eemsh73e8a7bca8a4d94p1d2162jsnd6d147f21860";
    static apiHost = "rapidweather.p.rapidapi.com";

    constructor() {}

    getWeather() {
      return fetch(
        "https://rapidweather.p.rapidapi.com/data/2.5/onecall?lat=40.409264&lon=49.867092",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": WeatherDataService.apiKey,
            "X-RapidAPI-Host": WeatherDataService.apiHost,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          const dayList = response.daily.map(Weather.fromJSON);
          dayList.splice(-1);
          console.log(dayList);
          return Promise.resolve(dayList);
        });
    }
  }

  return new WeatherDataService();
})();
//single tone
