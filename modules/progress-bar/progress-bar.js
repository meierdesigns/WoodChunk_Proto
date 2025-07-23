class ProgressBar extends HTMLElement {
  constructor() {
    super();
    // Load the template from the HTML file
    const template = document.getElementById('progress-bar-template');
    if (template) {
      const templateContent = template.content.cloneNode(true);
      this.attachShadow({mode: 'open'});
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .progress-bar-outer {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          margin-top: 4px;
        }
        .bar-icon {
          font-size: 20px;
          margin-right: 4px;
        }
        .bar {
          width: 100%;
          height: 24px;
          background: #808080;
          border: 3px solid #000000;
          box-shadow: inset 2px 2px 0px #fff, inset -2px -2px 0px #404040;
          overflow: hidden;
          position: relative;
        }
        .bar-inner {
          height: 100%;
          width: 0%;
          transition: width 0.2s ease;
          box-shadow: inset 1px 1px 0px #fff;
          min-width: 0;
          max-width: 100%;
          background: linear-gradient(90deg, #ff0000 0%, #ff4444 100%);
        }
        .bar-inner.forester {
          background: linear-gradient(90deg, #00ff00 0%, #44ff44 100%);
        }
        .bar-inner.carpenter {
          background: linear-gradient(90deg, #ff8800 0%, #ffaa44 100%);
        }
        .bar-text {
          position: absolute;
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
          color: #ffffff;
          font-weight: bold;
          font-size: 14px;
          z-index: 10;
          text-shadow: 1px 1px 0 #000;
          line-height: 20px;
        }
      `;
      
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(templateContent);
    }
  }
  
  static get observedAttributes() { 
    return ['icon', 'value', 'max', 'barclass', 'text']; 
  }
  
  attributeChangedCallback(name, oldValue, newValue) { 
    this.render(); 
  }
  
  connectedCallback() { 
    this.render(); 
  }
  
  render() {
    if (!this.shadowRoot) return;
    
    const icon = this.getAttribute('icon') || '';
    const value = parseFloat(this.getAttribute('value')) || 0;
    const max = parseFloat(this.getAttribute('max')) || 10;
    const barClass = this.getAttribute('barclass') || '';
    const text = this.getAttribute('text') || '';
    
    const iconElement = this.shadowRoot.querySelector('.bar-icon');
    const barInner = this.shadowRoot.querySelector('.bar-inner');
    const textElement = this.shadowRoot.querySelector('.bar-text');
    
    if (iconElement) iconElement.textContent = icon;
    
    if (barInner) {
      // Progress-Bar aktualisieren
      const percent = Math.min(100, Math.max(0, (value / max) * 100));
      barInner.style.width = percent + '%';
      barInner.className = 'bar-inner' + (barClass ? ' ' + barClass : '');
    }
    
    if (textElement) {
      // Text setzen - zeige Ressourcenmenge bei voller Bar
      if (value === -1 && text) {
        // Bei schneller Produktion: Zeige Text (z.B. "100/h")
        textElement.textContent = text;
      } else {
        // Berechne ungefähre Ressourcenmenge basierend auf Bar-Typ
        let resourceAmount = 0;
        if (barClass === '') {
          // Holzfäller: ungefähr 10 * workers (Durchschnitt von 5-15)
          const workers = window.workers || parseInt(document.getElementById('workerCount')?.textContent || '1');
          resourceAmount = 10 * workers;
        } else if (barClass === 'forester') {
          // Förster: foresters * plantToolLevel
          const foresters = window.foresters || parseInt(document.getElementById('foresterCount')?.textContent || '1');
          const plantToolLevel = window.plantToolLevel || parseInt(document.getElementById('toolLevelPlant')?.textContent || '1');
          resourceAmount = foresters * plantToolLevel;
        } else if (barClass === 'carpenter') {
          // Schreiner: 15 * carpenters * carpenterToolLevel
          const carpenters = window.carpenters || parseInt(document.getElementById('carpenterCount')?.textContent || '0');
          const carpenterToolLevel = window.carpenterToolLevel || parseInt(document.getElementById('toolLevelCarpenter')?.textContent || '1');
          resourceAmount = 15 * carpenters * carpenterToolLevel;
        }
        textElement.innerHTML = `<span style="font-size: 26px; position: relative; top: -4px;">≈</span><span style="font-size: 12px; margin-left: 4px; position: relative; top: -4px;">${resourceAmount}</span>`;
      }
    }
  }
}

// Register the custom element
customElements.define('progress-bar', ProgressBar);