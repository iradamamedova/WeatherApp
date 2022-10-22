class Weather {
  id;
  day;
  temperature;
  text;
  date;
  wind;
  humidity;
  pressure;
  sunrise;
  sunset;

  constructor(
    id,
    day,
    temperature,
    text,
    date,
    wind,
    humidity,
    pressure,
    sunrise,
    sunset
  ) {
    (this.id = id), (this.day = day), (this.temperature = temperature);
    this.text = text;
    this.date = date;
    this.wind = wind;
    this.humidity = humidity;
    this.pressure = pressure;
    this.sunrise = sunrise;
    this.sunset = sunset;
  }

  dayNameCheck(dayName) {
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

  getDayInfo() {
    return `
      <p class="weather__day-name">${this.dayNameCheck(
        new Date(this.day * 1000).toString().split(" ")[0]
      )}</p>
      <p class="weather__temperature">${Math.round(
        parseInt(this.temperature) - 273.15
      )}<span>&#176;</span></p>
      <p class="weather__text" >${this.text}</p>
    `;
  }

  getDetailedDayInfo() {
    return `
      <div class="weather__base-info">
        <p class="weather__date"><span>
          ${
            new Date(this.date * 1000).toString().split(" ")[2] +
            " " +
            this.monthNameCheck(
              new Date(this.date * 1000).toString().split(" ")[1]
            )
          }
        </span></p>
        ${this.getDayInfo()}
      </div>
      <div class="weather__detailed-info">
        <p><span>${this.wind} kph</span> Wind</p>
        <p><span>${this.humidity}%</span> Humidity</p>
        <p><span>${this.pressure}"Hg</span> Pressure</p>
        <p><span>${new Date(this.sunrise * 1000)
          .toString()
          .split(" ")[4]
          .split(":", 2)
          .join(":")}</span> Sunrise</p>
        <p><span>${new Date(this.sunset * 1000)
          .toString()
          .split(" ")[4]
          .split(":", 2)
          .join(":")}</span> Sunset</p>
      </div>
      `;
  }

  static fromJSON(json) {
    return new Weather(
      json.dt,
      json.dt,
      json.temp.day,
      json.weather[0].description,
      json.dt,
      json.wind_speed,
      json.humidity,
      json.pressure,
      json.sunrise,
      json.sunset
    );
  }
}
