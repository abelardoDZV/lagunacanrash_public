module.exports = {
            content: ['./index.html', './assets/js/*.js'],
    theme: {
                extend: {
                    colors: {
                        lagoon: {
                            50: '#F5F1E8',
                            100: '#E7EFF0',
                            200: '#C6DCDD',
                            300: '#88BBC4',
                            400: '#5A989F',
                            500: '#286C72',
                            600: '#286C72',
                            700: '#245A60',
                            800: '#1D4A50',
                            900: '#163B43',
                            950: '#102D33',
                        },
                        alpine: {
                            moss: '#626C35',
                            grass: '#A7AE70',
                            stone: '#686860',
                            wood: '#A84B2A',
                            bark: '#686860',
                        }
                    },
                    fontFamily: {
                        display: ['"Manrope"', 'system-ui', 'sans-serif'],
                        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
                        story: ['"Source Serif 4"', 'Georgia', 'serif'],
                    },
                    boxShadow: {
                        card: '0 10px 32px -12px rgba(22, 59, 67, 0.22)',
                        float: '0 16px 42px -14px rgba(22, 59, 67, 0.34)',
                    }
                }
            }
        };
