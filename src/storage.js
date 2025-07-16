// storage.js - Speichern und Laden des Spielstands
export class Storage {
    constructor(resources, ui) {
        this.resources = resources;
        this.ui = ui;
    }

    saveGame() {
        const saveData = {
            resources: this.resources.resources,
            population: this.ui.population,
            timestamp: new Date().toLocaleString('de-DE')
        };
        localStorage.setItem('medievalEconomyGame', JSON.stringify(saveData));
        // Optional: UI-Feedback
        const lastSaveText = document.getElementById('last-save');
        if (lastSaveText) {
            lastSaveText.textContent = `Letzter Speicherpunkt: ${saveData.timestamp}`;
        }
    }

    loadGame() {
        const savedData = localStorage.getItem('medievalEconomyGame');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.resources) this.resources.resources = data.resources;
                if (data.population) this.ui.population = data.population;
                this.ui.updatePopulationUI();
                const lastSaveText = document.getElementById('last-save');
                if (lastSaveText && data.timestamp) {
                    lastSaveText.textContent = `Letzter Speicherpunkt: ${data.timestamp}`;
                }
            } catch (e) {
                // Fehler beim Laden des Spielstands
            }
        }
    }
} 