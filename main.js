const API_KEY = "at_WiUYlWR1VosF8jomi3AplaoCjJuz4";
const searchInputEle = document.getElementById("search-input");
const form = document.querySelector("form");
// Default ip address on load
const defaultIp = "";

let map = L.map("map").setView([51.505, -0.09], 13);
const locationIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [46, 46],
  iconAnchor: [15, 15],
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

L.marker([51.5, -0.09], { icon: locationIcon }).addTo(map);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = searchInputEle.value.trim();
  console.log("value", searchValue);
});

const fetchData = (param) => {
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${param}&domain=${param}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

document.addEventListener("DOMContentLoaded", fetchData(defaultIp));
