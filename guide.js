(() => {
  const key = 'camera-loft-guide-v1';
  const ids = ['idea','profile-a','profile-b','preview','merge','solid','thickness','hardware','camera'];
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (_) {}
  function updateProgress() {
    const done = ids.filter(id => saved[id] === true).length;
    document.querySelectorAll('[data-progress-count]').forEach(el => el.textContent = `${done} / ${ids.length}`);
    document.querySelectorAll('[data-progress-bar]').forEach(el => el.style.width = `${done / ids.length * 100}%`);
    document.querySelectorAll('[data-check]').forEach(el => el.checked = saved[el.dataset.check] === true);
  }
  document.querySelectorAll('[data-check]').forEach(el => el.addEventListener('change', () => {
    saved[el.dataset.check] = el.checked;
    try { localStorage.setItem(key, JSON.stringify(saved)); } catch (_) {}
    updateProgress();
  }));
  document.getElementById('reset-progress')?.addEventListener('click', () => {
    saved = {};
    try { localStorage.removeItem(key); } catch (_) {}
    updateProgress();
  });
  updateProgress();
  let a = false, b = false;
  const feedback = document.getElementById('selection-feedback');
  const lab = document.querySelector('.loft-lab');
  function drawSelection(message) {
    const ea = document.getElementById('selection-a');
    const eb = document.getElementById('selection-b');
    if (!ea || !eb) return;
    ea.textContent = a ? '① Region of Loft A — foot' : '① Select A / foot';
    eb.textContent = b ? '② Region of Camera loft' : '② Select B / plate';
    ea.classList.toggle('picked', a);
    eb.classList.toggle('picked', b);
    lab?.classList.toggle('complete', a && b);
    feedback.textContent = message;
  }
  function selectProfile(which) {
    if (which === 'b' && !a) {
      drawSelection('For this exercise, select A first, then B. In Onshape, profile order controls the loft direction.');
      return;
    }
    if (which === 'a') a = true;
    if (which === 'b') b = true;
    drawSelection(a && b ? 'Two profiles selected. The loft bridges A to B. Next, check Merge scope in Onshape.' : 'A is selected. Now select the orange region B.');
  }
  document.querySelectorAll('[data-select]').forEach(el => {
    el.addEventListener('click', () => selectProfile(el.dataset.select));
    if (el.tagName.toLowerCase() === 'g') el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectProfile(el.dataset.select); }
    });
  });
  document.getElementById('selection-reset')?.addEventListener('click', () => {
    a = b = false;
    drawSelection('Start by selecting the teal region A.');
  });
  document.querySelectorAll('[data-twist]').forEach(button => button.addEventListener('click', () => {
    const good = button.dataset.twist === 'good';
    document.getElementById('connections-good')?.toggleAttribute('hidden', !good);
    document.getElementById('connections-bad')?.toggleAttribute('hidden', good);
    const label = document.getElementById('twist-label');
    if (label) { label.textContent = good ? 'Corners line up' : 'Corners cross'; label.setAttribute('fill', good ? '#067c6f' : '#be4a59'); }
    const one = document.getElementById('connection-one');
    const two = document.getElementById('connection-two');
    if (one) one.textContent = good ? '1 connects to 1.' : '1 connects to 2.';
    if (two) two.textContent = good ? '2 connects to 2.' : '2 connects to 1.';
    document.querySelectorAll('[data-twist]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
  }));
  document.getElementById('print-guide')?.addEventListener('click', () => {
    document.querySelectorAll('details').forEach(el => el.open = true);
    window.print();
  });
})();
