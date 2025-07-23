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
    await this.loadMoebelbauTable();
  }

  async loadArbeitsamtTable() {
    try {
      const response = await fetch('arbeitsamt-table.html');
      if (!response.ok) {
        throw new Error(`Failed to load arbeitsamt table: ${response.status}`);
      }
      
      const html = await response.text();
      const container = document.getElementById('external-arbeitsamt-container');
      
      if (container) {
        container.innerHTML = html;
        
        // Event-Handler für Arbeitsamt-Buttons setzen
        setTimeout(() => {
          if (window.setupArbeitsamtEventHandlers) {
            window.setupArbeitsamtEventHandlers();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error loading arbeitsamt table:', error);
      if (window.statusSystem) {
        window.statusSystem.showToast("❌ Failed to load job office table", "error");
      }
    }
  }

  async loadMoebelbauTable() {
    try {
      const response = await fetch('moebelbau-table.html');
      if (!response.ok) {
        throw new Error(`Failed to load moebelbau table: ${response.status}`);
      }
      
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
      if (window.statusSystem) {
        window.statusSystem.showToast("❌ Failed to load furniture table", "error");
      }
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
    if (!window.holz || window.gold === undefined) {
      if (window.statusSystem) {
        window.statusSystem.showToast("❌ Game variables not available", "error");
      }
      return;
    }

    // Forschungsprüfung
    if (!window.researchSystem) {
      if (window.statusSystem) {
        window.statusSystem.showToast("❌ Research system not available", "error");
      }
      return;
    }
    
    const unlocked = window.researchSystem.research.find(r => r.id === button.research && r.completed);
    if (!unlocked) {
      if (window.statusSystem) {
        window.statusSystem.showToast(`🔒 Research "${button.research}" not completed`, "warning");
      }
      return;
    }
    
    if (window.holz >= button.cost) {
      window.holz -= button.cost;
      window.gold += button.reward;
      
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
      
      // Success feedback
      if (window.statusSystem) {
        window.statusSystem.showToast(`✅ Built furniture (+${button.reward} gold)`, "success");
      }
    } else {
      if (window.statusSystem) {
        window.statusSystem.showToast(`❌ Not enough wood! Need: ${button.cost}, Have: ${window.holz}`, "error");
      }
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