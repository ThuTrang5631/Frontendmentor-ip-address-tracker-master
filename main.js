const API_KEY = "at_WiUYlWR1VosF8jomi3AplaoCjJuz4";

//get element
const searchInputEle = document.getElementById("search-input");
const form = document.querySelector("form");
const ipAddressEle = document.getElementById("ip_address");
const locationEle = document.getElementById("location");
const timezoneEle = document.getElementById("timezone");
const ispEle = document.getElementById("isp");
const validateEle = document.querySelector("small");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

// Default ip address on load
const defaultIp = "";

// regrex validation IP ADDRESS AND DOMAIN ADDRESS
const regexIpAddress =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const regexDomain =
  /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;

// check map already initiated or not
const initMap = () => {
  let container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
};

const mapLocation = (lat, lng) => {
  let map = L.map("map").setView([lat, lng], 17);

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

  L.marker([lat, lng], { icon: locationIcon }).addTo(map);
};

const toggleModal = () => {
  modal.classList.toggle("show-modal");
};

const windowOnClick = (e) => {
  if (e.target === modal) {
    toggleModal();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInputEle.value.trim();
  if (regexIpAddress.test(searchValue)) {
    fetchData(searchValue);
  } else if (regexDomain.test(searchValue)) {
    fetchData(searchValue);
  } else {
    toggleModal();
    window.addEventListener("click", windowOnClick);
  }
});

const fetchData = (param) => {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${param}&domain=${param}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("An Error Occured");
      }
      return res.json();
    })
    .then((data) => {
      console.log("data", data);
      ipAddressEle.innerHTML = data.ip;
      locationEle.innerHTML = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
      timezoneEle.innerHTML = `UTC ${data.location.timezone}`;
      ispEle.innerHTML = data.isp;
      initMap();
      mapLocation(data.location.lat, data.location.lng);
    })
    .catch((error) => {
      console.log(error);
      toggleModal();
      window.addEventListener("click", windowOnClick);
    });
};

document.addEventListener("DOMContentLoaded", fetchData(defaultIp));
