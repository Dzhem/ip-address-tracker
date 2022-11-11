import { validateIp } from "./helpers/index";

const ipInput = document.querySelector(".search-bar__input");
const searchBtn = document.querySelector(".search-bar__btn");

searchBtn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_d2vFe44cbD3NieidhRwkHatHSwSg4&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then(console.log);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}
