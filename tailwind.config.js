const colors = require('tailwindcss/colors');

module.exports = {
    // mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.css',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    100: colors.pink[100],
                    200: '#FFE8F6',
                    500: '#FF4282',
                    900: '#480D30'
                },
                gray: {
                    250: '#E7EAF3',
                    260: '#E7E9F2',
                    350: '#363C4E',
                    650: '#485272',
                    750: '#363F5D',
                    760: '#303653',
                    780: '#232531',
                    850: '#191A23',
                    950: '#14141A',
                    1000: '#0E0E12'
                },
                green: {
                    150: '#C2FADD',
                    450: '#1BC870'
                },
                red: {
                    950: '#772929'
                }
            },
            opacity: {
                '8': '0.08'
            },
            translate: {
                'sidebar': 'var(--sidebar-width)',
                '-sidebar': 'calc(0px - var(--sidebar-width))'
            },
            borderRadius: {
                '10': '0.625rem'
            },
            borderWidth: {
                '3': '3px'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
