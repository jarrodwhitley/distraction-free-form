/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    darkMode: 'class',
    content: [
        "./src/components/*.{js,jsx,ts,tsx,vue}",
    ],
    theme: {
        extend: {
            screens: {
                'lm': '380px',
            },
        },
    },
    plugins: [
        plugin(function({ addVariant }) {
            addVariant('review', '.review-mode &')
        })
    ],
}

