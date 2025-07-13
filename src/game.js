// game.js - Hauptspielmodul
import { Resources } from './resources.js';
import { UI } from './ui.js';
import { Storage } from './storage.js';

// Hauptspielklasse
class MedievalEconomyGame {
    constructor() {
        // Canvas und Kontext
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Module initialisieren
        this.resources = new Resources(this.ctx, this.canvas);
        this.ui = new UI(this.resources);
        this.storage = new Storage(this.resources, this.ui);

        this.selectedBuildSlot = null;
        // Event-Listener
        this.ui.setupEventListeners();
        document.getElementById('reset-game').addEventListener('click', () => this.resetGame());
        // Bauplatz-Klick-Logik
        this.canvas.addEventListener('click', (e) => this.handleBuildSlotClick(e));
        // Buttons initial deaktivieren
        this.setBuildButtonsEnabled(false);

        // Spiel laden
        this.storage.loadGame();

        // Game-Loop starten
        this.startGame();
        setInterval(() => this.storage.saveGame(), 10000);
    }

    startGame() {
        this.gameLoop();
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.ui.update();
    }

    render() {
        this.resources.render();
        this.ui.render();
    }

    resetGame() {
        // Ressourcen neu initialisieren
        this.resources.resources = [
            { type: 'wood', x: 150, y: 200, size: 40, collected: false },
            { type: 'wood', x: 300, y: 150, size: 35, collected: false },
            { type: 'wood', x: 500, y: 300, size: 45, collected: false },
            { type: 'stone', x: 400, y: 100, size: 30, collected: false },
            { type: 'stone', x: 200, y: 400, size: 35, collected: false },
            { type: 'stone', x: 600, y: 200, size: 40, collected: false }
        ];
        // Einwohner neu initialisieren
        this.ui.initPopulation();
        this.ui.updatePopulationUI();
        // Ressourcen-Zähler zurücksetzen
        this.ui.resetResources();
        // Gebäude (optional) zurücksetzen
        if (this.resources.buildings) this.resources.buildings = [];
        // Speicher löschen
        localStorage.removeItem('medievalEconomyGame');
        // UI-Feedback
        const lastSaveText = document.getElementById('last-save');
        if (lastSaveText) lastSaveText.textContent = 'Letzter Speicherpunkt: Nie';
    }

    setBuildButtonsEnabled(enabled) {
        document.querySelectorAll('.build-btn').forEach(btn => btn.disabled = !enabled);
    }

    handleBuildSlotClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const slotIdx = this.resources.getClickedBuildSlot(clickX, clickY);
        if (slotIdx !== null) {
            this.selectedBuildSlot = slotIdx;
            this.setBuildButtonsEnabled(true);
        } else {
            this.selectedBuildSlot = null;
            this.setBuildButtonsEnabled(false);
        }
    }
}

// Starte das Spiel, wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MedievalEconomyGame();
}); 