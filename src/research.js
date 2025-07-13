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
        requirements: ['better_tools'],
        effects: { tree_growth_rate: 1.5 },
        progress: 0,
        completed: false
    },
    {
        id: 'efficient_sawmill',
        name: 'Effiziente Sägemühle',
        description: 'Produziert mehr Holz pro Baum',
        cost: { wood: 300, gold: 150 },
        requirements: ['better_tools'],
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
        requirements: ['better_axe', 'wood_refinement'],
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
    }
];

// --- Reset-Button für Forschung ---
if (typeof window !== 'undefined') {
    window.resetResearch = function() {
        localStorage.removeItem('research');
        location.reload();
    }
}

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
    'fast_transport': '🚚'
};
let selectedResearchId = null;
function renderSkilltreeSVG() {
    const svg = document.getElementById('skilltree-svg');
    if (!svg) return;
    svg.innerHTML = '';
    const nodes = researchSystem.research;
    const positions = {
        'better_tools': {x: 130, y: 60},
        'table': {x: 50, y: 160},
        'cabinet': {x: 210, y: 160},
        'better_axe': {x: 50, y: 260},
        'advanced_forestry': {x: 130, y: 260},
        'efficient_sawmill': {x: 210, y: 260},
        'wood_refinement': {x: 50, y: 340},
        'forest_management': {x: 130, y: 340},
        'auto_chop': {x: 210, y: 340},
        'weather_research': {x: 50, y: 420},
        'fast_transport': {x: 210, y: 420}
    };
    // SVG-Höhe dynamisch anpassen
    const yValues = Object.values(positions).map(pos => pos.y);
    const maxY = Math.max(...yValues);
    svg.setAttribute('height', Math.max(500, maxY + 70));
    // Kanten zeichnen
    nodes.forEach(node => {
        node.requirements.forEach(reqId => {
            const from = positions[reqId];
            const to = positions[node.id];
            if (from && to) {
                const line = document.createElementNS('http://www.w3.org/2000/svg','line');
                line.setAttribute('x1', from.x);
                line.setAttribute('y1', from.y+32);
                line.setAttribute('x2', to.x);
                line.setAttribute('y2', to.y-32);
                line.setAttribute('stroke', '#888');
                line.setAttribute('stroke-width', '4');
                svg.appendChild(line);
            }
        });
    });
    // Quadratische Buttons zeichnen
    const size = 64; // Seitenlänge Quadrat
    nodes.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg','g');
        const available = researchSystem.isResearchAvailable(node);
        const completed = node.completed;
        const selected = selectedResearchId === node.id;
        // Quadrat als Button
        const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttribute('x', positions[node.id].x - size/2);
        rect.setAttribute('y', positions[node.id].y - size/2);
        rect.setAttribute('width', size);
        rect.setAttribute('height', size);
        rect.setAttribute('rx', 12);
        rect.setAttribute('ry', 12);
        rect.setAttribute('fill', completed ? '#b6fcb6' : (selected ? '#ffe' : '#fff'));
        rect.setAttribute('stroke', '#000');
        rect.setAttribute('stroke-width', '5');
        rect.setAttribute('filter', 'drop-shadow(2px 2px 0 #808080)');
        rect.style.cursor = available && !completed ? 'pointer' : 'default';
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
}
function renderSkilltreeDetails(id) {
    const node = researchSystem.research.find(r => r.id === id);
    const details = document.getElementById('skilltree-details');
    if (!node || !details) { details.innerHTML = ''; return; }
    const available = researchSystem.isResearchAvailable(node);
    const completed = node.completed;
    details.innerHTML = `
        <h2 style="margin-top:0">${researchIcons[node.id]||''} ${node.name}</h2>
        <p style="color:#006400;font-size:1.1em">${node.description}</p>
        <div style="margin:12px 0 8px 0;font-size:1.1em">
            <b>Kosten:</b> ${Object.entries(node.cost).map(([r,a])=>`${a} ${r==='wood'?'🪵':'💰'}`).join(' | ')}
        </div>
        <div style="margin-bottom:10px">
            <b>Status:</b> ${completed ? '<span style=\'color:#2a2\'>Abgeschlossen</span>' : (available ? 'Verfügbar' : 'Nicht verfügbar')}
        </div>
        ${(!completed && available) ? `<button id="research-unlock-btn" style="font-size:1.1em;padding:8px 18px;">Freischalten</button>` : ''}
    `;
    if (!completed && available) {
        document.getElementById('research-unlock-btn').onclick = () => {
            researchSystem.startResearch(node.id);
            renderSkilltreeSVG();
            renderSkilltreeDetails(node.id);
        };
    }
}
// --- Skilltree SVG-Rendering ENDE ---

// Patch: Skilltree-Tab anzeigen -> SVG rendern
const origShowResearchTab = window.showResearchTab;
window.showResearchTab = function(tabName) {
    origShowResearchTab(tabName);
    if(tabName==='tree') {
        renderSkilltreeSVG();
        // Default-Auswahl
        if (!selectedResearchId) {
            selectedResearchId = researchSystem.research[0].id;
        }
        renderSkilltreeDetails(selectedResearchId);
    }
}
// Auch beim Öffnen Modal initial rendern
const origOpenResearchModal = window.openResearchModal;
window.openResearchModal = function() {
    origOpenResearchModal();
    renderSkilltreeSVG();
    if (!selectedResearchId) {
        selectedResearchId = researchSystem.research[0].id;
    }
    renderSkilltreeDetails(selectedResearchId);
} 