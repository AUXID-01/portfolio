module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  safelist: [
    // explicit class names
    'text-red-500',
    'bg-blue-200',
    // regex for dynamic patterns
    /^text-/,
    /^bg-/,
  ],
  theme: {
    extend: {},
  },
};
