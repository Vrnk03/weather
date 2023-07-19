"use strict"


$(document).ready(function() {
    let apiKey = 'b6aec78147fec71ad825d5b7ddbe63c6'; 

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        method: 'GET',
        data: {
            q: 'Gomel',
            units: 'metric',
            appid: apiKey
        },
        success: function(response) {
            displayCurrentWeather(response);
        },
        error: function(xhr, status, error) {
            console.log('Ошибка при получении текущей погоды:', error);
        }
    });

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        method: 'GET',
        data: {
            q: 'Gomel',
            units: 'metric',
            appid: apiKey
        },
        success: function(response) {
            displayForecast(response);
        },
        error: function(xhr, status, error) {
            console.log('Ошибка при получении прогноза погоды:', error);
        }
    });

    function displayCurrentWeather(data) {
        let cap = $('#cap');
        let weather = $('#weather');
        let tmprtr= $('#temperature');
        let addInfo = $('#addInfo');

        cap.empty();
        weather.empty();
        tmprtr.empty();
        addInfo.empty();

        let city = data.name;
        let country = data.sys.country;
        let lastUpdate = new Date(data.dt * 1000).toLocaleString();
        let temperature = data.main.temp;
        let iconCode = data.weather[0].icon;
        let iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
        let description = data.weather[0].description;
        let windSpeed = data.wind.speed;
        let precipitation = data.rain ? data.rain['1h'] : 0;
        let pressure = data.main.pressure;

        let capHTML = '<h2>' + city + ', ' + country + '</h2>' + '<p>'+ lastUpdate + '</p>';
        let weatherHtml = '<img src="' + iconUrl + '" alt="WeatherIcon">' +
        '<p>' + description + '</p>';
        let tmprtrHTML = '<h2>' + Math.round(temperature) + ' °C</h2>';
        let addInfoHTML = '<p>Wind: ' + windSpeed + ' km/h</p>' + '<p>Precip: ' + precipitation + ' mm</p>' +'<p>Pressure: ' + pressure + ' mb</p>';

        cap.html(capHTML);
        weather.html(weatherHtml);
        tmprtr.html(tmprtrHTML);
        addInfo.html(addInfoHTML);
    }

    function displayForecast(data) {
        let forecast = $('#forecast');

        for (let i = 0; i < data.list.length; i += 8) 
        {
            let dayData = data.list[i];
            let date = new Date(dayData.dt * 1000);
            let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            let temperature = dayData.main.temp;
            let iconCode = dayData.weather[0].icon;
            let iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';

            forecast.append('<div class="infoForecast">' + '<h3>' + dayOfWeek + '</h3>' +
                '<p>' + date.toLocaleDateString() + '</p>' +
                '<img src="' + iconUrl + '" alt="Weather Icon">' +
                '<h3>' + Math.round(temperature) + '°C</h3>' + '</div>');
        }

        
    }
});
