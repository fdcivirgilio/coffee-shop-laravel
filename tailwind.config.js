import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                coffee: {
                    50: '#fcf9f4',
                    100: '#f6f0e4',
                    200: '#eadcc4',
                    300: '#dbc09d',
                    400: '#c69d71',
                    500: '#b07e4d',
                    600: '#96633d',
                    700: '#7d4e32',
                    800: '#67412e',
                    900: '#543628',
                },
                cream: '#F5E6D3',
                green: {
                    800: '#2C4C3B',
                }
            },
        },
    },

    plugins: [forms],
};
