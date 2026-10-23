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

## Carta para clientes

La sección `index.html#carta` y el visor `carta.html` incrustan directamente
`https://admin.lagunacanrash.com/carta/publica` mediante un iframe. Admin
mantiene el documento original para clientes y sus datos: Public no reconstruye
el diseño, reordena platos, elimina filas repetidas ni modifica precios o
anticipaciones. Ambas vistas ofrecen un enlace para abrir el original.

La carta requiere que Admin y su API pública estén disponibles y permitan la
incrustación desde Public. La v2 no utiliza un respaldo local de precios;
`assets/data/carta.json` se conserva como archivo histórico, sin consumo desde
estas páginas. Los cambios de carta realizados en Admin se muestran al cargar
su vista pública. Esta integración no requiere sesión administrativa ni acceso
directo de Public a la base de datos.

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
npm run images:validate
```

Revisar también navegación móvil, cambio de idioma, galería y carta en celular,
tablet y escritorio. Horarios, tarifas de servicios y venta mayorista conservan
los datos existentes; esta versión no incorpora una consulta de disponibilidad
ni una actualización automática de esos valores.

## Revisión de la versión 2

La carta y las cuatro rutas aparecen después de la portada. Los detalles del
camino, ambientes, seguridad e historia se pueden desplegar; los precios y
acciones de consulta permanecen visibles. Hospedaje y cochera tienen mensajes
propios de WhatsApp. La capacidad de la cochera no se presenta como disponibilidad
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
