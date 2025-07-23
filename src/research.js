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
        requirements: ['Werkzeug'],
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

    // --- MÖBEL-FORSCHUNG ---
    {
        id: 'Möbel',
        name: 'Möbel',
        description: 'Ermöglicht die Erforschung und den Bau verschiedener Möbelstücke.',
        cost: { wood: 0, gold: 0 },
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
        cost: { wood: 120, gold: 60 },
        requirements: ['Säge'],
        effects: { can_build_table: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Schrank',
        name: 'Schrank',
        description: 'Ermöglicht den Bau von Schränken.',
        cost: { wood: 200, gold: 100 },
        requirements: ['Säge'],
        effects: { can_build_wardrobe: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Bett',
        name: 'Bett',
        description: 'Ermöglicht den Bau von Betten.',
        cost: { wood: 100, gold: 50 },
        requirements: ['Säge','Tisch'],
        effects: { can_build_bed: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Regal',
        name: 'Regal',
        description: 'Ermöglicht den Bau von Regalen.',
        cost: { wood: 50, gold: 25 },
        requirements: ['Säge','Tisch'],
        effects: { can_build_shelf: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Kommode',
        name: 'Kommode',
        description: 'Ermöglicht den Bau von Kommoden.',
        cost: { wood: 70, gold: 35 },
        requirements: ['Säge','Schrank'],
        effects: { can_build_dresser: true },
        progress: 0,
        completed: false
    },
    {
        id: 'Sofa',
        name: 'Sofa',
        description: 'Ermöglicht den Bau von Sofas.',
        cost: { wood: 120, gold: 60 },
        requirements: ['Säge','Bett','Kommode'],
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
    // Versuche, die Werte direkt aus der Anzeige zu lesen
    const scoreDiv = document.querySelector('.score.status');
    if (scoreDiv) {
        // Format: 💰 208.9 Tsd. | 🪵 5.3 Tsd. | ...
        const text = scoreDiv.textContent;
        
        // Verbesserte Regex für verschiedene Formate
        const goldMatch = text.match(/💰\s*([\d.,]+)(?:\s*(Tsd\.|Mio\.|Mrd\.|))/);
        const woodMatch = text.match(/🪵\s*([\d.,]+)(?:\s*(Tsd\.|Mio\.|Mrd\.|))/);
        
        function parseNum(val, unit) {
            let n = parseFloat(val.replace(',', '.'));
            if (unit === 'Tsd.') return n * 1000;
            if (unit === 'Mio.') return n * 1000000;
            if (unit === 'Mrd.') return n * 1000000000;
            return n;
        }
        
        let gold = 0, wood = 0;
        
        if (goldMatch) {
            gold = parseNum(goldMatch[1], goldMatch[2]);
        }
        if (woodMatch) {
            wood = parseNum(woodMatch[1], woodMatch[2]);
        }
        
        // Wenn die Werte erfolgreich gelesen wurden, verwende sie
        if (gold > 0 || wood > 0) {
            return { wood, gold };
        }
    }
    
    // Fallback: Verwende globale Variablen direkt
    if (typeof window.holz !== 'undefined' && typeof window.gold !== 'undefined') {
        return { wood: window.holz, gold: window.gold };
    }
    
    // Zusätzlicher Fallback für gameState
    if (window.game && window.game.gameState) {
        return { 
            wood: window.game.gameState.wood || 0, 
            gold: window.game.gameState.gold || 0 
        };
    }
    
    // Fallback für UI-Objekte
    if (window.game && window.game.ui) {
        return { 
            wood: window.game.ui.wood || 0, 
            gold: window.game.ui.gold || 0 
        };
    }
    
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
        const result = research.requirements.every(reqId => {
            const requiredResearch = this.research.find(r => r.id === reqId);
            const isCompleted = requiredResearch?.completed;
            return isCompleted;
        });
        

        
        return result;
    }

    // Forschung starten oder fortsetzen
    startResearch(researchId) {
        const research = this.research.find(r => r.id === researchId);
        if (!research) {
            return { success: false, error: 'Forschung nicht gefunden' };
        }
        
        if (research.completed) {
            return { success: false, error: 'Forschung bereits abgeschlossen' };
        }

        // Prüfen ob Anforderungen erfüllt sind
        const available = this.isResearchAvailable(research);
        if (!available) {
            return { success: false, error: 'Voraussetzungen nicht erfüllt' };
        }

        // Prüfen ob genügend Ressourcen vorhanden sind
        const hasResources = this.hasEnoughResources(research.cost);
        if (!hasResources) {
            return { success: false, error: 'Nicht genügend Ressourcen' };
        }

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
            window.renderSkilltreeSVG();
        }
        
        // Tab-Skilltrees auch sofort neu rendern
        if (typeof window.renderResearchTreeTab === 'function') {
            window.renderResearchTreeTab('lumberjack');
            window.renderResearchTreeTab('forester');
            window.renderResearchTreeTab('carpenter');
        }
        
        return { success: true, research: research };
    }

    // Prüfen ob genügend Ressourcen vorhanden sind
    hasEnoughResources(cost) {
        const res = window.getCurrentResources();
        
        const hasGold = res.gold >= (cost.gold || 0);
        const hasWood = res.wood >= (cost.wood || 0);
        
        return hasGold && hasWood;
    }

    // Ressourcen abziehen
    deductResources(cost) {
        const res = window.getCurrentResources();
        
        // Mehrere Methoden versuchen, um sicherzustellen, dass Ressourcen abgezogen werden
        let success = false;
        
        // Methode 1: Direkt auf die globalen Hauptspiel-Variablen zugreifen
        if (typeof window.gold !== 'undefined' && typeof window.holz !== 'undefined') {
            if (typeof cost.gold === 'number') {
                window.gold -= cost.gold;
            }
            if (typeof cost.wood === 'number') {
                window.holz -= cost.wood;
            }
            success = true;
        }
        
        // Methode 2: Über das Hauptspiel-Objekt
        if (window.game && window.game.ui) {
            if (typeof cost.gold === 'number') {
                window.game.ui.gold -= cost.gold;
            }
            if (typeof cost.wood === 'number') {
                window.game.ui.wood -= cost.wood;
            }
            success = true;
        }
        
        // Methode 3: Über gameState
        if (window.game && window.game.gameState) {
            if (typeof cost.gold === 'number') {
                window.game.gameState.gold -= cost.gold;
            }
            if (typeof cost.wood === 'number') {
                window.game.gameState.wood -= cost.wood;
            }
            success = true;
        }
        
        // UI aktualisieren - mehrere Methoden versuchen
        if (typeof window.updateDisplay === 'function') {
            window.updateDisplay();
        }
        
        if (typeof window.updateScoreStatus === 'function') {
            window.updateScoreStatus();
        }
        
        if (window.game && typeof window.game.updateDisplay === 'function') {
            window.game.updateDisplay();
        }
    }

    // Forschungseffekte anwenden
    applyResearchEffects(research) {
        if (!research.effects) return;
        
        // Möbelbau aktualisieren, falls es sich um Möbel-Forschung handelt
        if (typeof window.updateMoebelVisibility === 'function') {
            window.updateMoebelVisibility();
        }
        
        // Apply each effect based on its type
        Object.keys(research.effects).forEach(effectType => {
            const effectValue = research.effects[effectType];
            
            switch(effectType) {
                case 'wood_multiplier':
                    // Apply wood collection multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.woodMultiplier = (window.gameEffects.woodMultiplier || 1) * effectValue;
                    break;
                    
                case 'chop_speed':
                    // Apply chopping speed multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.chopSpeed = (window.gameEffects.chopSpeed || 1) * effectValue;
                    break;
                    
                case 'tree_growth_rate':
                    // Apply tree regeneration speed
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.treeGrowthRate = (window.gameEffects.treeGrowthRate || 1) * effectValue;
                    break;
                    
                case 'wood_per_tree':
                    // Apply wood per tree multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.woodPerTree = (window.gameEffects.woodPerTree || 1) * effectValue;
                    break;
                    
                case 'wood_value':
                    // Apply wood value multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.woodValue = (window.gameEffects.woodValue || 1) * effectValue;
                    break;
                    
                case 'forest_efficiency':
                    // Apply forest efficiency
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.forestEfficiency = (window.gameEffects.forestEfficiency || 1) * effectValue;
                    break;
                    
                case 'transport_speed':
                    // Apply transport speed multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.transportSpeed = (window.gameEffects.transportSpeed || 1) * effectValue;
                    break;
                    
                case 'auto_chop':
                    // Enable automatic chopping
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.autoChop = effectValue;
                    break;
                    
                case 'weather_prediction':
                    // Enable weather prediction
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.weatherPrediction = effectValue;
                    break;
                    
                case 'bulk_harvest':
                    // Enable bulk harvesting
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.bulkHarvest = effectValue;
                    break;
                    
                case 'wood_quality':
                    // Apply wood quality multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.woodQuality = (window.gameEffects.woodQuality || 1) * effectValue;
                    break;
                    
                case 'wood_durability':
                    // Apply wood durability multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.woodDurability = (window.gameEffects.woodDurability || 1) * effectValue;
                    break;
                    
                case 'tree_detection':
                    // Apply tree detection range multiplier
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects.treeDetection = (window.gameEffects.treeDetection || 1) * effectValue;
                    break;
                    
                // Furniture building capabilities
                case 'can_build_chair':
                case 'can_build_table':
                case 'can_build_wardrobe': 
                case 'can_build_bed':
                case 'can_build_shelf':
                case 'can_build_dresser':
                case 'can_build_sofa':
                case 'can_build_cabinet':
                    if (!window.gameEffects) window.gameEffects = {};
                    if (!window.gameEffects.canBuild) window.gameEffects.canBuild = {};
                    window.gameEffects.canBuild[effectType] = effectValue;
                    break;
                    
                default:
                    // Generic effect handling
                    if (!window.gameEffects) window.gameEffects = {};
                    window.gameEffects[effectType] = effectValue;
                    break;
            }
        });
        
        // Notify status system about research completion
        if (window.statusSystem) {
            window.statusSystem.showToast(`🔬 Research "${research.name}" completed!`, "success");
        }
        
        // Update displays that might be affected by the new effects
        if (window.updateDisplay) {
            window.updateDisplay();
        }
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
    const button = document.getElementById(`research-btn-${tab}`);
    if (button) {
        button.click();
    }
};

// Globale Funktion zum Testen aller Forschungsbuttons
window.testAllResearchButtons = function() {
    // Teste Tab-Buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Teste Forschungsbuttons
    const researchButtons = document.querySelectorAll('.research-button');
};

// Globale Funktion zum manuellen Testen einer Forschung
window.testResearch = function(researchId) {
    const result = researchSystem.startResearch(researchId);
    return result.success;
};

// Globale Funktion zum Anzeigen aller verfügbaren Forschungen
window.showAvailableResearch = function() {
    researchSystem.research.forEach(research => {
        const available = researchSystem.isResearchAvailable(research);
        const completed = research.completed;
        const enoughResources = researchSystem.hasEnoughResources(research.cost);
    });
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
    
    // Ressourcenanzeige aktualisieren
    updateResearchResources();
};

// Funktion zum Aktualisieren der Ressourcenanzeige im Forschungsmodal
function updateResearchResources() {
    const resources = window.getCurrentResources();
    const goldElement = document.getElementById('research-gold');
    const woodElement = document.getElementById('research-wood');
    
    if (goldElement) {
        goldElement.textContent = Math.floor(resources.gold).toLocaleString();
    }
    if (woodElement) {
        woodElement.textContent = Math.floor(resources.wood).toLocaleString();
    }
    
    // Möbelforschungstabelle neu rendern, falls sichtbar
    const moebelTablePlaceholder = document.querySelector('#moebel-table-placeholder');
    if (moebelTablePlaceholder) {
        window.renderMoebelTable(moebelTablePlaceholder);
    }
}

// Globale Funktion zum manuellen Aktualisieren der Möbelforschungstabelle
window.refreshMoebelTable = function() {
    const moebelTablePlaceholder = document.querySelector('#moebel-table-placeholder');
    if (moebelTablePlaceholder) {
        window.renderMoebelTable(moebelTablePlaceholder);
    }
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
        return;
    }
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
        } else if (selected) {
            rect.setAttribute('class', 'skilltree-rect skill-selected');
        } else {
            rect.setAttribute('class', 'skilltree-rect skill-default');
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
}
function renderSkilltreeDetails(id) {
    const details = document.getElementById('research-details');
    
    const node = researchSystem.research.find(r => r.id === id);
    if (!details || !node) {
        return;
    }
    

    
    // Standard-Detailanzeige für alle anderen Forschungen
    const available = researchSystem.isResearchAvailable(node);
    const completed = node.completed;
    const enoughResources = researchSystem.hasEnoughResources(node.cost);
    
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
        
        if (button) {
            button.onclick = () => {
                const result = researchSystem.startResearch(node.id);
                if (result.success) {
                    refreshResearchModal(node.id);
                }
            };
        }
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
        // Prüfe ob die Säge erforscht wurde
        const saegeResearch = researchSystem.research.find(r => r.id === 'Säge');
        if (saegeResearch && saegeResearch.completed) {
            // Direkt die Möbel-Tabelle als Teil der Infocard anzeigen (ohne Button)
            details.innerHTML = `<div id="moebel-table-placeholder"></div>`;
            window.renderMoebelTable(details.querySelector('#moebel-table-placeholder'));
        } else {
            // Zeige Nachricht, dass Säge erforscht werden muss
            details.innerHTML = `
                <h3 style='margin-top:0'>${researchIcons['Möbel']||''} Möbel</h3>
                <p>Die Möbelforschung ist noch nicht verfügbar.</p>
                <div style='margin-top:10px;'><b>Voraussetzung:</b> Säge erforschen</div>
                <div style='margin-top:10px;color:#a22;'>❌ Säge-Forschung erforderlich</div>
            `;
        }
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
                const result = researchSystem.startResearch(id);
                if (result.success) {
                    // Vollständigen Research-Modal Refresh durchführen
                    refreshResearchModal(id);
                } else {
                    if (result.error) {
                        alert(result.error);
                    } else {
                        alert('Forschung konnte nicht gestartet werden. Prüfe Ressourcen und Voraussetzungen!');
                    }
                }
            };
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
    
    // 6. Zusätzliche Verzögerung für Möbelbau-Update
    setTimeout(() => {
        if (typeof window.updateMoebelVisibility === 'function') {
            window.updateMoebelVisibility();
        }
    }, 100);
    
    // 6. Ressourcenanzeige aktualisieren
    updateResearchResources();

    
    // --- ZUSÄTZLICH: Schreiner-Tab komplett neu rendern, falls Möbeltabelle sichtbar ---
    const carpenterTab = document.getElementById('researchCarpenter');
    if (carpenterTab && carpenterTab.style.display !== 'none') {
        renderResearchTreeTab('carpenter');
    }
    
    // --- SPEZIELLE BEHANDLUNG FÜR SÄGE-FORSCHUNG ---
    if (researchedId === 'Säge') {
        // Schreiner-Tab sofort neu rendern, falls sichtbar, um Möbel-Verfügbarkeit zu aktualisieren
        if (carpenterTab && carpenterTab.style.display !== 'none') {
            renderResearchTreeTab('carpenter');
        }
    }
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
        'Werkzeug',
        'Säge',
        'Veredelung',
        'Möbel'
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
            'Werkzeug': {x: 160, y: 64},
            'Säge': {x: 160, y: 184},
            'Veredelung': {x: 100, y: 304},
            'Möbel': {x: 220, y: 304},
        }
};

