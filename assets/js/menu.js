import { addMenuImageAction } from './menu-image.js?v=1';

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
  const phone = '957 878 409';
  const whatsappIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/></svg>';
  const copyIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"/></svg>';
  let lastPayload = '';
  let currentMenu;
  let busy = false;

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function copyPhone(yape = false) {
    const button = node('button', 'customer-phone');
    button.innerHTML = yape ? `${phone}${copyIcon}` : `${whatsappIcon}${phone}`;
    button.type = 'button';
    button.setAttribute('aria-label', `Copiar número de ${yape ? 'Yape' : 'WhatsApp'}`);
    const notice = node('span', 'customer-phone-notice');
    notice.setAttribute('role', 'status');
    notice.dataset.html2canvasIgnore = 'true';
    button.append(notice);
    let timer;
    button.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error();
        await navigator.clipboard.writeText(phone);
        notice.textContent = '¡Copiado!';
      } catch {
        notice.textContent = `Número: ${phone}`;
      }
      clearTimeout(timer);
      timer = setTimeout(() => { notice.textContent = ''; }, 3000);
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
          <a href="https://www.instagram.com/lagunacanrash/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Laguna Canrash"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg></a>
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
        if (currentMenu) currentMenu.replaceWith(menu);
        else {
          addMenuImageAction(host, () => currentMenu);
          host.append(menu);
        }
        currentMenu = menu;
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
