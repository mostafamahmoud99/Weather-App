// today variable

let today = document.getElementById("today"),
  todayDate = document.getElementById("today-date"),
  locationCity = document.getElementById("location"),
  todayDegree = document.getElementById("today-degree"),
  todayIcon = document.getElementById("today-icon"),
  todayDescription = document.getElementById("today-description"),
  humidty = document.getElementById("humidty"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass"),
  searchInput = document.getElementById("search-input"),
  currentCity = "cairo",
  date = new Date(),
  weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
let apiResponse;
// nextday variable

const nextDay = document.getElementsByClassName("nextDay"),
  nextDate = document.getElementsByClassName("nextDate"),
  nextDayIcon = document.getElementsByClassName("nextDay-icon"),
  maxDegree = document.getElementsByClassName("max-degree"),
  minDegree = document.getElementsByClassName("min-degree"),
  nextDayDescription = document.getElementsByClassName("nextDay-description");

// fetch Api

async function getApi() {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=0a85d05e028e47719cb204923221805&q=${currentCity}&days=3`);
  let data = await response.json();
  apiResponse = data;
  displayWeather();
  displayNextDay();
}

// Display Data
function displayWeather() {
  // dateApi!
  let dateApi = apiResponse.forecast.forecastday[0].date;
  let dateDay = dateApi.split("-");
  let currentDay = dateDay[2];

  today.innerHTML = `${weekDays[date.getDay()]}`;
  todayDate.innerHTML = `${currentDay} ${monthName[date.getMonth()]}`;
  locationCity.innerHTML = apiResponse.location.name;
  todayDegree.innerHTML = Math.round(apiResponse.current.temp_c);
  todayIcon.setAttribute(
    "src",
    `https://${apiResponse.current.condition.icon}`
  );
  todayDescription.innerHTML = apiResponse.current.condition.text;
  humidty.innerHTML = apiResponse.current.humidity;
  wind.innerHTML = apiResponse.current.wind_kph;
  compass.innerHTML = apiResponse.current.wind_dir;
}

// Next Day
function getNextDays(nextDateApi) {
  let d = new Date(nextDateApi);
  return d && weekDays[d.getDay()];
}

// Next month

function getNextMonth(nextDateApi) {
  let m = new Date(nextDateApi);
  return m && monthName[m.getMonth()];
}

// display NextDays

function displayNextDay() {
  for (let i = 0; i < nextDay.length; i++) {
    let nextDateApi = apiResponse.forecast.forecastday[i + 1].date;
    let nextDateDay = nextDateApi.split("-");
    let next_Days = nextDateDay[2];

    nextDay[i].innerHTML = getNextDays(nextDateApi);
    nextDate[i].innerHTML = `${next_Days} ${getNextMonth(nextDateApi)}`;
    nextDayIcon[i].setAttribute(
      "src",
      `https:${apiResponse.forecast.forecastday[i + 1].day.condition.icon}`
    );
    maxDegree[i].innerHTML = Math.round(
      apiResponse.forecast.forecastday[i].day.maxtemp_c
    );
    minDegree[i].innerHTML = Math.round(
      apiResponse.forecast.forecastday[i].day.mintemp_c
    );
    nextDayDescription[i].innerHTML =
      apiResponse.forecast.forecastday[i].day.condition.text;
  }
}

// search city

function searchCity() {
  currentCity = searchInput.value;

  getApi();
}

searchInput.addEventListener("keyup", searchCity);

// Load Data

getApi();

// subscribe validation

let subscribeInput = document.getElementById("subscribe-input");
let btnsub = document.getElementById("btnsub");

btnsub.addEventListener("click", validationEmail);

function validationEmail() {
  let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  if (regex.test(subscribeInput.value)) {
    let emailValid = document.getElementById("emailValid");
    emailValid.classList.replace("d-block", "d-none");
    return true;
  } else {
    let emailValid = document.getElementById("emailValid");
    emailValid.classList.replace("d-none", "d-block");
    return false;
  }
}
