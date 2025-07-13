# 🏰 Mittelalter Wirtschaftssimulation

Ein Browser-basiertes Wirtschaftssimulationsspiel im Amiga-Pixelstil, das vollständig lokal im Browser läuft.

## 🎮 Spielbeschreibung

Das Spiel simuliert eine mittelalterliche Wirtschaft, in der ein automatisierter KI-Cursor Ressourcen sammelt. Der Spieler kann zusehen, wie der KI-Cursor automatisch zu Wäldern und Steinbrüchen navigiert und Ressourcen abbaut.

## ✨ Features

- **Vollständig lokal**: Läuft ohne Server oder externe Abhängigkeiten
- **Amiga-Pixelstil**: Retro-Design mit pixelartiger Grafik
- **Automatisierte KI**: Cursor erkennt und sammelt Ressourcen automatisch
- **Ressourcen-Management**: Holz und Stein werden gesammelt und angezeigt
- **Automatisches Speichern**: Spielstand wird alle 10 Sekunden gespeichert
- **Responsive Design**: Funktioniert auf Desktop und Mobile

## 🎯 Spielmechanik

### Ressourcen
- **🪵 Holz**: Wird von Bäumen gesammelt (1-3 Einheiten pro Baum)
- **🪨 Stein**: Wird von Steinbrüchen gesammelt (1-2 Einheiten pro Stein)

### KI-Cursor
- Bewegt sich automatisch zur nächsten verfügbaren Ressource
- Sammelt Ressourcen über 2 Sekunden
- Visueller roter Cursor mit Pulsier-Animation

### Speichersystem
- Automatisches Speichern alle 10 Sekunden
- Speicherung über localStorage
- Spielstand wird beim Laden wiederhergestellt

## 🚀 Installation und Start

1. **Dateien herunterladen**:
   - `index.html`
   - `style.css`
   - `script.js`

2. **Spiel starten**:
   - Öffnen Sie `index.html` in einem modernen Browser
   - Das Spiel startet automatisch

3. **Keine Installation erforderlich**:
   - Funktioniert offline
   - Keine Server-Konfiguration nötig

## 🎛️ Steuerung

- **KI pausieren/starten**: Button zum Ein-/Ausschalten der KI
- **Spiel zurücksetzen**: Setzt alle Fortschritte zurück
- **Automatisches Speichern**: Alle 10 Sekunden

## 🎨 Technische Details

### Verwendete Technologien
- **HTML5 Canvas**: Für die Spielgrafik
- **CSS3**: Für das Amiga-Pixelstil Design
- **Vanilla JavaScript**: Für die Spiellogik
- **localStorage**: Für das Speichersystem

### Browser-Kompatibilität
- Chrome/Chromium (empfohlen)
- Firefox
- Safari
- Edge

## 📁 Dateistruktur

```
medieval-economy-game/
├── index.html      # Haupt-HTML-Datei
├── style.css       # CSS-Styling (Amiga-Pixelstil)
├── script.js       # JavaScript-Spiellogik
└── README.md       # Diese Datei
```

## 🔧 Anpassungen

### Ressourcen hinzufügen
In `script.js` können Sie weitere Ressourcen hinzufügen:

```javascript
this.resources.push({
    type: 'wood', // oder 'stone'
    x: 100,       // X-Position
    y: 200,       // Y-Position
    size: 40,     // Größe
    color: '#228B22', // Farbe
    collected: false
});
```

### KI-Geschwindigkeit ändern
```javascript
this.aiCursor.speed = 3; // Höhere Zahl = schneller
```

### Sammelzeit anpassen
```javascript
this.aiCursor.collectionDuration = 3000; // 3 Sekunden
```

## 🐛 Bekannte Probleme

- Auf sehr kleinen Bildschirmen kann das Canvas abgeschnitten werden
- Ältere Browser unterstützen möglicherweise nicht alle CSS-Features

## 📝 Lizenz

Dieses Projekt ist Open Source und kann frei verwendet werden.

## 🤝 Beitragen

Verbesserungsvorschläge und Bug-Reports sind willkommen!

---

**Viel Spaß beim Spielen! 🎮** 