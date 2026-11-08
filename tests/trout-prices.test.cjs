const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const source = readFileSync(new URL('../assets/js/trout-prices.js', `file://${__filename}`), 'utf8');
const ids = ['menor_5', 'de_5_a_10', 'de_10_a_25', 'mayor_25'];
const payload = values => ({ success: true, precios_trucha: { tarifas: ids.map((id, i) => ({ id, precio: values[i] })) } });
function start() {
  const fields = ids.map(id => ({ dataset: { troutPrice: id }, textContent: '—' }));
  const status = { textContent: '' };
  const handlers = {};
  const requests = [];
  let response = payload([24.5, 23, 22, 21]);
  const document = {
    hidden: false,
    documentElement: { lang: 'es' },
    querySelectorAll: () => fields,
    querySelector: () => status,
    addEventListener: (name, callback) => { handlers[name] = callback; },
  };
  runInNewContext(source, {
    document, AbortController,
    setTimeout: () => 1, clearTimeout: () => {},
    setInterval: callback => { handlers.interval = callback; },
    fetch: async (url, options) => {
      requests.push({ url, options });
      if (response instanceof Error) throw response;
      return { ok: true, json: async () => response };
    },
  });
  return { fields, status, handlers, requests, document, respond: value => { response = value; } };
}
const flush = () => new Promise(resolve => setImmediate(resolve));
test('consulta Admin sin cookies, refresca y conserva la lectura si falla', async () => {
  const app = start();
  await flush();
  assert.deepEqual(app.fields.map(f => f.textContent), ['24.50', '23.00', '22.00', '21.00']);
  assert.match(app.requests[0].url, /\/carta\/precios-trucha_api$/);
  assert.equal(app.requests[0].options.credentials, 'omit');
  app.respond(new Error('sin red'));
  await app.handlers.interval();
  assert.equal(app.fields[0].textContent, '24.50');
  assert.match(app.status.textContent, /últimos precios/);
  app.respond(payload(['25.75', 24, 23, 22]));
  await app.handlers.interval();
  assert.equal(app.fields[0].textContent, '25.75');
  assert.equal(app.status.textContent, '');
});
test('rechaza una respuesta parcial sin sustituir ninguna tarifa', async () => {
  const app = start();
  await flush();
  app.respond(payload([30, 29, 28, 'NaN']));
  await app.handlers.interval();
  assert.deepEqual(app.fields.map(f => f.textContent), ['24.50', '23.00', '22.00', '21.00']);
});
test('suspende consultas oculta y actualiza al volver a la página', async () => {
  const app = start();
  await flush();
  app.document.hidden = true;
  await app.handlers.interval();
  assert.equal(app.requests.length, 1);
  app.document.hidden = false;
  app.handlers.visibilitychange();
  await flush();
  assert.equal(app.requests.length, 2);
});

test('traduce los avisos al cambiar de idioma', async () => {
  const app = start();
  await flush();
  app.respond(new Error('sin red'));
  await app.handlers.interval();
  app.document.documentElement.lang = 'en';
  app.handlers.langchange();
  assert.match(app.status.textContent, /Could not refresh/);
});
