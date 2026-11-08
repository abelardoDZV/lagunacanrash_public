# Laguna Canrash Public

Sitio estático de Laguna Canrash, versión 2. Conserva la información,
fotografías, rutas, servicios y contactos del sitio existente.

## Desarrollo

Desde la raíz del worktree, instalar las dependencias y generar los estilos:

```bash
npm ci
npm run build
```

`assets/css/site-source.css` es la fuente de estilos y `tailwind.config.cjs`
define el tema y los archivos que analiza Tailwind. El resultado
`assets/css/site.css` se versiona: GitHub Pages sirve los archivos de `main`
sin necesitar Tailwind en el navegador. Regenerarlo al modificar la fuente,
la configuración o las clases de HTML y JavaScript. `assets/css/carta.css`
contiene los estilos independientes del visor de carta.

Para revisar desde la VPN, consultar la IPv4 actual de `tailscale0` y usarla
en lugar de `DIRECCION_TAILSCALE`:

```bash
ip -4 addr show tailscale0
python3 -m http.server 8080 --bind DIRECCION_TAILSCALE
```

Abrir esa dirección con el puerto 8080. El servidor debe iniciarse desde la
raíz del worktree de Public; las páginas son `index.html` y `carta.html`.
La compilación y la vista previa no publican cambios.

## Privacidad de la atención por WhatsApp

`privacidad.html` contiene la política de privacidad de Laguna
Canrash Admin para la atención compartida por WhatsApp. Incluye el responsable,
los datos y fines de la atención, proveedores, conservación de conversaciones
durante 12 meses desde el último mensaje y solicitudes de acceso, corrección
y eliminación al número del restaurante. La portada enlaza la página y el
sitemap incluye su dirección. El documento funciona sin JavaScript y utiliza
estilos propios para apariencia clara, oscura e impresión.

La página se sirve desde GitHub Pages en
`https://lagunacanrash.com/privacidad.html`. Publicarla no habilita
la recepción de mensajes ni crea la bandeja del Admin. Antes de usar la URL en
Meta hay que comprobar que responde sin autenticación.
La retención y la eliminación descritas deben implementarse también en Admin
antes de activar su almacenamiento de conversaciones. Los registros de reservas
y comprobantes son independientes. Actualizar esta política si cambian el
responsable, los proveedores, el canal de solicitudes o el uso de los datos.

Verificación local: documento y recursos accesibles sin sesión ni JavaScript;
sin desbordamiento ni solapamiento de cabecera a 320, 820 y 1440 px, en claro
y oscuro; navegación de teclado al contenido, enlaces locales y sitemap
comprobados. La página no solicita datos ni envía mensajes.

