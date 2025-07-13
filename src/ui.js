// ui.js - UI-Modul
export class UI {
    constructor(resources) {
        this.resources = resources;
        this.population = [];
        this.selectedPerson = null;
        this.overlay = document.getElementById('population-overlay');
        this.populationCount = document.getElementById('population-count');
        this.populationInfo = document.getElementById('population-info');
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.woodCount = document.getElementById('wood-count');
        this.stoneCount = document.getElementById('stone-count');
        this.wood = 0;
        this.stone = 0;
        this.initPopulation();
        this.updatePopulationUI();
        this.setupCanvasClickHandler();
    }

    // Initialisiere Einwohner mit Zufallswerten und Startpositionen
    initPopulation() {
        this.population = [];
        const names = ['Anna', 'Bernd', 'Clara', 'Dieter', 'Emma', 'Fritz', 'Greta', 'Hans', 'Ida', 'Jakob'];
        for (let i = 0; i < 5; i++) {
            this.population.push({
                id: i+1,
                name: names[Math.floor(Math.random()*names.length)],
                job: JOBS[Math.floor(Math.random()*JOBS.length)],
                age: Math.floor(Math.random()*40)+15,
                happiness: Math.floor(Math.random()*41)+60,
                status: 'Arbeitet',
                x: 80 + Math.random()*600,
                y: 400 + Math.random()*120,
                speed: 1.2 + Math.random()*0.8,
                collecting: false,
                collectionTime: 0,
                collectionDuration: 2000,
                target: null
            });
        }
    }

    // Einwohnerzahl in UI anzeigen
    updatePopulationUI() {
        this.populationCount.textContent = this.population.length;
    }

    // Einwohner bewegen und Ressourcen abbauen
    update() {
        for (const person of this.population) {
            if (person.collecting) {
                person.collectionTime += 16;
                if (person.collectionTime >= person.collectionDuration) {
                    if (person.target) {
                        // Ressource abbauen und zählen
                        if (person.target.type === 'wood') {
                            const amount = Math.floor(Math.random() * 3) + 1;
                            this.wood += amount;
                        } else if (person.target.type === 'stone') {
                            const amount = Math.floor(Math.random() * 2) + 1;
                            this.stone += amount;
                        }
                        this.updateResourceUI();
                        person.target.collected = true;
                        person.status = 'Arbeitet';
                    }
                    person.collecting = false;
                    person.collectionTime = 0;
                    person.target = null;
                }
                continue;
            }
            // Ziel suchen
            if (!person.target) {
                person.target = this.resources.findNearestResource(person.x, person.y);
            }
            if (person.target) {
                const dx = person.target.x - person.x;
                const dy = person.target.y - person.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < (person.target.size/2 + 10)) {
                    person.collecting = true;
                    person.collectionTime = 0;
                    person.status = 'Sammelt';
                } else {
                    const angle = Math.atan2(dy, dx);
                    person.x += Math.cos(angle) * person.speed;
                    person.y += Math.sin(angle) * person.speed;
                    person.status = 'Geht zu Ressource';
                }
            } else {
                person.status = 'Wartet';
            }
        }
    }

    updateResourceUI() {
        this.woodCount.textContent = this.wood;
        this.stoneCount.textContent = this.stone;
    }

    // Einwohner auf Canvas zeichnen
    render() {
        for (const person of this.population) {
            // Wähle Farbe je nach Beruf
            let color = '#fff';
            if (person.job === 'Holzfäller') color = '#228B22';
            else if (person.job === 'Steinmetz') color = '#888';
            else if (person.job === 'Bauer') color = '#bfa76a';
            else if (person.job === 'Jäger') color = '#a0522d';
            else if (person.job === 'Schmied') color = '#5555ff';
            else if (person.job === 'Kind') color = '#ffb347';
            else color = '#ffd700';
            // Pixelblock (8x8)
            this.ctx.fillStyle = color;
            this.ctx.fillRect(Math.round(person.x)-4, Math.round(person.y)-4, 8, 8);
            // Optional: Sammel-Animation als Pixelrahmen
            if (person.collecting) {
                this.ctx.strokeStyle = '#FFD700';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(Math.round(person.x)-6, Math.round(person.y)-6, 12, 12);
            }
        }
    }

    // Klick auf Einwohner-Figur
    setupCanvasClickHandler() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            for (const person of this.population) {
                const dx = person.x - clickX;
                const dy = person.y - clickY;
                if (Math.sqrt(dx*dx + dy*dy) < 16) {
                    this.showPersonDetails(person, clickX, clickY);
                    return;
                }
            }
        });
    }

    // Details zu einer Person als Overlay anzeigen
    showPersonDetails(person, x, y) {
        this.overlay.innerHTML = '';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className = 'close-btn';
        this.overlay.appendChild(closeBtn);
        const title = document.createElement('h2');
        title.textContent = 'Einwohner';
        this.overlay.appendChild(title);
        this.renderPersonDetails(person);
        this.overlay.style.display = 'block';
    }

    renderPersonDetails(person) {
        const details = document.createElement('div');
        details.className = 'population-details';
        details.innerHTML = `
            <b>Name:</b> ${person.name}<br>
            <b>Beruf:</b> ${person.job}<br>
            <b>Alter:</b> ${person.age}<br>
            <b>Zufriedenheit:</b> ${person.happiness}<br>
            <b>Status:</b> ${person.status}
        `;
        this.overlay.appendChild(details);
    }

    // Overlay verstecken
    hidePopulationOverlay() {
        this.selectedPerson = null;
        this.overlay.style.display = 'none';
    }

    // Einwohner-Overlay-Button
    setupEventListeners() {
        this.populationInfo.addEventListener('click', () => this.showPopulationOverlay());
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-btn')) {
                this.hidePopulationOverlay();
            }
        });
    }

    // Overlay mit Liste aller Einwohner
    showPopulationOverlay() {
        this.overlay.innerHTML = '';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className = 'close-btn';
        this.overlay.appendChild(closeBtn);
        const title = document.createElement('h2');
        title.textContent = 'Einwohner';
        this.overlay.appendChild(title);
        const list = document.createElement('div');
        list.className = 'population-list';
        this.population.forEach(person => {
            const item = document.createElement('div');
            item.className = 'population-list-item';
            item.textContent = `${person.name} (${person.job})`;
            item.onclick = () => this.showPersonDetails(person);
            list.appendChild(item);
        });
        this.overlay.appendChild(list);
        if (this.selectedPerson) {
            this.renderPersonDetails(this.selectedPerson);
        }
        this.overlay.style.display = 'block';
    }

    // Beim Reset auch Ressourcen-Zähler zurücksetzen
    resetResources() {
        this.wood = 0;
        this.stone = 0;
        this.updateResourceUI();
    }
}

export const JOBS = ['Holzfäller', 'Steinmetz', 'Bauer', 'Kind', 'Bürger', 'Jäger', 'Schmied', 'Förster']; 