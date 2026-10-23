        (function () {
            'use strict';

            const navbar = document.getElementById('navbar');
            const navbarBar = document.getElementById('navbar-bar');
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const iconOpen = document.getElementById('icon-open');
            const iconClose = document.getElementById('icon-close');
            const mobileLinks = document.querySelectorAll('.mobile-link');
            const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
            const sections = document.querySelectorAll('section[id]');
            const mainContent = document.getElementById('contenido');
            const whatsappLink = document.querySelector('.whatsapp-fab');

            document.getElementById('year').textContent = new Date().getFullYear();

            const contactRegions = [
                document.querySelector('.v2-menu-document'),
                document.getElementById('consulta')
            ].filter(Boolean);
            if (contactRegions.length && whatsappLink) {
                const quickContact = whatsappLink.closest('nav');
                const visibleContactRegions = new Set();
                const updateQuickContact = function () {
                    quickContact.hidden = visibleContactRegions.size > 0 && document.activeElement !== whatsappLink;
                };
                const contactObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) visibleContactRegions.add(entry.target);
                        else visibleContactRegions.delete(entry.target);
                    });
                    updateQuickContact();
                });
                contactRegions.forEach(function (region) { contactObserver.observe(region); });
                whatsappLink.addEventListener('blur', updateQuickContact);
            }


            function updateNavbar() {
                const menuOpen = mobileMenu.classList.contains('mobile-nav-open');
                if (menuOpen || window.scrollY > 48) {
                    navbar.classList.add('nav-scrolled');
                    navbar.classList.remove('nav-over-hero');
                } else {
                    navbar.classList.remove('nav-scrolled');
                    navbar.classList.add('nav-over-hero');
                }
            }

            function handleScroll() {
                if (mobileMenu.classList.contains('mobile-nav-open')) {
                    closeMobileMenu();
                }
                updateNavbar();
            }

            function closeMobileMenu() {
                if (mobileMenu.contains(document.activeElement)) {
                    const returnTarget = window.innerWidth >= 1024 ? navbarBar.querySelector('a') : menuToggle;
                    returnTarget.focus({ preventScroll: true });
                }
                mobileMenu.classList.remove('mobile-nav-open');
                mobileMenu.classList.add('mobile-nav-closed');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenu.inert = true;
                navbar.classList.remove('nav-menu-open');
                document.body.classList.remove('mobile-menu-active');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', window.LC_I18N.t('nav.openMenu'));
                mainContent.inert = false;
                if (whatsappLink) whatsappLink.inert = false;
                updateNavbar();
            }

            function openMobileMenu() {
                mobileMenu.classList.remove('mobile-nav-closed');
                mobileMenu.classList.add('mobile-nav-open');
                mobileMenu.setAttribute('aria-hidden', 'false');
                mobileMenu.inert = false;
                navbar.classList.add('nav-scrolled', 'nav-menu-open');
                navbar.classList.remove('nav-over-hero');
                document.body.classList.add('mobile-menu-active');
                iconOpen.classList.add('hidden');
                iconClose.classList.remove('hidden');
                menuToggle.setAttribute('aria-expanded', 'true');
                menuToggle.setAttribute('aria-label', window.LC_I18N.t('nav.closeMenu'));
                mainContent.inert = true;
                if (whatsappLink) whatsappLink.inert = true;
            }

            menuToggle.addEventListener('click', function () {
                const isOpen = mobileMenu.classList.contains('mobile-nav-open');
                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            mobileLinks.forEach(function (link) {
                link.addEventListener('click', closeMobileMenu);
            });

            document.querySelector('.mobile-menu-whatsapp').addEventListener('click', closeMobileMenu);

            document.addEventListener('keydown', function (e) {
                if (!mobileMenu.classList.contains('mobile-nav-open')) return;
                if (e.key === 'Escape') {
                    closeMobileMenu();
                    menuToggle.focus();
                }
                if (e.key === 'Tab') {
                    const controls = Array.from(navbar.querySelectorAll('a, button')).filter(function (el) {
                        return el.getClientRects().length > 0 && !el.closest('[inert]');
                    });
                    const first = controls[0];
                    const last = controls[controls.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            });

            window.addEventListener('resize', function () {
                if (window.innerWidth >= 1024 && mobileMenu.classList.contains('mobile-nav-open')) {
                    closeMobileMenu();
                }
            });

            document.querySelectorAll('a[href^="#"]').forEach(function (link) {
                link.addEventListener('click', function (e) {
                    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                    const href = link.getAttribute('href');
                    const target = href.length > 1 ? document.getElementById(href.slice(1)) : null;
                    if (!target) return;
                    if (mobileMenu.classList.contains('mobile-nav-open')) closeMobileMenu();
                    if (!target.hasAttribute('tabindex')) {
                        target.setAttribute('tabindex', '-1');
                    }
                    target.focus({ preventScroll: true });
                });
            });

            window.addEventListener('scroll', handleScroll, { passive: true });
            updateNavbar();

            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(function (link) {
                            const href = link.getAttribute('href');
                            if (href === '#' + id) {
                                link.classList.add('text-white');
                                link.classList.remove('text-white/85');
                                link.setAttribute('aria-current', 'true');
                            } else if (link.classList.contains('nav-link')) {
                                link.classList.remove('text-white');
                                link.classList.add('text-white/85');
                                link.removeAttribute('aria-current');
                            } else {
                                link.removeAttribute('aria-current');
                            }
                        });
                    }
                });
            }, { rootMargin: '-40% 0px -55% 0px' });

            sections.forEach(function (section) {
                observer.observe(section);
            });

            var IMAGES_DATA = 'assets/data/images.json';
            var VARIANTS_DATA = 'assets/data/image-variants.json';
            var GALLERY_BASE = 'assets/images/';
            var GALLERY_PAGE_SIZE = 12;
            var galleryItems = [];
            var galleryFilter = 'todos';
            var galleryVisibleCount = GALLERY_PAGE_SIZE;
            var galleryImgObserver = null;
            var galleryFiltersBound = false;
            var galleryCategoriesCache = [];
            var galleryInitialized = false;

            document.addEventListener('langchange', function () {
                if (galleryInitialized && galleryCategoriesCache.length) {
                    renderGalleryFilters(galleryCategoriesCache);
                    renderGalleryGrid(false);
                }
                var galleryLoading = document.getElementById('gallery-loading');
                if (galleryLoading && !galleryInitialized) {
                    galleryLoading.textContent = window.LC_I18N.t('gal.loadingLazy');
                }
                if (lightboxEl && !lightboxEl.classList.contains('hidden')) updateLightboxLabels();
            });

            var lightboxEl = document.getElementById('lightbox');
            var lightboxImg = document.getElementById('lightbox-img');
            var lightboxCaption = document.getElementById('lightbox-caption');
            var lightboxClose = document.getElementById('lightbox-close');
            var lightboxPrev = document.getElementById('lightbox-prev');
            var lightboxNext = document.getElementById('lightbox-next');
            var lightboxCounter = document.getElementById('lightbox-counter');
            var lightboxStatus = document.getElementById('lightbox-status');
            var lightboxRetry = document.getElementById('lightbox-retry');
            var lightboxSlides = [];
            var lightboxIndex = 0;
            var lightboxTrigger = null;
            var lightboxRequest = 0;
            var lightboxState = 'closed';
            var swipeStart = null;
            var suppressPointerClickUntil = 0;

            function getLightboxGroup(trigger) {
                var group = trigger.getAttribute('data-lightbox-group');
                if (!group) return [trigger];
                return Array.prototype.slice.call(document.querySelectorAll('.js-lightbox[data-lightbox-group="' + group + '"]'));
            }

            function getFilteredGalleryItems() {
                if (galleryFilter === 'todos') return galleryItems;
                return galleryItems.filter(function (item) {
                    return item.categories.indexOf(galleryFilter) >= 0;
                });
            }

            function updateLightboxLabels() {
                var slide = lightboxSlides[lightboxIndex];
                if (!slide) return;
                lightboxImg.alt = slide.alt || '';
                lightboxCaption.textContent = slide.alt || '';
                if (lightboxCounter) {
                    lightboxCounter.textContent = window.LC_I18N.t('ui.lightboxCounter', {
                        current: lightboxIndex + 1, total: lightboxSlides.length
                    });
                }
                if (lightboxStatus) {
                    lightboxStatus.textContent = lightboxState === 'loading'
                        ? window.LC_I18N.t('ui.lightboxLoading')
                        : lightboxState === 'error' ? window.LC_I18N.t('ui.lightboxError') : '';
                }
                if (lightboxRetry) lightboxRetry.textContent = window.LC_I18N.t('ui.lightboxRetry');
            }

            function setLightboxState(state) {
                lightboxState = state;
                lightboxEl.setAttribute('data-state', state);
                lightboxImg.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
                lightboxImg.hidden = state !== 'ready';
                if (lightboxRetry) {
                    if (state !== 'error' && document.activeElement === lightboxRetry) lightboxClose.focus();
                    lightboxRetry.hidden = state !== 'error';
                }
                updateLightboxLabels();
            }

            function updateLightbox() {
                var slide = lightboxSlides[lightboxIndex];
                if (!slide) return;
                var request = ++lightboxRequest;
                setLightboxState('loading');
                lightboxImg.removeAttribute('src');
                var hasNav = lightboxSlides.length > 1;
                lightboxPrev.classList.toggle('hidden', !hasNav);
                lightboxNext.classList.toggle('hidden', !hasNav);
                var loader = new Image();
                loader.decoding = 'async';
                loader.onload = function () {
                    if (request !== lightboxRequest) return;
                    lightboxImg.src = slide.src;
                    setLightboxState('ready');
                };
                loader.onerror = function () {
                    if (request === lightboxRequest) setLightboxState('error');
                };
                loader.src = slide.src;
            }

            function openLightbox(trigger) {
                lightboxTrigger = trigger;
                var group = trigger.getAttribute('data-lightbox-group');
                if (group === 'galeria') {
                    var filtered = getFilteredGalleryItems();
                    lightboxSlides = filtered.map(function (item) {
                        return { src: item.src, alt: item.alt };
                    });
                    var idx = parseInt(trigger.getAttribute('data-gallery-index'), 10);
                    lightboxIndex = Number.isNaN(idx) ? 0 : idx;
                } else {
                    lightboxSlides = getLightboxGroup(trigger).map(function (el) {
                        return {
                            src: el.getAttribute('data-lightbox-full') || el.currentSrc || el.src,
                            alt: el.alt || ''
                        };
                    });
                    lightboxIndex = Math.max(0, getLightboxGroup(trigger).indexOf(trigger));
                }
                updateLightbox();
                lightboxEl.classList.remove('hidden');
                lightboxEl.setAttribute('aria-hidden', 'false');
                document.body.classList.add('lightbox-open');
                document.getElementById('contenido').inert = true;
                navbar.inert = true;
                document.querySelector('.whatsapp-fab').inert = true;
                lightboxClose.focus();
            }

            function closeLightbox() {
                lightboxRequest += 1;
                swipeStart = null;
                setLightboxState('closed');
                lightboxEl.classList.add('hidden');
                lightboxEl.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('lightbox-open');
                lightboxImg.removeAttribute('src');
                document.getElementById('contenido').inert = false;
                navbar.inert = false;
                document.querySelector('.whatsapp-fab').inert = false;
                if (lightboxTrigger && document.contains(lightboxTrigger)) lightboxTrigger.focus();
                lightboxTrigger = null;
            }

            function stepLightbox(delta) {
                if (!lightboxSlides.length) return;
                lightboxIndex = (lightboxIndex + delta + lightboxSlides.length) % lightboxSlides.length;
                updateLightbox();
            }

            document.addEventListener('click', function (e) {
                var trigger = e.target.closest('.js-lightbox');
                if (trigger) {
                    e.preventDefault();
                    openLightbox(trigger);
                }
            });

            document.addEventListener('keydown', function (e) {
                if (e.target.classList && e.target.classList.contains('js-lightbox') && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    openLightbox(e.target);
                    return;
                }
                if (lightboxEl.classList.contains('hidden')) return;
                if (e.key === 'Tab') {
                    var controls = Array.from(lightboxEl.querySelectorAll('button')).filter(function (el) {
                        return !el.disabled && el.getClientRects().length > 0;
                    });
                    var first = controls[0], last = controls[controls.length - 1];
                    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
                }
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') { e.preventDefault(); stepLightbox(-1); }
                if (e.key === 'ArrowRight') { e.preventDefault(); stepLightbox(1); }
            });

            document.querySelectorAll('img.js-lightbox').forEach(function (img) {
                img.tabIndex = 0;
                img.setAttribute('role', 'button');
            });
            lightboxClose.addEventListener('click', closeLightbox);
            lightboxPrev.addEventListener('click', function () { stepLightbox(-1); });
            lightboxNext.addEventListener('click', function () { stepLightbox(1); });
            if (lightboxRetry) lightboxRetry.addEventListener('click', updateLightbox);
            lightboxEl.style.touchAction = 'pan-y pinch-zoom';
            lightboxEl.addEventListener('pointerdown', function (e) {
                if (!e.isPrimary) { swipeStart = null; return; }
                if ((e.pointerType !== 'touch' && e.pointerType !== 'pen') || e.target.closest('button, a')) return;
                swipeStart = { id: e.pointerId, x: e.clientX, y: e.clientY, time: performance.now() };
            });
            lightboxEl.addEventListener('pointercancel', function () { swipeStart = null; });
            lightboxEl.addEventListener('pointerup', function (e) {
                if (!swipeStart || e.pointerId !== swipeStart.id) return;
                var start = swipeStart;
                swipeStart = null;
                var dx = e.clientX - start.x;
                var dy = e.clientY - start.y;
                if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.7 || performance.now() - start.time > 1200) return;
                suppressPointerClickUntil = performance.now() + 500;
                stepLightbox(dx < 0 ? 1 : -1);
            });
            lightboxEl.addEventListener('click', function (e) {
                if (e.detail > 0 && performance.now() < suppressPointerClickUntil) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }, true);
            lightboxEl.addEventListener('click', function (e) {
                if (e.target === lightboxEl) closeLightbox();
            });

            function buildGalleryItems(data, variants) {
                var gallery = data.gallery;
                if (!gallery || !gallery.assignments) return [];
                var descriptions = gallery.descriptions || {};
                var variantFiles = (variants && variants.files) || {};
                var featured = [
                    'foto_profesional_preferida_contiene_laguna_bote_casitas_muelle_agua_limpia_cerro_con_nieve_cielo_azul_pasto_verde.jpg',
                    'ceviche_y_chicharron_de_trucha_con_fondo_laguna_canrash.jpg',
                    'varias_personas_caminando_en_muelle.jpg',
                    'comedor_de_vista_panoramica_vacio_pero_con_vista_completa_a_la_laguna_pared_transparente.jpg',
                    'nevado_en_ruta_a_laguna_canrash.jpg'
                ];
                return Object.keys(gallery.assignments).map(function (file) {
                    var variant = variantFiles[file] || {};
                    var fullSrc = variant.full || (GALLERY_BASE + file);
                    var thumbSrc = variant.thumb || fullSrc;
                    return {
                        file: file,
                        src: fullSrc,
                        thumbSrc: thumbSrc,
                        alt: descriptions[file] || file.replace(/_/g, ' ').replace(/\.[^.]+$/, ''),
                        categories: gallery.assignments[file]
                    };
                }).sort(function (a, b) {
                    var aRank = featured.indexOf(a.file), bRank = featured.indexOf(b.file);
                    if (aRank !== bRank) {
                        if (aRank < 0) return 1;
                        if (bRank < 0) return -1;
                        return aRank - bRank;
                    }
                    return a.alt.localeCompare(b.alt, 'es', { sensitivity: 'base' });
                });
            }

            function setupGalleryImgObserver() {
                if (galleryImgObserver) galleryImgObserver.disconnect();
                if (!('IntersectionObserver' in window)) return;
                galleryImgObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        var img = entry.target;
                        var src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        galleryImgObserver.unobserve(img);
                    });
                }, { rootMargin: '160px' });
            }

            function observeGalleryThumb(img) {
                if (galleryImgObserver) {
                    galleryImgObserver.observe(img);
                    return;
                }
                img.src = img.getAttribute('data-src') || '';
                img.removeAttribute('data-src');
            }

            function createGalleryThumb(item, index) {
                var img = document.createElement('img');
                img.setAttribute('data-src', item.thumbSrc);
                img.alt = item.alt;
                img.decoding = 'async';
                img.className = 'js-lightbox gallery-item gallery-thumb-loading aspect-square w-full rounded-xl object-cover';
                img.setAttribute('data-lightbox-group', 'galeria');
                img.setAttribute('data-gallery-index', String(index));
                img.setAttribute('tabindex', '0');
                img.setAttribute('role', 'button');
                img.addEventListener('load', function () {
                    img.classList.remove('gallery-thumb-loading');
                    img.classList.remove('gallery-thumb-error');
                    img.removeAttribute('aria-label');
                });
                var triedFull = item.thumbSrc === item.src;
                img.addEventListener('error', function () {
                    if (!triedFull) {
                        triedFull = true;
                        img.src = item.src;
                        return;
                    }
                    img.classList.remove('gallery-thumb-loading');
                    img.classList.add('gallery-thumb-error');
                    img.setAttribute('aria-label', item.alt + '. ' + window.LC_I18N.t('ui.lightboxError'));
                });
                observeGalleryThumb(img);
                return img;
            }

            function updateGalleryMeta(total, shown) {
                var statusEl = document.getElementById('gallery-status');
                statusEl.setAttribute('role', 'status');
                statusEl.setAttribute('aria-live', 'polite');
                statusEl.setAttribute('aria-atomic', 'true');
                var moreWrap = document.getElementById('gallery-more-wrap');
                var moreBtn = document.getElementById('gallery-more');

                if (total <= 0) {
                    statusEl.classList.add('hidden');
                    moreWrap.classList.add('hidden');
                    return;
                }

                statusEl.classList.remove('hidden');
                statusEl.textContent = window.LC_I18N.t('gal.showing', { shown: shown, total: total });

                if (shown < total) {
                    moreWrap.classList.remove('hidden');
                    moreBtn.textContent = window.LC_I18N.t('gal.loadMoreRemaining', { n: total - shown });
                } else {
                    moreWrap.classList.add('hidden');
                }
            }

            function renderGalleryGrid(reset) {
                var gridEl = document.getElementById('gallery-grid');
                var emptyEl = document.getElementById('gallery-empty');
                var filtered = getFilteredGalleryItems();

                if (reset) {
                    galleryVisibleCount = GALLERY_PAGE_SIZE;
                    gridEl.innerHTML = '';
                    setupGalleryImgObserver();
                }

                if (!filtered.length) {
                    gridEl.classList.add('hidden');
                    emptyEl.classList.remove('hidden');
                    document.getElementById('gallery-status').classList.add('hidden');
                    document.getElementById('gallery-more-wrap').classList.add('hidden');
                    return;
                }

                emptyEl.classList.add('hidden');
                gridEl.classList.remove('hidden');

                var alreadyShown = gridEl.children.length;
                var targetCount = Math.min(filtered.length, galleryVisibleCount);
                var batch = filtered.slice(alreadyShown, targetCount);

                batch.forEach(function (item, offset) {
                    gridEl.appendChild(createGalleryThumb(item, alreadyShown + offset));
                });

                updateGalleryMeta(filtered.length, gridEl.children.length);
            }

            function getCategoryLabel(catId) {
                var key = 'gal.cat.' + catId;
                var translated = window.LC_I18N.t(key);
                return translated !== key ? translated : catId;
            }

            function renderGalleryFilters(categories) {
                var filtersEl = document.getElementById('gallery-filters');
                filtersEl.setAttribute('role', 'group');
                filtersEl.innerHTML = '';
                var allBtn = document.createElement('button');
                allBtn.type = 'button';
                allBtn.className = 'gallery-filter rounded-full border border-lagoon-200 bg-white px-4 py-2 text-sm font-medium text-lagoon-700 transition hover:border-lagoon-300';
                allBtn.setAttribute('data-filter', 'todos');
                allBtn.setAttribute('aria-pressed', galleryFilter === 'todos' ? 'true' : 'false');
                allBtn.textContent = window.LC_I18N.t('gal.cat.all');
                if (galleryFilter === 'todos') allBtn.classList.add('gallery-filter-active');
                filtersEl.appendChild(allBtn);

                categories.forEach(function (cat) {
                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'gallery-filter rounded-full border border-lagoon-200 bg-white px-4 py-2 text-sm font-medium text-lagoon-700 transition hover:border-lagoon-300';
                    btn.setAttribute('data-filter', cat.id);
                    var active = galleryFilter === cat.id;
                    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
                    if (active) btn.classList.add('gallery-filter-active');
                    btn.textContent = getCategoryLabel(cat.id);
                    filtersEl.appendChild(btn);
                });

                if (!galleryFiltersBound) {
                    filtersEl.addEventListener('click', function (e) {
                        var btn = e.target.closest('.gallery-filter');
                        if (!btn) return;
                        galleryFilter = btn.getAttribute('data-filter');
                        filtersEl.querySelectorAll('.gallery-filter').forEach(function (button) {
                            var isActive = button === btn;
                            button.classList.toggle('gallery-filter-active', isActive);
                            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                        });
                        renderGalleryGrid(true);
                    });
                    galleryFiltersBound = true;
                }
            }

            function initGallery() {
                var loadingEl = document.getElementById('gallery-loading');
                loadingEl.textContent = window.LC_I18N.t('gal.loading');
                Promise.all([
                    fetch(IMAGES_DATA).then(function (res) { return res.json(); }),
                    fetch(VARIANTS_DATA).then(function (res) {
                        if (!res.ok) return { files: {} };
                        return res.json();
                    }).catch(function () { return { files: {} }; })
                ])
                    .then(function (results) {
                        galleryItems = buildGalleryItems(results[0], results[1]);
                        galleryCategoriesCache = results[0].gallery.categories || [];
                        renderGalleryFilters(galleryCategoriesCache);
                        loadingEl.classList.add('hidden');
                        renderGalleryGrid(true);
                        galleryInitialized = true;
                    })
                    .catch(function () {
                        loadingEl.textContent = window.LC_I18N.t('gal.error');
                    });
            }

            document.getElementById('gallery-more').addEventListener('click', function () {
                galleryVisibleCount += GALLERY_PAGE_SIZE;
                renderGalleryGrid(false);
            });

            var gallerySection = document.getElementById('galeria');
            if (gallerySection && 'IntersectionObserver' in window) {
                var galleryBootObserver = new IntersectionObserver(function (entries) {
                    if (entries[0].isIntersecting) {
                        galleryBootObserver.disconnect();
                        initGallery();
                    }
                }, { rootMargin: '280px' });
                galleryBootObserver.observe(gallerySection);
            } else {
                initGallery();
            }
        })();
