// Forschungsoptionen
const researchOptions = [
    {
        id: 'Werkzeug',
        name: 'Werkzeug',
        description: 'Verbessert die Effizienz beim Holzfällen',
        cost: { wood: 100, gold: 50 },
        requirements: [],
        effects: { wood_multiplier: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'Tisch',
        name: 'Tisch',
        description: 'Ermöglicht den Bau von Tischen',
        cost: { wood: 120, gold: 60 },
        requirements: ['Werkzeug'],
        effects: { can_build_table: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Schrank',
        name: 'Schrank',
        description: 'Ermöglicht den Bau von Schränken',
        cost: { wood: 200, gold: 100 },
        requirements: ['Werkzeug'],
        effects: { can_build_cabinet: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Axt',
        name: 'Axt',
        description: 'Holzfäller arbeiten schneller',
        cost: { wood: 80, gold: 30 },
        requirements: ['Werkzeug'],
        effects: { chop_speed: 1.2 },
        progress: 0,
        completed: false
    },
    {
        id: 'Forst',
        name: 'Forst',
        description: 'Erhöht die Regenerationsrate der Bäume',
        cost: { wood: 200, gold: 100 },
        requirements: [],
        effects: { tree_growth_rate: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'Säge',
        name: 'Säge',
        description: 'Produziert mehr Holz pro Baum',
        cost: { wood: 300, gold: 150 },
        requirements: [],
        effects: { wood_per_tree: 2 },
        progress: 0,
        completed: false
    },
    {
        id: 'Veredelung',
        name: 'Veredelung',
        description: 'Erhöht den Wert von Holz',
        cost: { wood: 400, gold: 200 },
        requirements: ['Säge'],
        effects: { wood_value: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'Management',
        name: 'Management',
        description: 'Optimiert die Nutzung des Waldes',
        cost: { wood: 250, gold: 120 },
        requirements: ['Forst'],
        effects: { forest_efficiency: 1.3 },
        progress: 0,
        completed: false
    },
    {
        id: 'Automatik',
        name: 'Automatik',
        description: 'Holzfällung läuft automatisch',
        cost: { wood: 600, gold: 300 },
        requirements: ['Werkzeug'],
        effects: { auto_chop: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Wetter',
        name: 'Wetter',
        description: 'Bessere Vorhersage für Ernte und Holzfällung',
        cost: { wood: 150, gold: 80 },
        requirements: ['Management'],
        effects: { weather_prediction: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Transport',
        name: 'Transport',
        description: 'Holz wird schneller gelagert',
        cost: { wood: 180, gold: 90 },
        requirements: ['Axt'],
        effects: { transport_speed: 1.5 },
        progress: 0,
        completed: false
    },
    // --- NEUE HOLZFÄLLER-SKILLS ---
    {
        id: 'Doppelaxt',
        name: 'Doppelaxt',
        description: 'Holzfäller können doppelt so schnell arbeiten',
        cost: { wood: 300, gold: 150 },
        requirements: ['Präzision'],
        effects: { chop_speed: 2.0 },
        progress: 0,
        completed: false
    },
    {
        id: 'Kettensäge',
        name: 'Kettensäge',
        description: 'Moderne Holzfällung mit Kettensäge',
        cost: { wood: 800, gold: 400 },
        requirements: ['Doppelaxt'],
        effects: { chop_speed: 3.0 },
        progress: 0,
        completed: false
    },
    {
        id: 'Verarbeitung',
        name: 'Verarbeitung',
        description: 'Bessere Verarbeitung von Holz zu wertvollen Produkten',
        cost: { wood: 500, gold: 250 },
        requirements: ['Transport'],
        effects: { wood_value: 2.0 },
        progress: 0,
        completed: false
    },
    {
        id: 'Automation',
        name: 'Automation',
        description: 'Vollautomatische Holzfällung und -verarbeitung',
        cost: { wood: 1200, gold: 600 },
        requirements: ['Kettensäge', 'Holzkonservierung'],
        effects: { auto_chop: true, wood_multiplier: 2.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'Präzision',
        name: 'Präzision',
        description: 'Holzfäller schneiden Holz präziser und effizienter',
        cost: { wood: 400, gold: 200 },
        requirements: ['Werkzeug'],
        effects: { wood_quality: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'Massenfällung',
        name: 'Massenfällung',
        description: 'Holzfäller können mehrere Bäume gleichzeitig fällen',
        cost: { wood: 600, gold: 300 },
        requirements: ['Automatik'],
        effects: { bulk_harvest: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Konservierung',
        name: 'Konservierung',
        description: 'Holz wird länger haltbar und wertvoller',
        cost: { wood: 350, gold: 175 },
        requirements: ['Massenfällung'],
        effects: { wood_durability: 2.0 },
        progress: 0,
        completed: false
    },
    {
        id: 'Vermessung',
        name: 'Vermessung',
        description: 'Bessere Erkennung von wertvollen Bäumen',
        cost: { wood: 200, gold: 100 },
        requirements: ['Forst'],
        effects: { tree_detection: 1.5 },
        progress: 0,
        completed: false
    },
    // --- NEUER ZWEIG: Möbel ---
    {
        id: 'Möbel',
        name: 'Möbel',
        description: 'Ermöglicht die Erforschung und den Bau verschiedener Möbelstücke.',
        cost: { wood: 100, gold: 50 },
        requirements: ['Säge'],
        effects: {},
        progress: 0,
        completed: false
    },
    // Einzelne Möbelstücke als Unterforschungen
    {
        id: 'Stuhl',
        name: 'Stuhl',
        description: 'Ermöglicht den Bau von Stühlen.',
        cost: { wood: 40, gold: 20 },
        requirements: [],
        effects: { can_build_chair: true },
        progress: 100,
        completed: true
    },
    {
        id: 'Tisch',
        name: 'Tisch',
        description: 'Ermöglicht den Bau von Tischen.',
        cost: { wood: 60, gold: 30 },
        requirements: ['Möbel'],
        effects: { can_build_table: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Schrank',
        name: 'Schrank',
        description: 'Ermöglicht den Bau von Schränken.',
        cost: { wood: 80, gold: 40 },
        requirements: ['Möbel'],
        effects: { can_build_wardrobe: true },
        progress: 100,
        completed: true
    },
    {
        id: 'Bett',
        name: 'Bett',
        description: 'Ermöglicht den Bau von Betten.',
        cost: { wood: 100, gold: 50 },
        requirements: ['Möbel','Tisch'],
        effects: { can_build_bed: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Regal',
        name: 'Regal',
        description: 'Ermöglicht den Bau von Regalen.',
        cost: { wood: 50, gold: 25 },
        requirements: ['Möbel','Tisch'],
        effects: { can_build_shelf: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Kommode',
        name: 'Kommode',
        description: 'Ermöglicht den Bau von Kommoden.',
        cost: { wood: 70, gold: 35 },
        requirements: ['Möbel','Schrank'],
        effects: { can_build_dresser: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Sofa',
        name: 'Sofa',
        description: 'Ermöglicht den Bau von Sofas.',
        cost: { wood: 120, gold: 60 },
        requirements: ['Möbel','Bett','Kommode'],
        effects: { can_build_sofa: true },
        progress: 0,
        completed: false
    },
    // ... weitere Möbelstücke nach Bedarf ...
];

// Suche im researchOptions-Array den Skill 'auto_chop' und entferne 'wood_refinement' aus requirements
researchOptions.forEach(r => {
    if (r.id === 'Automatik') {
        if (Array.isArray(r.requirements)) {
            r.requirements = r.requirements.filter(req => req !== 'Veredelung');
        }
    }
});

// Entferne für alle Möbelstücke die Voraussetzung 'Möbel' aus requirements
['Stuhl','Tisch','Schrank','Bett','Regal','Kommode','Sofa'].forEach(id => {
    const r = researchOptions.find(r => r.id === id);
    if (r && Array.isArray(r.requirements)) {
        r.requirements = r.requirements.filter(req => req !== 'Möbel');
    }
});

// --- Reset-Button für Forschung ---
if (typeof window !== 'undefined') {
    window.resetResearch = function() {
        localStorage.removeItem('research');
        location.reload();
    }
}

// Globale Ressourcen-Funktion für ResearchSystem
window.getCurrentResources = function() {
    console.log(`📊 DEBUG: getCurrentResources() aufgerufen`);
    
    // Versuche, die Werte direkt aus der Anzeige zu lesen
    const scoreDiv = document.querySelector('.score.status');
    if (scoreDiv) {
        // Format: 💰 208.9 Tsd. | 🪵 5.3 Tsd. | ...
        const text = scoreDiv.textContent;
        console.log(`📊 DEBUG: Score-Text gefunden: "${text}"`);
        
        const goldMatch = text.match(/💰\s*([\d.,]+)(?:\s*(Tsd\.|Mio\.|Mrd\.|))/);
        const woodMatch = text.match(/🪵\s*([\d.,]+)(?:\s*(Tsd\.|Mio\.|Mrd\.|))/);
        
        console.log(`📊 DEBUG: Gold-Match:`, goldMatch);
        console.log(`📊 DEBUG: Wood-Match:`, woodMatch);
        
        function parseNum(val, unit) {
            let n = parseFloat(val.replace(',', '.'));
            if (unit === 'Tsd.') return n * 1000;
            if (unit === 'Mio.') return n * 1000000;
            if (unit === 'Mrd.') return n * 1000000000;
            return n;
        }
        const gold = goldMatch ? parseNum(goldMatch[1], goldMatch[2]) : 0;
        const wood = woodMatch ? parseNum(woodMatch[1], woodMatch[2]) : 0;
        
        console.log(`📊 DEBUG: Geparste Ressourcen - Gold: ${gold}, Holz: ${wood}`);
        
        // Zusätzlich: Vergleiche mit globalen Variablen
        if (typeof window.gold !== 'undefined' && typeof window.holz !== 'undefined') {
            console.log(`📊 DEBUG: Globale Variablen - Gold: ${window.gold}, Holz: ${window.holz}`);
        }
        
        return { wood, gold };
    } else {
        console.log(`❌ DEBUG: Score-Div nicht gefunden!`);
        
        // Fallback: Verwende globale Variablen direkt
        if (typeof window.gold !== 'undefined' && typeof window.holz !== 'undefined') {
            console.log(`📊 DEBUG: Fallback auf globale Variablen - Gold: ${window.gold}, Holz: ${window.holz}`);
            return { wood: window.holz, gold: window.gold };
        }
    }
    
    console.log(`❌ DEBUG: Kann keine Ressourcen lesen, returniere 0/0`);
    return { wood: 0, gold: 0 };
};

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
            this.research = this.research.map(r => {
                if (parsed[r.id] !== undefined) {
                    return {
                        ...r,
                        progress: parsed[r.id].progress !== undefined ? parsed[r.id].progress : r.progress,
                        completed: parsed[r.id].completed !== undefined ? parsed[r.id].completed : r.completed
                    };
                }
                return r;
            });
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
        console.log(`🔍 DEBUG: Prüfe Verfügbarkeit für ${research.name} (${research.id})`);
        console.log(`🔍 DEBUG: Benötigte Forschungen:`, research.requirements);
        
        const result = research.requirements.every(reqId => {
            const requiredResearch = this.research.find(r => r.id === reqId);
            const isCompleted = requiredResearch?.completed;
            console.log(`🔍 DEBUG: Voraussetzung ${reqId}: ${isCompleted ? 'ERFÜLLT' : 'NICHT ERFÜLLT'}`);
            return isCompleted;
        });
        
        console.log(`🔍 DEBUG: Forschung ${research.name} verfügbar: ${result}`);
        return result;
    }

    // Forschung starten oder fortsetzen
    startResearch(researchId) {
        console.log(`🚀 DEBUG: Starte Forschung für ${researchId}`);
        
        const research = this.research.find(r => r.id === researchId);
        if (!research) {
            console.log(`❌ DEBUG: Forschung ${researchId} nicht gefunden`);
            return { success: false, error: 'Forschung nicht gefunden' };
        }
        
        if (research.completed) {
            console.log(`❌ DEBUG: Forschung ${research.name} bereits abgeschlossen`);
            return { success: false, error: 'Forschung bereits abgeschlossen' };
        }

        // Prüfen ob Anforderungen erfüllt sind
        const available = this.isResearchAvailable(research);
        if (!available) {
            console.log(`❌ DEBUG: Anforderungen für ${research.name} nicht erfüllt`);
            return { success: false, error: 'Voraussetzungen nicht erfüllt' };
        }

        // Prüfen ob genügend Ressourcen vorhanden sind
        const hasResources = this.hasEnoughResources(research.cost);
        if (!hasResources) {
            console.log(`❌ DEBUG: Nicht genügend Ressourcen für ${research.name}`);
            console.log('❌ DEBUG: Ressourcenprüfung:', {
                required: research.cost,
                current: window.getCurrentResources ? window.getCurrentResources() : 'unbekannt',
                window_gold: typeof window.gold !== 'undefined' ? window.gold : 'undefined',
                window_holz: typeof window.holz !== 'undefined' ? window.holz : 'undefined',
            });
            return { success: false, error: 'Nicht genügend Ressourcen' };
        }

        console.log(`✅ DEBUG: Alle Bedingungen erfüllt für ${research.name}, starte Forschung...`);

        // Ressourcen abziehen
        this.deductResources(research.cost);

        // Fortschritt sofort auf 100% setzen
        research.progress = 100;
        research.completed = true;
        this.applyResearchEffects(research);

        this.saveResearch();
        this.updateUI();
        if (window.updateScoreStatus) window.updateScoreStatus();
        
        // Skilltree-SVG immer sofort neu rendern
        if (typeof window.renderSkilltreeSVG === 'function') {
            console.log('🔄 DEBUG: Rufe renderSkilltreeSVG() auf...');
            const svgElement = document.getElementById('skilltree-svg');
            console.log('🔄 DEBUG: SVG-Element gefunden:', !!svgElement);
            if (svgElement) {
                console.log('🔄 DEBUG: SVG-Sichtbarkeit:', svgElement.style.display, svgElement.offsetParent);
            }
            window.renderSkilltreeSVG();
            console.log('🔄 DEBUG: renderSkilltreeSVG() abgeschlossen');
        } else {
            console.log('❌ DEBUG: renderSkilltreeSVG Funktion nicht gefunden!');
        }
        
        // Tab-Skilltrees auch sofort neu rendern
        if (typeof window.renderResearchTreeTab === 'function') {
            console.log('🔄 DEBUG: Rendere Tab-Skilltrees neu...');
            window.renderResearchTreeTab('lumberjack');
            window.renderResearchTreeTab('forester');
            window.renderResearchTreeTab('carpenter');
            console.log('🔄 DEBUG: Tab-Skilltrees neu gerendert');
        } else {
            console.log('❌ DEBUG: renderResearchTreeTab Funktion nicht gefunden!');
        }
        
        console.log(`🎉 DEBUG: Forschung ${research.name} erfolgreich abgeschlossen!`);
        return { success: true, research: research };
    }

    // Prüfen ob genügend Ressourcen vorhanden sind
    hasEnoughResources(cost) {
        const res = window.getCurrentResources();
        console.log(`💰 DEBUG: Aktuelle Ressourcen - Gold: ${res.gold}, Holz: ${res.wood}`);
        console.log(`💰 DEBUG: Benötigte Ressourcen - Gold: ${cost.gold || 0}, Holz: ${cost.wood || 0}`);
        
        const hasGold = res.gold >= (cost.gold || 0);
        const hasWood = res.wood >= (cost.wood || 0);
        
        console.log(`💰 DEBUG: Genug Gold: ${hasGold}, Genug Holz: ${hasWood}`);
        if (!hasGold || !hasWood) {
            console.log('❌ DEBUG: Ressourcen reichen nicht!', {res, cost});
        }
        return hasGold && hasWood;
    }

    // Ressourcen abziehen
    deductResources(cost) {
        console.log(`💸 DEBUG: Versuche Ressourcen abzuziehen:`, cost);
        
        const res = window.getCurrentResources();
        console.log(`💸 DEBUG: Aktuelle Ressourcen vor Abzug:`, res);
        
        // Mehrere Methoden versuchen, um sicherzustellen, dass Ressourcen abgezogen werden
        let success = false;
        
        // Methode 1: Direkt auf die globalen Hauptspiel-Variablen zugreifen
        if (typeof window.gold !== 'undefined' && typeof window.holz !== 'undefined') {
            console.log(`💸 DEBUG: Verwende globale window.gold und window.holz`);
            
            const oldGold = window.gold;
            const oldHolz = window.holz;
            
            if (typeof cost.gold === 'number') {
                window.gold -= cost.gold;
                console.log(`💸 DEBUG: Gold: ${oldGold} -> ${window.gold} (${-cost.gold})`);
            }
            if (typeof cost.wood === 'number') {
                window.holz -= cost.wood;
                console.log(`💸 DEBUG: Holz: ${oldHolz} -> ${window.holz} (${-cost.wood})`);
            }
            success = true;
        }
        
        // Methode 2: Über das Hauptspiel-Objekt
        if (window.game && window.game.ui) {
            console.log(`💸 DEBUG: Verwende window.game.ui`);
            if (typeof cost.gold === 'number') {
                window.game.ui.gold -= cost.gold;
                console.log(`💸 DEBUG: game.ui.gold abgezogen: ${cost.gold}`);
            }
            if (typeof cost.wood === 'number') {
                window.game.ui.wood -= cost.wood;
                console.log(`💸 DEBUG: game.ui.wood abgezogen: ${cost.wood}`);
            }
            success = true;
        }
        
        // Methode 3: Über gameState
        if (window.game && window.game.gameState) {
            console.log(`💸 DEBUG: Verwende window.game.gameState`);
            if (typeof cost.gold === 'number') {
                window.game.gameState.gold -= cost.gold;
                console.log(`💸 DEBUG: game.gameState.gold abgezogen: ${cost.gold}`);
            }
            if (typeof cost.wood === 'number') {
                window.game.gameState.wood -= cost.wood;
                console.log(`💸 DEBUG: game.gameState.wood abgezogen: ${cost.wood}`);
            }
            success = true;
        }
        
        // UI aktualisieren - mehrere Methoden versuchen
        if (typeof window.updateDisplay === 'function') {
            console.log(`💸 DEBUG: Rufe window.updateDisplay() auf`);
            window.updateDisplay();
        }
        
        if (typeof window.updateScoreStatus === 'function') {
            console.log(`💸 DEBUG: Rufe window.updateScoreStatus() auf`);
            window.updateScoreStatus();
        }
        
        if (window.game && typeof window.game.updateDisplay === 'function') {
            console.log(`💸 DEBUG: Rufe window.game.updateDisplay() auf`);
            window.game.updateDisplay();
        }
        
        if (!success) {
            console.log(`❌ DEBUG: Keine Methode zum Abziehen der Ressourcen gefunden!`);
            console.log(`❌ DEBUG: window.gold verfügbar:`, typeof window.gold !== 'undefined');
            console.log(`❌ DEBUG: window.holz verfügbar:`, typeof window.holz !== 'undefined');
            console.log(`❌ DEBUG: window.game verfügbar:`, typeof window.game !== 'undefined');
        }
        
        const newRes = window.getCurrentResources();
        console.log(`💸 DEBUG: Ressourcen nach Abzug:`, newRes);
    }

    // Forschungseffekte anwenden
    applyResearchEffects(research) {
        console.log(`🔬 DEBUG: Wende Effekte an für ${research.name}:`, research.effects);
        
        // Diese Funktion muss an dein Spielsystem angepasst werden
        console.log(`Forschung abgeschlossen: ${research.name}`);
        console.log('Effekte:', research.effects);
        
        // Möbelbau aktualisieren, falls es sich um Möbel-Forschung handelt
        if (typeof window.updateMoebelVisibility === 'function') {
            console.log(`🏠 DEBUG: Aktualisiere Möbelbau nach Forschung ${research.id}`);
            window.updateMoebelVisibility();
        }
        
        // TODO: Hier müssen die tatsächlichen Effekte implementiert werden
        console.log(`⚠️ DEBUG: applyResearchEffects noch nicht vollständig implementiert!`);
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
window.researchSystem = researchSystem; // Fix: Forschungssystem global für alle UI-Module verfügbar machen

// Globale Test-Funktion für Button-Klick
window.testButtonClick = function(tab) {
    console.log(`🧪 DEBUG: Teste Button-Klick für Tab ${tab}`);
    const button = document.getElementById(`research-btn-${tab}`);
    if (button) {
        console.log(`🧪 DEBUG: Button gefunden, simuliere Klick`);
        button.click();
    } else {
        console.log(`❌ DEBUG: Button nicht gefunden für Tab ${tab}`);
    }
};

// Globale Funktion zum Testen aller Forschungsbuttons
window.testAllResearchButtons = function() {
    console.log(`🧪 DEBUG: Teste alle Forschungsbuttons auf der Seite`);
    
    // Teste Tab-Buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    console.log(`🧪 DEBUG: Gefundene Tab-Buttons: ${tabButtons.length}`);
    tabButtons.forEach((btn, index) => {
        console.log(`🧪 DEBUG: Tab-Button ${index}: ${btn.textContent}, disabled: ${btn.disabled}`);
    });
    
    // Teste Forschungsbuttons
    const researchButtons = document.querySelectorAll('.research-button');
    console.log(`🧪 DEBUG: Gefundene Forschungsbuttons: ${researchButtons.length}`);
    researchButtons.forEach((btn, index) => {
        console.log(`🧪 DEBUG: Forschungsbutton ${index}: ${btn.textContent}, disabled: ${btn.disabled}`);
    });
};

// Globale Funktion zum manuellen Testen einer Forschung
window.testResearch = function(researchId) {
    console.log(`🧪 DEBUG: Teste Forschung ${researchId} manuell`);
    const result = researchSystem.startResearch(researchId);
    console.log(`🧪 DEBUG: Forschung ${researchId} Ergebnis: ${result.success ? 'ERFOLG' : 'FEHLGESCHLAGEN'}`);
    return result.success;
};

// Globale Funktion zum Anzeigen aller verfügbaren Forschungen
window.showAvailableResearch = function() {
    console.log(`📋 DEBUG: Verfügbare Forschungen:`);
    researchSystem.research.forEach(research => {
        const available = researchSystem.isResearchAvailable(research);
        const completed = research.completed;
        const enoughResources = researchSystem.hasEnoughResources(research.cost);
        console.log(`📋 ${research.name} (${research.id}): verfügbar=${available}, abgeschlossen=${completed}, genugRessourcen=${enoughResources}`);
    });
};

// Globale Funktion zum Debuggen der aktuellen Ressourcen
// window.debugResources = function() {
//     console.log(`🔍 DEBUG: Aktuelle Ressourcen-Debug:`);
//     console.log(`🔍 window.gold:`, typeof window.gold !== 'undefined' ? window.gold : 'undefined');
//     console.log(`🔍 window.holz:`, typeof window.holz !== 'undefined' ? window.holz : 'undefined');
//     console.log(`🔍 window.game:`, typeof window.game !== 'undefined' ? 'available' : 'undefined');
//     if (window.game) {
//         console.log(`🔍 window.game.ui:`, window.game.ui ? 'available' : 'undefined');
//         console.log(`🔍 window.game.gameState:`, window.game.gameState ? 'available' : 'undefined');
//     }
//     const currentRes = window.getCurrentResources();
//     console.log(`🔍 getCurrentResources():`, currentRes);
// };

// Modal Funktionen
// 1. Wenn das Forschungsfenster geöffnet wird, immer Holzhacker-Tab auswählen
window.openResearchModal = function() {
    document.getElementById('researchModal').style.display = 'block';
    // Setze den ersten Tab (Holzfäller) als aktiv
    window.showResearchTab('lumberjack');
    // Setze den Tab-Button als aktiv
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    const firstTabBtn = document.querySelector('.tab-button[data-tab="lumberjack"]');
    if (firstTabBtn) firstTabBtn.classList.add('active');
};

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

// --- Skilltree SVG-Rendering ---
const researchIcons = {
    'Werkzeug': '🪓',
    'Tisch': '🪑',
    'Schrank': '🗄️',
    'Axt': '🪓',
    'Forst': '🌱',
    'Säge': '🪚',
    'Veredelung': '🪵',
    'Management': '🌳',
    'Automatik': '🤖',
    'Wetter': '☀️',
    'Transport': '🚚',
    'Doppelaxt': '⚔️',
    'Kettensäge': '🪚',
    'Verarbeitung': '🏭',
    'Automation': '🤖',
    'Präzision': '✂️',
    'Massenfällung': '🌲',
    'Konservierung': '🛡️',
    'Vermessung': '🗺️',
    'Möbel': '🛋️',
    'Stuhl': '🪑',
    'Tisch': '🍽️',
    'Schrank': '🚪',
    'Bett': '🛏️',
    'Regal': '🗄️',
    'Kommode': '🗄️',
    'Sofa': '🛋️',
};
let selectedResearchId = null;
function renderSkilltreeSVG() {
    const svg = document.getElementById('skilltree-svg');
    if (!svg) {
        console.log('❌ DEBUG: SVG-Element skilltree-svg nicht gefunden!');
        return;
    }
    console.log('🔄 DEBUG: Rendere Skilltree-SVG...');
    svg.innerHTML = '';
    const nodes = researchSystem.research;
    // Nur Hauptzweige und keine Möbel-Kinder im Graphen anzeigen
    const furnitureChildrenIds = ['Stuhl','Tisch','Schrank','Bett','Regal','Kommode','Sofa'];
    const positions = {
        // Holzfäller-Skills (organisiert in Ebenen ohne Überschneidungen)
        'Werkzeug': {x: 180, y: 64},
        'Axt': {x: 70, y: 184},
        'Präzision': {x: 180, y: 184},
        'Automatik': {x: 290, y: 184},
        'Transport': {x: 70, y: 304},
        'Doppelaxt': {x: 180, y: 304},
        'Massenfällung': {x: 290, y: 304},
        'Verarbeitung': {x: 70, y: 424},
        'Kettensäge': {x: 180, y: 424},
        'Konservierung': {x: 290, y: 424},
        'Vermessung': {x: 110, y: 544},
        'Automation': {x: 250, y: 544},
        
        // Förster-Skills (einfache lineare Kette)
        'Forst': {x: 180, y: 64},
        'Management': {x: 180, y: 184},
        'Wetter': {x: 180, y: 304},
        
        // Verarbeitung-Skills (einfache lineare Kette)
        'Säge': {x: 180, y: 64},
        'Veredelung': {x: 180, y: 184},
        
        // Möbel-Skills (organisiert in Ebenen ohne Überschneidungen)
        'Möbel': {x: 180, y: 60},
        'Stuhl': {x: 120, y: 180},
        'Tisch': {x: 180, y: 180},
        'Schrank': {x: 240, y: 180},
        'Bett': {x: 120, y: 300},
        'Regal': {x: 180, y: 300},
        'Kommode': {x: 240, y: 300},
        'Sofa': {x: 180, y: 420},
    };
    // SVG-Höhe dynamisch anpassen
    const yValues = Object.values(positions).map(pos => pos.y);
    const maxY = Math.max(...yValues);
    svg.setAttribute('width', 500);
    svg.setAttribute('height', Math.max(600, maxY + 80));
    // Kanten zeichnen (nur für Knoten, die im positions-objekt sind und benachbarte Ebenen)
    nodes.forEach(node => {
        if (!positions[node.id]) return;
        node.requirements.forEach(reqId => {
            if (!positions[reqId]) return;
            const from = positions[reqId];
            const to = positions[node.id];
            
            // Prüfe, ob die Skills in benachbarten Ebenen sind
            const fromY = from.y;
            const toY = to.y;
            const yDiff = Math.abs(toY - fromY);
            
            // Nur zeichnen wenn die Skills in benachbarten Ebenen sind (120px Abstand)
            if (yDiff <= 120) {
                const line = document.createElementNS('http://www.w3.org/2000/svg','line');
                line.setAttribute('x1', from.x);
                line.setAttribute('y1', from.y+32);
                line.setAttribute('x2', to.x);
                line.setAttribute('y2', to.y-32);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '3');
                line.setAttribute('stroke-dasharray', '5,5');
                svg.appendChild(line);
            }
        });
    });
    // Nur Knoten mit Position zeichnen (keine Möbel-Kinder)
    const size = 64;
    nodes.forEach(node => {
        if (!positions[node.id]) return;
        const g = document.createElementNS('http://www.w3.org/2000/svg','g');
        const available = researchSystem.isResearchAvailable(node);
        const completed = node.completed;
        const selected = selectedResearchId === node.id;
        
        console.log(`🔄 DEBUG: Rendere Skill ${node.id}: completed=${completed}, selected=${selected}, available=${available}`);
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttribute('x', positions[node.id].x - size/2);
        rect.setAttribute('y', positions[node.id].y - size/2);
        rect.setAttribute('width', size);
        rect.setAttribute('height', size);
        rect.setAttribute('rx', 10);
        rect.setAttribute('ry', 10);
        // Setze Status-Klasse für das Styling
        if (completed) {
            rect.setAttribute('class', 'skilltree-rect skill-completed');
            console.log(`✅ DEBUG: Skill ${node.id} als completed markiert`);
        } else if (selected) {
            rect.setAttribute('class', 'skilltree-rect skill-selected');
            console.log(`🎯 DEBUG: Skill ${node.id} als selected markiert`);
        } else {
            rect.setAttribute('class', 'skilltree-rect skill-default');
            console.log(`⚪ DEBUG: Skill ${node.id} als default markiert`);
        }
        rect.setAttribute('stroke', '#000');
        rect.setAttribute('stroke-width', '4');
        // Stelle sicher, dass die Cursor-Logik für alle Skills (auch auto_chop/Roboter) korrekt ist
        rect.style.cursor = 'pointer';
        rect.addEventListener('click', () => {
            selectedResearchId = node.id;
            renderSkilltreeSVG();
            renderSkilltreeDetails(node.id);
        });
        g.appendChild(rect);
        // Icon
        const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
        icon.setAttribute('x', positions[node.id].x);
        icon.setAttribute('y', positions[node.id].y + 2); // 2px tiefer für optische Mitte
        icon.setAttribute('text-anchor', 'middle');
        icon.setAttribute('dominant-baseline', 'middle');
        icon.setAttribute('font-size', '32'); // kleiner für 2px Abstand zum Rand
        icon.setAttribute('font-family', 'Segoe UI Emoji, Arial Unicode MS, sans-serif');
        icon.textContent = researchIcons[node.id] || '❓';
        icon.setAttribute('pointer-events', 'none');
        icon.setAttribute('style', 'user-select:none;-webkit-user-select:none;-moz-user-select:none;');
        g.appendChild(icon);
        // Tooltip (title)
        const title = document.createElementNS('http://www.w3.org/2000/svg','title');
        title.textContent = node.name;
        g.appendChild(title);
        svg.appendChild(g);
    });
    console.log('✅ DEBUG: Skilltree-SVG Rendering abgeschlossen');
}
function renderSkilltreeDetails(id) {
    console.log(`🎨 DEBUG: renderSkilltreeDetails aufgerufen für ${id}`);
    
    const details = document.getElementById('research-details');
    console.log(`🎨 DEBUG: research-details Element:`, details);
    
    const node = researchSystem.research.find(r => r.id === id);
    if (!details || !node) {
        console.log(`❌ DEBUG: Kann Details nicht rendern - details: ${!!details}, node: ${!!node}`);
        
        // Prüfe Tab-Details als Fallback
        ['lumberjack', 'forester', 'carpenter'].forEach(tab => {
            const tabDetails = document.getElementById(`tree-details-${tab}`);
            console.log(`🎨 DEBUG: tree-details-${tab} existiert: ${!!tabDetails}`);
        });
        
        return;
    }
    
    console.log(`🎨 DEBUG: renderSkilltreeDetails für ${node.name} (${id})`);
    
    // Spezielle Behandlung für Möbel-Knoten
    if (id === 'Möbel') {
        console.log(`🎨 DEBUG: Spezielle Möbel-Behandlung für ${id}`);
        // Ursprüngliche children-Liste
        let children = [
            researchSystem.research.find(r => r.id === 'Stuhl'),
            researchSystem.research.find(r => r.id === 'Tisch'),
            researchSystem.research.find(r => r.id === 'Schrank'),
            researchSystem.research.find(r => r.id === 'Bett'),
            researchSystem.research.find(r => r.id === 'Regal'),
            researchSystem.research.find(r => r.id === 'Kommode'),
            researchSystem.research.find(r => r.id === 'Sofa')
        ].filter(Boolean);
        // Entferne den fehlerhaften Stuhl-Eintrag (z.B. den zweiten, falls doppelt)
        // Wir nehmen nur den ersten Stuhl-Eintrag, falls mehrere vorhanden sind
        let seenChair = false;
        children = children.filter(child => {
            if(child.id !== 'Stuhl') return true;
            if(!seenChair) { seenChair = true; return true; }
            return false; // alle weiteren "Stuhl" entfernen
        });
        let table = `<div style="padding:12px 0;">`;
        table += `<h2 style="margin-top:0">${researchIcons[id]||''} ${node.name}</h2>`;
        table += `<p style="color:#006400;font-size:1.1em">${node.description}</p>`;
        table += `<table style="width:100%;border-collapse:collapse;margin-top:12px;">`;
        table += `<thead><tr style="border-bottom:2px solid #333;"><th style="text-align:left;padding:8px 4px;">Möbel</th><th style="text-align:left;padding:8px 4px;">Kosten</th><th style="text-align:left;padding:8px 4px;">Aktion</th><th></th></tr></thead><tbody>`;
        
        for (const child of children) {
            const available = researchSystem.isResearchAvailable(child);
            const completed = child.completed;
            const enoughResources = researchSystem.hasEnoughResources(child.cost);
            
            console.log(`🎨 DEBUG: Möbel ${child.name} - verfügbar: ${available}, abgeschlossen: ${completed}, genug Ressourcen: ${enoughResources}`);
            
            let buttonHtml = '';
            if (completed) {
                buttonHtml = '<span style="color:#2a2;font-size:1em;">Abgeschlossen</span>';
            } else {
                let disabled = '';
                let tooltip = '';
                if (!available) {
                    disabled = 'disabled';
                    tooltip = 'Voraussetzungen nicht erfüllt';
                } else if (!enoughResources) {
                    disabled = 'disabled';
                    tooltip = 'Nicht genug Ressourcen';
                }
                buttonHtml = `<button class="furniture-unlock-btn" data-id="${child.id}" style="font-size:1em;padding:4px 10px;min-width:32px;" ${disabled} title="${tooltip}">🔓 Forschen</button>`;
                console.log(`🎨 DEBUG: Button HTML für ${child.name}: ${buttonHtml}`);
            }
            table += `<tr>
                <td style='white-space:nowrap;padding:8px 4px;font-size:1.1em;'>
                  <span style="font-size:1.15em;vertical-align:middle;">${researchIcons[child.id]||''}</span> ${child.name}
                </td>
                <td style='white-space:nowrap;padding:8px 4px;font-size:1em;'>${Object.entries(child.cost).map(([r,a])=>`${a} <span style='font-size:1.1em;'>${r==='wood'?'🪵':'💰'}</span>`).join(' | ')}</td>
                <td style='white-space:nowrap;padding:8px 4px;'>${buttonHtml}</td>
                <td></td>
            </tr>`;
        }
        table += `</tbody></table>`;
        table += `</div>`;
        details.innerHTML = table;
        
        // Event-Listener für alle Buttons
        const buttons = details.querySelectorAll('.furniture-unlock-btn');
        console.log(`🎨 DEBUG: Gefundene Möbel-Buttons: ${buttons.length}`);
        
        buttons.forEach((btn, index) => {
            console.log(`🎨 DEBUG: Button ${index} - disabled: ${btn.disabled}, data-id: ${btn.getAttribute('data-id')}`);
            if (!btn.disabled) {
                btn.onclick = () => {
                    const fid = btn.getAttribute('data-id');
                    console.log(`🖱️ DEBUG: Möbel-Forschungsbutton geklickt für ${fid}`);
                    const result = researchSystem.startResearch(fid);
                    console.log(`🖱️ DEBUG: Forschung ${fid} Ergebnis: ${result.success ? 'ERFOLG' : 'FEHLGESCHLAGEN'}`);
                                    if (result.success) {
                    refreshResearchModal(fid);
                }
                };
                console.log(`🎨 DEBUG: onClick-Handler registriert für Button ${index} (${btn.getAttribute('data-id')})`);
            } else {
                console.log(`🎨 DEBUG: Button ${index} ist deaktiviert`);
            }
        });
        return;
    }
    
    // Standard-Detailanzeige für alle anderen Forschungen
    const available = researchSystem.isResearchAvailable(node);
    const completed = node.completed;
    const enoughResources = researchSystem.hasEnoughResources(node.cost);
    
    console.log(`🎨 DEBUG: Standard-Details für ${node.name} - verfügbar: ${available}, abgeschlossen: ${completed}, genug Ressourcen: ${enoughResources}`);
    
    details.innerHTML = `
        <h2 style="margin-top:0"><span style="font-size:1.3em;">${researchIcons[node.id]||''}</span> ${node.name}</h2>
        <p style="color:#006400;font-size:1.1em">${node.description}</p>
        <div style="margin:12px 0 8px 0;font-size:1.1em">
            <b>Kosten:</b> ${Object.entries(node.cost).map(([r,a])=>`${a} ${r==='wood'?'🪵':'💰'}`).join(' | ')}
        </div>
        ${(!completed && available && enoughResources) ? `<button id=\"research-unlock-btn\" style=\"font-size:1.1em;padding:8px 18px;\">Freischalten</button>` : ''}
    `;
    if (!completed && available && enoughResources) {
        const button = document.getElementById('research-unlock-btn');
        console.log(`🎨 DEBUG: Standard-Button erstellt für ${node.name}, disabled: ${button?.disabled}, exists: ${!!button}`);
        
        if (button) {
            button.onclick = () => {
                console.log(`🖱️ DEBUG: Standard-Forschungsbutton geklickt für ${node.id}`);
                const result = researchSystem.startResearch(node.id);
                console.log(`🖱️ DEBUG: Forschung ${node.id} Ergebnis: ${result.success ? 'ERFOLG' : 'FEHLGESCHLAGEN'}`);
                if (result.success) {
                    refreshResearchModal(node.id);
                }
            };
            console.log(`🎨 DEBUG: onClick-Handler registriert für Standard-Button ${node.name}`);
        }
    } else {
        console.log(`🎨 DEBUG: Kein Standard-Button erstellt für ${node.name} - completed: ${completed}, available: ${available}, enoughResources: ${enoughResources}`);
    }
}
// --- Skilltree SVG-Rendering ENDE ---

// --- Skilltree-Details global definieren ---
function renderTreeDetails(tab, id) {
    // Wenn keine ID oder ungültige ID, zeige nichts an
    let node = researchSystem.research.find(r => r.id === id);
    if (!node && id !== 'Möbel') {
        return; // Keine automatische Auswahl mehr
    }
    const details = document.getElementById(`tree-details-${tab}`);
    if (!details) return;
    if (tab === 'carpenter' && id === 'Möbel') {
        // Direkt die Möbel-Tabelle als Teil der Infocard anzeigen (ohne Button)
        details.innerHTML = `<div id="moebel-table-placeholder"></div>`;
        window.renderMoebelTable(details.querySelector('#moebel-table-placeholder'));
        return; // Sofortiger Abbruch, keine weitere Button-Logik!
    }
    if (!node) return;
    const research = researchSystem.research.find(r => r.id===id);
    if (!research) return;
    const available = researchSystem.isResearchAvailable(research);
    const completed = research.completed;
    const enoughResources = researchSystem.hasEnoughResources(research.cost);
    // Button-Container immer erzeugen
    let buttonContainerId = `research-btn-container-${tab}`;
    let buttonHtml = `<div id="${buttonContainerId}"></div>`;
    details.innerHTML = `
        <h3 style='margin-top:0'>${researchIcons[research.id]||''} ${research.name}</h3>
        <p>${research.description}</p>
        <div><b>Kosten:</b> ${Object.entries(research.cost).map(([r,a])=>`${a} ${r==='wood'?'🪵':'💰'}`).join(' | ')}</div>
        ${buttonHtml}
    `;
    // Button-Logik: Button immer neu erzeugen und einfügen
    const btnContainer = document.getElementById(buttonContainerId);
    if (btnContainer) {
        btnContainer.innerHTML = '';
        if (!completed && available) {
            const button = document.createElement('button');
            button.id = `research-btn-${tab}`;
            button.className = 'research-button';
            button.textContent = '🔓 Forschen';
            button.disabled = !enoughResources;
            button.title = enoughResources ? 'Forschung starten' : 'Nicht genug Ressourcen';
            btnContainer.appendChild(button);
            console.log('DEBUG: Button wurde ins DOM eingefügt', button);
        } else if (completed) {
            btnContainer.innerHTML = `<div class="research-status research-status-completed">✅ Abgeschlossen</div>`;
        } else {
            btnContainer.innerHTML = `<div class="research-status research-status-unavailable">❌ Nicht verfügbar</div>`;
        }
    }
    // Nach allen innerHTML-Änderungen und nach dem Einfügen des Buttons:
    setTimeout(() => {
        const btn = document.getElementById(`research-btn-${tab}`);
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Tab-Namen robust bestimmen
                let currentTab = tab;
                if (!currentTab) {
                    // Versuche Tab aus dem Button-Container zu ermitteln
                    const parent = btn.closest('.research-tab-content');
                    if (parent && parent.id) {
                        if (parent.id.includes('lumberjack')) currentTab = 'lumberjack';
                        else if (parent.id.includes('forester')) currentTab = 'forester';
                        else if (parent.id.includes('carpenter')) currentTab = 'carpenter';
                    }
                }
                console.log(`[Forschen-Button] Aktueller Tab:`, currentTab);
                console.log(`🖱️ [Forschen-Button] Klick für ${id} in Tab ${currentTab}`);
                console.log(`🖱️ [Forschen-Button] Aktuelle Ressourcen:`, window.getCurrentResources());
                console.log(`🖱️ [Forschen-Button] Benötigte Ressourcen:`, research.cost);
                const result = researchSystem.startResearch(id);
                console.log(`🖱️ [Forschen-Button] Ergebnis:`, result);
                if (result.success) {
                    console.log(`✅ Forschung erfolgreich! Aktualisiere UI...`);
                    // Vollständigen Research-Modal Refresh durchführen
                    refreshResearchModal(id);
                    console.log(`✅ UI-Update für ${id} abgeschlossen`);
                } else {
                    console.log(`❌ Forschung fehlgeschlagen!`);
                    if (result.error) {
                        alert(result.error);
                    } else {
                        alert('Forschung konnte nicht gestartet werden. Prüfe Ressourcen und Voraussetzungen!');
                    }
                }
            };
            console.log('DEBUG: Button-Handler gesetzt', btn);
        } else {
            console.log('DEBUG: Kein Button zum Handler-Setzen gefunden!');
        }
    }, 0);
    // Debug: Zeige alle Voraussetzungen und deren Status
    if (research.requirements && research.requirements.length > 0) {
        details.innerHTML += `<div style='margin-top:10px;'><b>Voraussetzungen:</b><ul style='margin:4px 0 0 18px;padding:0;'>` +
            research.requirements.map(reqId => {
                const req = researchSystem.research.find(r => r.id === reqId);
                return `<li><span style="font-size:1.2em;">${researchIcons[reqId]||''}</span> ${req ? req.name : reqId} : <span style='color:${req && req.completed ? '#2a2' : '#a22'};font-size:1.2em;'>${req && req.completed ? '✅' : '❌'}</span></li>`;
            }).join('') +
            `</ul></div>`;
    }
    // Schreiner: Wenn Möbel-Skill ausgewählt, Möbel-Tabelle darunter anzeigen
    // Entferne jegliche Logik, die die Möbel-Tabelle bei Veredelung oder anderen Skills anzeigt
}
window.renderTreeDetails = renderTreeDetails;
// --- Skilltree SVG-Rendering ENDE ---



// Zentrale Funktion zum vollständigen Refresh des Research-Modals nach Forschung
function refreshResearchModal(researchedId) {
    console.log(`🔄 DEBUG: Vollständiger Research-Modal Refresh für ${researchedId}`);
    // Debug: Zeige aktuellen Stand der Auswahl-Variablen
    console.log('🔄 DEBUG: Auswahl-Status:', {
        selectedResearchId,
        selectedLumberjackSkill: window.selectedLumberjackSkill,
        selectedForesterSkill: window.selectedForesterSkill,
        selectedCarpenterSkill: window.selectedCarpenterSkill,
        researchedId
    });
    // Debug: Zeige Status aller Skills
    if (window.researchSystem && window.researchSystem.research) {
        window.researchSystem.research.forEach(r => {
            console.log(`🔄 DEBUG: Skill ${r.id} | completed: ${r.completed}`);
        });
    }
    // 1. Nur die globale selectedResearchId setzen, aber nicht die Tab-spezifischen
    selectedResearchId = researchedId;
    
    // 2. Alle Tab-Skilltrees neu rendern
    if (typeof window.renderResearchTreeTab === 'function') {
        window.renderResearchTreeTab('lumberjack');
        window.renderResearchTreeTab('forester');
        window.renderResearchTreeTab('carpenter');
    }
    
    // 3. SVG-Skilltree neu rendern (falls sichtbar)
    if (typeof renderSkilltreeSVG === 'function') {
        renderSkilltreeSVG();
    }
    
    // 4. Details für alle Tabs neu rendern
    if (typeof renderTreeDetails === 'function') {
        renderTreeDetails('lumberjack', researchedId);
        renderTreeDetails('forester', researchedId);
        renderTreeDetails('carpenter', researchedId);
    }
    
    // 5. Möbelbau-Sichtbarkeit aktualisieren
    if (typeof window.updateMoebelVisibility === 'function') {
        window.updateMoebelVisibility();
    }

    // --- NEU: Möbeltabelle neu rendern, falls sichtbar ---
    if (window.selectedCarpenterSkill === 'Möbel') {
        const moebelPlaceholder = document.querySelector('#tree-details-carpenter #moebel-table-placeholder');
        if (moebelPlaceholder && typeof window.renderMoebelTable === 'function') {
            window.renderMoebelTable(moebelPlaceholder);
        }
    }
    
    console.log(`✅ DEBUG: Research-Modal Refresh abgeschlossen für ${researchedId}`);
}

// --- Skill-IDs und Positionen global ---
    const LUMBERJACK_IDS = [
        'Werkzeug','Axt','Automatik','Transport',
        'Doppelaxt','Kettensäge','Verarbeitung','Automation',
        'Präzision','Massenfällung','Konservierung','Vermessung'
    ];
    const FORESTER_IDS = [
        'Forst','Management','Wetter'
    ];
    const CARPENTER_SKILL_IDS = [
        'Möbel',
        'Säge',
        'Veredelung'
    ];
    const MOEBEL_IDS = [
    //'Stuhl',
    'Tisch','Schrank','Bett','Regal','Kommode','Sofa'
];
    const TREE_POSITIONS = {
        lumberjack: {
            // Ebene 1 - Grundlagen (1 Skill, Mitte)
            'Werkzeug': {x: 180, y: 64},
            
            // Ebene 2 - Basis-Verbesserungen (3 Skills, drei Spalten)
            'Axt': {x: 70, y: 184},
            'Präzision': {x: 180, y: 184},
            'Automatik': {x: 290, y: 184},
            
            // Ebene 3 - Automatisierung (3 Skills, drei Spalten)
            'Transport': {x: 70, y: 304},
            'Doppelaxt': {x: 180, y: 304},
            'Massenfällung': {x: 290, y: 304},
            
            // Ebene 4 - Erweiterte Werkzeuge (3 Skills, drei Spalten)
            'Verarbeitung': {x: 70, y: 424},
            'Kettensäge': {x: 180, y: 424},
            'Konservierung': {x: 290, y: 424},
            
            // Ebene 5 - Spezialisierung (2 Skills, links und rechts)
            'Vermessung': {x: 110, y: 544},
            'Automation': {x: 250, y: 544},
        },
        forester: {
            'Forst': {x: 180, y: 64},
            'Management': {x: 180, y: 184},
            'Wetter': {x: 180, y: 304},
        },
        carpenter: {
            'Säge': {x: 160, y: 64},
            'Veredelung': {x: 100, y: 184},
            'Möbel': {x: 220, y: 184},
        }
};

// --- Möbel-Tabelle global ---
function renderMoebelTable(container) {
    // Entferne alte Tabelle, falls vorhanden
    const old = container.querySelector('.moebel-table-wrap');
    if (old) old.remove();
    // Debug-Log
    console.log('[Möbel] renderMoebelTable aufgerufen, füge Tabelle ein');
    // Erzeuge neuen Wrapper
    const wrap = document.createElement('div');
    wrap.className = 'moebel-table-wrap';
    let moebelIcon = researchIcons['Möbel'] || '';
    let html = `<div style='font-family:"Press Start 2P", "VT323", "Pixel", monospace;font-size:1.3em;color:#000;margin-bottom:12px;'><span style="font-size:1.2em;vertical-align:middle;">${moebelIcon}</span> Möbelforschung</div>`;
    html += renderMoebelResearchTable();
    wrap.innerHTML = html;
    container.appendChild(wrap);
}

function renderMoebelResearchTable() {
    const moebelIds = ['Tisch', 'Schrank', 'Bett', 'Regal', 'Kommode', 'Sofa'];
    let html = `<table style="width:100%;margin-top:0;font-family:'Press Start 2P', 'VT323', 'Pixel', monospace;font-size:1em;text-shadow:none;color:#000;border:none;border-collapse:separate;">
        <thead><tr><th style="text-align:left;padding:8px 4px;color:#000;font-weight:normal;">Möbel</th><th style="text-align:left;padding:8px 4px;color:#000;font-weight:normal;">Kosten</th><th style="text-align:left;padding:8px 4px;color:#000;font-weight:normal;">Aktion</th></tr></thead><tbody>`;
    moebelIds.forEach(id => {
        const research = researchSystem.research.find(r => r.id===id);
        if(!research) return;
        const available = researchSystem.isResearchAvailable(research);
        const completed = research.completed;
        const enoughResources = researchSystem.hasEnoughResources(research.cost);
        let buttonHtml = '';
        if (completed) {
            buttonHtml = '<span style="color:#2a2;font-size:1em;">Abgeschlossen</span>';
        } else {
            let disabled = '';
            let tooltip = '';
            if (!available) {
                disabled = 'disabled';
                tooltip = 'Voraussetzungen nicht erfüllt';
            } else if (!enoughResources) {
                disabled = 'disabled';
                tooltip = 'Nicht genug Ressourcen';
            }
            buttonHtml = `<button class="moebel-unlock-btn" data-id="${research.id}" style="font-size:1em;padding:4px 10px;min-width:32px;" ${disabled} title="${tooltip}">🔓 Forschen</button>`;
        }
        html += `<tr>
            <td style='white-space:nowrap;padding:8px 4px;font-size:1.1em;font-family:"Press Start 2P", "VT323", "Pixel", monospace;text-shadow:none;color:#000 !important;'>${researchIcons[research.id]||''} ${research.name}</td>
            <td style='white-space:nowrap;padding:8px 4px;font-size:1em;font-family:"Press Start 2P", "VT323", "Pixel", monospace;text-shadow:none;color:#000 !important;'>${Object.entries(research.cost).map(([r,a])=>`${a}<span style='font-size:1.1em;color:#000 !important;margin-left:2px;'>${r==='wood'?'🪵':'💰'}</span>`).join(' ')}</td>
            <td style='white-space:nowrap;padding:8px 4px;'><span style="color:#000;">${buttonHtml}</span></td>
        </tr>`;
    });
    html += `</tbody></table>`;
    return html;
}
// --- Funktion global ---
function renderResearchTreeTab(tab, selectedIdOverride) {
    console.log(`🌲 DEBUG: renderResearchTreeTab aufgerufen für ${tab}`);
    let ids, positions;
    if(tab==='lumberjack') { ids = LUMBERJACK_IDS; positions = TREE_POSITIONS.lumberjack; }
    else if(tab==='forester') { ids = FORESTER_IDS; positions = TREE_POSITIONS.forester; }
    else { ids = CARPENTER_SKILL_IDS; positions = TREE_POSITIONS.carpenter; }
    const container = document.getElementById(
        tab==='lumberjack' ? 'researchLumberjack' :
        tab==='forester' ? 'researchForester' :
        'researchCarpenter'
    );
    if(!container) {
        console.log(`❌ DEBUG: Container für ${tab} nicht gefunden!`);
        return;
    }
    console.log(` DEBUG: Container für ${tab} gefunden, rendere ${ids.length} Forschungen`);
    // Layout: Skilltree links, Details rechts
    let html = `<div style='display:flex;gap:64px;align-items:flex-start;width:100%;'>`;
    // Dynamische SVG-Höhe basierend auf den Positionen
    const yValues = Object.values(positions).map(pos => pos.y);
    const maxY = Math.max(...yValues);
    const svgHeight = Math.max(600, maxY + 80);
    html += `<div style='min-width:450px;max-width:450px;'><div style='width:100%;overflow-x:auto;'><svg id='tree-svg-${tab}' width='450' height='${svgHeight}'></svg></div></div>`;
    html += `<div id='tree-details-${tab}' style='flex:1;min-width:60px;margin-top:0;margin-left:-100px;'></div>`;
    html += `</div>`;
    container.innerHTML = html;
    console.log(` DEBUG: HTML für ${tab} erstellt, tree-details-${tab} sollte jetzt existieren`);
    const svg = container.querySelector(`#tree-svg-${tab}`);
    if (!svg) {
        console.log(`❌ DEBUG: SVG für ${tab} nicht gefunden!`);
        return;
    }
    // SVG-Inhalt rendern
    // Verbindungslinien zwischen Skills zeichnen (nur benachbarte Ebenen)
    ids.forEach(id => {
        const research = researchSystem.research.find(r => r.id === id);
        if (!research || !research.requirements) return;
        research.requirements.forEach(reqId => {
            if (!positions[reqId] || !positions[id]) return;
            const from = positions[reqId];
            const to = positions[id];
            // Prüfe, ob die Skills in benachbarten Ebenen sind (max 160px Abstand)
            const fromY = from.y;
            const toY = to.y;
            const yDiff = Math.abs(toY - fromY);
            if (yDiff <= 160) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', from.x);
                line.setAttribute('y1', from.y + 32);
                line.setAttribute('x2', to.x);
                line.setAttribute('y2', to.y - 32);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '3');
                line.setAttribute('stroke-dasharray', '5,5');
                svg.appendChild(line);
            }
        });
    });
    // Nur Knoten mit Position zeichnen (keine Möbel-Kinder)
    const size = 64;
    ids.forEach(id => {
        const research = researchSystem.research.find(r => r.id === id);
        if (!research && id !== 'Möbel') {
            console.log(`❌ DEBUG: Forschung ${id} nicht gefunden!`);
            return;
        }
        const completed = research ? research.completed : false;
        const selected = (tab==='lumberjack' ? window.selectedLumberjackSkill : tab==='forester' ? window.selectedForesterSkill : window.selectedCarpenterSkill) === id;
        // SVG-Gruppe erstellen
        const g = document.createElementNS('http://www.w3.org/2000/svg','g');
        g.setAttribute('data-skill-id', id);
        // Rechteck
        const padding = 2;
        const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttribute('x', positions[id].x - size/2 + padding);
        rect.setAttribute('y', positions[id].y - size/2 + padding);
        rect.setAttribute('width', size - 2*padding);
        rect.setAttribute('height', size - 2*padding);
        rect.setAttribute('rx', '0');
        rect.setAttribute('ry', '0');
        // Setze NUR die Status-Klasse, KEIN fill mehr im JS!
        let klasse = '';
        if (completed) klasse = 'skilltree-rect skill-completed';
        else if (selected) klasse = 'skilltree-rect skill-selected';
        else klasse = 'skilltree-rect skill-default';
        rect.setAttribute('class', klasse);
        // Zusätzliche visuelle Verbesserungen
        // Kein Glow/Drop-Shadow mehr
        rect.removeAttribute('filter');
        rect.style.cursor = 'pointer';
        rect.addEventListener('click', () => {
            if(tab==='carpenter' && id==='Möbel') {
                window.selectedCarpenterSkill = 'Möbel';
                renderResearchTreeTab('carpenter', 'Möbel');
            } else {
                if(tab==='carpenter') window.selectedCarpenterSkill = id;
                if(tab==='lumberjack') window.selectedLumberjackSkill = id;
                if(tab==='forester') window.selectedForesterSkill = id;
                renderResearchTreeTab(tab);
            }
        });
        g.appendChild(rect);
        // Icon
        const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
        icon.setAttribute('x', positions[id].x);
        icon.setAttribute('y', positions[id].y + 2); // 2px tiefer für optische Mitte
        icon.setAttribute('text-anchor', 'middle');
        icon.setAttribute('dominant-baseline', 'middle');
        icon.setAttribute('font-size', '32'); // kleiner für 2px Abstand zum Rand
        icon.setAttribute('font-family', 'Segoe UI Emoji, Arial Unicode MS, sans-serif');
        icon.textContent = researchIcons[id] || (research && researchIcons[research.id]) || '❓';
        icon.setAttribute('pointer-events', 'none');
        g.appendChild(icon);
        svg.appendChild(g);
    });
    // Nach dem Rendern: Details nur anzeigen wenn ein Skill explizit ausgewählt ist
    let selectedId = (typeof selectedIdOverride !== 'undefined') ? selectedIdOverride : (tab==='lumberjack' ? window.selectedLumberjackSkill : tab==='forester' ? window.selectedForesterSkill : window.selectedCarpenterSkill);
    if (ids.includes(selectedId)) {
        renderTreeDetails(tab, selectedId);
    }
    // Keine Button-Logik für Möbel mehr!
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialisierung der ausgewählten Skills pro Tab (global, außerhalb der Funktion!)
    window.selectedLumberjackSkill = 'Werkzeug';
    window.selectedForesterSkill = 'Forst';
    window.selectedCarpenterSkill = 'Säge';

    // 2. Beim Klick auf einen Berufstab: Tab-Button aktiv setzen
    window.showResearchTab = function(tabName) {
        console.log(`📋 DEBUG: showResearchTab aufgerufen für ${tabName}`);
        document.querySelectorAll('.research-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        if(tabName==='lumberjack') { 
            document.getElementById('researchLumberjack').style.display = 'block'; 
            console.log(`📋 DEBUG: Lumberjack-Tab aktiviert`);
            renderResearchTreeTab('lumberjack'); 
        }
        if(tabName==='forester') { 
            document.getElementById('researchForester').style.display = 'block'; 
            console.log(`📋 DEBUG: Forester-Tab aktiviert`);
            renderResearchTreeTab('forester'); 
        }
        if(tabName==='carpenter') { 
            document.getElementById('researchCarpenter').style.display = 'block'; 
            console.log('📋 DEBUG: Verarbeitung-Tab aktiviert');
            renderResearchTreeTab('carpenter'); 
        }
    }

    // 2. Beim Klick auf einen Berufstab: Tab-Button aktiv setzen
    window.showResearchTab = function(tabName) {
        console.log(`📋 DEBUG: showResearchTab aufgerufen für ${tabName}`);
        document.querySelectorAll('.research-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        if(tabName==='lumberjack') { 
            document.getElementById('researchLumberjack').style.display = 'block'; 
            console.log(`📋 DEBUG: Lumberjack-Tab aktiviert`);
            renderResearchTreeTab('lumberjack'); 
        }
        if(tabName==='forester') { 
            document.getElementById('researchForester').style.display = 'block'; 
            console.log(`📋 DEBUG: Forester-Tab aktiviert`);
            renderResearchTreeTab('forester'); 
        }
        if(tabName==='carpenter') { 
            document.getElementById('researchCarpenter').style.display = 'block'; 
            console.log('📋 DEBUG: Verarbeitung-Tab aktiviert');
            renderResearchTreeTab('carpenter'); 
        }
    }
});
window.renderResearchTreeTab = renderResearchTreeTab;

// ... existing code ...
    // --- NEU: Schreiner-Tab komplett neu rendern, falls Möbeltabelle sichtbar ---
    const moebelTabVisible = document.getElementById('researchCarpenter')?.style.display !== 'none';
    const moebelDetails = document.querySelector('#tree-details-carpenter #moebel-table-placeholder');
    if (moebelTabVisible && moebelDetails) {
        window.selectedCarpenterSkill = 'Möbel';
        renderResearchTreeTab('carpenter', 'Möbel');
    }
// ... existing code ...