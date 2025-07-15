// Status-Sidecard Modul
export function initStatusSidecard() {
  fetch('statusSidecard.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
} 