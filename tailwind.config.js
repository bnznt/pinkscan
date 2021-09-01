const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
        './src/**/*.css',
        './src/**/*.vue',
        './src/**/*.ts'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    100: colors.pink[100],
                    500: colors.pink[500]
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
