// Forschungsoptionen
const researchOptions = [
    {
        id: 'better_tools',
        name: 'Bessere Werkzeuge',
        description: 'Verbessert die Effizienz beim Holzfällen',
        cost: { wood: 100, gold: 50 },
        requirements: [],
        effects: { wood_multiplier: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'table',
        name: 'Tisch bauen',
        description: 'Ermöglicht den Bau von Tischen',
        cost: { wood: 120, gold: 60 },
        requirements: ['better_tools'],
        effects: { can_build_table: true },
        progress: 0,
        completed: false
    },
    {
        id: 'cabinet',
        name: 'Schrank bauen',
        description: 'Ermöglicht den Bau von Schränken',
        cost: { wood: 200, gold: 100 },
        requirements: ['better_tools'],
        effects: { can_build_cabinet: true },
        progress: 0,
        completed: false
    },
    {
        id: 'better_axe',
        name: 'Bessere Axt',
        description: 'Holzfäller arbeiten schneller',
        cost: { wood: 80, gold: 30 },
        requirements: ['better_tools'],
        effects: { chop_speed: 1.2 },
        progress: 0,
        completed: false
    },
    {
        id: 'advanced_forestry',
        name: 'Fortgeschrittene Forstwirtschaft',
        description: 'Erhöht die Regenerationsrate der Bäume',
        cost: { wood: 200, gold: 100 },
        requirements: [],
        effects: { tree_growth_rate: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'efficient_sawmill',
        name: 'Effiziente Sägemühle',
        description: 'Produziert mehr Holz pro Baum',
        cost: { wood: 300, gold: 150 },
        requirements: [],
        effects: { wood_per_tree: 2 },
        progress: 0,
        completed: false
    },
    {
        id: 'wood_refinement',
        name: 'Holzveredelung',
        description: 'Erhöht den Wert von Holz',
        cost: { wood: 400, gold: 200 },
        requirements: ['efficient_sawmill'],
        effects: { wood_value: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'forest_management',
        name: 'Forstmanagement',
        description: 'Optimiert die Nutzung des Waldes',
        cost: { wood: 250, gold: 120 },
        requirements: ['advanced_forestry'],
        effects: { forest_efficiency: 1.3 },
        progress: 0,
        completed: false
    },
    {
        id: 'auto_chop',
        name: 'Automatisierte Holzfällung',
        description: 'Holzfällung läuft automatisch',
        cost: { wood: 600, gold: 300 },
        requirements: ['better_axe'],
        effects: { auto_chop: true },
        progress: 0,
        completed: false
    },
    {
        id: 'weather_research',
        name: 'Wetterforschung',
        description: 'Bessere Vorhersage für Ernte und Holzfällung',
        cost: { wood: 150, gold: 80 },
        requirements: ['advanced_forestry'],
        effects: { weather_prediction: true },
        progress: 0,
        completed: false
    },
    {
        id: 'fast_transport',
        name: 'Schneller Transport',
        description: 'Holz wird schneller gelagert',
        cost: { wood: 180, gold: 90 },
        requirements: ['better_axe'],
        effects: { transport_speed: 1.5 },
        progress: 0,
        completed: false
    },
    // --- NEUER ZWEIG: Möbel ---
    {
        id: 'furniture',
        name: 'Möbel',
        description: 'Ermöglicht die Erforschung und den Bau verschiedener Möbelstücke.',
        cost: { wood: 100, gold: 50 },
        requirements: [],
        effects: {},
        progress: 0,
        completed: false
    },
    // Einzelne Möbelstücke als Unterforschungen
    {
        id: 'chair',
        name: 'Stuhl',
        description: 'Ermöglicht den Bau von Stühlen.',
        cost: { wood: 40, gold: 20 },
        requirements: [],
        effects: { can_build_chair: true },
        progress: 100,
        completed: true
    },
    {
        id: 'table_furniture',
        name: 'Tisch',
        description: 'Ermöglicht den Bau von Tischen.',
        cost: { wood: 60, gold: 30 },
        requirements: [],
        effects: { can_build_table: true },
        progress: 0,
        completed: false
    },
    {
        id: 'wardrobe',
        name: 'Schrank',
        description: 'Ermöglicht den Bau von Schränken.',
        cost: { wood: 80, gold: 40 },
        requirements: [],
        effects: { can_build_wardrobe: true },
        progress: 100,
        completed: true
    },
    {
        id: 'bed',
        name: 'Bett',
        description: 'Ermöglicht den Bau von Betten.',
        cost: { wood: 100, gold: 50 },
        requirements: ['chair','table_furniture'],
        effects: { can_build_bed: true },
        progress: 0,
        completed: false
    },
    {
        id: 'shelf',
        name: 'Regal',
        description: 'Ermöglicht den Bau von Regalen.',
        cost: { wood: 50, gold: 25 },
        requirements: ['chair','table_furniture'],
        effects: { can_build_shelf: true },
        progress: 0,
        completed: false
    },
    {
        id: 'dresser',
        name: 'Kommode',
        description: 'Ermöglicht den Bau von Kommoden.',
        cost: { wood: 70, gold: 35 },
        requirements: ['chair','table_furniture'],
        effects: { can_build_dresser: true },
        progress: 0,
        completed: false
    },
    {
        id: 'sofa',
        name: 'Sofa',
        description: 'Ermöglicht den Bau von Sofas.',
        cost: { wood: 120, gold: 60 },
        requirements: ['bed','shelf','dresser'],
        effects: { can_build_sofa: true },
        progress: 0,
        completed: false
    },
    // ... weitere Möbelstücke nach Bedarf ...
];

// Suche im researchOptions-Array den Skill 'auto_chop' und entferne 'wood_refinement' aus requirements
researchOptions.forEach(r => {
    if (r.id === 'auto_chop') {
        if (Array.isArray(r.requirements)) {
            r.requirements = r.requirements.filter(req => req !== 'wood_refinement');
        }
    }
});

// Entferne für alle Möbelstücke die Voraussetzung 'furniture' aus requirements
['chair','table_furniture','wardrobe','bed','shelf','dresser','sofa'].forEach(id => {
    const r = researchOptions.find(r => r.id === id);
    if (r && Array.isArray(r.requirements)) {
        r.requirements = r.requirements.filter(req => req !== 'furniture');
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
window.debugResources = function() {
    console.log(`🔍 DEBUG: Aktuelle Ressourcen-Debug:`);
    console.log(`🔍 window.gold:`, typeof window.gold !== 'undefined' ? window.gold : 'undefined');
    console.log(`🔍 window.holz:`, typeof window.holz !== 'undefined' ? window.holz : 'undefined');
    console.log(`🔍 window.game:`, typeof window.game !== 'undefined' ? 'available' : 'undefined');
    if (window.game) {
        console.log(`🔍 window.game.ui:`, window.game.ui ? 'available' : 'undefined');
        console.log(`🔍 window.game.gameState:`, window.game.gameState ? 'available' : 'undefined');
    }
    const currentRes = window.getCurrentResources();
    console.log(`🔍 getCurrentResources():`, currentRes);
};

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
    'better_tools': '🪓',
    'table': '🪑',
    'cabinet': '🗄️',
    'better_axe': '🪓',
    'advanced_forestry': '🌱',
    'efficient_sawmill': '🪚',
    'wood_refinement': '🪵',
    'forest_management': '🌳',
    'auto_chop': '🤖',
    'weather_research': '☀️',
    'fast_transport': '🚚',
    'furniture': '🛋️',
    'chair': '🪑',
    'table_furniture': '🍽️',
    'wardrobe': '🚪',
    'bed': '🛏️',
    'shelf': '📚',
    'dresser': '🗄️',
    'sofa': '🛋️',
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
    const furnitureChildrenIds = ['chair','table_furniture','wardrobe','bed','shelf','dresser','sofa'];
    const positions = {
        'better_tools': {x: 100, y: 60},
        'furniture': {x: 240, y: 60},
        'table': {x: 60, y: 220},
        'cabinet': {x: 180, y: 220},
        'better_axe': {x: 60, y: 380},
        'advanced_forestry': {x: 100, y: 380},
        'efficient_sawmill': {x: 180, y: 380},
        'wood_refinement': {x: 60, y: 540},
        'forest_management': {x: 100, y: 540},
        'auto_chop': {x: 180, y: 540},
        'weather_research': {x: 60, y: 700},
        'fast_transport': {x: 180, y: 700},
        // Möbel-Ast
        'chair': {x: 200, y: 220},
        'table_furniture': {x: 240, y: 220},
        'wardrobe': {x: 280, y: 220},
        'bed': {x: 200, y: 380},
        'shelf': {x: 240, y: 380},
        'dresser': {x: 280, y: 380},
        'sofa': {x: 240, y: 540},
    };
    // SVG-Höhe dynamisch anpassen
    const yValues = Object.values(positions).map(pos => pos.y);
    const maxY = Math.max(...yValues);
    svg.setAttribute('width', 340);
    svg.setAttribute('height', Math.max(500, maxY + 70));
    // Kanten zeichnen (nur für Knoten, die im positions-objekt sind)
    nodes.forEach(node => {
        if (!positions[node.id]) return;
        node.requirements.forEach(reqId => {
            if (!positions[reqId]) return;
            const from = positions[reqId];
            const to = positions[node.id];
            const line = document.createElementNS('http://www.w3.org/2000/svg','line');
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y+32);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y-32);
            line.setAttribute('stroke', '#888');
            line.setAttribute('stroke-width', '4');
            svg.appendChild(line);
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
        rect.setAttribute('rx', 12);
        rect.setAttribute('ry', 12);
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
        rect.setAttribute('stroke-width', '5');
        rect.setAttribute('filter', 'drop-shadow(2px 2px 0 #808080)');
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
        icon.setAttribute('y', positions[node.id].y+16);
        icon.setAttribute('text-anchor', 'middle');
        icon.setAttribute('font-size', '36');
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
    if (id === 'furniture') {
        console.log(`🎨 DEBUG: Spezielle Möbel-Behandlung für ${id}`);
        // Ursprüngliche children-Liste
        let children = [
            researchSystem.research.find(r => r.id === 'chair'),
            researchSystem.research.find(r => r.id === 'table_furniture'),
            researchSystem.research.find(r => r.id === 'wardrobe'),
            researchSystem.research.find(r => r.id === 'bed'),
            researchSystem.research.find(r => r.id === 'shelf'),
            researchSystem.research.find(r => r.id === 'dresser'),
            researchSystem.research.find(r => r.id === 'sofa')
        ].filter(Boolean);
        // Entferne den fehlerhaften Stuhl-Eintrag (z.B. den zweiten, falls doppelt)
        // Wir nehmen nur den ersten Stuhl-Eintrag, falls mehrere vorhanden sind
        let seenChair = false;
        children = children.filter(child => {
            if(child.id !== 'chair') return true;
            if(!seenChair) { seenChair = true; return true; }
            return false; // alle weiteren "chair" entfernen
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
        <h2 style="margin-top:0">${researchIcons[node.id]||''} ${node.name}</h2>
        <p style="color:#006400;font-size:1.1em">${node.description}</p>
        <div style="margin:12px 0 8px 0;font-size:1.1em">
            <b>Kosten:</b> ${Object.entries(node.cost).map(([r,a])=>`${a} ${r==='wood'?'🪵':'💰'}`).join(' | ')}
        </div>
        <div style="margin-bottom:10px">
            <b>Status:</b> ${completed ? '<span style=\'color:#2a2\'>Abgeschlossen</span>' : (available ? 'Verfügbar' : 'Nicht verfügbar')}
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
    if (!node) {
        return; // Keine automatische Auswahl mehr
    }
    const details = document.getElementById(`tree-details-${tab}`);
    if (!details) return;
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
        <div><b>Status:</b> ${completed ? '<span style=\'color:#2a2\'>Abgeschlossen</span>' : (available ? 'Verfügbar' : 'Nicht verfügbar')}</div>
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
                return `<li>${researchIcons[reqId]||''} ${req ? req.name : reqId} : <span style='color:${req && req.completed ? '#2a2' : '#a22'}'>${req && req.completed ? 'abgeschlossen' : 'offen'}</span></li>`;
            }).join('') +
            `</ul></div>`;
    }
    // Debug: Zeige aktuelle Ressourcen
    const debugRes = window.getCurrentResources ? window.getCurrentResources() : {wood: '?', gold: '?'};
    details.innerHTML += `<div style='margin-top:10px;font-size:0.95em;color:#888;'>[Debug] Ressourcen: 🪵 ${debugRes.wood} | 💰 ${debugRes.gold}</div>`;
    // Schreiner: Wenn Möbel-Skill ausgewählt, Möbel-Tabelle darunter anzeigen
    if(tab==='carpenter' && id==='wood_refinement') {
        window.renderMoebelTable(document.getElementById('researchCarpenter'));
    } else if(tab==='carpenter') {
        // Wenn ein anderer Schreiner-Skill ausgewählt wird, Tabelle entfernen
        const container = document.getElementById('researchCarpenter');
        const old = container.querySelector('.moebel-table-wrap');
        if (old) old.remove();
    }
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
    
    console.log(`✅ DEBUG: Research-Modal Refresh abgeschlossen für ${researchedId}`);
}

// --- Skill-IDs und Positionen global ---
    const LUMBERJACK_IDS = [
        'better_tools','better_axe','auto_chop','fast_transport'
    ];
    const FORESTER_IDS = [
        'advanced_forestry','forest_management','weather_research'
    ];
    const CARPENTER_SKILL_IDS = [
    'efficient_sawmill'
    ];
    const MOEBEL_IDS = [
    //'chair',
    'table_furniture','wardrobe','bed','shelf','dresser','sofa'
];
    const TREE_POSITIONS = {
        lumberjack: {
            'better_tools': {x: 120, y: 60},
            'better_axe': {x: 60, y: 180},
            'auto_chop': {x: 180, y: 180},
            'fast_transport': {x: 120, y: 300},
        },
        forester: {
            'advanced_forestry': {x: 120, y: 60},
            'forest_management': {x: 60, y: 180},
            'weather_research': {x: 180, y: 180},
        },
        carpenter: {
        'efficient_sawmill': {x: 120, y: 60},
        'wood_refinement': {x: 120, y: 180},
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
    // Hier folgt der bisherige Code zum Erzeugen der Tabelle (html)
    let html = `<div style="padding:12px 0;">`;
    html += `<h2 style="margin-top:0">🪑 Möbel erforschen</h2>`;
    html += `<table style="width:100%;border-collapse:collapse;margin-top:12px;">`;
    html += `<thead><tr style="border-bottom:2px solid #333;"><th style="text-align:left;padding:8px 4px;">Möbel</th><th style="text-align:left;padding:8px 4px;">Kosten</th><th style="text-align:left;padding:8px 4px;">Aktion</th><th></th></tr></thead><tbody>`;
    MOEBEL_IDS.forEach(id => {
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
            <td style='white-space:nowrap;padding:8px 4px;font-size:1.1em;'>${researchIcons[research.id]||''} ${research.name}</td>
            <td style='white-space:nowrap;padding:8px 4px;font-size:1em;'>${Object.entries(research.cost).map(([r,a])=>`${a} <span style='font-size:1.1em;'>${r==='wood'?'🪵':'💰'}</span>`).join(' | ')}</td>
            <td style='white-space:nowrap;padding:8px 4px;'>${buttonHtml}</td>
            <td></td>
        </tr>`;
    });
    html += `</tbody></table></div>`;
    wrap.innerHTML = html;
    // Nach dem Button einfügen
    const btn = container.querySelector('#moebel-forsch-btn');
    if (btn) {
        btn.insertAdjacentElement('afterend', wrap);
    } else {
        container.appendChild(wrap);
    }
    // Event-Listener für alle Möbel-Buttons
    wrap.querySelectorAll('.moebel-unlock-btn').forEach(btn => {
        if (!btn.disabled) {
            btn.onclick = () => {
                const id = btn.getAttribute('data-id');
                console.log(`🖱️ DEBUG: Möbel-Unlock-Button geklickt für ${id}`);
                const result = researchSystem.startResearch(id);
                console.log(`🖱️ DEBUG: Forschung ${id} Ergebnis: ${result.success ? 'ERFOLG' : 'FEHLGESCHLAGEN'}`);
                if (result.success) {
                    refreshResearchModal(id);
                    // Tabelle nach Forschung sofort aktualisieren (offen lassen)
                    renderMoebelTable(container);
                }
            };
        }
    });
}
window.renderMoebelTable = renderMoebelTable;
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
        let html = `<div style='display:flex;gap:32px;align-items:flex-start;width:100%;'>`;
    html += `<div style='min-width:260px;max-width:260px;'><div style='width:100%;overflow-x:auto;'><svg id='tree-svg-${tab}' width='260' height='240'></svg></div></div>`;
        html += `<div id='tree-details-${tab}' style='flex:1;min-width:220px;margin-top:0;'></div>`;
        html += `</div>`;
        container.innerHTML = html;
    console.log(` DEBUG: HTML für ${tab} erstellt, tree-details-${tab} sollte jetzt existieren`);
        const svg = container.querySelector(`#tree-svg-${tab}`);
        // Knoten zeichnen
        ids.forEach(id => {
            const research = researchSystem.research.find(r => r.id===id);
            if(!research) return;
            const g = document.createElementNS('http://www.w3.org/2000/svg','g');
            const available = researchSystem.isResearchAvailable(research);
            const completed = research.completed;
        // Debug: completed-Status und Objekt-Referenz
        console.log(`[Tab-Skilltree] Render: id=${id}, completed=${completed}, researchObjekt===global:`, researchSystem.research.find(r => r.id===id)===research);
        // Bestimme den ausgewählten Skill basierend auf der globalen Variable
        const selected = (id === window.selectedCarpenterSkill && tab==='carpenter') || (id === window.selectedLumberjackSkill && tab==='lumberjack') || (id === window.selectedForesterSkill && tab==='forester');
        // Im Skilltree-Rendering, beim Zeichnen der Knoten:
        // Ersetze das bisherige rect durch zwei übereinanderliegende rects für den Pixelrahmen-Look
        const outerRect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        outerRect.setAttribute('x', positions[id].x-36);
        outerRect.setAttribute('y', positions[id].y-36);
        outerRect.setAttribute('width', 72);
        outerRect.setAttribute('height', 72);
        outerRect.setAttribute('fill', '#d2c1a1');
        outerRect.setAttribute('stroke', 'none');
        outerRect.setAttribute('shape-rendering', 'crispEdges');
        g.appendChild(outerRect);
            const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
            rect.setAttribute('x', positions[id].x-32);
            rect.setAttribute('y', positions[id].y-32);
            rect.setAttribute('width', 64);
            rect.setAttribute('height', 64);
        rect.setAttribute('stroke', '#2d1c16');
        rect.setAttribute('stroke-width', '8');
        rect.setAttribute('shape-rendering', 'crispEdges');
        // Setze NUR die Status-Klasse, KEIN fill mehr im JS!
        let klasse = '';
        if (completed) klasse = 'skilltree-rect skill-completed';
        else if (selected) klasse = 'skilltree-rect skill-selected';
        else klasse = 'skilltree-rect skill-default';
        rect.setAttribute('class', klasse);
        // Debug: Welche Klasse wurde gesetzt?
        console.log(`[Tab-Skilltree] id=${id}, gesetzte Klasse:`, klasse);
        rect.style.cursor = 'pointer';
        rect.addEventListener('mouseenter', () => {
            console.log(`🖱️ DEBUG: SVG-Knoten HOVER für ${id} in Tab ${tab}`);
        });
        rect.addEventListener('mouseleave', () => {
            console.log(`🖱️ DEBUG: SVG-Knoten HOVER-ENDE für ${id} in Tab ${tab}`);
        });
            rect.addEventListener('click', () => {
            console.log(`🖱️ DEBUG: SVG-Knoten KLICK für ${id} in Tab ${tab}`);
            // Setze die globale Variable für den ausgewählten Skill
            if(tab==='carpenter') window.selectedCarpenterSkill = id;
            if(tab==='lumberjack') window.selectedLumberjackSkill = id;
            if(tab==='forester') window.selectedForesterSkill = id;
            // Rendere den Skilltree neu ohne selectedIdOverride
            renderResearchTreeTab(tab);
            });
            g.appendChild(rect);
            // Icon
            const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
            icon.setAttribute('x', positions[id].x);
            icon.setAttribute('y', positions[id].y+16);
            icon.setAttribute('text-anchor', 'middle');
            icon.setAttribute('font-size', '36');
            icon.setAttribute('font-family', 'Segoe UI Emoji, Arial Unicode MS, sans-serif');
            icon.textContent = researchIcons[research.id] || '❓';
            icon.setAttribute('pointer-events', 'none');
            g.appendChild(icon);
            svg.appendChild(g);
        });
    // Nach dem Rendern: Details nur anzeigen wenn ein Skill explizit ausgewählt ist
    let selectedId = selectedIdOverride || (tab==='lumberjack' ? window.selectedLumberjackSkill : tab==='forester' ? window.selectedForesterSkill : window.selectedCarpenterSkill);
    // Nur Details anzeigen wenn der Skill im aktuellen Tab ist
    if (ids.includes(selectedId)) {
        console.log(`🌲 DEBUG: Rendere Details für ${selectedId} in Tab ${tab}`);
        renderTreeDetails(tab, selectedId);
    }
    // Schreiner-Tab: Button "Möbel erforschen" immer anzeigen
    if (tab === 'carpenter') {
        // Entferne alte Instanzen
        const oldBtn = container.querySelector('#moebel-forsch-btn');
        if (oldBtn) oldBtn.remove();
        const oldTable = container.querySelector('.moebel-table-wrap');
        if (oldTable) oldTable.remove();
        // Button einfügen
        const btn = document.createElement('button');
        btn.id = 'moebel-forsch-btn';
        btn.textContent = '🪑 Möbel erforschen';
        btn.style.fontSize = '1em';
        btn.style.padding = '8px 18px';
        btn.style.margin = '18px 0 0 0';
        btn.style.background = '#4CAF50';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.onclick = () => {
            // Toggle Möbel-Tabelle
            const existing = container.querySelector('.moebel-table-wrap');
            if (existing) {
                existing.remove();
            } else {
                renderMoebelTable(container);
            }
        };
        container.appendChild(btn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialisierung der ausgewählten Skills pro Tab (global, außerhalb der Funktion!)
    window.selectedLumberjackSkill = 'better_tools';
    window.selectedForesterSkill = 'advanced_forestry';
    window.selectedCarpenterSkill = 'efficient_sawmill';

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
            console.log('📋 DEBUG: Carpenter-Tab aktiviert');
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
            console.log('📋 DEBUG: Carpenter-Tab aktiviert');
            renderResearchTreeTab('carpenter'); 
        }
    }
});
window.renderResearchTreeTab = renderResearchTreeTab;