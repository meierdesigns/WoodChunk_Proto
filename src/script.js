// Mittelalter Wirtschaftssimulation - Hauptspiel-Logik
class MedievalEconomyGame {
    constructor() {
        // Canvas und Kontext initialisieren
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Spielzustand
        this.gameState = {
            wood: 0,
            stone: 0,
            lastSave: null,
            aiActive: true
        };
        
        // Ressourcen-Positionen (Wald und Steinbruch)
        this.resources = [
            { type: 'wood', x: 150, y: 200, size: 40, color: '#228B22', collected: false },
            { type: 'wood', x: 300, y: 150, size: 35, color: '#228B22', collected: false },
            { type: 'wood', x: 500, y: 300, size: 45, color: '#228B22', collected: false },
            { type: 'stone', x: 400, y: 100, size: 30, color: '#696969', collected: false },
            { type: 'stone', x: 200, y: 400, size: 35, color: '#696969', collected: false },
            { type: 'stone', x: 600, y: 200, size: 40, color: '#696969', collected: false }
        ];
        
        // KI-Cursor Eigenschaften
        this.aiCursor = {
            x: 50,
            y: 50,
            targetX: 50,
            targetY: 50,
            speed: 2,
            collecting: false,
            collectionTime: 0,
            collectionDuration: 2000 // 2 Sekunden zum Sammeln
        };
        
        // UI-Elemente
        this.woodCount = document.getElementById('wood-count');
        this.stoneCount = document.getElementById('stone-count');
        this.lastSaveText = document.getElementById('last-save');
        this.aiCursorElement = document.getElementById('ai-cursor');
        // Ressourcen-Info-Overlay
        this.resourceInfo = document.getElementById('resource-info');
        
        // Event-Listener
        this.setupEventListeners();
        
        // Spiel laden und starten
        this.loadGame();
        this.startGame();
        
        // Automatisches Speichern alle 10 Sekunden
        setInterval(() => this.saveGame(), 10000);
    }
    
    // Event-Listener einrichten
    setupEventListeners() {
        document.getElementById('reset-game').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('toggle-ai').addEventListener('click', () => {
            this.toggleAI();
        });
        // Klick auf Canvas für Ressourcen-Info
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    }
    
    // Spiel starten
    startGame() {
        this.gameLoop();
    }
    
    // Hauptspiel-Schleife
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    // Spiel-Logik aktualisieren
    update() {
        if (this.gameState.aiActive) {
            this.updateAI();
        }
    }
    
    // KI-Logik aktualisieren
    updateAI() {
        // Wenn der KI-Cursor gerade sammelt
        if (this.aiCursor.collecting) {
            this.aiCursor.collectionTime += 16; // ~60 FPS
            
            if (this.aiCursor.collectionTime >= this.aiCursor.collectionDuration) {
                this.collectResource();
                this.aiCursor.collecting = false;
                this.aiCursor.collectionTime = 0;
            }
            return;
        }
        
        // Nächste Ressource finden
        const nearestResource = this.findNearestResource();
        
        if (nearestResource) {
            // Zum Ziel bewegen
            const dx = nearestResource.x - this.aiCursor.x;
            const dy = nearestResource.y - this.aiCursor.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 5) {
                // Am Ziel angekommen - Sammeln starten
                this.aiCursor.collecting = true;
                this.aiCursor.collectionTime = 0;
            } else {
                // Zum Ziel bewegen
                const angle = Math.atan2(dy, dx);
                this.aiCursor.x += Math.cos(angle) * this.aiCursor.speed;
                this.aiCursor.y += Math.sin(angle) * this.aiCursor.speed;
            }
        }
        
