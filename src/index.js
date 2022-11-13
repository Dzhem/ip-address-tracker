import { validateIp } from "./helpers/index";

const ipInput = document.querySelector(".search-bar__input");
const searchBtn = document.querySelector(".search-bar__btn");
const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

searchBtn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_d2vFe44cbD3NieidhRwkHatHSwSg4&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then(printData);
  }
}

function printData(locationObj) {
  ipInfo.innerText = locationObj.ip;
  locationInfo.innerText =
    locationObj.location.city + ", " + locationObj.location.region;
  timezoneInfo.innerText = locationObj.location.timezone;
  ispInfo.innerText = locationObj.isp;
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}
