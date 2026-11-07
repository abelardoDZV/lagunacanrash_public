(() => {
  'use strict';

  const host = document.querySelector('[data-public-menu]');
  if (!host) return;
  const status = host.querySelector('[role="status"]');
  const categories = [
    ['trucha', 'A BASE DE TRUCHA'],
    ['pollo', 'A BASE DE POLLO'],
    ['otros', 'OTROS PLATOS'],
  ];
  let lastPayload = '';
  let busy = false;

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function copyPhone(yape = false) {
    const button = node('button', 'customer-phone', '957 878 409');
    button.type = 'button';
    button.setAttribute('aria-label', `Copiar número de ${yape ? 'Yape' : 'WhatsApp'}`);
    button.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error();
        await navigator.clipboard.writeText('957 878 409');
        button.textContent = '¡Copiado!';
      } catch {
        button.textContent = 'Número: 957 878 409';
      }
      setTimeout(() => { button.textContent = '957 878 409'; }, 3000);
    });
    return button;
  }

  function render(menu) {
    const document = node('div', 'customer-menu');
    document.setAttribute('aria-label', 'Carta para clientes');
    // Solo estructura fija; los datos recibidos se insertan como texto.
    document.innerHTML = `
      <div class="customer-menu-accent" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="customer-menu-heading">
        <img src="assets/brand/logo-horizontal.png" alt="Laguna Canrash" width="470" height="118">
        <h2>Nuestra Carta</h2><p>De la laguna a tu mesa.</p>
        <div class="customer-hairline" aria-hidden="true"></div>
      </div>
      <div class="customer-menu-notes">
        <div class="customer-menu-note"><p>Consulta la anticipación indicada en cada plato y el mínimo de personas.</p></div>
        <div class="customer-menu-contact">
          <a href="https://www.facebook.com/LagunaCanrashPeru/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Laguna Canrash"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></a>
          <a href="https://www.instagram.com/lagunacanrash/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Laguna Canrash"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1"/></svg></a>
        </div>
      </div>`;
    document.querySelector('.customer-menu-contact').prepend(copyPhone());

    for (const [key, title] of categories) {
      const section = node('section', 'customer-menu-section');
      section.append(node('h3', '', title));
      const line = node('div', 'customer-hairline');
      line.setAttribute('aria-hidden', 'true');
      section.append(line);
      const list = node('ul');
      for (const row of menu.productos[key]) {
        const item = node('li');
        const name = node('span', '', row.nombre);
        if (row.dias_anticipacion > 0) {
          name.append(' ', node('span', 'customer-menu-advance',
            `[* ${row.dias_anticipacion} ${row.dias_anticipacion === 1 ? 'día' : 'días'} de anticipación]`));
        }
        item.append(name, node('strong', '', `S/. ${Number(row.precio).toFixed(2)}`));
        list.append(item);
      }
      section.append(list);
      document.append(section);
    }

    const payment = node('div', 'customer-menu-payment');
    payment.append(node('h4', '', 'Reservas y pedidos para llevar'));
    const account = node('div');
    account.append(node('h5', '', 'Yape'), copyPhone(true), node('p', '', 'Empresa Isla de Canrash SRL'));
    payment.append(account);
    document.append(payment);
    const footer = node('div', 'customer-menu-footer');
    if (menu.fecha_actualizacion) {
      const date = menu.fecha_actualizacion;
      footer.append(node('p', '', `Última modificación: ${date.slice(0, 10).split('-').reverse().join('/')} ${date.slice(11, 16)}`));
    }
    footer.append(node('p', '', 'Laguna Canrash · Una escapada a la altura.'));
    document.append(footer);
    return document;
  }

  function validMenu(payload) {
    const menu = payload?.carta;
    return payload?.success === true && menu?.productos &&
      (menu.fecha_actualizacion == null || typeof menu.fecha_actualizacion === 'string') &&
      categories.every(([key]) => Array.isArray(menu.productos[key]) &&
        menu.productos[key].every(row => typeof row.nombre === 'string' &&
          (typeof row.precio === 'number' || typeof row.precio === 'string') &&
          String(row.precio).trim() !== '' && Number.isFinite(Number(row.precio)) &&
          Number(row.precio) >= 0 && Number.isInteger(row.dias_anticipacion) && row.dias_anticipacion >= 0));
  }

  async function load() {
    if (busy) return;
    busy = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('https://admin.lagunacanrash.com/carta/carta_api', {
        credentials: 'omit', cache: 'no-store', signal: controller.signal,
      });
      if (!response.ok) throw new Error();
      const payload = await response.json();
      if (!validMenu(payload)) throw new Error();
      const serialized = JSON.stringify(payload.carta);
      if (serialized !== lastPayload) {
        const menu = render(payload.carta);
        const previous = host.querySelector('.customer-menu');
        if (previous) previous.replaceWith(menu);
        else host.append(menu);
        lastPayload = serialized;
      }
      status.replaceChildren();
    } catch {
      status.textContent = lastPayload
        ? 'No se pudo actualizar. Se muestra la última carta cargada.'
        : 'No se pudo cargar la carta. Puedes reintentar.';
      const retry = node('button', 'menu-retry', 'Reintentar');
      retry.type = 'button';
      retry.addEventListener('click', () => void load());
      status.append(retry);
    } finally {
      clearTimeout(timeout);
      busy = false;
    }
  }

  void load();
  setInterval(() => { if (!document.hidden) void load(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) void load(); });
})();
