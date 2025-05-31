import { colors } from "./utils/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",

  content: [
    "./app/**/*.{tsx,jsx,ts,js}",
    "./components/**/*.{tsx,jsx,ts,js}",
    "./global.css",
  ],

  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      colors: {
        ...colors,
      },
      borderRadius: {
        large: '2rem',
        inner: '1.5rem',
        medium: '1rem',
        small: '0.5rem'
      },
      fontFamily: {
        interthin: ['Inter_100Thin', 'sans-serif'],
        interextralight: ['Inter_200ExtraLight', 'sans-serif'],
        interlight: ['Inter_300Light', 'sans-serif'],
        interregular: ['Inter_400Regular', 'sans-serif'],
        intermedium: ['Inter_500Medium', 'sans-serif'],
        intersemibold: ['Inter_600SemiBold', 'sans-serif'],
        interbold: ['Inter_700Bold', 'sans-serif'],
        interextrabold: ['Inter_800ExtraBold', 'sans-serif'],
        interblack: ['Inter_900Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
};