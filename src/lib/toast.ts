export function showToast(message: string, duration = 3000) {
  if (typeof document === 'undefined') return;
  const id = `koyama-toast-${Date.now()}`;
  const el = document.createElement('div');
  el.id = id;
  el.textContent = message;
  Object.assign(el.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    background: '#111827',
    color: 'white',
    padding: '10px 14px',
    borderRadius: '8px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
    zIndex: '9999',
    opacity: '0',
    transition: 'opacity 200ms ease, transform 200ms ease',
    transform: 'translateY(8px)'
  });
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 250);
  }, duration);
}

export default showToast;
