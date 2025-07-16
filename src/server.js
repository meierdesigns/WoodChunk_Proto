const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware für JSON-Parsing
app.use(express.json());

// CORS Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Statische Dateien servieren
app.use(express.static(path.join(__dirname, '..')));
app.use('/src', express.static(path.join(__dirname)));

// Speicherdatei-Pfad
const SAVE_FILE = path.join(__dirname, '..', 'savegame.json');

// Globale Spielzeit-Variablen
let gameStartTime = Date.now();
let savedGameTime = 0; // Gespeicherte Spielzeit in Minuten

// Lade initiale Spielzeit
try {
  if (fs.existsSync(SAVE_FILE)) {
    const saveData = JSON.parse(fs.readFileSync(SAVE_FILE, 'utf8'));
    if (saveData.gameTime !== undefined) {
      savedGameTime = saveData.gameTime;
      gameStartTime = Date.now();
    }
  }
} catch (error) {
  // Fehler beim Laden der initialen Spielzeit
}

// Berechne aktuelle Spielzeit
function getCurrentGameTime() {
  const realTimeElapsed = (Date.now() - gameStartTime) / 1000; // Sekunden seit Start
  const totalGameMinutes = savedGameTime + realTimeElapsed * 60; // 1 Sekunde = 1 Stunde (60 Minuten)
  return Math.floor(totalGameMinutes % 1440); // 1440 = Minuten pro Tag
}

// Aktuelle Spielzeit abrufen
app.get('/time', (req, res) => {
  const currentGameTime = getCurrentGameTime();
  res.json({ gameTime: currentGameTime });
});

// Spielstand speichern
app.post('/save', (req, res) => {
  try {
    const saveData = req.body;
    saveData.timestamp = new Date().toISOString();
    saveData.gameTime = getCurrentGameTime(); // Speichere aktuelle Spielzeit
    fs.writeFileSync(SAVE_FILE, JSON.stringify(saveData, null, 2));
    res.json({ success: true, message: 'Spielstand gespeichert' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fehler beim Speichern' });
  }
});

// Spielstand laden
app.get('/load', (req, res) => {
  try {
    if (fs.existsSync(SAVE_FILE)) {
      const saveData = JSON.parse(fs.readFileSync(SAVE_FILE, 'utf8'));
      // Aktualisiere die Spielzeit
      saveData.gameTime = getCurrentGameTime();
      res.json(saveData);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fehler beim Laden' });
  }
});

// Standard-Route für die Hauptseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  // Server gestartet
}); 