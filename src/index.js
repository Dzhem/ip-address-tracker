import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { validateIp, addTileMap, addOffset, getAddress } from "./helpers/index";
import iconLoc from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const searchBtn = document.querySelector(".search-bar__btn");
const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

const mapArea = document.querySelector(".map");
var map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});
const markerIcon = L.icon({
  iconUrl: iconLoc,
  iconSize: [46, 56],
});
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

searchBtn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(printData);
  }
}

function printData(locationObj) {
  const { lat, lng, region, city, timezone } = locationObj.location;
  ipInfo.innerText = locationObj.ip;
  locationInfo.innerText = city + ", " + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = locationObj.isp;
  printMap(lat, lng);
}

function printMap(lat, lng) {
  map.setView([lat, lng], 13);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
  addTileMap(map);
  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress().then(printData);
});
