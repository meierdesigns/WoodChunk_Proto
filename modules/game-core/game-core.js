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
      
      // Workers (legacy - kept for compatibility)
      workers: 0,
      foresters: 0,
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
      selectedAutoFurniture: null,
      
      // Worker distribution system
      totalWorkers: 3,
      distributedWorkers: 0,
      distributedForesters: 0,
      distributedCarpenters: 0,
      availableWorkers: 3
    };
  }

  init() {
    this.setupGlobalVariables();
    this.bindEvents();
    this.startGameLoops();
    this.loadAutoStates();
    this.loadGameFromServer();
    
    // Ensure worker distribution is initialized correctly
    setTimeout(() => {
      this.updateWorkerDistribution();
    }, 100);
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
    
    // Make count control functions globally available
    window.increaseWorkerCount = () => this.increaseWorkerCount('workers');
    window.decreaseWorkerCount = () => this.decreaseWorkerCount('workers');
    window.increaseForesterCount = () => this.increaseWorkerCount('foresters');
    window.decreaseForesterCount = () => this.decreaseWorkerCount('foresters');
    window.increaseCarpenterCount = () => this.increaseWorkerCount('carpenters');
    window.decreaseCarpenterCount = () => this.decreaseWorkerCount('carpenters');
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
      console.log('Reset button setup complete');
    } else {
      console.log('Reset button not found');
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
      console.log('Research reset button setup complete');
    } else {
      console.log('Research reset button not found');
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
    // Sync local variables from global variables, but preserve worker distribution
    Object.keys(this.gameState).forEach(key => {
      if (window[key] !== undefined && !key.startsWith('distributed') && key !== 'totalWorkers' && key !== 'availableWorkers') {
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
    this.updateWorkerVisuals();
    this.updateArbeiterTable();
    this.updateCountButtonStates();
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
      const hasEnoughWood = this.gameState.holz >= btn.cost;
      
      // Special case for Stuhl - always allow if research system is not working
      let shouldBeEnabled = unlocked && hasEnoughWood;
      if (btn.research === 'Stuhl' && !unlocked) {
        shouldBeEnabled = hasEnoughWood; // Allow chair building even without research
      }
      
      if (button) {
        button.disabled = !shouldBeEnabled;
        console.log(`Button ${btn.id}: unlocked=${unlocked}, wood=${this.gameState.holz}/${btn.cost}, enabled=${shouldBeEnabled}`);
      } else {
        console.log(`Button ${btn.id} not found in DOM`);
      }
    });
  }

  updateWorkerVisuals() {
    // Check if it's working hours (8-16 Uhr) using game time
    const gameTimeMinutes = window.gameTime || 0;
    const currentHour = Math.floor(gameTimeMinutes / 60) % 24;
    const isWorkingHours = currentHour >= 8 && currentHour < 16;
    
    // Disable progress bars during non-working hours
    this.updateProgressBarStates(isWorkingHours);
  }

  updateProgressBarStates(isWorkingHours) {
    // Get all progress bars
    const progressBars = document.querySelectorAll('progress-bar');
    
    progressBars.forEach(bar => {
      if (!isWorkingHours) {
        // Disable progress bars during non-working hours
        bar.style.opacity = '0.5';
        bar.style.filter = 'grayscale(100%)';
        
        // Add disabled text
        const barText = bar.querySelector('.bar-text');
        if (barText) {
          barText.textContent = '💤 Schlafen';
          barText.style.color = '#999';
        }
      } else {
        // Re-enable progress bars during working hours
        bar.style.opacity = '1';
        bar.style.filter = 'none';
        
        // Remove disabled text
        const barText = bar.querySelector('.bar-text');
        if (barText && barText.textContent === '💤 Schlafen') {
          barText.textContent = '';
          barText.style.color = '';
        }
      }
    });
  }

  // Worker distribution methods
  increaseWorkerDistribution(type) {
    if (this.gameState.availableWorkers > 0) {
      this.gameState.availableWorkers--;
      this.gameState[`distributed${type.charAt(0).toUpperCase() + type.slice(1)}`]++;
      this.updateWorkerDistribution();
    }
  }

  decreaseWorkerDistribution(type) {
    const distributedKey = `distributed${type.charAt(0).toUpperCase() + type.slice(1)}`;
    if (this.gameState[distributedKey] > 0) {
      this.gameState[distributedKey]--;
      this.gameState.availableWorkers++;
      this.updateWorkerDistribution();
    }
  }

  updateWorkerDistribution() {
    // Update the actual worker counts based on distribution
    this.gameState.workers = this.gameState.distributedWorkers;
    this.gameState.foresters = this.gameState.distributedForesters;
    this.gameState.carpenters = this.gameState.distributedCarpenters;
    
    // Calculate available workers
    this.gameState.availableWorkers = this.gameState.totalWorkers - 
      (this.gameState.distributedWorkers + this.gameState.distributedForesters + this.gameState.distributedCarpenters);
    
    // Update global variables for compatibility
    window.workers = this.gameState.workers;
    window.foresters = this.gameState.foresters;
    window.carpenters = this.gameState.carpenters;
    window.totalWorkers = this.gameState.totalWorkers;
    window.distributedWorkers = this.gameState.distributedWorkers;
    window.distributedForesters = this.gameState.distributedForesters;
    window.distributedCarpenters = this.gameState.distributedCarpenters;
    window.availableWorkers = this.gameState.availableWorkers;
    
    // Update displays
    this.updateDisplay();
    this.updateArbeiterTable();
    this.updateJobRows();
    this.updateToolUpgradeButtons();
  }

  updateArbeiterTable() {
    // Update total workers display
    const totalWorkersElement = document.getElementById('totalWorkers');
    if (totalWorkersElement) {
      totalWorkersElement.textContent = this.gameState.totalWorkers;
    }

    // Update distributed workers displays
    const distributedWorkersElement = document.getElementById('distributedWorkers');
    if (distributedWorkersElement) {
      distributedWorkersElement.textContent = this.gameState.distributedWorkers;
    }

    const distributedForestersElement = document.getElementById('distributedForesters');
    if (distributedForestersElement) {
      distributedForestersElement.textContent = this.gameState.distributedForesters;
    }

    const distributedCarpentersElement = document.getElementById('distributedCarpenters');
    if (distributedCarpentersElement) {
      distributedCarpentersElement.textContent = this.gameState.distributedCarpenters;
    }

    // Update distribution controls
    const workerDistributionElement = document.getElementById('workerDistribution');
    if (workerDistributionElement) {
      workerDistributionElement.textContent = this.gameState.distributedWorkers;
    }

    const foresterDistributionElement = document.getElementById('foresterDistribution');
    if (foresterDistributionElement) {
      foresterDistributionElement.textContent = this.gameState.distributedForesters;
    }

    const carpenterDistributionElement = document.getElementById('carpenterDistribution');
    if (carpenterDistributionElement) {
      carpenterDistributionElement.textContent = this.gameState.distributedCarpenters;
    }

    // Update button states
    this.updateDistributionButtonStates();
  }

  updateJobRows() {
    // Update job row counts and button states
    const jobTypes = [
      { type: 'Worker', id: 'worker' },
      { type: 'Forester', id: 'forester' },
      { type: 'Carpenter', id: 'carpenter' }
    ];
    
    jobTypes.forEach(jobType => {
      const countElement = document.getElementById(jobType.id + 'Count');
      const decreaseButton = document.getElementById('decrease' + jobType.type + 'Count');
      const increaseButton = document.getElementById('increase' + jobType.type + 'Count');
      
      if (countElement) {
        const count = this.gameState[jobType.id + 's'] || 0;
        countElement.textContent = count;
      }
      
      if (decreaseButton) {
        const count = this.gameState[jobType.id + 's'] || 0;
        decreaseButton.disabled = count <= 0;
      }
      
      if (increaseButton) {
        increaseButton.disabled = this.gameState.availableWorkers <= 0;
      }
    });
  }

  updateToolUpgradeButtons() {
    console.log('=== TOOL UPGRADE BUTTON DEBUG ===');
    console.log('Current game state:', {
      gold: this.gameState.gold,
      toolLevel: this.gameState.toolLevel,
      plantToolLevel: this.gameState.plantToolLevel,
      carpenterToolLevel: this.gameState.carpenterToolLevel
    });
    
    // Update tool upgrade button states based on available gold
    const toolUpgrades = [
      { 
        buttonId: 'upgradeWorkerToolButton', 
        toolLevel: this.gameState.toolLevel, 
        cost: this.gameState.toolLevel * 50,
        name: 'Worker Tool (Axe)'
      },
      { 
        buttonId: 'upgradeForesterToolButton', 
        toolLevel: this.gameState.plantToolLevel, 
        cost: this.gameState.plantToolLevel * 50,
        name: 'Forester Tool (Plant)'
      },
      { 
        buttonId: 'upgradeCarpenterToolButton', 
        toolLevel: this.gameState.carpenterToolLevel, 
        cost: this.gameState.carpenterToolLevel * 50,
        name: 'Carpenter Tool (Hammer)'
      }
    ];
    
    console.log('Tool upgrade calculations:');
    toolUpgrades.forEach(tool => {
      console.log(`  ${tool.name}:`);
      console.log(`    - Current Level: ${tool.toolLevel}`);
      console.log(`    - Upgrade Cost: ${tool.cost} gold (${tool.toolLevel} * 50)`);
      console.log(`    - Available Gold: ${this.gameState.gold}`);
      console.log(`    - Can Afford: ${this.gameState.gold >= tool.cost}`);
      console.log(`    - Gold Difference: ${this.gameState.gold - tool.cost}`);
    });
    
    toolUpgrades.forEach(tool => {
      const button = document.getElementById(tool.buttonId);
      if (button) {
        const canAfford = this.gameState.gold >= tool.cost;
        const wasDisabled = button.disabled;
        button.disabled = !canAfford;
        
        console.log(`Button ${tool.buttonId} (${tool.name}):`);
        console.log(`  - Found in DOM: ✅`);
        console.log(`  - Previous disabled state: ${wasDisabled}`);
        console.log(`  - New disabled state: ${!canAfford}`);
        console.log(`  - Cost: ${tool.cost} gold`);
        console.log(`  - Can afford: ${canAfford ? '✅' : '❌'}`);
        
        // Update visual state
        if (canAfford) {
          button.classList.remove('disabled');
          button.classList.add('enabled');
          console.log(`  - Visual state: enabled`);
        } else {
          button.classList.remove('enabled');
          button.classList.add('disabled');
          console.log(`  - Visual state: disabled`);
        }
        
        // Check if button is actually clickable
        const isClickable = !button.disabled && !button.classList.contains('disabled');
        console.log(`  - Actually clickable: ${isClickable ? '✅' : '❌'}`);
        
      } else {
        console.log(`Button ${tool.buttonId} (${tool.name}):`);
        console.log(`  - Found in DOM: ❌ NOT FOUND`);
        console.log(`  - This button is missing from the HTML!`);
      }
    });
    
    console.log('=== END TOOL UPGRADE BUTTON DEBUG ===');
  }

  updateDistributionButtonStates() {
    // Update decrease buttons
    const decreaseWorkersBtn = document.getElementById('decreaseWorkers');
    if (decreaseWorkersBtn) {
      decreaseWorkersBtn.disabled = this.gameState.distributedWorkers <= 0;
    }

    const decreaseForestersBtn = document.getElementById('decreaseForesters');
    if (decreaseForestersBtn) {
      decreaseForestersBtn.disabled = this.gameState.distributedForesters <= 0;
    }

    const decreaseCarpentersBtn = document.getElementById('decreaseCarpenters');
    if (decreaseCarpentersBtn) {
      decreaseCarpentersBtn.disabled = this.gameState.distributedCarpenters <= 0;
    }

    // Update increase buttons
    const increaseWorkersBtn = document.getElementById('increaseWorkers');
    if (increaseWorkersBtn) {
      increaseWorkersBtn.disabled = this.gameState.availableWorkers <= 0;
    }

    const increaseForestersBtn = document.getElementById('increaseForesters');
    if (increaseForestersBtn) {
      increaseForestersBtn.disabled = this.gameState.availableWorkers <= 0;
    }

    const increaseCarpentersBtn = document.getElementById('increaseCarpenters');
    if (increaseCarpentersBtn) {
      increaseCarpentersBtn.disabled = this.gameState.availableWorkers <= 0;
    }

    // Update fire button
    const fireWorkersBtn = document.getElementById('fireWorkers');
    if (fireWorkersBtn) {
      fireWorkersBtn.disabled = this.gameState.totalWorkers <= 0;
    }
  }

  hireMoreWorkers() {
    const cost = this.calculateWorkerPrice(this.gameState.workerBaseCost, this.gameState.totalWorkers - 1);
    if (this.gameState.gold >= cost) {
      this.gameState.gold -= cost;
      this.gameState.totalWorkers++;
      this.gameState.availableWorkers++;
      this.updateWorkerDistribution();
    }
  }

  fireWorkers() {
    if (this.gameState.totalWorkers > 0) {
      this.gameState.totalWorkers--;
      if (this.gameState.availableWorkers > 0) {
        this.gameState.availableWorkers--;
      } else {
        // Remove from distributed workers if no available workers
        if (this.gameState.distributedWorkers > 0) {
          this.gameState.distributedWorkers--;
        } else if (this.gameState.distributedForesters > 0) {
          this.gameState.distributedForesters--;
        } else if (this.gameState.distributedCarpenters > 0) {
          this.gameState.distributedCarpenters--;
        }
      }
      this.updateWorkerDistribution();
    }
  }

  // Count control methods for Arbeitsamt table
  increaseWorkerCount(type) {
    if (this.gameState.availableWorkers > 0) {
      this.gameState.availableWorkers--;
      
      // Update both old and new worker variables
      if (type === 'workers') {
        this.gameState.workers++;
        this.gameState.distributedWorkers++;
      } else if (type === 'foresters') {
        this.gameState.foresters++;
        this.gameState.distributedForesters++;
      } else if (type === 'carpenters') {
        this.gameState.carpenters++;
        this.gameState.distributedCarpenters++;
      }
      
      // Update global variables
      window[type] = this.gameState[type];
      window['distributed' + type.charAt(0).toUpperCase() + type.slice(1)] = this.gameState['distributed' + type.charAt(0).toUpperCase() + type.slice(1)];
      window.availableWorkers = this.gameState.availableWorkers;
      
      this.updateDisplay();
      this.updateCountButtonStates();
      
      // Save immediately when worker distribution changes
      this.saveGameToServer();
    }
  }

  decreaseWorkerCount(type) {
    if (this.gameState[type] > 0) {
      this.gameState.availableWorkers++;
      
      // Update both old and new worker variables
      if (type === 'workers') {
        this.gameState.workers--;
        this.gameState.distributedWorkers--;
      } else if (type === 'foresters') {
        this.gameState.foresters--;
        this.gameState.distributedForesters--;
      } else if (type === 'carpenters') {
        this.gameState.carpenters--;
        this.gameState.distributedCarpenters--;
      }
      
      // Update global variables
      window[type] = this.gameState[type];
      window['distributed' + type.charAt(0).toUpperCase() + type.slice(1)] = this.gameState['distributed' + type.charAt(0).toUpperCase() + type.slice(1)];
      window.availableWorkers = this.gameState.availableWorkers;
      
      this.updateDisplay();
      this.updateCountButtonStates();
      
      // Save immediately when worker distribution changes
      this.saveGameToServer();
    }
  }

  updateCountButtonStates() {
    // Update decrease buttons
    const decreaseWorkerCountBtn = document.getElementById('decreaseWorkerCount');
    if (decreaseWorkerCountBtn) {
      decreaseWorkerCountBtn.disabled = this.gameState.workers <= 0;
    }

    const decreaseForesterCountBtn = document.getElementById('decreaseForesterCount');
    if (decreaseForesterCountBtn) {
      decreaseForesterCountBtn.disabled = this.gameState.foresters <= 0;
    }

    const decreaseCarpenterCountBtn = document.getElementById('decreaseCarpenterCount');
    if (decreaseCarpenterCountBtn) {
      decreaseCarpenterCountBtn.disabled = this.gameState.carpenters <= 0;
    }

    // Update increase buttons
    const increaseWorkerCountBtn = document.getElementById('increaseWorkerCount');
    if (increaseWorkerCountBtn) {
      increaseWorkerCountBtn.disabled = this.gameState.availableWorkers <= 0;
    }

    const increaseForesterCountBtn = document.getElementById('increaseForesterCount');
    if (increaseForesterCountBtn) {
      increaseForesterCountBtn.disabled = this.gameState.availableWorkers <= 0;
    }

    const increaseCarpenterCountBtn = document.getElementById('increaseCarpenterCount');
    if (increaseCarpenterCountBtn) {
      increaseCarpenterCountBtn.disabled = this.gameState.availableWorkers <= 0;
    }

    // Update available workers info
    const availableWorkersInfo = document.getElementById('availableWorkersInfo');
    if (availableWorkersInfo) {
      availableWorkersInfo.textContent = this.gameState.availableWorkers;
    }
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
    setInterval(() => this.updateProgressBars(), 2000); // Update progress bars every 2 seconds
    setInterval(() => this.autoCollect(), 3600000); // Collect resources every hour
    setInterval(() => this.autoUpgrade(), 1000);
    setInterval(() => this.updateSaveValues(), 1000); // Update save values every second
    setInterval(() => this.saveGameToServer(), 1000); // Save every second
  }

  updateWoodProgress() {
    // Check if it's working hours (8-16 Uhr) using game time
    const gameTimeMinutes = window.gameTime || 0;
    const currentHour = Math.floor(gameTimeMinutes / 60) % 24;
    const isWorkingHours = currentHour >= 8 && currentHour < 16;
    
    if (this.gameState.trees > 0 && this.gameState.workers > 0 && isWorkingHours) {
      const productionSpeed = this.gameState.toolLevel * this.gameState.workers;
      this.gameState.progress += productionSpeed;
      this.setAllProgressBars('', this.gameState.progress);
    } else if (!isWorkingHours) {
      // Reset progress bar during non-working hours
      this.gameState.progress = 0;
      this.setAllProgressBars('', 0);
    }
  }

  updateTreeProgress() {
    // Check if it's working hours (8-16 Uhr) using game time
    const gameTimeMinutes = window.gameTime || 0;
    const currentHour = Math.floor(gameTimeMinutes / 60) % 24;
    const isWorkingHours = currentHour >= 8 && currentHour < 16;
    
    if (this.gameState.foresters > 0 && isWorkingHours) {
      const productionSpeed = this.gameState.foresters * this.gameState.plantToolLevel;
      this.gameState.foresterProgress += productionSpeed;
      this.setAllProgressBars('forester', this.gameState.foresterProgress);
    } else if (!isWorkingHours) {
      // Reset progress bar during non-working hours
      this.gameState.foresterProgress = 0;
      this.setAllProgressBars('forester', 0);
    }
  }

  updateGoldProgress() {
    // Check if it's working hours (8-16 Uhr) using game time
    const gameTimeMinutes = window.gameTime || 0;
    const currentHour = Math.floor(gameTimeMinutes / 60) % 24;
    const isWorkingHours = currentHour >= 8 && currentHour < 16;
    
    // Only work if auto-production is selected AND during working hours
    if (this.gameState.carpenters > 0 && this.gameState.selectedAutoFurniture && this.gameState.holz >= 10 * this.gameState.carpenters && isWorkingHours) {
      const productionSpeed = this.gameState.carpenters * this.gameState.carpenterToolLevel;
      this.gameState.carpenterProgress += productionSpeed;
      this.setAllProgressBars('carpenter', this.gameState.carpenterProgress);
    } else if (this.gameState.carpenters > 0 && (!this.gameState.selectedAutoFurniture || !isWorkingHours)) {
      // Reset progress bar if no auto-production is selected or outside working hours
      this.gameState.carpenterProgress = 0;
      this.setAllProgressBars('carpenter', 0);
    }
  }

  updateProgressBars() {
    // Update progress bars without collecting resources
    this.updateWoodProgress();
    this.updateTreeProgress();
    this.updateGoldProgress();
  }

  autoCollect() {
    this.collectWood();
    this.collectTrees();
    this.collectGold();
    this.autoProduceFurniture();
    this.updateDisplay();
  }

  collectWood() {
    // Check if it's working hours (8-16 Uhr) using game time
    const gameTimeMinutes = window.gameTime || 0;
    const currentHour = Math.floor(gameTimeMinutes / 60) % 24;
    const isWorkingHours = currentHour >= 8 && currentHour < 16;
    
    if (this.gameState.trees > 0 && this.gameState.workers > 0 && isWorkingHours) {
      const productionSpeed = this.gameState.toolLevel * this.gameState.workers;
      const resourcesPerHour = (Math.floor(Math.random() * 11) + 5) * this.gameState.workers;
      
      // Always use progress bar system
        this.gameState.progress += productionSpeed;
        this.setAllProgressBars('', this.gameState.progress);
      
        if (this.gameState.progress >= 10) {
        // Show full bar briefly before collecting
        this.setAllProgressBars('', 10);
        setTimeout(() => {
          this.gameState.holz += resourcesPerHour;
          this.gameState.trees -= Math.min(this.gameState.trees, this.gameState.workers);
          this.gameState.progress = 0;
          this.setAllProgressBars('', this.gameState.progress);
          this.showPlusOneAnimation(document.querySelector('progress-bar[barclass=""]'), resourcesPerHour);
          this.updateDisplay(); // Update display after resource collection
        }, 200); // 200ms delay to show full bar
        }
    } else if (!isWorkingHours) {
      // Reset progress bar during non-working hours
      this.gameState.progress = 0;
      this.setAllProgressBars('', 0);
    }
  }

  collectTrees() {
    // Check if it's working hours (8-16 Uhr) using game time
    const gameTimeMinutes = window.gameTime || 0;
    const currentHour = Math.floor(gameTimeMinutes / 60) % 24;
    const isWorkingHours = currentHour >= 8 && currentHour < 16;
    
    if (this.gameState.foresters > 0 && isWorkingHours) {
      const productionSpeed = this.gameState.foresters * this.gameState.plantToolLevel;
      const resourcesPerHour = this.gameState.foresters * this.gameState.plantToolLevel;
      
      // Always use progress bar system
        this.gameState.foresterProgress += productionSpeed;
        this.setAllProgressBars('forester', this.gameState.foresterProgress);
      
        if (this.gameState.foresterProgress >= 10) {
        // Show full bar briefly before collecting
        this.setAllProgressBars('forester', 10);
        setTimeout(() => {
          this.gameState.trees += resourcesPerHour;
          this.gameState.foresterProgress = 0;
          this.setAllProgressBars('forester', this.gameState.foresterProgress);
          this.showPlusOneAnimation(document.querySelector('progress-bar[barclass="forester"]'), resourcesPerHour);
          this.updateDisplay(); // Update display after resource collection
        }, 200); // 200ms delay to show full bar
        }
    } else if (!isWorkingHours) {
      // Reset progress bar during non-working hours
      this.gameState.foresterProgress = 0;
      this.setAllProgressBars('forester', 0);
    }
  }

  collectGold() {
    // Check if it's working hours (8-16 Uhr) using game time
    const gameTimeMinutes = window.gameTime || 0;
    const currentHour = Math.floor(gameTimeMinutes / 60) % 24;
    const isWorkingHours = currentHour >= 8 && currentHour < 16;
    
    // Only work if auto-production is selected AND during working hours
    if (this.gameState.carpenters > 0 && this.gameState.selectedAutoFurniture && this.gameState.holz >= 10 * this.gameState.carpenters && isWorkingHours) {
      const productionSpeed = this.gameState.carpenters * this.gameState.carpenterToolLevel;
      const resourcesPerHour = 15 * this.gameState.carpenters * this.gameState.carpenterToolLevel;
      
      // Always use progress bar system
        this.gameState.carpenterProgress += productionSpeed;
        this.setAllProgressBars('carpenter', this.gameState.carpenterProgress);
        
        if (this.gameState.carpenterProgress >= this.gameState.CARPENTER_MAX) {
        // Show full bar briefly before collecting
        this.setAllProgressBars('carpenter', this.gameState.CARPENTER_MAX);
        setTimeout(() => {
          this.gameState.holz -= 10 * this.gameState.carpenters;
          this.gameState.gold += resourcesPerHour;
          this.gameState.carpenterProgress = 0;
          this.setAllProgressBars('carpenter', this.gameState.carpenterProgress);
          this.showPlusOneAnimation(document.querySelector('progress-bar[barclass="carpenter"]'), resourcesPerHour);
          
          // Update tool upgrade buttons when gold changes
          this.updateToolUpgradeButtons();
          this.updateDisplay(); // Update display after resource collection
        }, 200); // 200ms delay to show full bar
        }
    } else if (this.gameState.carpenters > 0 && (!this.gameState.selectedAutoFurniture || !isWorkingHours)) {
      // Reset progress bar if no auto-production is selected or outside working hours
      this.gameState.carpenterProgress = 0;
      this.setAllProgressBars('carpenter', 0);
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
        
        // Update tool upgrade buttons when gold changes
        this.updateToolUpgradeButtons();
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

  updateSaveValues() {
    // Update all values that belong to the save state
    this.updateLocalVariables();
    // Don't call updateWorkerDistribution() here as it might reset the distribution
    this.saveAutoUpgradeState();
    this.saveAutoProductionState();
  }

  async saveGameToServer() {
    try {
      const response = await fetch('http://localhost:1337/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gold: this.gameState.gold,
          holz: this.gameState.holz,
          trees: this.gameState.trees,
          workers: this.gameState.workers,
          foresters: this.gameState.foresters,
          carpenters: this.gameState.carpenters,
          toolLevel: this.gameState.toolLevel,
          plantToolLevel: this.gameState.plantToolLevel,
          carpenterToolLevel: this.gameState.carpenterToolLevel,
          progress: this.gameState.progress,
          foresterProgress: this.gameState.foresterProgress,
          carpenterProgress: this.gameState.carpenterProgress,
          // Worker distribution system
          totalWorkers: this.gameState.totalWorkers,
          distributedWorkers: this.gameState.distributedWorkers,
          distributedForesters: this.gameState.distributedForesters,
          distributedCarpenters: this.gameState.distributedCarpenters,
          availableWorkers: this.gameState.availableWorkers
        })
      });
      await response.json();
    } catch (error) {
      console.error('Save error:', error);
    }
  }

  async loadGameFromServer() {
    try {
      const response = await fetch('http://localhost:1337/load');
      const save = await response.json();
      
      if (save) {
        // Restore progress bars
        this.setAllProgressBars('', this.gameState.progress || 0);
        this.setAllProgressBars('forester', this.gameState.foresterProgress || 0);
        this.setAllProgressBars('carpenter', this.gameState.carpenterProgress || 0);
        
        // Handle worker distribution first
        if (save.distributedWorkers !== undefined) {
          // Use saved distribution data
          this.gameState.distributedWorkers = save.distributedWorkers || 0;
          this.gameState.distributedForesters = save.distributedForesters || 0;
          this.gameState.distributedCarpenters = save.distributedCarpenters || 0;
          this.gameState.totalWorkers = save.totalWorkers || 2;
        } else {
          // Legacy: calculate distribution from worker counts
          this.gameState.distributedWorkers = save.workers || 0;
          this.gameState.distributedForesters = save.foresters || 0;
          this.gameState.distributedCarpenters = save.carpenters || 0;
          this.gameState.totalWorkers = 3;
        }
        
        // Update game state with saved data (but don't overwrite distribution data)
        Object.keys(this.gameState).forEach(key => {
          if (save[key] !== undefined && !key.startsWith('distributed') && key !== 'totalWorkers' && key !== 'availableWorkers') {
            this.gameState[key] = save[key];
            window[key] = save[key];
          }
        });

        // Update worker distribution after loading other data
        this.updateWorkerDistribution();
        
        this.updateDisplay();
      }

      // Update furniture visibility regardless
      setTimeout(() => {
        if (window.updateMoebelVisibility) {
          window.updateMoebelVisibility();
        }
      }, 100);
    } catch (error) {
      console.error('Load error:', error);
    }
  }

  resetGame() {
    console.log('resetGame called');
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

    // Ensure worker distribution is correct after reset
    this.updateWorkerDistribution();

    this.updateDisplay();
    this.saveGameToServer();
    
    if (window.updateMoebelVisibility) {
      window.updateMoebelVisibility();
    }
    console.log('resetGame completed');
  }
}

// Initialize game core when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing GameCore...');
  window.gameCore = new GameCore();
  console.log('GameCore initialized:', window.gameCore);
});