export default class Weather {
  constructor(data) {
    console.log("[RAW WEATHER API DATA]", data);
    //NOTE Have you ever wanted to know the temperature measured in kelvin?
    //      That is what this data returns! data.main.temp is the temperature in Kelvin

    //TODO check out the other data that comes back and see if there is anything you want to try

    this.city = data.name;
    this.kelvin = data.main.temp;
    this.celsius = Math.round(data.main.temp - 273.15);
    this.fahrenheit = Math.round((9 / 5) * (data.main.temp - 273.15) + 32);
    this.icon = data.weather[0].icon;
    this.main = data.weather[0].main;
    // this.description = data.weather[0].description;

    //data.weather[description icon id main]
    // FIXME drill down into weather section of data; may have to make another get request
  }

  get Template() {
    return `
        <div class="media bg-dark-transparent text-white">
          <h6 class="media-body pl-2">${this.city}</h6>
        </div>
        <div class="media p-2 bg-dark-transparent text-white">
          <img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" class="mr-3 icon-styling" alt="..." />
          <div class="media-body">
            <h4 class="mt-0">${this.fahrenheit}&#8457 | ${this.celsius}&#8451</h4>
            ${this.main}
          </div>
        </div>
    `;
  }
}
