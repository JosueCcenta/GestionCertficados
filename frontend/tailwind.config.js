/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{"azul-morado":"#623cea","celeste":"#009ddc","blanco":"#e9f1f7","azul_oscuro":"#0a1128","gris":"#545e56"},
    extend: {
      background:{"fondo-escuela":"url()"},
    },
  },
  plugins: [],
};