Referencias para la revisión del contenido:
[deber de informar de la ANPD](https://cdn.www.gob.pe/uploads/document/file/4566447/Gui%CC%81a%20pra%CC%81ctica%20para%20la%20observancia%20del%20%C2%ABDeber%20de%20Informar%C2%BB.pdf)
y [política de WhatsApp](https://www.whatsapp.com/legal/privacy-policy).

## Carta para clientes

La sección `index.html#carta` y la página `carta.html` muestran la carta como
contenido de la página, sin iframe ni desplazamiento interno. Ambas usan
`assets/js/menu.js` y la composición de clientes de Admin, adaptada en
`assets/css/customer-menu.css`; mantenerla coordinada con `CustomerMenu` y
`customer-documents.css` de Admin cuando cambie ese formato.

Los datos proceden de `https://admin.lagunacanrash.com/carta/carta_api`, sin
credenciales ni caché. Se conservan las categorías, el orden de las filas,
los platos repetidos, los precios y la anticipación recibidos. La carta permanece
en español y con el mismo fondo claro en ambos temas. Se actualiza cada minuto
mientras la página está visible y al volver a ella. Si falla una actualización,
se conserva la última lectura con aviso; si falla la primera carga, se ofrece
reintentar. Sin JavaScript se indica cómo habilitarlo y el contacto de WhatsApp.
No se muestran enlaces al dominio de Admin, tampoco en los mensajes de error.

La API debe permitir los orígenes públicos por CORS; este contrato ya existe
en Admin. Public no accede a la base de datos ni usa el archivo histórico
`assets/data/carta.json`. Esta versión se entrega desde Public, sin cambios ni despliegue de Admin.
El push a `main` publica el código fuente; la actualización efectiva de GitHub
Pages se comprueba por separado.

Verificación local del 2026-11-07: compilación y sintaxis JavaScript correctas;
las dos páginas comprobadas a 320, 390, 820, 1024 y 1440 px, en ambos temas,
sin desbordamiento horizontal ni scroll vertical interno en la carta.
Con API simulada se comprobaron filas repetidas, anticipación, precios, texto
seguro, error inicial, reintento, respuesta incompleta, conservación de la última
lectura, recuperación y acceso sin JavaScript. Con los archivos locales servidos
bajo ambos orígenes públicos en el navegador se verificaron el CORS real de
Admin, sus 21 filas vigentes y la copia del teléfono. Esta comprobación no publica
los archivos en GitHub Pages.

## Contenido y verificaciones

El sitio mantiene español e inglés mediante `assets/js/i18n.js`; la carta
original permanece en español y conserva su presentación. La galería usa
`assets/data/images.json` y `assets/data/image-variants.json`. Las fotos con
botes son decorativas: no se ofrecen paseos en bote. Las consultas y reservas
se coordinan por WhatsApp; el sitio no confirma disponibilidad.

```bash
node --check assets/js/site.js
node --check assets/js/i18n.js
node --check assets/js/visit.js
node --check assets/js/menu.js
npm run images:validate
```

Revisar también navegación móvil, cambio de idioma, galería y carta en celular,
tablet y escritorio. Horarios, tarifas de servicios y venta mayorista conservan
los datos existentes; esta versión no incorpora una consulta de disponibilidad
ni una actualización automática de esos valores.

## Revisión de la versión 2

La carta y las cuatro rutas aparecen después de la portada. Los detalles del
camino, ambientes, seguridad e historia se pueden desplegar; los precios y
acciones de consulta permanecen visibles. Hospedaje y estacionamiento tienen mensajes
propios de WhatsApp. La capacidad del estacionamiento no se presenta como disponibilidad
actual.

Las imágenes usan variantes existentes con `srcset`, `sizes` y dimensiones
explícitas. Los vídeos tienen controles nativos y `preload="none"`: se reproducen
por decisión del visitante. Las cuatro fuentes se sirven localmente desde
`assets/fonts/`, con sus licencias originales y procedencia en `sources.json`.
La carta incrustada conserva sus propios recursos, gestionados por Admin.

La navegación mantiene enlaces con fragmento y mueve el foco al destino. Los
filtros de galería son botones con estado, el recuento se anuncia y el visor
devuelve el foco al cerrar. El cambio de idioma funciona incluso si el navegador
bloquea el almacenamiento local. El contenido no depende de animaciones de
entrada para hacerse visible.

La galería comienza con una selección variada de fotografías. Su visor permite
deslizar horizontalmente, muestra la posición dentro del filtro elegido y ofrece
un reintento cuando falla una imagen. Una miniatura fallida conserva su posición
para evitar duplicados al cargar más fotos.

La sección de contacto prepara una consulta de restaurante con fecha y número
de personas opcionales. `assets/js/visit.js` valida la fecha según el día de Perú
y permite solo cantidades enteras positivas. Al continuar, el formulario abre
WhatsApp con el texto preparado: no envía mensajes automáticamente, no almacena
los datos y no confirma reservas. Sin JavaScript mantiene una consulta genérica.
El acceso flotante se oculta mientras están visibles la carta o esta sección.

Verificación del 2026-10-23: navegación y carta sin desbordamiento entre 320 y
1440 px, en apariencia clara y oscura del navegador; comparación visual idéntica
del documento incrustado con Admin al mismo ancho; teclado, galería, idiomas y
consultas comprobados. Axe no encontró infracciones en Public a 390 y 1440 px
con los desplegables abiertos; esto no certifica el iframe de Admin ni sustituye
la revisión manual. Los vídeos no hicieron solicitudes MP4 antes de pulsar Play
y ambos se reprodujeron correctamente después. Las medidas se hicieron en el
servidor local, no representan rendimiento real de producción.

La última revisión comprobó los nuevos bloques en 14 combinaciones de ancho y
apariencia (320–1440 px), sin desbordamientos ni infracciones de Axe en contacto,
consulta y reseñas a 390 y 1440 px. El formulario se verificó vacío, con datos,
con valores inválidos y al cambiar entre español e inglés, sin enviar consultas.
El visor se probó con teclado, gestos, fallos de carga y recuperación.

Referencias de la revisión: [contraste de WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[foco visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
y [carga de vídeos de web.dev](https://web.dev/articles/lazy-loading-video).

## Videos del sitio

Los videos del camino y del pastor se sirven sin pista de audio y con el atributo
`muted`. Conservan los controles de reproducción, pero el cliente no puede activar
sonido porque los archivos no contienen audio. Sus URL incluyen una versión para
evitar reutilizar las copias anteriores con sonido. Los recursos de música para
la TV se conservan independientemente.

## Precios de trucha por kilo

La sección `#mayor` conserva los cuatro intervalos y consulta
`https://admin.lagunacanrash.com/carta/precios-trucha_api` mediante
`assets/js/trout-prices.js`, sin cookies. Los precios se editan en Admin,
en la tarjeta «Precio de trucha por kilo» de Carta; no se duplican en HTML.
Se actualizan cada minuto mientras la página esté visible y al volver a ella.
Una respuesta incompleta o un fallo conserva la última lectura y muestra aviso;
sin primera lectura se invita a consultar por WhatsApp. Los intervalos y el resto
de la sección mantienen la traducción ES/EN.

Publicar primero Admin con la migración `c0e2a4f6b8d1` autorizada y aplicada;
después Public. Publicar código no acredita la actualización efectiva de Pages.
Pruebas de consulta y actualización: `node --test tests/trout-prices.test.cjs`.
