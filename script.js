const API_KEY = '030b6e37949e901ebfd2076bfcac02f0';

document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const city = document.getElementById('locationInput').value.trim();
  if (!city) return;
  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    updateWeatherUI(data);
  } catch (error) {
    showError('Could not retrieve weather data.');
    console.error(error);
  }
}

function updateWeatherUI(data) {
  const celsius = Math.round(data.main.temp);
  const fahrenheit = Math.round((celsius * 9) / 5 + 32);
  const feelsC = Math.round(data.main.feels_like);
  const feelsF = Math.round((feelsC * 9) / 5 + 32);

  document.getElementById('locationName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('countryFlag').src = `https://flagcdn.com/48x36/${data.sys.country.toLowerCase()}.png`;
  document.getElementById('dateTime').textContent = new Date().toLocaleString();
  document.getElementById('temperature').textContent = `${celsius}°C / ${fahrenheit}°F`;
  document.getElementById('feelsLike').textContent = `Feels like: ${feelsC}°C / ${feelsF}°F`;
  document.getElementById('weatherCondition').textContent = data.weather[0].main;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('windSpeed').textContent = `${data.wind.speed} km/h`;
  document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

  const weatherMain = data.weather[0].main;
  const animations = {
    Clear: "https://assets1.lottiefiles.com/packages/lf20_dyccpg6f.json",
    Clouds: "https://assets2.lottiefiles.com/packages/lf20_HpFqiS.json",
    Rain: "https://assets9.lottiefiles.com/packages/lf20_pqnfmone.json",
    Snow: "https://assets10.lottiefiles.com/packages/lf20_kq5rGs.json",
    Thunderstorm: "https://assets6.lottiefiles.com/packages/lf20_tljjah.json",
    Drizzle: "https://assets4.lottiefiles.com/private_files/lf30_y3m1rkjc.json",
    Mist: "https://assets2.lottiefiles.com/packages/lf20_Stdaec.json"
  };

  const animationURL = animations[weatherMain] || animations["Clear"];
  document.getElementById('weatherAnimation').load(animationURL);
}

function showError(msg) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `<p style="color:red; font-weight:bold;">${msg}</p>`;
}

window.addEventListener('DOMContentLoaded', () => {
  fetchWeather('Dhaka');
});

