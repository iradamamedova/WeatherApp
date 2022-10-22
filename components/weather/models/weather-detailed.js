class WeatherDetailed extends Weather {
  constructor(id, day, temperature, text, date, wind, humidity, pressure, sunrise, sunset) {
    super(id, day, temperature, text),
    this._date = date;
    this._wind = wind,
    this._humidity = humidity,
    this._pressure = pressure,
    this._sunrise = sunrise,
    this._sunset = sunset
  }
}