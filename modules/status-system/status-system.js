/**
 * Status System Module
 * Handles status messages, sidecard, and toast notifications
 */
class StatusSystem {
  constructor() {
    this.sidecardOpen = false;
    this.init();
  }

  init() {
    this.setupElements();
    this.bindEvents();
    this.initSidecard();
  }

  setupElements() {
    this.statusBtn = document.getElementById('statusSidecardBtn');
    this.sidecard = document.getElementById('statusSidecard');
    this.closeSidecard = document.getElementById('closeStatusSidecard');
    this.sidecardOverlay = document.getElementById('statusSidecardOverlay');
    this.toast = document.getElementById('statusToast');
    this.statusList = document.getElementById('statusList');
  }

  bindEvents() {
    if (this.statusBtn) {
      this.statusBtn.onclick = () => this.openSidecard();
    }
    
    if (this.closeSidecard) {
      this.closeSidecard.onclick = () => this.closeSidecardFn();
    }
    
    if (this.sidecardOverlay) {
      this.sidecardOverlay.onclick = () => this.closeSidecardFn();
    }

    // ESC key closes sidecard
    window.addEventListener('keydown', (e) => {
      if (this.sidecardOpen && e.key === 'Escape') {
        this.closeSidecardFn();
      }
    });
  }

  initSidecard() {
    if (this.sidecard) {
      // Initial position: outside the screen
      this.sidecard.style.right = '-380px';
      this.sidecard.style.display = 'block';
      this.sidecard.style.transition = 'right 0.3s cubic-bezier(.7,0,.3,1)';
    }
  }

  openSidecard() {
    if (this.sidecard && this.sidecardOverlay) {
      this.sidecard.style.right = '0';
      this.sidecardOpen = true;
      this.sidecardOverlay.style.display = 'block';
    }
  }

  closeSidecardFn() {
    if (this.sidecard && this.sidecardOverlay) {
      this.sidecard.style.right = '-380px';
      this.sidecardOpen = false;
      this.sidecardOverlay.style.display = 'none';
    }
  }

  showStatusToast(message) {
    if (this.toast) {
      this.toast.textContent = message;
      this.toast.style.display = 'block';
      this.toast.style.opacity = '0.97';
      
      setTimeout(() => {
        this.toast.style.opacity = '0';
      }, 2200);
      
      setTimeout(() => {
        this.toast.style.display = 'none';
      }, 2600);
    }
  }

  addStatusMessage(message) {
    if (this.statusList) {
      const li = document.createElement('li');
      li.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
      this.statusList.appendChild(li);
      
      // Keep only last 50 messages
      while (this.statusList.children.length > 50) {
        this.statusList.removeChild(this.statusList.firstChild);
      }
    }
  }
}

// Initialize status system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.statusSystem = new StatusSystem();
  
  // Make showStatusToast globally available for backwards compatibility
  window.showStatusToast = (message) => {
    window.statusSystem.showStatusToast(message);
  };
});