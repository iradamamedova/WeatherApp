export class WeatherRenderer {
  rootElement: HTMLElement;
  weatherHTMLElement: HTMLElement;
  dayListHTMLElement: HTMLElement;
  dayHTMLElement: HTMLElement;
  detailedDayHTMLElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  render(location: string, dayList: Array<Weather>) {
    this.rootElement.innerHTML = "";

    this.weatherHTMLElement = document.createElement("div");
    this.weatherHTMLElement.classList.add("weather");

    this.weatherHTMLElement.appendChild(this.getLocationHTMLElement(location));
    this.dayListHTMLElement = this.getDayListHTMLElement(dayList);

    this.weatherHTMLElement.appendChild(this.dayListHTMLElement);
    this.weatherHTMLElement.insertBefore(
      this.getWeatherDetailedHTMLElement(dayList[0]),
      this.dayListHTMLElement
    );

    this.rootElement.appendChild(this.weatherHTMLElement);
  }

  getLocationHTMLElement(location: string) {
    return this.createElement("h2", "weather__location", location);
  }

  getDayListHTMLElement(dayList: Array<Weather>) {
    this.dayListHTMLElement = this.createElement("div", "weather__day-list");
    this.appendDaysInList(dayList);
    return this.dayListHTMLElement;
  }

  getDayHTMLElement(day: Weather) {
    this.dayHTMLElement = this.createElement(
      "div",
      "weather__day",
      this.getDayInfo(day)
    );
    this.dayHTMLElement.setAttribute("data-id", `${day.id}`);
    this.dayHTMLElement.insertBefore(
      this.addImage(day),
      this.dayHTMLElement.querySelector(".weather__text")
    );
    return this.dayHTMLElement;
  }

  appendDaysInList(dayList: Array<Weather>) {
    dayList.forEach((day) => {
      this.dayListHTMLElement.appendChild(this.getDayHTMLElement(day));
    });
  }

  updateDayList(dayList: Array<Weather>) {
    this.dayListHTMLElement.innerHTML = "";
    this.appendDaysInList(dayList);
  }

  getWeatherDetailedHTMLElement(currentDay: Weather) {
    this.detailedDayHTMLElement = this.createElement(
      "div",
      "weather__detailed-day",
      this.getDetailedDayInfo(currentDay)
    );
    this.detailedDayHTMLElement.setAttribute("data-id", `${currentDay.id}`);
    this.detailedDayHTMLElement.insertBefore(
      this.addImage(currentDay),
      this.detailedDayHTMLElement.querySelector(".weather__detailed-info")
    );
    return this.detailedDayHTMLElement;
  }

  addImage(day: Weather) {
    let img = this.createElement("img", "weather__img");
    if (day.text === "broken clouds") {
      img.setAttribute("src", "./img/mostly-cloudy.png");
    } else if (day.text === "scattered clouds" || day.text === "few clouds") {
      img.setAttribute("src", "./img/cloudy.png");
    } else if (day.text === "showers" || day.text === "moderate rain") {
      img.setAttribute("src", "./img/rainy.png");
    } else if (day.text === "overcast clouds") {
      img.setAttribute("src", "./img/overcast.png");
    } else if (day.text === "windy") {
      img.setAttribute("src", "./img/windy.png");
    } else if (day.text === "mostly sunny" || day.text === "clear sky") {
      img.setAttribute("src", "./img/mostly-sunny.png");
    } else if (day.text === "light rain") {
      img.setAttribute("src", "./img/light-rain.png");
    }
    return img;
  }

  monthNameCheck(monthName: string) {
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

  getDayInfo(day: Weather) {
    return `
      <p class="weather__day-name">${this.dayNameCheck(
        new Date(day.day * 1000).toString().split(" ")[0]
      )}</p>
      <p class="weather__temperature">${Math.round(
        parseInt(day.temperature) - 273.15
      )}&#176;</p>
      <p class="weather__text" >${day.text}</p>
    `;
  }

  getDetailedDayInfo(day: Weather) {
    return `
      <div class="weather__base-info">
        <p class="weather__date"><span>
          ${
            new Date(day.date * 1000).toString().split(" ")[2] +
            " " +
            this.monthNameCheck(
              new Date(day.date * 1000).toString().split(" ")[1]
            )
          }
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

  dayNameCheck(dayName: string) {
    if (dayName == "Mon") {
      dayName = "Monday";
    } else if (dayName == "Tue") {
      dayName = "Tuesday";
    } else if (dayName == "Wed") {
      dayName = "Wednesday";
    } else if (dayName == "Thu") {
      dayName = "Thusday";
    } else if (dayName == "Fri") {
      dayName = "Friday";
    } else if (dayName == "Sat") {
      dayName = "Saturday";
    } else if (dayName == "Sun") {
      dayName = "Sunday";
    }
    return dayName;
  }

  createElement(tagName: string, classes: string, html?: string) {
    const elem = document.createElement(tagName);
    elem.classList.add(classes);
    if (Boolean(html)) {
      elem.innerHTML = html;
    }
    return elem;
  }
}
