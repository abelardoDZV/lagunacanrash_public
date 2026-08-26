(function () {
    'use strict';

    var STORAGE_KEY = 'lc-lang';

    var TRANSLATIONS = {
        es: {
            'meta.title': 'Laguna Canrash | Restaurante de trucha en Áncash, Perú',
            'meta.description': 'Restaurante de trucha fresca en Laguna Canrash, San Marcos (Áncash, Perú). Crianza propia, hospedaje rústico, cochera segura y ruta asfaltada desde Huaraz. Abierto 7am–7pm. Reserva: 957 878 409.',
            'meta.ogDescription': 'Trucha arcoíris de crianza propia, hospedaje rústico y cochera segura en los Andes peruanos, San Marcos (Áncash). A 3 h de Huaraz, ruta asfaltada.',
            'meta.twitterDescription': 'Trucha fresca de crianza propia en San Marcos, Áncash. Hospedaje, cochera y ruta asfaltada desde Huaraz.',

            'nav.label': 'Navegación principal',
            'nav.inicio': 'Inicio',
            'nav.comoLlegar': 'Cómo llegar',
            'nav.restaurante': 'Restaurante',
            'nav.carta': 'Carta',
            'nav.servicios': 'Servicios',
            'nav.mayor': 'Por Mayor',
            'nav.historia': 'Historia',
            'nav.galeria': 'Galería',
            'nav.whatsapp': 'WhatsApp',
            'nav.mobileLabel': 'Menú móvil',
            'nav.mayorMobile': 'Venta por Mayor',
            'nav.historiaMobile': 'Nuestra Historia',
            'nav.openMenu': 'Abrir menú',
            'nav.closeMenu': 'Cerrar menú',
            'nav.langSwitch': 'Cambiar idioma',
            'nav.quickActions': 'Acciones rápidas',

            'hero.badge': 'San Marcos · Áncash · Perú · A 20 min de Antamina',
            'hero.title': 'Trucha fresca de la laguna a tu plato',
            'hero.subtitle': 'Somos una familia de los andes peruanos que te recibe con trucha del día, cocina honesta y el paisaje de San Marcos, en el corazón de Áncash. Del criadero a tu mesa, en un solo lugar.',
            'hero.ctaRoute': 'Cómo llegar',
            'hero.ctaRestaurant': 'Ver restaurante',
            'hero.ctaReserve': 'Reservar: 957 878 409',
            'hero.scrollDown': 'Desplazarse hacia abajo',
            'hero.videoLabel': 'Video aéreo de toda la laguna Canrash',
            'hero.imageAlt': 'Vista panorámica de Laguna Canrash con laguna, muelle, casitas y nevados',
            'hero.statHours': 'Todos los días',
            'hero.statPaved': 'Ruta asfaltada',
            'hero.statAntamina': 'Desde Antamina',

            'route.label': 'Tu viaje, sin sorpresas',
            'route.title': 'Cómo llegar a Laguna Canrash',
            'route.intro': 'Carretera asfaltada en excelente estado hasta la puerta. Elige tu ruta en Google Maps y llega directo — sin caminar tramos.',
            'route.pavedTitle': 'Ruta asfaltada, sin caminar',
            'route.pavedText': 'Muchos visitantes nos preguntan si la carretera tiene asfalto o si habrá que caminar un tramo — sobre todo quienes viajan con niños, les afecta la altura o temen por su vehículo. Hoy la ruta está en <strong>excelentes condiciones</strong>: de Huaraz a Conococha el tramo lo mantiene el Estado peruano, y de Conococha hasta la laguna lo cuida Antamina. <strong>Llegas en auto directo al restaurante</strong>; en ningún momento tendrás que caminar por falta de camino.',
            'route.fromHuaraz': 'Huaraz',
            'route.fromHuallanca': 'Huallanca',
            'route.fromAntamina': 'Antamina',
            'route.linkHuaraz': 'Ruta desde Huaraz',
            'route.linkHuallanca': 'Ruta desde Huallanca',
            'route.linkAntamina': 'Ruta desde Antamina',
            'route.linkSanMarcos': 'Ruta desde San Marcos',
            'route.mapsNote': 'Si partes de San Marcos, Google Maps puede mostrarte <strong>dos rutas</strong>. Usa el enlace «Ruta desde San Marcos»: es la correcta para llegar a la laguna.',
            'route.sightsLabel': 'El viaje es parte de la experiencia',
            'route.sightsTitle': 'En el camino verás',
            'route.dinoTitle': 'Huellas de dinosaurio',
            'route.dinoDesc': 'Restos fósiles visibles a lo largo del camino, un viaje al pasado prehistórico.',
            'route.flamingoTitle': 'Flamencos en Conococha',
            'route.flamingoDesc': 'Avistamiento de flamencos rosados en la laguna Conococha, rumbo a Canrash.',
            'route.snowTitle': 'Nevados en ruta',
            'route.snowDesc': 'Cordillera nevada que acompaña el recorrido con panoramas de postal.',
            'route.gorillaTitle': 'Cerro del gorila',
            'route.gorillaDesc': 'Formación rocosa con perfil de cara de gorila, parada obligatoria para la foto.',
            'route.roadTitle': 'Así se vive el camino',
            'route.roadDesc': 'La ruta bordea la laguna, pasa buses de trabajadores y regala vistas que no se olvidan. Llegar a Canrash ya es parte de la experiencia.',
            'route.roadVideoLabel': 'Video del camino bordeando la laguna hacia Laguna Canrash',

            'rest.label': 'Gastronomía',
            'rest.title': 'Frescura extrema, sabor auténtico',
            'rest.p1': 'Aquí todo gira en torno a la laguna y a la gente que la cuida. Incubamos ovas importadas y criamos trucha arcoíris en jaulas flotantes en medio del agua — por eso en el Restaurante Laguna Canrash siempre hay trucha fresca.',
            'rest.p2': 'Los platos más pedidos son trucha frita, chicharrón de trucha, ceviche de trucha y sudado de trucha. También servimos pollo y carne de res, aunque en menor proporción.',
            'rest.p3': 'Somos un restaurante genuinamente rústico, con tres ambientes:',
            'rest.diningIndoorAlt': 'Comedor interno',
            'rest.room1': '<strong>Comedor interno</strong> — casa de adobe con poca vista al exterior; aquí funciona también la tiendita (agua, cerveza, galletas).',
            'rest.room2': '<strong>Comedor vista carretera</strong> — junto a la carretera, cerrado para resguardarse del viento; más vista a la pista que a la laguna.',
            'rest.room3': '<strong>Comedor vista laguna</strong> — pared transparente con vista total a la laguna (un plástico resistente que simula vidrio, instalado con ingenio y poco presupuesto).',
            'rest.dockNote': 'Tenemos un <strong>muelle habilitado y seguro</strong> donde muchos visitantes toman sus mejores fotos. Por falta de personal, costos y seguridad, <strong>no ofrecemos paseos en bote</strong>.',
            'rest.securityNote': '<strong>Tu tranquilidad importa:</strong> cámaras de seguridad en todo el recinto y respaldo de la central de la PNP vinculada a Antamina — también en el restaurante y todas las áreas de atención.',
            'rest.diningRoadAlt': 'Comedor vista carretera',
            'rest.diningAlt': 'Comedor vista laguna',
            'rest.starTitle': 'Platos estrella',
            'rest.starSubtitle': 'Cuatro preparaciones que definen nuestra cocina',
            'rest.friedTitle': 'Trucha frita',
            'rest.friedDesc': 'Del criadero al sartén el mismo día',
            'rest.chicharronTitle': 'Chicharrón de trucha',
            'rest.chicharronDesc': 'Textura crujiente, sabor intenso',
            'rest.cevicheTitle': 'Ceviche de trucha',
            'rest.cevicheDesc': 'Frescura marina en altura',
            'rest.sudadoTitle': 'Sudado de trucha',
            'rest.sudadoDesc': 'Caldo aromático y reconfortante',

            'carta.label': 'Restaurante',
            'carta.title': 'Carta y precios',
            'carta.intro': 'Platos y precios actualizados desde nuestro sistema. Los valores pueden variar; consulta al momento de tu visita.',
            'carta.hint': 'Toca cada categoría para ver los platos y precios.',
            'carta.loading': 'Cargando carta…',
            'carta.error': 'No se pudo mostrar la carta en este momento.',
            'carta.errorFallback': 'No pudimos cargar la carta. Escríbenos por WhatsApp y te la enviamos.',
            'carta.updated': 'Última actualización: ',
            'carta.whatsapp': 'Consultar disponibilidad por WhatsApp',
            'carta.cat.trucha': 'Trucha',
            'carta.cat.pollo': 'Pollo',
            'carta.cat.otros': 'Otros platos',
            'carta.dish': 'plato',
            'carta.dishes': 'platos',

            'dock.label': 'Experiencia',
            'dock.title': 'El muelle de la laguna',
            'dock.text': 'Nuestro muelle es un rincón querido: familias, viajeros y trabajadores de la zona se toman aquí sus mejores fotos. Por falta de personal, costos y seguridad, <strong>no ofrecemos paseos en bote</strong>.',

            'serv.label': 'Más que un restaurante',
            'serv.title': 'Servicios adicionales',
            'serv.intro': 'Para quienes trabajan en la ruta, dejan su auto varios días o necesitan un techo donde dormir.',
            'serv.hoursTitle': 'Horario de atención',
            'serv.hoursDesc': 'Todos los días de <strong>7:00 a.m. a 7:00 p.m.</strong>',
            'serv.wifiTitle': 'Internet gratis',
            'serv.wifiDesc': 'Wi‑Fi <strong>gratuito y continuo</strong> para quienes nos visitan, gracias a Starlink.',
            'serv.whereTitle': '¿Desde dónde vienes?',
            'serv.whereDesc': '<strong>3 h</strong> desde Huaraz · <strong>1 h</strong> desde Huallanca · <strong>20 min</strong> desde Antamina',
            'serv.securityTitle': 'Seguridad en todos nuestros servicios',
            'serv.securityDesc': 'Contamos con <strong>cámaras de seguridad en todo el recinto</strong> y respaldo de la <strong>central de la PNP vinculada a Antamina</strong>. Restaurante, cochera, hospedaje, estacionamiento y áreas de trabajo están bajo la misma vigilancia.',
            'serv.garageBadge': 'Cochera segura',
            'serv.garageTitle': 'Cochera para mineros y viajeros',
            'serv.garageDesc': 'Ideal para trabajadores de Antamina que dejan sus vehículos por 10 días o más. Espacios cubiertos con techo y estacionamiento amplio al aire libre.',
            'serv.garageRoof': '<strong>Con techo:</strong> S/ 10 por día — 6 espacios disponibles',
            'serv.garageOpen': '<strong>Sin techo:</strong> S/ 5 por día — amplio parqueo al aire libre',
            'serv.lodgeBadge': 'Hospedaje rústico',
            'serv.lodgeTitle': 'Descanso en los Andes peruanos',
            'serv.lodgeDesc': 'Habitaciones en módulos de madera y acogedoras casitas de adobe. Pensado para transportistas de ruta y personal de empresas de la zona.',
            'serv.lodgePrice': 'por noche',
            'serv.lodgeNote': 'Ambiente tranquilo, cálido y rodeado de paisaje andino — con la misma vigilancia que el resto de instalaciones.',
            'serv.astroBadge': 'Experiencia nocturna',
            'serv.astroTitle': 'Observatorio Andino',
            'serv.astroDesc': 'A más de 4 000 m, el cielo de Laguna Canrash es ideal para observar estrellas, la Luna y los planetas. Consulta nuestra guía del cielo con fases lunares, mapa estelar y qué ver cada noche.',
            'serv.astroLink': 'Ver guía del cielo',

            'mayor.label': 'Distribución',
            'mayor.title': 'Venta de trucha por mayor',
            'mayor.intro': 'Trucha arcoíris fresca, fileteada o entera, directamente del criadero. Precios escalonados según volumen para restaurantes, distribuidores y negocios de la región. Toda la operación cuenta con cámaras de seguridad y respaldo de la central PNP vinculada a Antamina.',
            'mayor.tableTitle': 'Tabla de precios por kilo',
            'mayor.tableSubtitle': 'Según volumen total de compra',
            'mayor.tier1': 'Menor a 5 kg',
            'mayor.tier1sub': 'Compra pequeña',
            'mayor.tier2': 'De 5 a 10 kg',
            'mayor.tier2sub': 'Volumen medio',
            'mayor.tier3': 'De 10 a 25 kg',
            'mayor.tier3sub': 'Restaurantes y negocios',
            'mayor.tier4': 'Mayor a 25 kg',
            'mayor.tier4sub': 'Distribuidores y alto volumen',
            'mayor.bestPrice': 'Mejor precio',
            'mayor.perKg': ' soles/kg',
            'mayor.quote': 'Solicitar cotización por WhatsApp',

            'hist.label': 'Legado familiar',
            'hist.title': 'Nuestra historia',
            'hist.p1': 'Somos una familia que lleva décadas en estas tierras. En los años 70, nuestro abuelo compró los campos alrededor de la laguna para pastorear ovejas y vacas, cuando este rincón de los Andes peruanos casi no tenía valor. De ese trabajo sencillo nació el amor por este lugar.',
            'hist.p2': 'El hijo de aquel pastor se había formado ya como ingeniero agrícola en la UNAM — por sus propios esfuerzos, mucho antes de que llegara Antamina — y soñaba con llevar la laguna un paso más allá: criar trucha arcoíris en jaulas flotantes, con sus propias manos y estudio. En el año 2000 la carretera hacia la mina pasó muy cerca y el paisaje cambió para siempre. Hubo robos, engaños y noches difíciles, pero no soltó el sueño.',
            'hist.p3': 'Hoy las ovejas siguen en el paisaje, como herencia viva de nuestro abuelo. La ganadería ya no es el sustento principal desde los años 90, pero cuida la tierra y a las familias de pastores que colaboran con nosotros. Nuestro abuelo defendió esta laguna cuando pocos lo harían; ese orgullo familiar sigue presente en cada rincón.',
            'hist.p4': 'Vivir tan alejados del pueblo nos obligó a inventarlo todo: agua, desagüe, luz con paneles solares. En 2023 llegó Starlink y por fin tuvimos internet estable en plena altura. En 2025 ganamos el Procompite de San Marcos y pudimos mejorar los ambientes del restaurante, cerrar el salón contra el viento y ampliar la vista panorámica a la laguna.',
            'hist.p5': 'Hoy somos hermanos y familia trabajando juntos. Te recibimos como llegamos a recibir a transportistas, mineros y viajeros de todas partes: con un plato caliente, trucha fresca y la calidez de quien sabe lo que es vivir en altura.',
            'hist.sheepCaption': 'El pastor guiando sus ovejas en la laguna — tradición viva de nuestra familia',
            'hist.cagesAlt': 'Vista desde las jaulas flotantes en medio de la laguna hacia la orilla',
            'hist.milestone2023title': 'Internet en la laguna',
            'hist.milestone2023desc': 'Llegó Starlink: conexión estable y Wi‑Fi gratuito para quienes nos visitan.',
            'hist.milestone2025title': 'Procompite San Marcos',
            'hist.milestone2025desc': 'Ganamos el fondo distrital y pudimos crecer: mejores ambientes, más comodidad para quien nos visita.',

            'gal.label': 'Momentos reales',
            'gal.title': 'Galería',
            'gal.intro': 'Explora la laguna, la comida, quienes nos visitan y el camino hasta Canrash. Toca una foto para verla en grande.',
            'gal.loadingLazy': 'La galería se cargará al acercarte a esta sección…',
            'gal.loading': 'Cargando galería…',
            'gal.error': 'No pudimos cargar la galería.',
            'gal.empty': 'No hay fotos en esta categoría.',
            'gal.loadMore': 'Cargar más fotos',
            'gal.loadMoreRemaining': 'Cargar más fotos ({n} restantes)',
            'gal.showing': 'Mostrando {shown} de {total} fotos',
            'gal.filterLabel': 'Filtrar galería',
            'gal.cat.all': 'Todas',
            'gal.cat.laguna': 'Laguna',
            'gal.cat.comida': 'Comida',
            'gal.cat.visitantes': 'Visitantes',
            'gal.cat.ruta': 'La ruta',
            'gal.cat.detras': 'Detrás del plato',

            'contact.tagline': 'Familia andina, trucha del día y una laguna que vale la pena conocer.',
            'contact.locationTitle': 'Ubicación',
            'contact.location': 'Distrito de San Marcos, provincia de Huari,<br>departamento de Áncash, Perú.',
            'contact.hoursFromHuaraz': '~3 horas desde Huaraz',
            'contact.hoursFromHuallanca': '~1 hora desde Huallanca',
            'contact.hoursFromAntamina': '~20 minutos desde Antamina',
            'contact.mapsLink': 'Ver ruta en Google Maps',
            'contact.moreRoutes': 'Más rutas y detalles del camino →',
            'contact.hoursTitle': 'Atención',
            'contact.hours': '<strong class="text-white">7:00 a.m. – 7:00 p.m.</strong><br>Todos los días de la semana.',
            'contact.wifiNote': '<strong class="text-lagoon-100">Internet gratis</strong> y continuo para visitantes, gracias a Starlink.',
            'contact.contactTitle': 'Contacto',
            'contact.whatsappDirect': 'WhatsApp directo',
            'contact.astroLink': 'Observatorio Andino — guía del cielo',
            'contact.copyright': 'Eica S.R.L. — Laguna Canrash. Todos los derechos reservados.',

            'ui.whatsappAria': 'Contactar por WhatsApp: 957 878 409',
            'ui.skipContent': 'Saltar al contenido',
            'ui.lightboxLabel': 'Vista ampliada de imagen',
            'ui.lightboxClose': 'Cerrar',
            'ui.lightboxPrev': 'Imagen anterior',
            'ui.lightboxNext': 'Imagen siguiente',

            'wa.general': 'Hola, me gustaría consultar sobre Laguna Canrash',
            'wa.reserve': 'Hola, quiero reservar en Laguna Canrash',
            'wa.menu': 'Hola, quiero consultar la carta del restaurante',
            'wa.wholesale': 'Hola, quiero cotizar trucha al por mayor'
        },
        en: {
            'meta.title': 'Laguna Canrash | Trout Restaurant in Áncash, Peru',
            'meta.description': 'Fresh trout restaurant at Laguna Canrash, San Marcos (Áncash, Peru). Own fish farm, rustic lodging, secure parking and paved road from Huaraz. Open 7am–7pm. Book: +51 957 878 409.',
            'meta.ogDescription': 'Rainbow trout from our own farm, rustic lodging and secure parking in the Peruvian Andes, San Marcos (Áncash). 3 h from Huaraz, paved road.',
            'meta.twitterDescription': 'Fresh farm-raised trout in San Marcos, Áncash. Lodging, parking and paved road from Huaraz.',

            'nav.label': 'Main navigation',
            'nav.inicio': 'Home',
            'nav.comoLlegar': 'How to get here',
            'nav.restaurante': 'Restaurant',
            'nav.carta': 'Menu',
            'nav.servicios': 'Services',
            'nav.mayor': 'Wholesale',
            'nav.historia': 'Our story',
            'nav.galeria': 'Gallery',
            'nav.whatsapp': 'WhatsApp',
            'nav.mobileLabel': 'Mobile menu',
            'nav.mayorMobile': 'Wholesale',
            'nav.historiaMobile': 'Our story',
            'nav.openMenu': 'Open menu',
            'nav.closeMenu': 'Close menu',
            'nav.langSwitch': 'Change language',
            'nav.quickActions': 'Quick actions',

            'hero.badge': 'San Marcos · Áncash · Peru · 20 min from Antamina',
            'hero.title': 'Fresh trout from the lagoon to your plate',
            'hero.subtitle': 'We are a Peruvian Andean family welcoming you with trout of the day, honest cooking and the landscape of San Marcos, in the heart of Áncash. From our farm to your table, all in one place.',
            'hero.ctaRoute': 'How to get here',
            'hero.ctaRestaurant': 'See restaurant',
            'hero.ctaReserve': 'Book: +51 957 878 409',
            'hero.scrollDown': 'Scroll down',
            'hero.videoLabel': 'Aerial video of Laguna Canrash',
            'hero.imageAlt': 'Panoramic view of Laguna Canrash with lagoon, dock, cabins and snow-capped peaks',
            'hero.statHours': 'Open every day',
            'hero.statPaved': 'Paved road',
            'hero.statAntamina': 'From Antamina',

            'route.label': 'Your trip, no surprises',
            'route.title': 'How to get to Laguna Canrash',
            'route.intro': 'Paved road in excellent condition right to our door. Pick your route on Google Maps and drive straight there — no walking stretches.',
            'route.pavedTitle': 'Paved road, no walking',
            'route.pavedText': 'Many visitors ask whether the road is paved or if they will have to walk part of the way — especially families with children, people sensitive to altitude, or those worried about their vehicle. Today the route is in <strong>excellent condition</strong>: from Huaraz to Conococha the Peruvian government maintains the stretch, and from Conococha to the lagoon Antamina takes care of it. <strong>You drive straight to the restaurant</strong>; at no point will you need to walk because the road ends.',
            'route.fromHuaraz': 'Huaraz',
            'route.fromHuallanca': 'Huallanca',
            'route.fromAntamina': 'Antamina',
            'route.linkHuaraz': 'Route from Huaraz',
            'route.linkHuallanca': 'Route from Huallanca',
            'route.linkAntamina': 'Route from Antamina',
            'route.linkSanMarcos': 'Route from San Marcos',
            'route.mapsNote': 'If you start from San Marcos, Google Maps may show you <strong>two routes</strong>. Use the "Route from San Marcos" link — it is the correct one to reach the lagoon.',
            'route.sightsLabel': 'The journey is part of the experience',
            'route.sightsTitle': 'Along the way you will see',
            'route.dinoTitle': 'Dinosaur footprints',
            'route.dinoDesc': 'Fossil remains visible along the road, a journey into prehistory.',
            'route.flamingoTitle': 'Flamingos at Conococha',
            'route.flamingoDesc': 'Pink flamingos at Laguna Conococha, on the way to Canrash.',
            'route.snowTitle': 'Snow-capped peaks',
            'route.snowDesc': 'Snowy mountains along the drive with postcard views.',
            'route.gorillaTitle': 'Gorilla hill',
            'route.gorillaDesc': 'Rock formation shaped like a gorilla face — a must-stop for photos.',
            'route.roadTitle': 'The road itself is an experience',
            'route.roadDesc': 'The route skirts the lagoon, passes worker buses and offers unforgettable views. Getting to Canrash is already part of the adventure.',
            'route.roadVideoLabel': 'Video of the road along the lagoon to Laguna Canrash',

            'rest.label': 'Gastronomy',
            'rest.title': 'Extreme freshness, authentic flavor',
            'rest.p1': 'Everything here revolves around the lagoon and the people who care for it. We hatch imported eggs and raise rainbow trout in floating cages in the middle of the water — that is why at Restaurante Laguna Canrash there is always fresh trout.',
            'rest.p2': 'The most popular dishes are fried trout, trout cracklings, trout ceviche and trout sudado stew. We also serve chicken and beef, though in smaller proportion.',
            'rest.p3': 'We are a genuinely rustic restaurant with three dining areas:',
            'rest.diningIndoorAlt': 'Indoor dining room',
            'rest.room1': '<strong>Indoor dining room</strong> — adobe house with limited outside views; our small shop (water, beer, snacks) is also here.',
            'rest.room2': '<strong>Road-view dining room</strong> — next to the road, enclosed to shelter from the wind; more view of the road than the lagoon.',
            'rest.room3': '<strong>Lagoon-view dining room</strong> — transparent wall with full lagoon view (a sturdy plastic that mimics glass, installed with ingenuity and a modest budget).',
            'rest.dockNote': 'We have a <strong>safe, accessible dock</strong> where many visitors take their best photos. Due to staffing, costs and safety, <strong>we do not offer boat rides</strong>.',
            'rest.securityNote': '<strong>Your peace of mind matters:</strong> security cameras throughout the premises and support from the PNP station linked to Antamina — in the restaurant and all service areas.',
            'rest.diningRoadAlt': 'Road-view dining room',
            'rest.diningAlt': 'Lagoon-view dining room',
            'rest.starTitle': 'Signature dishes',
            'rest.starSubtitle': 'Four preparations that define our kitchen',
            'rest.friedTitle': 'Fried trout',
            'rest.friedDesc': 'From farm to pan the same day',
            'rest.chicharronTitle': 'Trout cracklings',
            'rest.chicharronDesc': 'Crispy texture, intense flavor',
            'rest.cevicheTitle': 'Trout ceviche',
            'rest.cevicheDesc': 'Marine freshness at altitude',
            'rest.sudadoTitle': 'Trout sudado stew',
            'rest.sudadoDesc': 'Aromatic, comforting broth',

            'carta.label': 'Restaurant',
            'carta.title': 'Menu & prices',
            'carta.intro': 'Dishes and prices updated from our system. Prices may vary; please check when you visit.',
            'carta.hint': 'Tap each category to see dishes and prices.',
            'carta.loading': 'Loading menu…',
            'carta.error': 'Could not display the menu at this time.',
            'carta.errorFallback': 'We could not load the menu. Message us on WhatsApp and we will send it to you.',
            'carta.updated': 'Last updated: ',
            'carta.whatsapp': 'Check availability on WhatsApp',
            'carta.cat.trucha': 'Trout',
            'carta.cat.pollo': 'Chicken',
            'carta.cat.otros': 'Other dishes',
            'carta.dish': 'dish',
            'carta.dishes': 'dishes',

            'dock.label': 'Experience',
            'dock.title': 'The lagoon dock',
            'dock.text': 'Our dock is a beloved spot: families, travelers and local workers take their best photos here. Due to staffing, costs and safety, <strong>we do not offer boat rides</strong>.',

            'serv.label': 'More than a restaurant',
            'serv.title': 'Additional services',
            'serv.intro': 'For those working on the route, leaving their car for several days, or needing a roof for the night.',
            'serv.hoursTitle': 'Opening hours',
            'serv.hoursDesc': 'Every day from <strong>7:00 a.m. to 7:00 p.m.</strong>',
            'serv.wifiTitle': 'Free internet',
            'serv.wifiDesc': '<strong>Free, reliable Wi‑Fi</strong> for visitors, thanks to Starlink.',
            'serv.whereTitle': 'Where are you coming from?',
            'serv.whereDesc': '<strong>3 h</strong> from Huaraz · <strong>1 h</strong> from Huallanca · <strong>20 min</strong> from Antamina',
            'serv.securityTitle': 'Security across all our services',
            'serv.securityDesc': 'We have <strong>security cameras throughout the premises</strong> and support from the <strong>PNP station linked to Antamina</strong>. Restaurant, parking, lodging and work areas are all under the same surveillance.',
            'serv.garageBadge': 'Secure parking',
            'serv.garageTitle': 'Parking for miners and travelers',
            'serv.garageDesc': 'Ideal for Antamina workers who leave their vehicles for 10 days or more. Covered spaces and ample open-air parking.',
            'serv.garageRoof': '<strong>Covered:</strong> S/ 10 per day — 6 spaces available',
            'serv.garageOpen': '<strong>Uncovered:</strong> S/ 5 per day — ample open parking',
            'serv.lodgeBadge': 'Rustic lodging',
            'serv.lodgeTitle': 'Rest in the Peruvian Andes',
            'serv.lodgeDesc': 'Rooms in wooden modules and cozy adobe cabins. Designed for route drivers and company staff in the area.',
            'serv.lodgePrice': 'per night',
            'serv.lodgeNote': 'Quiet, warm atmosphere surrounded by Andean landscape — with the same security as the rest of our facilities.',
            'serv.astroBadge': 'Night experience',
            'serv.astroTitle': 'Andean Observatory',
            'serv.astroDesc': 'At over 4,000 m, the sky at Laguna Canrash is ideal for watching stars, the Moon and planets. Check our sky guide with lunar phases, star map and what to see each night.',
            'serv.astroLink': 'Open sky guide',

            'mayor.label': 'Distribution',
            'mayor.title': 'Wholesale trout sales',
            'mayor.intro': 'Fresh rainbow trout, filleted or whole, straight from our farm. Tiered pricing by volume for restaurants, distributors and businesses in the region. All operations have security cameras and PNP station support linked to Antamina.',
            'mayor.tableTitle': 'Price table per kilo',
            'mayor.tableSubtitle': 'Based on total purchase volume',
            'mayor.tier1': 'Under 5 kg',
            'mayor.tier1sub': 'Small purchase',
            'mayor.tier2': '5 to 10 kg',
            'mayor.tier2sub': 'Medium volume',
            'mayor.tier3': '10 to 25 kg',
            'mayor.tier3sub': 'Restaurants and businesses',
            'mayor.tier4': 'Over 25 kg',
            'mayor.tier4sub': 'Distributors and high volume',
            'mayor.bestPrice': 'Best price',
            'mayor.perKg': ' soles/kg',
            'mayor.quote': 'Request a quote on WhatsApp',

            'hist.label': 'Family legacy',
            'hist.title': 'Our story',
            'hist.p1': 'We are a family that has lived on this land for decades. In the 1970s, our grandfather bought the fields around the lagoon to graze sheep and cattle, when this corner of the Peruvian Andes had little value. From that humble work, love for this place was born.',
            'hist.p2': 'That shepherd\'s son had already trained as an agricultural engineer at UNAM — through his own efforts, long before Antamina arrived — and dreamed of taking the lagoon a step further: raising rainbow trout in floating cages, with his own hands and knowledge. In 2000 the road to the mine passed very close and the landscape changed forever. There were thefts, betrayals and hard nights, but he never let go of the dream.',
            'hist.p3': 'Today the sheep remain in the landscape, a living legacy of our grandfather. Livestock is no longer the main livelihood since the 1990s, but it cares for the land and the shepherd families who work with us. Our grandfather defended this lagoon when few would; that family pride is present in every corner.',
            'hist.p4': 'Living so far from town forced us to invent everything: water, drainage, solar power. In 2023 Starlink arrived and we finally had stable internet at altitude. In 2025 we won the Procompite grant in San Marcos and improved the restaurant spaces, enclosed the hall against the wind and expanded the panoramic lagoon view.',
            'hist.p5': 'Today we are siblings and family working together. We welcome you as we have welcomed truck drivers, miners and travelers from everywhere: with a hot meal, fresh trout and the warmth of those who know what it means to live at altitude.',
            'hist.sheepCaption': 'The shepherd guiding his sheep at the lagoon — a living tradition of our family',
            'hist.cagesAlt': 'View from the floating trout cages in the middle of the lagoon toward the shore',
            'hist.milestone2023title': 'Internet at the lagoon',
            'hist.milestone2023desc': 'Starlink arrived: stable connection and free Wi‑Fi for visitors.',
            'hist.milestone2025title': 'Procompite San Marcos',
            'hist.milestone2025desc': 'We won the district grant and grew: better spaces, more comfort for visitors.',

            'gal.label': 'Real moments',
            'gal.title': 'Gallery',
            'gal.intro': 'Explore the lagoon, the food, our visitors and the road to Canrash. Tap a photo to view it full size.',
            'gal.loadingLazy': 'The gallery will load when you scroll near this section…',
            'gal.loading': 'Loading gallery…',
            'gal.error': 'We could not load the gallery.',
            'gal.empty': 'No photos in this category.',
            'gal.loadMore': 'Load more photos',
            'gal.loadMoreRemaining': 'Load more photos ({n} remaining)',
            'gal.showing': 'Showing {shown} of {total} photos',
            'gal.filterLabel': 'Filter gallery',
            'gal.cat.all': 'All',
            'gal.cat.laguna': 'Lagoon',
            'gal.cat.comida': 'Food',
            'gal.cat.visitantes': 'Visitors',
            'gal.cat.ruta': 'The road',
            'gal.cat.detras': 'Behind the plate',

            'contact.tagline': 'Andean family, trout of the day and a lagoon worth discovering.',
            'contact.locationTitle': 'Location',
            'contact.location': 'San Marcos district, Huari province,<br>Áncash department, Peru.',
            'contact.hoursFromHuaraz': '~3 hours from Huaraz',
            'contact.hoursFromHuallanca': '~1 hour from Huallanca',
            'contact.hoursFromAntamina': '~20 minutes from Antamina',
            'contact.mapsLink': 'View route on Google Maps',
            'contact.moreRoutes': 'More routes and road details →',
            'contact.hoursTitle': 'Hours',
            'contact.hours': '<strong class="text-white">7:00 a.m. – 7:00 p.m.</strong><br>Every day of the week.',
            'contact.wifiNote': '<strong class="text-lagoon-100">Free internet</strong> and reliable Wi‑Fi for visitors, thanks to Starlink.',
            'contact.contactTitle': 'Contact',
            'contact.whatsappDirect': 'Direct WhatsApp',
            'contact.astroLink': 'Andean Observatory — sky guide',
            'contact.copyright': 'Eica S.R.L. — Laguna Canrash. All rights reserved.',

            'ui.whatsappAria': 'Contact via WhatsApp: +51 957 878 409',
            'ui.skipContent': 'Skip to content',
            'ui.lightboxLabel': 'Enlarged image view',
            'ui.lightboxClose': 'Close',
            'ui.lightboxPrev': 'Previous image',
            'ui.lightboxNext': 'Next image',

            'wa.general': 'Hello, I would like to inquire about Laguna Canrash',
            'wa.reserve': 'Hello, I would like to book at Laguna Canrash',
            'wa.menu': 'Hello, I would like to see the restaurant menu',
            'wa.wholesale': 'Hello, I would like a wholesale trout quote'
        }
    };

    var DISH_TRANSLATIONS = {
        'Trucha Frita 1/2': 'Fried Trout 1/2',
        'Trucha Frita': 'Fried Trout',
        'Trucha a la parrilla': 'Grilled Trout',
        'Ceviche de trucha (normal de picante)': 'Trout Ceviche (regular spice)',
        'Chicharrón de trucha': 'Trout Cracklings',
        'Sudado de trucha': 'Trout Sudado Stew',
        'Ceviche de trucha (fuentes)': 'Trout Ceviche (sharing platter)',
        'Duo ceviche + chicharrón de trucha': 'Duo: Ceviche + Trout Cracklings',
        'Chilcano de trucha': 'Trout Chilcano',
        'Caldo de pollo': 'Chicken Broth',
        'Chaufa de pollo': 'Chicken Fried Rice',
        'Chicharrón de pollo': 'Chicken Cracklings',
        'Lomo de pollo': 'Chicken Steak',
        'Pollo Frito': 'Fried Chicken',
        'Arroz Chaufa': 'Fried Rice',
        'Chicharrón de chancho': 'Pork Cracklings',
        'Lomo Saltado de Res': 'Beef Stir-fry',
        'Trío (Cevichocho + Chicharrón)': 'Trio (Cevichocho + Cracklings)',
        'Trío (Cevichocho + Chicharrón) fuente': 'Trio (Cevichocho + Cracklings) platter',
        'Picante de cuy entero': 'Whole Guinea Pig Stew',
        'Taper': 'Takeaway Container'
    };

    var currentLang = 'es';

    function detectLang() {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'es' || saved === 'en') return saved;
        return 'es';
    }

    function t(key, vars) {
        var str = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
            || (TRANSLATIONS.es && TRANSLATIONS.es[key])
            || key;
        if (vars) {
            Object.keys(vars).forEach(function (k) {
                str = str.replace('{' + k + '}', vars[k]);
            });
        }
        return str;
    }

    function translateDish(name) {
        if (currentLang === 'es') return name;
        return DISH_TRANSLATIONS[name] || name;
    }

    function updateMeta() {
        document.title = t('meta.title');
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', t('meta.description'));
        var ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', currentLang === 'en' ? 'en_US' : 'es_PE');
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', t('meta.title'));
        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', t('meta.ogDescription'));
        var twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', t('meta.title'));
        var twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', t('meta.twitterDescription'));
        document.documentElement.lang = currentLang;
    }

    function updateWhatsAppLinks() {
        document.querySelectorAll('[data-wa]').forEach(function (el) {
            var key = el.getAttribute('data-wa');
            var msg = encodeURIComponent(t('wa.' + key));
            el.href = 'https://wa.me/51957878409?text=' + msg;
        });
        var fab = document.querySelector('.whatsapp-fab');
        if (fab && !fab.getAttribute('data-wa')) {
            fab.href = 'https://wa.me/51957878409?text=' + encodeURIComponent(t('wa.general'));
        }
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            el.innerHTML = t(el.getAttribute('data-i18n-html'));
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
        });
        document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
            el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
        });
        updateMeta();
        updateWhatsAppLinks();
        updateLangSwitcher();
    }

    function updateLangSwitcher() {
        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            var lang = btn.getAttribute('data-lang-btn');
            var active = lang === currentLang;
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            btn.classList.toggle('lang-btn-active', active);
        });
    }

    function setLang(lang) {
        if (lang !== 'es' && lang !== 'en') return;
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        applyTranslations();
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    }

    function getLang() {
        return currentLang;
    }

    function getLocale() {
        return currentLang === 'en' ? 'en-US' : 'es-PE';
    }

    function initLangSwitcher() {
        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setLang(btn.getAttribute('data-lang-btn'));
            });
        });
    }

    function init() {
        currentLang = detectLang();
        applyTranslations();
        initLangSwitcher();
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.LC_I18N = {
        t: t,
        setLang: setLang,
        getLang: getLang,
        getLocale: getLocale,
        translateDish: translateDish
    };
})();
