let inputSearch = document.getElementById("inputSearch");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
let day = days[d.getDay()];
if (days[d.getDay() + 1] == undefined) {
  nextDay = days[d.getDay() - 6];
} else {
  nextDay = days[d.getDay() + 1];
}
if (days[d.getDay() + 2] == undefined) {
  nextNextDay = days[d.getDay() + -5];
} else {
  nextNextDay = days[d.getDay() + 2];
}

const months = [
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

const c = new Date();
let month = months[c.getMonth()];
let dayDate = new Date().getDate();

async function getData(cityName) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=36b6e3d7e4e1481ca11104436241206&q=${cityName}&days=3`
  );
  let result = await data.json();
  display(result);
}
getData("cairo");

function display(data) {
  let box = "";
  if (data != null) {
    box += `
    <div class="col-md-12 col-lg-4 rounded-5 section-color text-capitalize">
      <div class="head d-flex justify-content-between align-items-center p-3">
        <h2 >${day}</h2>
        <span class="fs-5">${dayDate},${month}</span>
      </div>
      <hr>
      <div class="body p-3">
        <h2 class="text-capitalize fs-5">${data.location.name}</h2>
        <div class="temperature d-flex justify-content-around align-items-center">
          <p>${data.forecast.forecastday[0].day.avgtemp_c}<sup>o</sup>C</p>
          <div class="img-temperature w-25">
          <img src="${data.current.condition.icon}" class="w-100">
          </div>
        </div>
        <p class="fs-5">${data.forecast.forecastday[0].day.condition.text}</p>
        <div class="boxs my-2 d-flex justify-content-around align-items-center">
          <div class="box">
            <img src="img/icon-umberella.png" alt="icon-Umbrella">
            <span>${data.forecast.forecastday[0].day.avghumidity}%</span>
          </div>
          <div class="box">
            <img src="img/icon-wind.png" alt="icon-Umbrella">
            <span>${data.forecast.forecastday[0].day.maxwind_kph}km/h</span>
          </div>
          <div class="box">
            <img src="img/icon-compass.png" alt="icon-Umbrella">
            <span>East</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-lg-4 rounded-5 section-color text-capitalize ">
      <div class="head d-flex justify-content-center align-items-center p-3">
        <h2 >${nextDay}</h2>
      </div>
      <hr>
      <div class="body p-3">
        <div class="temperature d-flex justify-content-center align-items-center flex-column">
          <div class="img-temperature mt-3 d-flex justify-content-center align-items-center w-100">
          <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="temperature" class="w-10 my-2">
        </div>
        <span class="my-3 fs-3">${data.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup> </span>
        <p class="fs-5">${data.forecast.forecastday[1].day.condition.text}</p>
      </div>
    </div>
  </div>
    <div class="col-md-12 col-lg-4 rounded-5 section-color text-capitalize ">
      <div class="head d-flex justify-content-center align-items-center p-3">
        <h2 >${nextNextDay}</h2>
      </div>
      <hr>
      <div class="body p-3">
        <div class="temperature d-flex justify-content-center align-items-center flex-column">
          <div class="img-temperature mt-3 d-flex justify-content-center align-items-center w-100">
          <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="temperature" class="w-10 my-2">
        </div>
        <span class="my-3 fs-3">${data.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup> </span>
        <p class="fs-5">${data.forecast.forecastday[2].day.condition.text}</p>
        </div>
      </div>
    </div>
`;
  }
  document.getElementById("apiData").innerHTML = box;
}
inputSearch.addEventListener("input", function () {
  if (getData(inputSearch.value)) {
    getData(inputSearch.value);
  }
});
