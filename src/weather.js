// Wetter-Typen und ihre SVG-Dateien
const weatherTypes = [
  { name: 'Sunny', file: 'Graphics/Weathers/Sunny.svg', season: 'Summer' },
  { name: 'Rainy', file: 'Graphics/Weathers/Rainy.svg', season: 'Spring' },
  { name: 'Cloudy', file: 'Graphics/Weathers/Cloudy.svg', season: 'Autumn' },
  { name: 'Thunder', file: 'Graphics/Weathers/Thunder.svg', season: 'Summer' },
  { name: 'Snowing', file: 'Graphics/Weathers/Snowing.svg', season: 'Winter' },
  { name: 'Windy', file: 'Graphics/Weathers/Windy.svg', season: 'Spring' },
  { name: 'Foggy', file: 'Graphics/Weathers/Foggy.svg', season: 'Autumn' },
  { name: 'Soft Rain', file: 'Graphics/Weathers/Soft Rain.svg', season: 'Spring' }
];

let currentFrameIndex = 0;
let weatherQueue = [];
let gameTime = 0; // Zeit in Minuten
let timeUpdateInterval = null;
let lastTimeUpdate = Date.now();
let localTimeOffset = 0;

// Deterministische Wetter-Queue pro Tag
function getDailySeed() {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

function seededRandom(seed) {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function formatGameTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function fillWeatherQueue() {
  const seed = getDailySeed();
  const rand = seededRandom(seed);
  weatherQueue = [];
  // Fülle Queue mit 20 Wettertypen für den Tag
  for (let i = 0; i < 20; i++) {
    const weather = weatherTypes[Math.floor(rand() * weatherTypes.length)];
    weatherQueue.push(weather);
  }
}

function createWeatherIcon(weather, isCurrent = false) {
  const img = document.createElement('img');
  img.src = weather.file;
  img.alt = weather.name;
  img.title = weather.name;
  img.className = 'weather-svg-icon';
  if (isCurrent) {
    img.style.width = '32px';
    img.style.height = '32px';
  } else {
    img.style.width = '20px';
    img.style.height = '20px';
  }
  return img;
}

function updateWeatherFrames() {
  const currentContainers = document.querySelectorAll('.weather-icon-current');
  const forecastContainers = document.querySelectorAll('.weather-icon-forecast');
  const seasonDisplays = document.querySelectorAll('.weather-season');

  if (currentContainers.length === 0 || forecastContainers.length === 0 || seasonDisplays.length === 0) {
    console.error('Wetter-Container nicht gefunden');
    return;
  }

  // Show current weather
  const currentWeather = weatherQueue[currentFrameIndex];
  if (currentWeather) {
    // Alle aktuellen Wetter-Container aktualisieren
    currentContainers.forEach(currentContainer => {
      currentContainer.innerHTML = '';
      currentContainer.appendChild(createWeatherIcon(currentWeather, true));
    });
    // Alle Forecast-Container aktualisieren
    forecastContainers.forEach(forecastContainer => {
      forecastContainer.innerHTML = '';
      for (let i = 1; i <= 4; i++) {
        const nextIndex = (currentFrameIndex + i) % weatherQueue.length;
        if (weatherQueue[nextIndex]) {
          forecastContainer.appendChild(createWeatherIcon(weatherQueue[nextIndex], false));
        }
      }
    });
    // Alle Season-Anzeigen aktualisieren
    seasonDisplays.forEach(seasonDisplay => {
      seasonDisplay.textContent = currentWeather.season;
    });
  }
}

// Lokale Zeit-Update-Funktion
function updateLocalTime() {
  const now = Date.now();
  const elapsed = (now - lastTimeUpdate) / 1000; // Sekunden seit letztem Update
  gameTime = (gameTime + elapsed) % 1440; // Update lokale Zeit
  lastTimeUpdate = now;

  // Aktualisiere alle Zeitanzeigen
  const timeDisplays = document.querySelectorAll('.weather-time');
  timeDisplays.forEach(timeDisplay => {
    timeDisplay.textContent = formatGameTime(Math.floor(gameTime));
  });
}

// Server-Zeit abrufen und lokale Zeit synchronisieren (optional)
async function syncWithServerTime() {
  try {
    const response = await fetch('/time');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.gameTime !== undefined) {
      // Setze die lokale Zeit und den Offset
      gameTime = data.gameTime;
      lastTimeUpdate = Date.now();
      console.log('Zeit mit Server synchronisiert:', formatGameTime(gameTime));
    } else {
      console.error('Ungültige Serverantwort:', data);
    }
  } catch (error) {
    console.log('Server nicht verfügbar, verwende lokale Zeit');
    // Bei Fehlern weiterlaufen mit lokaler Zeit
  }
}

function advanceWeather() {
  currentFrameIndex = (currentFrameIndex + 1) % weatherQueue.length;
  updateWeatherFrames();
}

// Initialisierung
function initWeather() {
  // Cleanup vorheriger Intervalle
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval);
  }
  
  // Initialisiere Wetter-Queue
  fillWeatherQueue();
  
  // Setze initiale Zeit (lokale Zeit als Fallback)
  const now = new Date();
  gameTime = (now.getHours() * 60 + now.getMinutes()) % 1440;
  lastTimeUpdate = Date.now();
  
  // Initialisiere Wetter-Anzeige
  updateWeatherFrames();
  updateLocalTime();
  
  // Versuche Server-Synchronisation (optional)
  syncWithServerTime().catch(() => {
    console.log('Verwende lokale Zeit');
  });
  
  // Lokales Zeit-Update alle 100ms für flüssige Anzeige
  timeUpdateInterval = setInterval(updateLocalTime, 100);
  
  // Server-Synchronisation alle 30 Sekunden (optional)
  setInterval(() => {
    syncWithServerTime().catch(() => {
      // Ignoriere Fehler, verwende lokale Zeit
    });
  }, 30000);
  
  // Wetter ändert sich alle 30 Sekunden
  setInterval(advanceWeather, 30000);
}

// Export für andere Module
window.weatherModule = {
  initWeather,
  updateWeatherFrames,
  advanceWeather
}; 