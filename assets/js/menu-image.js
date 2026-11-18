const filename = 'carta-laguna-canrash.png';
const rendererUrl = new URL('../vendor/html2canvas-1.4.1.min.js', import.meta.url);

function loadRenderer() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = rendererUrl.href;
    script.onload = () => resolve(window.html2canvas);
    script.onerror = () => {
      script.remove();
      reject(new Error('No se pudo cargar el generador de imágenes. Vuelve a intentarlo.'));
    };
    document.head.append(script);
  });
}

async function captureMenu(menu) {
  const width = Math.ceil(menu.getBoundingClientRect().width);
  const windowWidth = window.innerWidth;
  // La carta visible se puede renovar mientras se carga el generador.
  const snapshot = menu.cloneNode(true);
  snapshot.dataset.menuCapture = '';
  snapshot.setAttribute('aria-hidden', 'true');
  snapshot.inert = true;
  snapshot.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;margin:0;`;
  document.body.append(snapshot);

  try {
    const logo = snapshot.querySelector('img');
    const [html2canvas] = await Promise.all([
      loadRenderer(),
      document.fonts?.ready,
      logo.decode().catch(() => { throw new Error('No se pudo cargar el logo. Vuelve a intentarlo.'); }),
    ]);
    const canvas = await html2canvas(snapshot, {
      scale: 2,
      width,
      windowWidth,
      backgroundColor: '#F5F1E8',
      logging: false,
      useCORS: true,
      onclone: (doc, root) => {
        doc.body.replaceChildren(root);
        doc.body.style.cssText = 'margin:0;padding:0;background:white;';
        root.style.cssText = `width:${width}px;max-width:none;margin:0;overflow:visible;background-image:none;`;
      },
    });
    return await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob && canvas.width && canvas.height) resolve(blob);
        else reject(new Error('No se pudo generar la imagen completa.'));
      }, 'image/png');
    });
  } finally {
    snapshot.remove();
  }
}

export function addMenuImageAction(host, getMenu) {
  const actions = document.createElement('div');
  actions.className = 'menu-image-actions';
  actions.innerHTML = `
    <button type="button" class="menu-image-button">Copiar Carta</button>
    <p class="menu-image-status" role="status"></p>
    <dialog class="menu-image-preview" aria-labelledby="menu-image-title">
      <div class="menu-image-heading">
        <h2 id="menu-image-title">Imagen lista para compartir</h2>
        <p>Mantén pulsada la imagen o usa el botón derecho para copiarla y pegarla en WhatsApp.
          También puedes descargarla.</p>
      </div>
      <div class="menu-image-scroll"><img alt="Carta para compartir"></div>
      <form method="dialog" class="menu-image-controls">
        <a class="menu-image-button" download="${filename}">Descargar imagen</a>
        <button type="submit" class="menu-image-button menu-image-close" autofocus>Cerrar</button>
      </form>
    </dialog>`;
  const button = actions.querySelector('button');
  const notice = actions.querySelector('[role="status"]');
  const dialog = actions.querySelector('dialog');
  const preview = dialog.querySelector('img');
  const download = dialog.querySelector('a');

  const clearPreview = () => {
    URL.revokeObjectURL(download.href);
    download.removeAttribute('href');
    preview.removeAttribute('src');
  };
  dialog.addEventListener('close', () => {
    clearPreview();
    button.focus();
  });

  button.addEventListener('click', async () => {
    if (button.getAttribute('aria-disabled') === 'true') return;
    button.setAttribute('aria-disabled', 'true');
    button.textContent = 'Generando imagen…';
    notice.textContent = '';
    const image = captureMenu(getMenu());
    try {
      // Iniciar la escritura en el clic conserva la activación de Safari.
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') throw new Error();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': image })]);
      notice.textContent = '¡Imagen copiada! Pégala en WhatsApp.';
    } catch {
      try {
        const url = URL.createObjectURL(await image);
        download.href = url;
        if (dialog.showModal) {
          preview.src = url;
          dialog.showModal();
        } else {
          download.click();
          download.removeAttribute('href');
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          notice.textContent = 'Imagen descargada. Puedes adjuntarla en WhatsApp.';
        }
      } catch (error) {
        notice.textContent = error instanceof Error && error.message
          ? error.message
          : 'No se pudo generar la imagen.';
      }
    } finally {
      button.removeAttribute('aria-disabled');
      button.textContent = 'Copiar Carta';
    }
  });
  host.append(actions);
}
