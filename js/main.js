const apiKey = "b108b29c59782202c55af454c861a3b6";

const placeLocation = document.getElementById('location');

const weatherIcon = document.getElementById('weatherIcon');
const weatherName = document.getElementById('weatherName');
const weather = document.getElementById('weather');

const dataWind = document.getElementById('dataWind');
const dataHumidity = document.getElementById('dataHumidity');

const cityInput = document.getElementById('cityInput');
const searchCity = document.getElementById('searchCity');

const date = document.getElementById('date')
const today = new Date;
date.innerText = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

// DEFAULT VALUES

window.onload = () => {
    // PRE LOADER
    const layer = document.getElementById('layer')
    const body = document.querySelector('body')

    setTimeout(() => {
        body.style.overflowY = "visible"
        layer.style.opacity = '0';

        if (layer.style.opacity == 0) {
            setTimeout(() => {
                layer.style.display = "none";
            }, 500)
        }
    }, 1500)

    // DEFAULT VALUES

    let city = "Santos";
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            return response.json()
        })
        .then(body => {
            obj = body
            getDataCity();
            return obj
        })
}

// DYNAMIC 

function getCity() {
    let city = cityInput.value;
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            return response.json()
        })
        .then(body => {
            obj = body
            getDataCity();
            return obj
        })
}

function getDataCity() {
    let cityData = obj;
    let longitude = cityData[0].lon;
    let latitude = cityData[0].lat;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

    fetch(apiUrl)
        .then(response => {
            return response.json()
        })
        .then(body => {
            obj = body
            showDataCity();
            return obj
        })
}

function showDataCity() {
    let selectedCity = obj;

    let cityName = selectedCity.name;
    let countryName = selectedCity.sys.country;
    let temperature = Math.round(selectedCity.main.temp - 273) + "º";
    let wind = selectedCity.wind.speed + " km/h";
    let humidity = selectedCity.main.humidity + "%";
    let icon = selectedCity.weather[0].icon
    let name = selectedCity.weather[0].description

    placeLocation.innerText = cityName + " | " + countryName;
    weather.innerText = temperature;
    dataWind.innerText = wind;
    dataHumidity.innerText = humidity;

    weatherIcon.src = `./images/${icon}.png`;
    weatherName.innerText = name;
}

searchCity.addEventListener('click', getCity);
cityInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        getCity()
    }
})