        // KI-Cursor Position im DOM aktualisieren
        this.updateAICursorPosition();
    }
    
    // Nächste verfügbare Ressource finden
    findNearestResource() {
        let nearest = null;
        let minDistance = Infinity;
        
        for (const resource of this.resources) {
            if (!resource.collected) {
                const dx = resource.x - this.aiCursor.x;
                const dy = resource.y - this.aiCursor.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = resource;
                }
            }
        }
        
        return nearest;
    }
    
    // Ressource sammeln
    collectResource() {
        const nearestResource = this.findNearestResource();
        
        if (nearestResource) {
            nearestResource.collected = true;
            
            if (nearestResource.type === 'wood') {
                this.gameState.wood += Math.floor(Math.random() * 3) + 1; // 1-3 Holz
            } else if (nearestResource.type === 'stone') {
                this.gameState.stone += Math.floor(Math.random() * 2) + 1; // 1-2 Stein
            }
            
            this.updateUI();
        }
    }
    
    // KI-Cursor Position im DOM aktualisieren
    updateAICursorPosition() {
        const canvasRect = this.canvas.getBoundingClientRect();
        const x = canvasRect.left + this.aiCursor.x;
        const y = canvasRect.top + this.aiCursor.y;
        
        this.aiCursorElement.style.left = x + 'px';
        this.aiCursorElement.style.top = y + 'px';
    }
    
    // Spiel rendern
    render() {
        // Canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Hintergrund zeichnen (Top-Down-Ansicht)
        this.drawBackground();
        
        // Ressourcen zeichnen (Top-Down)
        this.drawResources();
        
        // KI-Cursor auf Canvas zeichnen (zusätzlich zum DOM-Element)
        this.drawAICursor();
    }
    
    // Hintergrund zeichnen (Top-Down-Ansicht)
    drawBackground() {
        // Wiese (Top-Down)
        this.ctx.fillStyle = '#6ab150';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Felder (rechteckige Parzellen)
        this.ctx.fillStyle = '#bfa76a';
        for (let i = 0; i < 4; i++) {
            this.ctx.fillRect(100 + i * 150, 350, 100, 60);
        }

        // Wege (Pixelart)
        this.ctx.strokeStyle = '#e0c97a';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(400, 600);
        this.ctx.lineTo(400, 300);
        this.ctx.lineTo(600, 200);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
    }

    // Ressourcen zeichnen (Top-Down)
    drawResources() {
        for (const resource of this.resources) {
            if (!resource.collected) {
                if (resource.type === 'wood') {
                    this.drawTreeTopDown(resource.x, resource.y, resource.size);
                } else if (resource.type === 'stone') {
                    this.drawStoneTopDown(resource.x, resource.y, resource.size);
                }
            }
        }
    }

    // Baum von oben (Kreis mit Stamm in der Mitte)
    drawTreeTopDown(x, y, size) {
        // Baumkrone
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#228B22';
        this.ctx.fill();
        // Stamm (kleiner brauner Punkt in der Mitte)
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 7, 0, Math.PI * 2);
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fill();
        // Pixel-Highlight
        this.ctx.beginPath();
        this.ctx.arc(x - size/6, y - size/6, size/10, 0, Math.PI * 2);
        this.ctx.fillStyle = '#7fff7f';
        this.ctx.fill();
    }

    // Stein von oben (unregelmäßiger grauer Kreis)
    drawStoneTopDown(x, y, size) {
        // Hauptstein
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#888';
        this.ctx.fill();
        // Pixel-Details
        this.ctx.beginPath();
        this.ctx.arc(x - size/6, y - size/8, size/6, 0, Math.PI * 2);
        this.ctx.fillStyle = '#b0b0b0';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + size/8, y + size/7, size/8, 0, Math.PI * 2);
        this.ctx.fillStyle = '#666';
        this.ctx.fill();
    }
    
    // KI-Cursor auf Canvas zeichnen
    drawAICursor() {
        this.ctx.fillStyle = '#FF0000';
        this.ctx.beginPath();
        this.ctx.arc(this.aiCursor.x, this.aiCursor.y, 8, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Sammel-Animation
        if (this.aiCursor.collecting) {
            const progress = this.aiCursor.collectionTime / this.aiCursor.collectionDuration;
            this.ctx.strokeStyle = '#FFD700';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(this.aiCursor.x, this.aiCursor.y, 15, 0, Math.PI * 2 * progress);
            this.ctx.stroke();
        }
    }
    
    // UI aktualisieren
    updateUI() {
        this.woodCount.textContent = this.gameState.wood;
        this.stoneCount.textContent = this.gameState.stone;
    }
    
    // Spiel speichern
    saveGame() {
        const saveData = {
            gameState: this.gameState,
            resources: this.resources,
            aiCursor: this.aiCursor,
            timestamp: new Date().toLocaleString('de-DE')
        };
        
        localStorage.setItem('medievalEconomyGame', JSON.stringify(saveData));
        this.lastSaveText.textContent = `Letzter Speicherpunkt: ${saveData.timestamp}`;
    }
    
    // Spiel laden
    loadGame() {
        const savedData = localStorage.getItem('medievalEconomyGame');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.gameState = data.gameState || this.gameState;
                this.resources = data.resources || this.resources;
                this.aiCursor = data.aiCursor || this.aiCursor;
                
                this.updateUI();
                this.lastSaveText.textContent = `Letzter Speicherpunkt: ${data.timestamp || 'Unbekannt'}`;
                
                console.log('Spiel erfolgreich geladen');
            } catch (error) {
                console.error('Fehler beim Laden des Spiels:', error);
            }
        }
    }
    
    // Spiel zurücksetzen
    resetGame() {
        if (confirm('Möchten Sie das Spiel wirklich zurücksetzen? Alle Fortschritte gehen verloren.')) {
            this.gameState = {
                wood: 0,
                stone: 0,
                lastSave: null,
                aiActive: true
            };
            
            this.resources.forEach(resource => {
                resource.collected = false;
            });
            
            this.aiCursor = {
                x: 50,
                y: 50,
                targetX: 50,
                targetY: 50,
                speed: 2,
                collecting: false,
                collectionTime: 0,
                collectionDuration: 2000
            };
            
            localStorage.removeItem('medievalEconomyGame');
            this.updateUI();
            this.lastSaveText.textContent = 'Letzter Speicherpunkt: Nie';
        }
    }
    
    // KI ein-/ausschalten
    toggleAI() {
        this.gameState.aiActive = !this.gameState.aiActive;
        const button = document.getElementById('toggle-ai');
        
        if (this.gameState.aiActive) {
            button.textContent = '⏸️ KI pausieren';
        } else {
            button.textContent = '▶️ KI starten';
        }
    }

    // Klick auf Canvas: Zeige Info zu Ressource
    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        // Prüfe, ob Klick in der Nähe einer Ressource ist
        for (const resource of this.resources) {
            if (!resource.collected) {
                const dx = resource.x - clickX;
                const dy = resource.y - clickY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < resource.size/2 + 8) {
                    // Info anzeigen
                    let info = '';
                    if (resource.type === 'wood') {
                        info = '🌳 Baum\nGibt 1-3 Holz';
                    } else if (resource.type === 'stone') {
                        info = '⛰️ Steinbruch\nGibt 1-2 Stein';
                    }
                    this.showResourceInfo(info, clickX, clickY);
                    return;
                }
            }
        }
    }

    // Zeige Info-Overlay an Position
    showResourceInfo(text, x, y) {
        this.resourceInfo.textContent = '';
        for (const line of text.split('\n')) {
            const span = document.createElement('span');
            span.textContent = line;
            this.resourceInfo.appendChild(span);
            this.resourceInfo.appendChild(document.createElement('br'));
        }
        this.resourceInfo.style.display = 'block';
        // Position relativ zum Canvas (und .game-area)
        this.resourceInfo.style.left = (this.canvas.offsetLeft + x - 60) + 'px';
        this.resourceInfo.style.top = (this.canvas.offsetTop + y - 50) + 'px';
        // Nach 2 Sekunden ausblenden
        clearTimeout(this.infoTimeout);
        this.infoTimeout = setTimeout(() => {
            this.resourceInfo.style.display = 'none';
        }, 2000);
    }
}

// Spiel starten wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    new MedievalEconomyGame();
}); 