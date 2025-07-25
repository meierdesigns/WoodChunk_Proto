/**
 * Game Core Module
 * Main game logic and state management
 */
class GameCore {
  constructor() {
    this.gameState = this.initializeGameState();
    this.init();
  }

  initializeGameState() {
    return {
      // Resources
      gold: 0,
      holz: 0,
      trees: 10,
      
      // Workers
      workers: 1,
      foresters: 1,
      carpenters: 0,
      
      // Tool levels
      toolLevel: 1,
      plantToolLevel: 1,
      carpenterToolLevel: 1,
      
      // Progress
      progress: 0,
      foresterProgress: 0,
      carpenterProgress: 0,
      
      // Constants
      CARPENTER_MAX: 40,
      workerBaseCost: 20,
      foresterBaseCost: 25,
      carpenterBaseCost: 30,
      PRICE_MULTIPLIER: 1.5,
      
      // Auto systems
      autoUpgradeState: {
        axe: false,
        plant: false,
        carpenter: false
      },
      selectedAutoFurniture: null
    };
  }

  init() {
    this.setupGlobalVariables();
    this.bindEvents();
    this.startGameLoops();
    this.loadAutoStates();
    this.loadGameFromServer();
  }

  setupGlobalVariables() {
    // Make game state globally accessible for backwards compatibility
    Object.keys(this.gameState).forEach(key => {
      window[key] = this.gameState[key];
    });
    
    // Make key functions globally available
    window.updateLocalVariables = () => this.updateLocalVariables();
    window.updateDisplay = () => this.updateDisplay();
    window.showGoldAnimation = (element, amount) => this.showGoldAnimation(element, amount);
    window.setAutoProduction = (furniture) => this.setAutoProduction(furniture);
    window.calculateWorkerPrice = (basePrice, count) => this.calculateWorkerPrice(basePrice, count);
    window.setupArbeitsamtEventHandlers = () => this.setupArbeitsamtEventHandlers();
    window.updateMoebelVisibility = () => this.updateMoebelVisibility();
    window.formatNumber = (num) => this.formatNumber(num);
  }

