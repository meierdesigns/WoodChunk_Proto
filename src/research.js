// Forschungsoptionen
const researchOptions = [
    {
        id: 'better_tools',
        name: 'Bessere Werkzeuge',
        description: 'Verbessert die Effizienz beim Holzfällen',
        cost: { wood: 100, gold: 50 },
        requirements: [],
        effects: {
            wood_multiplier: 1.5
        },
        progress: 0,
        completed: false
    },
    {
        id: 'advanced_forestry',
        name: 'Fortgeschrittene Forstwirtschaft',
        description: 'Erhöht die Regenerationsrate der Bäume',
        cost: { wood: 200, gold: 100 },
        requirements: ['better_tools'],
        effects: {
            tree_growth_rate: 1.5
        },
        progress: 0,
        completed: false
    },
    {
        id: 'efficient_sawmill',
        name: 'Effiziente Sägemühle',
        description: 'Produziert mehr Holz pro Baum',
        cost: { wood: 300, gold: 150 },
        requirements: ['better_tools'],
        effects: {
            wood_per_tree: 2
        },
        progress: 0,
        completed: false
    }
];

class ResearchSystem {
    constructor() {
        this.research = [...researchOptions];
        this.loadResearch();
    }

    // Forschung aus dem Local Storage laden
    loadResearch() {
        const savedResearch = localStorage.getItem('research');
        if (savedResearch) {
            const parsed = JSON.parse(savedResearch);
            this.research = this.research.map(r => ({
                ...r,
                progress: parsed[r.id]?.progress || 0,
                completed: parsed[r.id]?.completed || false
            }));
        }
    }

    // Forschung im Local Storage speichern
    saveResearch() {
        const saveData = {};
        this.research.forEach(r => {
            saveData[r.id] = {
                progress: r.progress,
                completed: r.completed
            };
        });
        localStorage.setItem('research', JSON.stringify(saveData));
    }

    // Prüfen ob eine Forschung verfügbar ist
    isResearchAvailable(research) {
        return research.requirements.every(reqId => 
            this.research.find(r => r.id === reqId)?.completed
        );
    }

    // Forschung starten oder fortsetzen
    startResearch(researchId) {
        const research = this.research.find(r => r.id === researchId);
        if (!research || research.completed) return false;

        // Prüfen ob Anforderungen erfüllt sind
        if (!this.isResearchAvailable(research)) return false;

        // Prüfen ob genügend Ressourcen vorhanden sind
        if (!this.hasEnoughResources(research.cost)) return false;

        // Ressourcen abziehen
        this.deductResources(research.cost);

        // Fortschritt erhöhen
        research.progress += 10;
        if (research.progress >= 100) {
            research.completed = true;
            research.progress = 100;
            this.applyResearchEffects(research);
        }

        this.saveResearch();
        this.updateUI();
        return true;
    }

    // Prüfen ob genügend Ressourcen vorhanden sind
    hasEnoughResources(cost) {
        // Diese Funktion muss an dein Ressourcensystem angepasst werden
        return true; // Vorläufig immer true
    }

    // Ressourcen abziehen
    deductResources(cost) {
        // Diese Funktion muss an dein Ressourcensystem angepasst werden
    }

    // Forschungseffekte anwenden
    applyResearchEffects(research) {
        // Diese Funktion muss an dein Spielsystem angepasst werden
        console.log(`Forschung abgeschlossen: ${research.name}`);
        console.log('Effekte:', research.effects);
    }

    // UI aktualisieren
    updateUI() {
        const container = document.querySelector('.research-grid');
        if (!container) return;

        container.innerHTML = '';
        this.research.forEach(research => {
            const available = this.isResearchAvailable(research);
            const element = this.createResearchElement(research, available);
            container.appendChild(element);
        });
    }

    // Forschungselement erstellen
    createResearchElement(research, available) {
        const element = document.createElement('div');
        element.className = 'research-item';
        if (!available) element.style.opacity = '0.5';

        element.innerHTML = `
            <h3>${research.name}</h3>
            <p>${research.description}</p>
            <div class="cost">
                ${Object.entries(research.cost).map(([resource, amount]) => 
                    `${resource}: ${amount}`
                ).join(', ')}
            </div>
            <div class="progress">
                <div class="progress-bar" style="width: ${research.progress}%"></div>
            </div>
        `;

        if (!research.completed && available) {
            element.onclick = () => this.startResearch(research.id);
            element.style.cursor = 'pointer';
        }

        return element;
    }
}

// Globale Instanz des Forschungssystems
const researchSystem = new ResearchSystem();

// Modal Funktionen
function openResearchModal() {
    const modal = document.getElementById('researchModal');
    modal.style.display = 'block';
    researchSystem.updateUI();
}

function closeResearchModal() {
    const modal = document.getElementById('researchModal');
    modal.style.display = 'none';
}

// Schließen des Modals wenn außerhalb geklickt wird
window.onclick = function(event) {
    const modal = document.getElementById('researchModal');
    if (event.target === modal) {
        closeResearchModal();
    }
}; 