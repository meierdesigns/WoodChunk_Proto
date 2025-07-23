const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 1337;

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
  console.warn('Warning: Could not load initial game time:', error.message);
}

// Berechne aktuelle Spielzeit
function getCurrentGameTime() {
  const realTimeElapsed = (Date.now() - gameStartTime) / 1000; // Sekunden seit Start
  const totalGameMinutes = savedGameTime + realTimeElapsed * 60; // 1 Sekunde = 1 Stunde (60 Minuten)
  return Math.floor(totalGameMinutes % 1440); // 1440 = Minuten pro Tag
}

// Aktuelle Spielzeit abrufen
app.get('/time', (req, res) => {
  try {
    const currentGameTime = getCurrentGameTime();
    res.json({ gameTime: currentGameTime });
  } catch (error) {
    console.error('Error getting current time:', error);
    res.status(500).json({ success: false, message: 'Error getting time', error: error.message });
  }
});

// Spielstand speichern
app.post('/save', (req, res) => {
  try {
    const saveData = req.body;
    saveData.timestamp = new Date().toISOString();
    saveData.gameTime = getCurrentGameTime(); // Speichere aktuelle Spielzeit
    
    // Validate save data
    if (typeof saveData.holz !== 'number' || typeof saveData.gold !== 'number') {
      throw new Error('Invalid save data: holz and gold must be numbers');
    }
    
    fs.writeFileSync(SAVE_FILE, JSON.stringify(saveData, null, 2));
    res.json({ success: true, message: 'Spielstand gespeichert' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Speichern', error: error.message });
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
    console.error('Load error:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Laden', error: error.message });
  }
});

// Standard-Route für die Hauptseite
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Error loading game');
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🎮 WoodChunk_Proto game server running on port ${PORT}`);
  console.log(`🌐 Access the game at: http://localhost:${PORT}`);
}); 