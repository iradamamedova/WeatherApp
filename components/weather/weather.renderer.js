class WeatherRenderer {
  rootElement;
  weatherHTMLElement;
  dayListHTMLElement;
  detailedDayHTMLElement;

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

    this.rootElement.appendChild(this.weatherHTMLElement);

//  this.weatherHTMLElement.addEventListener("click", this.setSelected);
  }

//   setSelected = (event) => {
//     let currentElement = event.target;
//     this.dayListHTMLElement.querySelectorAll(".weather__day").forEach((day) => {
//       day.classList.add("selected")
// //      if (day.getAttribute("data-id") === this.detailedDayHTMLElement.getAttribute("data-id")) {

//   //    }
//     })
//     //currentElement.classList.add("selected");
//   }

  getLocationHTMLElement(location) {
    return this.createElement("h2", "weather__location", location);
  }

  getDayListHTMLElement(dayList) {
    this.dayListHTMLElement = this.createElement("div", "weather__day-list");
    this.appendDaysInList(dayList);
    return this.dayListHTMLElement;
  }

  getDayHTMLElement(day) {
    const dayHTMLElement = this.createElement(
      "div",
      "weather__day",
      day.getDayInfo()
    );
    dayHTMLElement.setAttribute("data-id", day.id);
    dayHTMLElement.insertBefore(
      this.addImage(day),
      dayHTMLElement.querySelector(".weather__text")
    );
    return dayHTMLElement;
  }

  appendDaysInList(dayList) {
    dayList.forEach((day) => {
      this.dayListHTMLElement.appendChild(this.getDayHTMLElement(day));
    });
    
    this.dayListHTMLElement.prepend(
      this.getWeatherDetailedHTMLElement(dayList[0])
    );

  }

  updateDayList(dayList) {
    this.dayListHTMLElement.innerHTML = "";
    this.appendDaysInList(dayList);
  }

  getWeatherDetailedHTMLElement(currentDay) {
    this.detailedDayHTMLElement = this.createElement(
      "div",
      "weather__detailed-day",
      currentDay.getDetailedDayInfo()
    );
    this.detailedDayHTMLElement.setAttribute("data-id", currentDay.id);
    this.detailedDayHTMLElement.insertBefore(
      this.addImage(currentDay),
      this.detailedDayHTMLElement.querySelector(".weather__detailed-info")
    );
    return this.detailedDayHTMLElement;
  }

  addImage(day) {
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

  createElement(tagName, classes, html) {
    const elem = document.createElement(tagName);
    elem.classList.add(classes);
    if (Boolean(html)) {
      elem.innerHTML = html;
    }
    return elem;
  }
}
