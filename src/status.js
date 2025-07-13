// Status-Sidecard Modul
export function initStatusSidecard() {
  fetch('statusSidecard.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      setupStatusSidecardEvents();
    });
}

function setupStatusSidecardEvents() {
  const btn = document.getElementById('statusSidecardBtn');
  const overlay = document.getElementById('statusSidecardOverlay');
  const sidecard = document.getElementById('statusSidecard');
  const closeBtn = document.getElementById('closeStatusSidecard');
  if (!btn || !overlay || !sidecard || !closeBtn) return;
  btn.onclick = () => { sidecard.style.display = 'block'; overlay.style.display = 'block'; };
  closeBtn.onclick = overlay.onclick = () => { sidecard.style.display = 'none'; overlay.style.display = 'none'; };
} 