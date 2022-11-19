// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3f59a4e5cbf1f1c3b1b16d3fd65dafd6

document.body.innerHTML = `
<div class="container">
  <h1 id="title" class="text-center">Rest Countries data</h1>
  <div class="row"></div>
</div>
`;

const button = document.querySelector("#bttns");
const countryName = document.querySelector("#country-name");
const image = document.querySelector("#country-image");
const capital = document.querySelector("#capital");
const region = document.querySelector("#region");
const countryCode = document.querySelector("#country-code");

let restCountryUrl = "https://restcountries.com/v3.1/all";
const getCountries = async () => {
  let countries;
  try {
    const data = await fetch(restCountryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    countries = await data.json();
  } catch (err) {
    console.log(err);
  }

  return countries;
};

const renderCountry = async () => {
  const countries = await getCountries();
  let row = document.querySelector(".row");
  let cont = "";

  let definedCountriesData = countries.filter((el) => {
    if (
      el.name.common !== undefined &&
      el.flags.png !== undefined &&
      el.capital !== undefined &&
      el.region !== undefined &&
      el.cioc !== undefined
    ) {
      return el;
    }
  });
  // console.log(definedCountriesData);

  for (let country of countries) {
    // console.log(country.latlng);
    if (country === undefined) {
      break;
    }
    cont += `
    <div class="col-lg-4 col-sm-12 mb-4">
      <div class="card">
        <div class="card-header" id="country-name">${country.name.common}</div>
        <div class="card-body">
          <div class="image">
            <img src="${country.flags.png}" alt="" id="country-image" />
          </div>
        
        <ul class="list-group list-group-flush card-text mt-3">
          <li class="list-group-item" id="capital">Capital: ${country.capital}</li>
          <li class="list-group-item" id="region">Region: ${country.region}</li>
          <li class="list-group-item" id="country-code">Country Code: ${country.cioc}</li>
        </ul>
        <button class="btn btn-warning mt-3 mb-3" id="bttns" onClick='getWeather(${country.latlng})'>Click for weather</button>
        </div>
      </div>
    </div>
    `;
  }

  row.innerHTML = cont;
};
renderCountry();

const getWeather = async (lat, lng) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3f59a4e5cbf1f1c3b1b16d3fd65dafd6`;
  try {
    const data = await fetch(url);
    let countryWeather = await data.json();
    console.log(countryWeather, countryWeather.main.temp);
    let temp = `
      Country: ${countryWeather.name}
      Temperature: ${(countryWeather.main.temp - 273.15).toFixed(2)}°C
      Feels like: ${(countryWeather.main.feels_like - 273.15).toFixed(2)}°C
      Humidity: ${countryWeather.main.humidity}
      Pressure: ${countryWeather.main.pressure}
      Sky: ${countryWeather.weather[0].description}
      Wind Speed: ${countryWeather.wind.speed} km/hr
    `;
    alert(temp);
  } catch (err) {
    console.log(err);
  }
};
