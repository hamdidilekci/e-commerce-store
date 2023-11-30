/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mavi: "#263fa3",
        gri: "#374151",
        kirmizi: "#ef4444",
        yesil: "#15803d",
        beyaz: "#f9fafb",
        civit: "#4f46e5",
        sari: "#fde047",
        acikGri: "#e2e8f0",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
