/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/user/app/(pages)/.{js,ts,jsx,tsx,mdx}",
    "./apps/user/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/src",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
