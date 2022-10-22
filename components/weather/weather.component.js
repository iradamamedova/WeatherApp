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
    } else {
      this.setSelectedDay(currentElement);
    }
  }

  daysListener = (event) => {
    const currentElement = event.target;
    const currentId = currentElement.getAttribute("data-id");
    if (
      (this.renderer.dayListHTMLElement.contains(currentElement) ||
        currentElement.parentElement.hasAttribute("data-id")) &&
      currentElement !== this.renderer.dayListHTMLElement
    ) {
      this.checkSelectedDay(currentElement);
      this.dayList.find((day) => {
        if (
          day.id === parseInt(currentId) ||
          day.id ===
            parseInt(currentElement.parentElement.getAttribute("data-id"))
        ) {
          this.renderer.detailedDayHTMLElement.replaceWith(
            this.renderer.getWeatherDetailedHTMLElement(day)
          );
        }
      });
    }
  };

  render() {
    this.renderer.render(this.location, this.dayList);
    this.renderer.dayListHTMLElement.addEventListener(
      "click",
      this.daysListener
    );
  }
}
