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
let lastHour = null;
let dayCounter = 1;
let seasonCounter = 0; // 0: Frühling, 1: Sommer, 2: Herbst, 3: Winter

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
  const hours = Math.floor(minutes / 60) % 24;
  return `${hours} Uhr`;
}

function fillWeatherQueue() {
  // Bestimme aktuelle Jahreszeit
  const totalMinutes = Math.floor(gameTime);
  const daysSinceStart = Math.floor(totalMinutes / 1440);
  const seasonIndex = Math.floor(daysSinceStart / 30) % 4;
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const currentSeason = seasons[seasonIndex];

  // Wettertypen nach Jahreszeit filtern und gewichten
  let seasonWeather = [];
  if (currentSeason === 'Spring') {
    // Frühling: viel Soft Rain, Rainy, etwas Sunny, wenig Thunder, kein Snowing
    seasonWeather = [
      ...Array(6).fill('Soft Rain'),
      ...Array(4).fill('Rainy'),
      ...Array(3).fill('Cloudy'),
      ...Array(2).fill('Sunny'),
      ...Array(1).fill('Thunder'),
      ...Array(1).fill('Windy')
    ];
  } else if (currentSeason === 'Summer') {
    // Sommer: viel Sunny, etwas Thunder, wenig Rainy, kein Snowing
    seasonWeather = [
      ...Array(8).fill('Sunny'),
      ...Array(2).fill('Thunder'),
      ...Array(2).fill('Rainy'),
      ...Array(2).fill('Cloudy'),
      ...Array(1).fill('Windy')
    ];
  } else if (currentSeason === 'Autumn') {
    // Herbst: viel Windy und Foggy, etwas Rainy, wenig Sunny, kein Snowing
    seasonWeather = [
      ...Array(5).fill('Windy'),
      ...Array(5).fill('Foggy'),
      ...Array(3).fill('Rainy'),
      ...Array(2).fill('Cloudy'),
      ...Array(1).fill('Sunny')
    ];
  } else if (currentSeason === 'Winter') {
    // Winter: viel Snowing, etwas Cloudy, wenig Sunny, kein Rainy, kein Thunder
    seasonWeather = [
      ...Array(8).fill('Snowing'),
      ...Array(3).fill('Cloudy'),
      ...Array(2).fill('Sunny'),
      ...Array(1).fill('Foggy')
    ];
  }

  // Mappe Namen auf weatherTypes
  const weatherTypeMap = Object.fromEntries(weatherTypes.map(w => [w.name, w]));
  const seed = getDailySeed();
  const rand = seededRandom(seed);
  weatherQueue = [];
  for (let i = 0; i < 20; i++) {
    const name = seasonWeather[Math.floor(rand() * seasonWeather.length)];
    weatherQueue.push(weatherTypeMap[name]);
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
      // Reihenfolge der Jahreszeiten
      const seasons = ['Frühling', 'Sommer', 'Herbst', 'Winter'];
      seasonDisplay.textContent = `Tag ${dayCounter} ${seasons[seasonCounter]}`;
    });
  }
}

// Lokale Zeit-Update-Funktion
function updateLocalTime() {
  const now = Date.now();
  const elapsed = (now - lastTimeUpdate) / 1000; // Sekunden seit letztem Update
  gameTime = (gameTime + elapsed * 60) % 1440; // 1 Sekunde = 1 Stunde (60 Minuten)
  lastTimeUpdate = now;

  // Berechne Tag und Jahreszeit basierend auf der verstrichenen Zeit
  const totalMinutes = Math.floor(gameTime);
  const daysSinceStart = Math.floor(totalMinutes / 1440);
  const newDayCounter = (daysSinceStart % 30) + 1;
  const newSeasonCounter = Math.floor(daysSinceStart / 30) % 4;
  
  // Aktualisiere Tag und Jahreszeit wenn sich geändert
  if (newDayCounter !== dayCounter || newSeasonCounter !== seasonCounter) {
    dayCounter = newDayCounter;
    seasonCounter = newSeasonCounter;
  }

  // Wetterwechsel bei Tageswechsel (0 Uhr)
  const currentHour = Math.floor(gameTime / 60) % 24;
  if (lastHour !== null && currentHour === 0 && lastHour !== 0) {
    advanceWeather();
  }
  lastHour = currentHour;

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
    } else {
      // Ungültige Serverantwort
    }
  } catch (error) {
    // Server nicht verfügbar, verwende lokale Zeit
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
  
  // Entferne Initialisierung von dayCounter und seasonCounter
  // const totalMinutes = Math.floor(gameTime);
  // const daysSinceStart = Math.floor(totalMinutes / 1440);
  // dayCounter = (daysSinceStart % 30) + 1;
  // seasonCounter = Math.floor(daysSinceStart / 30) % 4;
  
  // Initialisiere Wetter-Anzeige
  updateWeatherFrames();
  updateLocalTime();
  
  // Hole IMMER die Serverzeit (kein Fallback auf lokale Zeit)
  syncWithServerTime().then(() => {
    // Nach Synchronisation ggf. Anzeige aktualisieren
    updateWeatherFrames();
    updateLocalTime();
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
}

// Export für andere Module
window.weatherModule = {
  initWeather,
  updateWeatherFrames,
  advanceWeather
}; 