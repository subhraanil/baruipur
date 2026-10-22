/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-red-600',
    'bg-amber-600',
    'bg-orange-600',
    'bg-emerald-600',
    'bg-blue-600',
    'bg-rose-700',
    'bg-teal-600',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-cyan-600',
    'bg-fuchsia-600',
    'bg-slate-700',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        bengali: ['Noto Sans Bengali', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
