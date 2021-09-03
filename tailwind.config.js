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
                    350: '#363C4E',
                    750: '#363F5D',
                    760: '#303653',
                    1000: '#0E0E12'
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
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
