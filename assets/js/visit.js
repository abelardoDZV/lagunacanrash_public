(function () {
    'use strict';

    const form = document.getElementById('visit-form');
    if (!form) return;
    const fields = document.getElementById('visit-fields');
    const date = document.getElementById('visit-date');
    const guests = document.getElementById('visit-guests');
    const message = document.getElementById('visit-message');

    function updateMessage() {
        const i18n = window.LC_I18N;
        if (!i18n) return;
        const parts = [i18n.t('visit.message')];
        if (date.value && date.validity.valid) {
            const [year, month, day] = date.value.split('-').map(Number);
            const label = new Intl.DateTimeFormat(i18n.getLocale(), {
                day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
            }).format(new Date(Date.UTC(year, month - 1, day)));
            parts.push(i18n.t('visit.messageDate', { date: label }));
        }
        if (guests.value && guests.validity.valid) {
            parts.push(i18n.t('visit.messageGuests', { guests: String(guests.valueAsNumber) }));
        }
        message.value = parts.join('\n');
    }

    date.min = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());
    fields.hidden = false;
    form.addEventListener('input', updateMessage);
    form.addEventListener('submit', updateMessage);
    document.addEventListener('langchange', updateMessage);
    updateMessage();
})();