// --- Möbel-Tabelle global ---
function renderMoebelTable(container) {
    // Entferne alte Tabelle, falls vorhanden
    const old = container.querySelector('.moebel-table-wrap');
    if (old) old.remove();
    // Erzeuge neuen Wrapper
    const wrap = document.createElement('div');
    wrap.className = 'moebel-table-wrap';
    let moebelIcon = researchIcons['Möbel'] || '';
    let html = `<div style='font-family:"Press Start 2P", "VT323", "Pixel", monospace;font-size:1.3em;color:#000;margin-bottom:12px;'><span style="font-size:1.2em;vertical-align:middle;">${moebelIcon}</span> Möbelforschung</div>`;
    html += renderMoebelResearchTable();
    wrap.innerHTML = html;
    container.appendChild(wrap);
    
    // Event-Listener für alle Möbel-Buttons hinzufügen
    const buttons = wrap.querySelectorAll('.moebel-unlock-btn');
    
    buttons.forEach((btn, index) => {
        if (!btn.disabled) {
            btn.onclick = () => {
                const fid = btn.getAttribute('data-id');
                const result = researchSystem.startResearch(fid);
                if (result.success) {
                    refreshResearchModal(fid);
                } else {
                    if (result.error) {
                        alert(result.error);
                    } else {
                        alert('Forschung konnte nicht gestartet werden. Prüfe Ressourcen und Voraussetzungen!');
                    }
                }
            };
        }
    });
    

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
        
        // Direkte Ressourcenprüfung - Priorität auf globale Variablen
        let currentResources = { wood: 0, gold: 0 };
        
        // Methode 1: Direkt globale Variablen verwenden (höchste Priorität)
        if (typeof window.holz !== 'undefined') currentResources.wood = window.holz;
        if (typeof window.gold !== 'undefined') currentResources.gold = window.gold;
        
        // Methode 2: Fallback auf getCurrentResources()
        if (currentResources.wood === 0 && currentResources.gold === 0) {
            try {
                currentResources = window.getCurrentResources();
            } catch (e) {
                console.warn('getCurrentResources() fehlgeschlagen:', e);
            }
        }
        
        // Methode 3: Fallback auf gameState
        if (currentResources.wood === 0 && currentResources.gold === 0) {
            if (window.game && window.game.gameState) {
                currentResources.wood = window.game.gameState.wood || 0;
                currentResources.gold = window.game.gameState.gold || 0;
            }
        }
        
        // Methode 4: Fallback auf UI-Objekte
        if (currentResources.wood === 0 && currentResources.gold === 0) {
            if (window.game && window.game.ui) {
                currentResources.wood = window.game.ui.wood || 0;
                currentResources.gold = window.game.ui.gold || 0;
            }
        }
        
        const hasEnoughWood = currentResources.wood >= (research.cost.wood || 0);
        const hasEnoughGold = currentResources.gold >= (research.cost.gold || 0);
        const enoughResources = hasEnoughWood && hasEnoughGold;
        

        
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
                tooltip = `Nicht genug Ressourcen (Benötigt: ${research.cost.wood || 0}🪵 ${research.cost.gold || 0}💰, Hat: ${Math.floor(currentResources.wood)}🪵 ${Math.floor(currentResources.gold)}💰)`;
            }
            // Button ist aktiv wenn verfügbar UND genug Ressourcen
            const buttonActive = available && enoughResources;
            buttonHtml = `<button class="moebel-unlock-btn" data-id="${research.id}" style="font-size:1em;padding:4px 10px;min-width:32px;${!buttonActive ? 'opacity:0.5;' : ''}" ${buttonActive ? '' : 'disabled'} title="${tooltip}">🔓 Forschen</button>`;
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
        return;
    }
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
    const svg = container.querySelector(`#tree-svg-${tab}`);
    if (!svg) {
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
            return;
        }
        
        // Spezielle Behandlung für Möbel-Forschung: Immer anzeigen, aber Status basierend auf Säge-Forschung
        if (id === 'Möbel') {
            const saegeResearch = researchSystem.research.find(r => r.id === 'Säge');
            if (!saegeResearch || !saegeResearch.completed) {
                // Möbel-Skill anzeigen, aber als nicht verfügbar markieren
                const g = document.createElementNS('http://www.w3.org/2000/svg','g');
                g.setAttribute('data-skill-id', id);
                
                const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
                rect.setAttribute('x', positions[id].x - size/2 + 2);
                rect.setAttribute('y', positions[id].y - size/2 + 2);
                rect.setAttribute('width', size - 4);
                rect.setAttribute('height', size - 4);
                rect.setAttribute('rx', '0');
                rect.setAttribute('ry', '0');
                rect.setAttribute('class', 'skilltree-rect skill-default');
                rect.style.cursor = 'pointer';
                rect.addEventListener('click', () => {
                    if(tab==='carpenter') window.selectedCarpenterSkill = id;
                    renderResearchTreeTab(tab);
                });
                g.appendChild(rect);
                
                const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
                icon.setAttribute('x', positions[id].x);
                icon.setAttribute('y', positions[id].y + 2);
                icon.setAttribute('text-anchor', 'middle');
                icon.setAttribute('dominant-baseline', 'middle');
                icon.setAttribute('font-size', '32');
                icon.setAttribute('font-family', 'Segoe UI Emoji, Arial Unicode MS, sans-serif');
                icon.textContent = researchIcons[id] || '❓';
                icon.setAttribute('pointer-events', 'none');
                g.appendChild(icon);
                
                svg.appendChild(g);
                return; // Weiter zum nächsten Skill
            }
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
            if(tab==='carpenter') window.selectedCarpenterSkill = id;
            if(tab==='lumberjack') window.selectedLumberjackSkill = id;
            if(tab==='forester') window.selectedForesterSkill = id;
            renderResearchTreeTab(tab);
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
        document.querySelectorAll('.research-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        if(tabName==='lumberjack') { 
            document.getElementById('researchLumberjack').style.display = 'block'; 
            renderResearchTreeTab('lumberjack'); 
        }
        if(tabName==='forester') { 
            document.getElementById('researchForester').style.display = 'block'; 
            renderResearchTreeTab('forester'); 
        }
        if(tabName==='carpenter') { 
            document.getElementById('researchCarpenter').style.display = 'block'; 
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