  bindEvents() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupResetButton();
      this.setupResearchResetButton();
      this.updateDisplay();
    });
  }

  setupResetButton() {
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
      resetBtn.onclick = () => this.resetGame();
    }
  }

  setupResearchResetButton() {
    const resetResearchBtn = document.getElementById('resetResearchBtn');
    if (resetResearchBtn) {
      resetResearchBtn.onclick = () => {
        if (window.resetResearch) {
          window.resetResearch();
        }
      };
    }
  }

  formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + ' Mrd.';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' Mio.';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + ' Tsd.';
    }
    return num.toString();
  }

  calculateWorkerPrice(basePrice, count) {
    return Math.floor(basePrice * Math.pow(this.gameState.PRICE_MULTIPLIER, count));
  }

  updateLocalVariables() {
    // Sync local variables from global variables
    Object.keys(this.gameState).forEach(key => {
      if (window[key] !== undefined) {
        this.gameState[key] = window[key];
      }
    });
  }

  updateDisplay() {
    // Sync state to window variables
    Object.keys(this.gameState).forEach(key => {
      window[key] = this.gameState[key];
    });
    
    // Update main resource display
    document.querySelectorAll('.score').forEach(scoreElem => {
      scoreElem.innerHTML = 
        `<span class="icon">🪵</span> ${this.formatNumber(this.gameState.holz)} | ` +
        `<span class="icon">🌲</span> <span id="treeCount">${this.formatNumber(this.gameState.trees)}</span> | ` +
        `<span class="icon">💰</span> ${this.formatNumber(this.gameState.gold)}`;
    });

    // Update worker counts if elements exist
    this.updateWorkerCounts();
    this.updatePrices();
    this.updateToolLevels();
    this.updateMoebelButtons();
  }

  updateWorkerCounts() {
    const elements = {
      workerCount: this.gameState.workers,
      foresterCount: this.gameState.foresters,
      carpenterCount: this.gameState.carpenters
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
  }

  updatePrices() {
    const workerPrice = this.calculateWorkerPrice(this.gameState.workerBaseCost, this.gameState.workers - 1);
    const foresterPrice = this.calculateWorkerPrice(this.gameState.foresterBaseCost, this.gameState.foresters - 1);
    const carpenterPrice = this.calculateWorkerPrice(this.gameState.carpenterBaseCost, this.gameState.carpenters);

    // Update external table prices if loaded
    const selectors = [
      { selector: '#external-arbeitsamt-container tr:nth-child(1) td:nth-child(3) span', price: workerPrice },
      { selector: '#external-arbeitsamt-container tr:nth-child(2) td:nth-child(3) span', price: foresterPrice },
      { selector: '#external-arbeitsamt-container tr:nth-child(3) td:nth-child(3) span', price: carpenterPrice }
    ];

    selectors.forEach(({ selector, price }) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = this.formatNumber(price);
    });

    // Update button states
    this.updateButtonStates(workerPrice, foresterPrice, carpenterPrice);
  }

  updateButtonStates(workerPrice, foresterPrice, carpenterPrice) {
    const buttons = [
      { id: 'hireWorkerButton', price: workerPrice },
      { id: 'hireForesterButton', price: foresterPrice },
      { id: 'hireCarpenterButton', price: carpenterPrice }
    ];

    buttons.forEach(({ id, price }) => {
      const button = document.getElementById(id);
      if (button) button.disabled = this.gameState.gold < price;
    });
  }

  updateToolLevels() {
    const toolData = [
      { levelId: 'toolLevelAxe', costId: 'toolCostAxe', btnId: 'upgradeToolButton', level: this.gameState.toolLevel },
      { levelId: 'toolLevelPlant', costId: 'toolCostPlant', btnId: 'upgradePlantToolButton', level: this.gameState.plantToolLevel },
      { levelId: 'toolLevelCarpenter', costId: 'toolCostCarpenter', btnId: 'upgradeCarpenterToolButton', level: this.gameState.carpenterToolLevel }
    ];

    toolData.forEach(({ levelId, costId, btnId, level }) => {
      const levelElement = document.getElementById(levelId);
      const costElement = document.getElementById(costId);
      const btnElement = document.getElementById(btnId);
      const cost = level * 50;

      if (levelElement) levelElement.innerText = level;
      if (costElement) costElement.innerText = this.formatNumber(cost);
      if (btnElement) btnElement.disabled = this.gameState.gold < cost;
    });
  }

  updateMoebelButtons() {
    if (!window.researchSystem) return;

    const moebelButtons = [
      {id: 'chairButton', research: 'Stuhl', cost: 10},
      {id: 'tableFurnitureButton', research: 'Tisch', cost: 20},
      {id: 'wardrobeButton', research: 'Schrank', cost: 50},
      {id: 'bedButton', research: 'Bett', cost: 60},
      {id: 'shelfButton', research: 'Regal', cost: 30},
      {id: 'dresserButton', research: 'Kommode', cost: 40},
      {id: 'sofaButton', research: 'Sofa', cost: 100}
    ];

    moebelButtons.forEach(btn => {
      const button = document.getElementById(btn.id);
      const unlocked = window.researchSystem.research.find(r => r.id === btn.research && r.completed);
      if (button) button.disabled = !(unlocked && this.gameState.holz >= btn.cost);
    });
  }

  showGoldAnimation(button, goldAmount) {
    const animElement = document.createElement('div');
    animElement.className = 'gold-animation';
    animElement.innerHTML = `+${goldAmount}💰`;
    
    const buttonRect = button.getBoundingClientRect();
    const randomOffsetX = (Math.random() - 0.5) * 40;
    const randomOffsetY = (Math.random() - 0.5) * 20;
    
    animElement.style.position = 'absolute';
    animElement.style.left = (buttonRect.left + buttonRect.width / 2 + randomOffsetX) + 'px';
    animElement.style.top = (buttonRect.top - 10 + randomOffsetY) + 'px';
    
    document.body.appendChild(animElement);
    
    setTimeout(() => {
      if (animElement.parentNode) {
        animElement.parentNode.removeChild(animElement);
      }
    }, 1500);
  }

  setAutoProduction(furniture) {
    this.gameState.selectedAutoFurniture = furniture;
    this.saveAutoProductionState();
    
    const furnitureName = {
      chair: 'Stuhl',
      table: 'Tisch',
      wardrobe: 'Schrank',
      tableFurniture: 'Tisch',
      bed: 'Bett',
      shelf: 'Regal',
      dresser: 'Kommode',
      sofa: 'Sofa'
    }[furniture] || furniture;
    
    if (window.showStatusToast) {
      window.showStatusToast(`Automatische ${furnitureName}-Produktion aktiviert`);
    }
  }

  startGameLoops() {
    setInterval(() => this.autoCollect(), 2000);
    setInterval(() => this.autoUpgrade(), 1000);
    setInterval(() => this.saveGameToServer(), 2000);
  }

  autoCollect() {
    this.collectWood();
    this.collectTrees();
    this.collectGold();
    this.autoProduceFurniture();
    this.updateDisplay();
  }

  collectWood() {
    if (this.gameState.trees > 0 && this.gameState.workers > 0) {
      const productionSpeed = this.gameState.toolLevel * this.gameState.workers;
      const resourcesPerHour = (Math.floor(Math.random() * 11) + 5) * this.gameState.workers;
      
      if (productionSpeed > 5) {
        this.gameState.holz += resourcesPerHour;
        this.gameState.trees -= Math.min(this.gameState.trees, this.gameState.workers);
        this.setAllProgressBars('', -1);
        this.updateProgressBarText('', `${resourcesPerHour}/h`);
      } else {
        this.gameState.progress += productionSpeed;
        this.setAllProgressBars('', this.gameState.progress);
        if (this.gameState.progress >= 10) {
          this.gameState.holz += resourcesPerHour;
          this.gameState.trees -= Math.min(this.gameState.trees, this.gameState.workers);
          this.gameState.progress = 0;
          this.setAllProgressBars('', this.gameState.progress);
          this.showPlusOneAnimation(document.querySelector('progress-bar[barclass=""]'), resourcesPerHour);
        }
      }
    }
  }

  collectTrees() {
    if (this.gameState.foresters > 0) {
      const productionSpeed = this.gameState.foresters * this.gameState.plantToolLevel;
      const resourcesPerHour = this.gameState.foresters * this.gameState.plantToolLevel;
      
      if (productionSpeed > 5) {
        this.gameState.trees += resourcesPerHour;
        this.setAllProgressBars('forester', -1);
        this.updateProgressBarText('forester', `${resourcesPerHour}/h`);
      } else {
        this.gameState.foresterProgress += productionSpeed;
        this.setAllProgressBars('forester', this.gameState.foresterProgress);
        if (this.gameState.foresterProgress >= 10) {
          this.gameState.trees += resourcesPerHour;
          this.gameState.foresterProgress = 0;
          this.setAllProgressBars('forester', this.gameState.foresterProgress);
          this.showPlusOneAnimation(document.querySelector('progress-bar[barclass="forester"]'), resourcesPerHour);
        }
      }
    }
  }

  collectGold() {
    if (this.gameState.carpenters > 0 && this.gameState.holz >= 10 * this.gameState.carpenters) {
      const productionSpeed = this.gameState.carpenters * this.gameState.carpenterToolLevel;
      const resourcesPerHour = 15 * this.gameState.carpenters * this.gameState.carpenterToolLevel;
      
      if (productionSpeed > 5) {
        this.gameState.holz -= 10 * this.gameState.carpenters;
        this.gameState.gold += resourcesPerHour;
        this.setAllProgressBars('carpenter', -1);
        this.updateProgressBarText('carpenter', `${resourcesPerHour}/h`);
      } else {
        this.gameState.carpenterProgress += productionSpeed;
        this.setAllProgressBars('carpenter', this.gameState.carpenterProgress);
        
        if (this.gameState.carpenterProgress >= this.gameState.CARPENTER_MAX) {
          this.gameState.holz -= 10 * this.gameState.carpenters;
          this.gameState.gold += resourcesPerHour;
          this.gameState.carpenterProgress = 0;
          this.setAllProgressBars('carpenter', this.gameState.carpenterProgress);
          this.showPlusOneAnimation(document.querySelector('progress-bar[barclass="carpenter"]'), resourcesPerHour);
        }
      }
    }
  }

  autoProduceFurniture() {
    if (this.gameState.carpenters > 0 && this.gameState.selectedAutoFurniture) {
      const furnitureData = {
        chair: { cost: 10, reward: 15 },
        table: { cost: 20, reward: 40 },
        wardrobe: { cost: 50, reward: 100 },
        tableFurniture: { cost: 20, reward: 40 },
        bed: { cost: 60, reward: 120 },
        shelf: { cost: 30, reward: 60 },
        dresser: { cost: 40, reward: 80 },
        sofa: { cost: 100, reward: 200 }
      };
      
      const data = furnitureData[this.gameState.selectedAutoFurniture];
      if (data && this.gameState.holz >= data.cost) {
        this.gameState.holz -= data.cost;
        this.gameState.gold += data.reward;
      }
    }
  }

  setAllProgressBars(barClass, value) {
    document.querySelectorAll(`progress-bar[barclass="${barClass}"]`).forEach(bar => {
      bar.setAttribute('value', value);
    });
  }

  updateProgressBarText(barClass, text) {
    document.querySelectorAll(`progress-bar[barclass="${barClass}"]`).forEach(bar => {
      bar.setAttribute('text', text);
    });
  }

  showPlusOneAnimation(targetBar, amount) {
    if (!targetBar) return;
    
    const anim = document.createElement('div');
    anim.textContent = `+${amount}`;
    anim.style.cssText = `
      position: absolute;
      left: ${targetBar.getBoundingClientRect().left + window.scrollX + targetBar.offsetWidth - 40}px;
      top: ${targetBar.getBoundingClientRect().top + window.scrollY - 24}px;
      font-size: 20px;
      font-family: 'Press Start 2P', monospace;
      color: #00ff00;
      text-shadow: 2px 2px 0 #000;
      pointer-events: none;
      z-index: 1000;
      transition: transform 1.5s cubic-bezier(.4,2,.6,1), opacity 1.5s;
      transform: translateY(0);
      opacity: 1;
    `;
    
    document.body.appendChild(anim);
    
    setTimeout(() => {
      anim.style.transform = 'translateY(-40px)';
      anim.style.opacity = '0';
    }, 10);
    
    setTimeout(() => anim.remove(), 1500);
  }

  autoUpgrade() {
    if (this.gameState.autoUpgradeState.axe) this.upgradeTool('toolLevel');
    if (this.gameState.autoUpgradeState.plant) this.upgradeTool('plantToolLevel');
    if (this.gameState.autoUpgradeState.carpenter) this.upgradeTool('carpenterToolLevel');
  }

  upgradeTool(toolType) {
    const cost = this.gameState[toolType] * 50;
    if (this.gameState.gold >= cost) {
      this.gameState.gold -= cost;
      this.gameState[toolType]++;
      window[toolType] = this.gameState[toolType];
      window.gold = this.gameState.gold;
    }
  }

  setupArbeitsamtEventHandlers() {
    this.setupHireButtons();
    this.setupUpgradeButtons();
  }

  setupHireButtons() {
    const hireButtons = [
      { id: 'hireWorkerButton', type: 'workers', baseCost: 'workerBaseCost' },
      { id: 'hireForesterButton', type: 'foresters', baseCost: 'foresterBaseCost' },
      { id: 'hireCarpenterButton', type: 'carpenters', baseCost: 'carpenterBaseCost' }
    ];

    hireButtons.forEach(({ id, type, baseCost }) => {
      const button = document.getElementById(id);
      if (button) {
        button.onclick = () => this.hireWorker(type, baseCost);
      }
    });
  }

  setupUpgradeButtons() {
    const upgradeButtons = [
      { id: 'upgradeToolButton', type: 'toolLevel' },
      { id: 'upgradePlantToolButton', type: 'plantToolLevel' },
      { id: 'upgradeCarpenterToolButton', type: 'carpenterToolLevel' }
    ];

    upgradeButtons.forEach(({ id, type }) => {
      const button = document.getElementById(id);
      if (button) {
        button.onclick = () => this.upgradeToolManual(type);
      }
    });
  }

  hireWorker(type, baseCostKey) {
    const count = type === 'workers' ? this.gameState[type] - 1 : this.gameState[type];
    const price = this.calculateWorkerPrice(this.gameState[baseCostKey], count);
    
    if (this.gameState.gold >= price) {
      this.gameState.gold -= price;
      this.gameState[type]++;
      window.gold = this.gameState.gold;
      window[type] = this.gameState[type];
      this.updateDisplay();
    }
  }

  upgradeToolManual(toolType) {
    const cost = this.gameState[toolType] * 50;
    if (this.gameState.gold >= cost) {
      this.gameState.gold -= cost;
      this.gameState[toolType]++;
      window.gold = this.gameState.gold;
      window[toolType] = this.gameState[toolType];
      this.updateDisplay();
    }
  }

  updateMoebelVisibility() {
    if (!window.researchSystem || !window.researchSystem.research) return;

    const moebelIds = [
      {id:'Stuhl', row:'chairRow'},
      {id:'Tisch', row:'tableFurnitureRow'},
      {id:'Schrank', row:'wardrobeRow'},
      {id:'Bett', row:'bedRow'},
      {id:'Regal', row:'shelfRow'},
      {id:'Kommode', row:'dresserRow'},
      {id:'Sofa', row:'sofaRow'}
    ];
    
    moebelIds.forEach(m => {
      const row = document.getElementById(m.row);
      if (row) {
        const unlocked = window.researchSystem.research.find(r => r.id === m.id && r.completed);
        row.style.display = unlocked ? '' : 'none';
      }
    });
  }

  loadAutoStates() {
    // Load auto-upgrade state
    const saved = localStorage.getItem('autoUpgradeState');
    if (saved) {
      this.gameState.autoUpgradeState = JSON.parse(saved);
    }

    // Load auto-production state
    const savedFurniture = localStorage.getItem('selectedAutoFurniture');
    if (savedFurniture) {
      this.gameState.selectedAutoFurniture = savedFurniture;
    }
  }

  saveAutoUpgradeState() {
    localStorage.setItem('autoUpgradeState', JSON.stringify(this.gameState.autoUpgradeState));
  }

  saveAutoProductionState() {
    localStorage.setItem('selectedAutoFurniture', this.gameState.selectedAutoFurniture);
  }

  async saveGameToServer() {
    try {
      const response = await fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          holz: this.gameState.holz,
          gold: this.gameState.gold,
          treeCount: this.gameState.treeCount,
          workers: this.gameState.workers,
          foresters: this.gameState.foresters,
          carpenters: this.gameState.carpenters,
          progress: this.gameState.progress,
          foresterProgress: this.gameState.foresterProgress,
          carpenterProgress: this.gameState.carpenterProgress
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const result = await response.json();
      if (window.statusSystem && result.success) {
        window.statusSystem.showToast("💾 Game saved successfully", "success");
      }
    } catch (error) {
      console.error('Save error:', error);
      if (window.statusSystem) {
        window.statusSystem.showToast("❌ Failed to save game", "error");
      }
    }
  }

  async loadGameFromServer() {
    try {
      const response = await fetch('/load');
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const save = await response.json();
      
      if (save) {
        // Update game state with saved data
        Object.keys(this.gameState).forEach(key => {
          if (save[key] !== undefined) {
            this.gameState[key] = save[key];
            window[key] = save[key];
          }
        });

        // Restore progress bars
        this.setAllProgressBars('', this.gameState.progress || 0);
        this.setAllProgressBars('forester', this.gameState.foresterProgress || 0);
        this.setAllProgressBars('carpenter', this.gameState.carpenterProgress || 0);
        
        this.updateDisplay();
        
        if (window.statusSystem) {
          window.statusSystem.showToast("📁 Game loaded successfully", "success");
        }
      }

      // Update furniture visibility regardless
      setTimeout(() => {
        if (window.updateMoebelVisibility) {
          window.updateMoebelVisibility();
        }
      }, 100);
    } catch (error) {
      console.error('Load error:', error);
      if (window.statusSystem) {
        window.statusSystem.showToast("❌ Failed to load game", "error");
      }
    }
  }

  resetGame() {
    // Reset all game state
    const newState = this.initializeGameState();
    Object.keys(newState).forEach(key => {
      this.gameState[key] = newState[key];
      window[key] = newState[key];
    });

    // Clear localStorage
    localStorage.removeItem('research');
    localStorage.removeItem('autoUpgradeState');
    localStorage.removeItem('selectedAutoFurniture');

    // Reset research system
    if (window.researchSystem) {
      window.researchSystem.resetResearch();
    }

    this.updateDisplay();
    this.saveGameToServer();
    
    if (window.updateMoebelVisibility) {
      window.updateMoebelVisibility();
    }
  }
}

// Initialize game core when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.gameCore = new GameCore();
});