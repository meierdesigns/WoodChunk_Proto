// ai.js - KI-Cursor-Modul
export class AICursor {
    constructor(resources, canvas) {
        this.resources = resources;
        this.canvas = canvas;
        // Cursor-Status
        this.x = 50;
        this.y = 50;
        this.speed = 2;
        this.collecting = false;
        this.collectionTime = 0;
        this.collectionDuration = 2000;
        this.active = true;
    }

    update() {
        if (!this.active) return;
        if (this.collecting) {
            this.collectionTime += 16;
            if (this.collectionTime >= this.collectionDuration) {
                this.resources.collectResourceAt(this.x, this.y);
                this.collecting = false;
                this.collectionTime = 0;
            }
            return;
        }
        // Nächste Ressource finden
        const nearest = this.resources.findNearestResource(this.x, this.y);
        if (nearest) {
            const dx = nearest.x - this.x;
            const dy = nearest.y - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 5) {
                this.collecting = true;
                this.collectionTime = 0;
            } else {
                const angle = Math.atan2(dy, dx);
                this.x += Math.cos(angle) * this.speed;
                this.y += Math.sin(angle) * this.speed;
            }
        }
    }

    render(ctx) {
        // Cursor zeichnen
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Sammel-Animation
        if (this.collecting) {
            const progress = this.collectionTime / this.collectionDuration;
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 15, 0, Math.PI * 2 * progress);
            ctx.stroke();
        }
    }

    // Prüfe, ob auf den Cursor geklickt wurde
    isClicked(clickX, clickY) {
        const dx = this.x - clickX;
        const dy = this.y - clickY;
        return Math.sqrt(dx*dx + dy*dy) < 12;
    }

    // Eigenschaften für das Info-Overlay
    getInfo() {
        return `🤖 KI-Cursor\nPosition: (${Math.round(this.x)}, ${Math.round(this.y)})\nStatus: ${this.active ? (this.collecting ? 'Sammelt' : 'Bereit') : 'Pausiert'}\nGeschwindigkeit: ${this.speed}`;
    }
} 