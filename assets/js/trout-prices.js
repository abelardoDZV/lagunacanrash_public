(() => {
  'use strict';
  const fields = [...document.querySelectorAll('[data-trout-price]')];
  if (!fields.length) return;
  const status = document.querySelector('[data-trout-status]');
  let busy = false;
  let loaded = false;
  let state = 'loading';
  function showStatus() {
    const en = document.documentElement?.lang === 'en';
    const messages = {
      loading: en ? 'Loading prices…' : 'Consultando precios…',
      ready: '',
      stale: en ? 'Could not refresh. Showing the last prices received.' : 'No se pudo actualizar. Se muestran los últimos precios consultados.',
      unavailable: en ? 'Prices unavailable. Please ask us on WhatsApp.' : 'Precios no disponibles. Consulta por WhatsApp.',
    };
    status.textContent = messages[state];
  }
  showStatus();
  document.addEventListener('langchange', showStatus);
  async function load() {
    if (busy || document.hidden) return;
    busy = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('https://admin.lagunacanrash.com/carta/precios-trucha_api', {
        credentials: 'omit', cache: 'no-store', signal: controller.signal,
      });
      if (!response.ok) throw new Error();
      const payload = await response.json();
      const rows = payload?.precios_trucha?.tarifas;
      if (!payload.success || !Array.isArray(rows) || rows.length !== fields.length) throw new Error();
      const prices = fields.map(field => {
        const matches = rows.filter(row => row.id === field.dataset.troutPrice);
        const price = matches[0]?.precio;
        if (matches.length !== 1 || !['string', 'number'].includes(typeof price) ||
          !Number.isFinite(Number(price)) || Number(price) <= 0) throw new Error();
        return Number(price).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      });
      fields.forEach((field, index) => { field.textContent = prices[index]; });
      loaded = true;
      state = 'ready';
      showStatus();
    } catch {
      state = loaded ? 'stale' : 'unavailable';
      showStatus();
    } finally {
      clearTimeout(timeout);
      busy = false;
    }
  }
  void load();
  setInterval(load, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) void load(); });
})();
