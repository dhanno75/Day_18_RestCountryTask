// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3f59a4e5cbf1f1c3b1b16d3fd65dafd6

const button = document.querySelector("#bttns");
const countryName = document.querySelector("#country-name");
const image = document.querySelector("#country-image");
const capital = document.querySelector("#capital");
const region = document.querySelector("#region");
const countryCode = document.querySelector("#country-code");

let restCountryUrl = "https://restcountries.com/v3.1/all";
async function getCountries() {
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
}

async function renderCountry() {
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
        <button class="btn btn-warning" id="bttns" onClick='getWeather(${country.latlng})'>Click for weather</button>
        </div>
      </div>
    </div>
    `;
  }

  row.innerHTML = cont;
}
renderCountry();

async function getWeather(lat, lng) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lng +
    "&appid=3f59a4e5cbf1f1c3b1b16d3fd65dafd6";
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let countryWeather = await data.json();
    console.log(countryWeather);
  } catch (err) {
    console.log(err);
  }
}
