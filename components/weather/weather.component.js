class WeatherComponent {
  renderer;
  location;
  dayList = [];

  constructor(rootElement, location, dayList) {
    this.renderer = new WeatherRenderer(rootElement);
    this.location = location;
    this.dayList = dayList;

    this.render();
  }

  daysListener = (event) => {
    let currentId = event.target.getAttribute("data-id");
    let currentElement = event.target;
    this.renderer.updateDayList(this.dayList);
    this.renderer.dayListHTMLElement.querySelector(
      ".weather__detailed-day"
    ).innerHTML = "";
    if (currentElement.getAttribute("class") === "weather__day") {
      this.dayList.forEach((currentDay) => {
        if (currentDay.id === parseInt(currentId)) {
          this.renderer.dayListHTMLElement.prepend(
            this.renderer.getWeatherDetailedHTMLElement(currentDay)
          );
        }
      });
    } else {
      this.renderer.updateDayList(this.dayList);
    }
  };

  render() {
    this.renderer.render(this.location, this.dayList);
    this.renderer.weatherHTMLElement.addEventListener(
      "click",
      this.daysListener
    );
  }
}
