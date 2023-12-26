/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      scrollbar: ['dark', 'rounded'],
    },
    colors: {
      PrimaryColorDark: "#01263f",
      PrimaryColorDarkHover: "#1d1e1f",//ffff  01383f // ei color ta use korsi amra
      PrimaryColorLight: "#F1F5F9", // bg-slate-100
      navbarColorGray: "#64748B", // bg-slate-600
      homeColor: "#cbd5e1", // bg-slate-300
      PureWhite: "#ffffff", // bg-PureWhite
      orange: "#7c2d12", // orange-900
      tooltip: "#94a3b8", // slate-400
      cardBorder: "#353738",
      cardBG: "#1d1e1f",
      cardTextColor: "#ddd8d2",
      footerColor: " #01484f",

      // #333131 from new post form
      // #deb887 burly wood
      // #dec197 burly wood awsome version
      // #292b2c best background color

      // #271e4b number 1 background color
      // #0c242b awsome color
      //#01263f jush color
      // #01384f jush color 2 -> for navbar
  },
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}

// 2xl:px-[30%] -> normal -> 100%
// xl:px-[25%] -> 120% - 150%
// lg:px-[20%] ->  160px - 180% - 230%
// md:px-[10%]
// sm:px-[1%] ->