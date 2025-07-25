/**
 * Tab System Module
 * Handles tab switching and content management
 */
class TabSystem {
  constructor() {
    this.activeTab = 'arbeitsamt';
    this.init();
  }

  init() {
    this.loadSavedTab();
    this.bindEvents();
    this.loadExternalContent();
  }

  bindEvents() {
    // Tab button events are handled via onclick in HTML for backwards compatibility
    // but we can also add modern event handling here if needed
    document.addEventListener('DOMContentLoaded', () => {
      this.restoreSavedTab();
    });
  }

  switchTab(tabName) {
    // Alle Tab-Buttons deaktivieren
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Alle Tab-Inhalte ausblenden
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    
    // Aktuellen Tab aktivieren
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(tabName + '-tab');
    
    if (activeButton && activeContent) {
      activeButton.classList.add('active');
      activeContent.classList.add('active');
      
      // Tab im localStorage speichern
      localStorage.setItem('activeTab', tabName);
      this.activeTab = tabName;
    }
  }

  loadSavedTab() {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      this.activeTab = savedTab;
    }
  }

  restoreSavedTab() {
    if (this.activeTab) {
      this.switchTab(this.activeTab);
    }
  }

  async loadExternalContent() {
    await this.loadArbeitsamtTable();
    await this.loadArbeiterTable();
    await this.loadMoebelbauTable();
  }

  async loadArbeitsamtTable() {
    try {
      const response = await fetch('arbeitsamt-table.html');
      const html = await response.text();
      const container = document.getElementById('external-arbeitsamt-container');
      
      if (container) {
        container.innerHTML = html;
        
        // Nach dem Laden: Event-Handler setzen
        setTimeout(() => {
          if (window.setupArbeitsamtEventHandlers) {
            window.setupArbeitsamtEventHandlers();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error loading arbeitsamt table:', error);
    }
  }

  async loadArbeiterTable() {
    try {
      const response = await fetch('arbeiter-table.html');
      const html = await response.text();
      const container = document.getElementById('arbeiter-container');
      
      if (container) {
        container.innerHTML = html;
        
        // Update worker table after loading
        setTimeout(() => {
          if (window.gameCore) {
            window.gameCore.updateArbeiterTable();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error loading arbeiter table:', error);
    }
  }

  async loadMoebelbauTable() {
    try {
      const response = await fetch('moebelbau-table.html');
      const html = await response.text();
      const container = document.getElementById('external-moebelbau-container');
      
      if (container) {
        container.innerHTML = html;
        
        // Event-Handler für Möbelbau-Buttons setzen
        this.setupMoebelbauEventHandlers();
        
        // Nach dem Laden: Möbel-Sichtbarkeit aktualisieren
        setTimeout(() => {
          if (window.updateMoebelVisibility) {
            window.updateMoebelVisibility();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error loading moebelbau table:', error);
    }
  }

  setupMoebelbauEventHandlers() {
    const moebelbauButtons = [
      {id: 'chairButton', cost: 10, reward: 15, research: 'Stuhl'},
      {id: 'tableButton', cost: 20, reward: 40, research: 'Tisch'},
      {id: 'wardrobeButton', cost: 50, reward: 100, research: 'Schrank'},
      {id: 'tableFurnitureButton', cost: 20, reward: 40, research: 'Tisch'},
      {id: 'wardrobeButton2', cost: 50, reward: 100, research: 'Schrank'},
      {id: 'bedButton', cost: 60, reward: 120, research: 'Bett'},
      {id: 'shelfButton', cost: 30, reward: 60, research: 'Regal'},
      {id: 'dresserButton', cost: 40, reward: 80, research: 'Kommode'},
      {id: 'sofaButton', cost: 100, reward: 200, research: 'Sofa'}
    ];
    
    moebelbauButtons.forEach(button => {
      const element = document.getElementById(button.id);
      if (element) {
        element.onclick = () => this.handleMoebelBuild(button, element);
        console.log(`Event handler attached to ${button.id}`);
      } else {
        console.log(`Button ${button.id} not found in DOM`);
      }
    });

    // Radio-Button Event-Handler für Auto-Produktion
    const furnitureList = ['chair', 'table', 'wardrobe', 'tableFurniture', 'bed', 'shelf', 'dresser', 'sofa'];
    furnitureList.forEach(furniture => {
      const radio = document.getElementById(`${furniture}AutoRadio`);
      if (radio) {
        radio.addEventListener('change', (e) => {
          if (e.target.checked && window.setAutoProduction) {
            window.setAutoProduction(furniture);
          }
        });
      }
    });
  }

  handleMoebelBuild(button, element) {
    console.log("handleMoebelBuild called for:", button.research);
    console.log("Current resources - holz:", window.holz, "gold:", window.gold);
    
    if (!window.holz || window.gold === undefined) {
      console.log("Window variables not available!");
      return;
    }

    // Forschungsprüfung
    if (!window.researchSystem) {
      console.log("Research system not available!");
      return;
    }
    
    console.log("Available research:", window.researchSystem.research.map(r => ({id: r.id, completed: r.completed})));
    const unlocked = window.researchSystem.research.find(r => r.id === button.research && r.completed);
    console.log("Research unlocked for", button.research, ":", unlocked);
    
    // Special case for Stuhl - always allow if research system is not working
    if (!unlocked && button.research === 'Stuhl') {
      console.log("Stuhl research not found, but allowing build anyway");
    } else if (!unlocked) {
      console.log("Research not completed for:", button.research);
      return;
    }
    
    if (window.holz >= button.cost) {
      console.log("Building", button.research, "- Cost:", button.cost, "Reward:", button.reward);
      window.holz -= button.cost;
      window.gold += button.reward;
      console.log("After build - holz:", window.holz, "gold:", window.gold);
      
      // Lokale Variablen aktualisieren
      if (window.updateLocalVariables) {
        window.updateLocalVariables();
      }
      
      if (window.updateDisplay) {
        window.updateDisplay();
      }
      
      // Gold-Animation anzeigen
      if (window.showGoldAnimation) {
        window.showGoldAnimation(element, button.reward);
      }
      
      console.log("Build successful!");
    } else {
      console.log("Not enough wood! Need:", button.cost, "Have:", window.holz);
    }
  }
}

// Make switchTab globally available for backwards compatibility
window.switchTab = function(tabName) {
  if (window.tabSystem) {
    window.tabSystem.switchTab(tabName);
  }
};

// Initialize tab system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.tabSystem = new TabSystem();
});