/*document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    const apiKey = '806ea9d63ea8349e2ff35089b9f6e35c';
    const apiUrl = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            const windDirection = getWindDirection(data.wind.deg);
            const windSpeedKmh = data.wind.speed * 3.6;

            const timezoneOffsetSeconds = data.timezone;
            const currentTimeUTC = new Date();
            const localTime = new Date(currentTimeUTC.getTime() + timezoneOffsetSeconds * 1000);
            const formattedDate = localTime.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            const formattedTime = localTime.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });

            function getWindDirection(degrees) {
                const directions = ['Norte', 'Nordeste', 'Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste'];
                const index = Math.round((degrees % 360) / 45) % 8;
                return directions[index];
            }

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            weatherInfo.innerHTML = `
                <h2>${data.name}/${data.sys.country}</h2>
                <p>Temperatura: ${data.main.temp} °C</p>
                <p>Sensação Térmica ${data.main.feels_like} °C</p>
                <p>Vento: ${windSpeedKmh.toFixed(2)} km/h, ${windDirection}</p>
                <p>Clima: ${capitalizeFirstLetter(data.weather[0].description)}</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Ícone do tempo">
                <p>${formattedDate} - ${formattedTime}</p>
            `;
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = <p>${error.message}</p>;
        });
});*/





async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${txtCity.value}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        if (data.cod === 200) {
            displayWeather(data);
            document.getElementById('lbl-error').style.display = 'none';
        } else {
            showError('Cidade não encontrada');
        }
    } catch (error) {
        showError('Erro ao buscar dados da API');
    }
}

function displayWeather(data) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <hr/>
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Ícone do clima">
        <p>Temperatura: ${Math.trunc(data.main.temp)} °C</p>
        <p>Sensação térmica: ${Math.trunc(data.main.feels_like)} °C</p>
        <p>Clima: ${data.weather[0].description}</p>
        <p>Precipitação: ${data.main.humidity} mm</p>
    `;
}

function showError(message) {
    lblError.style.display = 'block';
    lblError.textContent = message;
}


const apiKey = '0ae54ee46d1a72f5bfadd9c7b47a8d63';
const txtCity = document.getElementById('txt-city');
const lblError = document.getElementById('lbl-error');

btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click', fetchWeather);
