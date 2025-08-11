/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter-Regular',
          'Inter-SemiBold',
          'Inter-Bold',
        ],
        'alata': ['Alata-Regular'],
      },
      colors:{
        primary: {
          DEFAULT: '#023E8A', // Example: Blue
          // light: '#66b3ff', // Example: Light blue
          // dark: '#0056b3', // Example: Dark blue
        },
        secondary: {
          DEFAULT: '#BCDAFF',
        },
        background: {
          DEFAULT: '#E6F2FF', 
        },
      }
    },
  },
  plugins: [],
};

