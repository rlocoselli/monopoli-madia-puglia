(() => {
  const source = '/monopoli-tienici-qui.mp3';
  const labels = {
    it: ['Attiva la musica', 'Disattiva la musica'],
    en: ['Play music', 'Mute music'],
    fr: ['Activer la musique', 'Couper la musique'],
    es: ['Activar la música', 'Silenciar la música'],
    pt: ['Ativar a música', 'Desativar a música']
  };
  const style = document.createElement('style');
  style.textContent = '.music-toggle{position:fixed;right:18px;bottom:18px;z-index:1000;display:none;align-items:center;gap:8px;padding:11px 15px;border:1px solid #d4c9ad;border-radius:999px;background:#fff;color:#153943;box-shadow:0 4px 18px #0002;font:600 13px/1.2 "DM Sans",sans-serif;cursor:pointer}.music-toggle:hover,.music-toggle:focus-visible{background:#f3eee3;outline:2px solid #153943;outline-offset:2px}@media(max-width:600px){.music-toggle{right:12px;bottom:12px}}';
  document.head.append(style);
  const audio = document.createElement('audio');
  audio.src = source;
  audio.loop = true;
  audio.preload = 'none';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'music-toggle';
  let enabled = localStorage.getItem('monopoli-music-off') !== '1';
  let starting = false;
  function update() {
    const label = (labels[document.documentElement.lang] || labels.it)[enabled ? 1 : 0];
    button.textContent = (enabled ? '♪ ' : '♫ ') + label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(enabled));
  }
  async function start() {
    if (!enabled || starting || !audio.paused) return;
    starting = true;
    try {
      await audio.play();
      if (!enabled) audio.pause();
    } catch (_) {
      // Browsers may require a visitor gesture before audio can play.
    } finally {
      starting = false;
    }
  }
  button.addEventListener('click', () => {
    enabled = !enabled;
    localStorage.setItem('monopoli-music-off', enabled ? '0' : '1');
    if (enabled) {
      start();
    } else {
      audio.pause();
    }
    update();
  });
  function startAfterGesture(event) {
    if (!event.target.closest?.('.music-toggle')) start();
  }
  document.addEventListener('pointerdown', startAfterGesture);
  document.addEventListener('keydown', startAfterGesture);
  audio.addEventListener('error', () => { button.style.display = 'none'; });
  document.body.append(audio, button);
  new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  update();
  fetch(source, { method: 'HEAD' }).then(response => {
    if (response.ok) {
      button.style.display = 'inline-flex';
      start();
    }
  }).catch(() => {});
})();
