// resources.js - Ressourcen-Modul
export class Resources {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.resources = [
            { type: 'wood', x: 150, y: 200, size: 40, collected: false },
            { type: 'wood', x: 300, y: 150, size: 35, color: '#228B22', collected: false },
            { type: 'wood', x: 500, y: 300, size: 45, color: '#228B22', collected: false },
            { type: 'stone', x: 400, y: 100, size: 30, color: '#696969', collected: false },
            { type: 'stone', x: 200, y: 400, size: 35, color: '#696969', collected: false },
            { type: 'stone', x: 600, y: 200, size: 40, color: '#696969', collected: false }
        ];
        // Bauplatz-Positionen (wie in drawBackground)
        this.buildSlots = [
            {x: 100, y: 350, w: 100, h: 60},
            {x: 250, y: 350, w: 100, h: 60},
            {x: 400, y: 350, w: 100, h: 60},
            {x: 550, y: 350, w: 100, h: 60}
        ];
    }

    render() {
        this.drawBackground();
        this.drawResources();
    }

    drawBackground() {
        // Wiese (Top-Down)
        this.ctx.fillStyle = '#6ab150';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Felder
        this.ctx.fillStyle = '#bfa76a';
        for (let i = 0; i < 4; i++) {
            this.ctx.fillRect(100 + i * 150, 350, 100, 60);
        }
        // Wege
        this.ctx.strokeStyle = '#e0c97a';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(400, 600);
        this.ctx.lineTo(400, 300);
        this.ctx.lineTo(600, 200);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
    }

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

    drawTreeTopDown(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#228B22';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 7, 0, Math.PI * 2);
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x - size/6, y - size/6, size/10, 0, Math.PI * 2);
        this.ctx.fillStyle = '#7fff7f';
        this.ctx.fill();
    }

    drawStoneTopDown(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#888';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x - size/6, y - size/8, size/6, 0, Math.PI * 2);
        this.ctx.fillStyle = '#b0b0b0';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + size/8, y + size/7, size/8, 0, Math.PI * 2);
        this.ctx.fillStyle = '#666';
        this.ctx.fill();
    }

    // Für KI/Einwohner: Finde nächste Ressource
    findNearestResource(x, y) {
        let nearest = null;
        let minDistance = Infinity;
        for (const resource of this.resources) {
            if (!resource.collected) {
                const dx = resource.x - x;
                const dy = resource.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = resource;
                }
            }
        }
        return nearest;
    }

    // Prüfe, ob auf ein Bauplatz-Feld geklickt wurde
    getClickedBuildSlot(clickX, clickY) {
        for (let i = 0; i < this.buildSlots.length; i++) {
            const slot = this.buildSlots[i];
            if (clickX >= slot.x && clickX <= slot.x + slot.w && clickY >= slot.y && clickY <= slot.y + slot.h) {
                return i;
            }
        }
        return null;
    }
} 