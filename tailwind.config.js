/** @type {import('tailwindcss').Config} */
export default {
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
    plugins: [],
}

