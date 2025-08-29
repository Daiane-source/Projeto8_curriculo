/** @type {import('tailwindcss').Config} */
module.exports = {
  // Diz ao Tailwind onde procurar classes usadas no projeto
  content: [
    "./index.html", // Arquivo principal HTML
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos JS/TS/React na pasta src
  ],
  theme: {
    extend: {}, // Aqui podemos adicionar cores, fontes personalizadas etc.
  },
  plugins: [], // Plugins extras do Tailwind podem ser adicionados aqui
};
