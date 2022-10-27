System.register("components/weather/weather.data.service", [], function (exports_1, context_1) {
    "use strict";
    var weatherDataService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("weatherDataService", weatherDataService = (function () {
                class WeatherDataService {
                    constructor() { }
                    getWeather() {
                        return fetch("https://rapidweather.p.rapidapi.com/data/2.5/onecall?lat=40.409264&lon=49.867092", {
                            method: "GET",
                            headers: {
                                "X-RapidAPI-Key": WeatherDataService.apiKey,
                                "X-RapidAPI-Host": WeatherDataService.apiHost,
                            },
                        })
                            .then((response) => response.json())
                            .then((response) => {
                            const dayList = response.daily.map((json) => {
                                let weather = {
                                    id: json.dt,
                                    day: json.dt,
                                    temperature: json.temp.day,
                                    text: json.weather[0].description,
                                    date: json.dt,
                                    wind: json.wind_speed,
                                    humidity: json.humidity,
                                    pressure: json.pressure,
                                    uvi: json.uvi,
                                    sunrise: json.sunrise,
                                    sunset: json.sunset
                                };
                                return weather;
                            });
                            dayList.splice(-1);
                            console.log(dayList);
                            return Promise.resolve(dayList);
                        });
                    }
                }
                WeatherDataService.apiKey = "98c87e77eemsh73e8a7bca8a4d94p1d2162jsnd6d147f21860";
                WeatherDataService.apiHost = "rapidweather.p.rapidapi.com";
                return new WeatherDataService();
            })());
        }
    };
});
System.register("components/weather/weather.renderer", [], function (exports_2, context_2) {
    "use strict";
    var WeatherRenderer;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            WeatherRenderer = class WeatherRenderer {
                constructor(rootElement) {
                    this.rootElement = rootElement;
                }
                render(location, dayList) {
                    this.rootElement.innerHTML = "";
                    this.weatherHTMLElement = document.createElement("div");
                    this.weatherHTMLElement.classList.add("weather");
                    this.weatherHTMLElement.appendChild(this.getLocationHTMLElement(location));
                    this.dayListHTMLElement = this.getDayListHTMLElement(dayList);
                    this.weatherHTMLElement.appendChild(this.dayListHTMLElement);
                    this.weatherHTMLElement.insertBefore(this.getWeatherDetailedHTMLElement(dayList[0]), this.dayListHTMLElement);
                    this.rootElement.appendChild(this.weatherHTMLElement);
                }
                getLocationHTMLElement(location) {
                    return this.createElement("h2", "weather__location", location);
                }
                getDayListHTMLElement(dayList) {
                    this.dayListHTMLElement = this.createElement("div", "weather__day-list");
                    this.appendDaysInList(dayList);
                    return this.dayListHTMLElement;
                }
                getDayHTMLElement(day) {
                    this.dayHTMLElement = this.createElement("div", "weather__day", this.getDayInfo(day));
                    this.dayHTMLElement.setAttribute("data-id", `${day.id}`);
                    this.dayHTMLElement.insertBefore(this.addImage(day), this.dayHTMLElement.querySelector(".weather__text"));
                    return this.dayHTMLElement;
                }
                appendDaysInList(dayList) {
                    dayList.forEach((day) => {
                        this.dayListHTMLElement.appendChild(this.getDayHTMLElement(day));
                    });
                }
                updateDayList(dayList) {
                    this.dayListHTMLElement.innerHTML = "";
                    this.appendDaysInList(dayList);
                }
                getWeatherDetailedHTMLElement(currentDay) {
                    this.detailedDayHTMLElement = this.createElement("div", "weather__detailed-day", this.getDetailedDayInfo(currentDay));
                    this.detailedDayHTMLElement.setAttribute("data-id", `${currentDay.id}`);
                    this.detailedDayHTMLElement.insertBefore(this.addImage(currentDay), this.detailedDayHTMLElement.querySelector(".weather__detailed-info"));
                    return this.detailedDayHTMLElement;
                }
                addImage(day) {
                    let img = this.createElement("img", "weather__img");
                    if (day.text === "broken clouds") {
                        img.setAttribute("src", "./img/mostly-cloudy.png");
                    }
                    else if (day.text === "scattered clouds" || day.text === "few clouds") {
                        img.setAttribute("src", "./img/cloudy.png");
                    }
                    else if (day.text === "showers" || day.text === "moderate rain") {
                        img.setAttribute("src", "./img/rainy.png");
                    }
                    else if (day.text === "overcast clouds") {
                        img.setAttribute("src", "./img/overcast.png");
                    }
                    else if (day.text === "windy") {
                        img.setAttribute("src", "./img/windy.png");
                    }
                    else if (day.text === "mostly sunny" || day.text === "clear sky") {
                        img.setAttribute("src", "./img/mostly-sunny.png");
                    }
                    else if (day.text === "light rain") {
                        img.setAttribute("src", "./img/light-rain.png");
                    }
                    return img;
                }
                monthNameCheck(monthName) {
                    let months = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];
                    months.map((month) => {
                        if (month.slice(0, 3) === monthName) {
                            monthName = month;
                        }
                    });
                    return monthName;
                }
                getDayInfo(day) {
                    return `
      <p class="weather__day-name">${this.dayNameCheck(new Date(day.day * 1000).toString().split(" ")[0])}</p>
      <p class="weather__temperature">${Math.round(parseInt(day.temperature) - 273.15)}&#176;</p>
      <p class="weather__text" >${day.text}</p>
    `;
                }
                getDetailedDayInfo(day) {
                    return `
      <div class="weather__base-info">
        <p class="weather__date"><span>
          ${new Date(day.date * 1000).toString().split(" ")[2] +
                        " " +
                        this.monthNameCheck(new Date(day.date * 1000).toString().split(" ")[1])}
        </span></p>
        ${this.getDayInfo(day)}
      </div>
      <div class="weather__detailed-info">
        <p><span>${day.wind} kph</span> Wind</p>
        <p><span>${day.humidity}%</span> Humidity</p>
        <p><span>${day.pressure}"Hg</span> Pressure</p>
        <p><span>${day.uvi}</span> Uvi</p>
        <p><span>${new Date(day.sunrise * 1000)
                        .toString()
                        .split(" ")[4]
                        .split(":", 2)
                        .join(":")}</span> Sunrise</p>
        <p><span>${new Date(day.sunset * 1000)
                        .toString()
                        .split(" ")[4]
                        .split(":", 2)
                        .join(":")}</span> Sunset</p>
      </div>
      `;
                }
                dayNameCheck(dayName) {
                    if (dayName == "Mon") {
                        dayName = "Monday";
                    }
                    else if (dayName == "Tue") {
                        dayName = "Tuesday";
                    }
                    else if (dayName == "Wed") {
                        dayName = "Wednesday";
                    }
                    else if (dayName == "Thu") {
                        dayName = "Thusday";
                    }
                    else if (dayName == "Fri") {
                        dayName = "Friday";
                    }
                    else if (dayName == "Sat") {
                        dayName = "Saturday";
                    }
                    else if (dayName == "Sun") {
                        dayName = "Sunday";
                    }
                    return dayName;
                }
                createElement(tagName, classes, html) {
                    const elem = document.createElement(tagName);
                    elem.classList.add(classes);
                    if (Boolean(html)) {
                        elem.innerHTML = html;
                    }
                    return elem;
                }
            };
            exports_2("WeatherRenderer", WeatherRenderer);
        }
    };
});
System.register("components/weather/weather.component", ["components/weather/weather.renderer"], function (exports_3, context_3) {
    "use strict";
    var weather_renderer_1, WeatherComponent;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (weather_renderer_1_1) {
                weather_renderer_1 = weather_renderer_1_1;
            }
        ],
        execute: function () {
            WeatherComponent = class WeatherComponent {
                constructor(rootElement, location, dayList) {
                    this.dayList = [];
                    this.daysListener = (event) => {
                        const currentElement = event.target;
                        const currentId = currentElement.getAttribute("data-id");
                        if ((this.renderer.dayListHTMLElement.contains(currentElement) ||
                            currentElement.parentElement.hasAttribute("data-id")) &&
                            currentElement !== this.renderer.dayListHTMLElement) {
                            this.checkSelectedDay(currentElement);
                            this.dayList.find((day) => {
                                if (day.id === parseInt(currentId) ||
                                    day.id ===
                                        parseInt(currentElement.parentElement.getAttribute("data-id"))) {
                                    this.renderer.detailedDayHTMLElement.replaceWith(this.renderer.getWeatherDetailedHTMLElement(day));
                                }
                            });
                        }
                    };
                    this.renderer = new weather_renderer_1.WeatherRenderer(rootElement);
                    this.location = location;
                    this.dayList = dayList;
                    this.render();
                }
                setSelectedDay(currentElement) {
                    currentElement.hasAttribute("data-id")
                        ? currentElement.classList.add("selected")
                        : currentElement.parentElement.classList.add("selected");
                }
                checkSelectedDay(currentElement) {
                    if (this.renderer.dayListHTMLElement.querySelector(".selected")) {
                        this.renderer.dayListHTMLElement
                            .querySelector(".selected")
                            .classList.remove("selected");
                        this.setSelectedDay(currentElement);
                    }
                    else {
                        this.setSelectedDay(currentElement);
                    }
                }
                render() {
                    this.renderer.render(this.location, this.dayList);
                    this.renderer.dayListHTMLElement.addEventListener("click", this.daysListener);
                }
            };
            exports_3("WeatherComponent", WeatherComponent);
        }
    };
});
System.register("index", ["components/weather/weather.data.service", "components/weather/weather.component"], function (exports_4, context_4) {
    "use strict";
    var weather_data_service_1, weather_component_1;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (weather_data_service_1_1) {
                weather_data_service_1 = weather_data_service_1_1;
            },
            function (weather_component_1_1) {
                weather_component_1 = weather_component_1_1;
            }
        ],
        execute: function () {
            weather_data_service_1.weatherDataService.getWeather().then((dayList) => {
                if (dayList) {
                    const widgetRoot = document.querySelector(".app__weather");
                    const weatherWidget = new weather_component_1.WeatherComponent(widgetRoot, "Baku, Azerbaijan", dayList);
                }
                else {
                    console.error("API is not working");
                }
            });
        }
    };
});
//# sourceMappingURL=index.js.map