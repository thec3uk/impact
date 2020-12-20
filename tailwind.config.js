module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Proxima Nova Black"', "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      zIndex: {
        100: "100",
      },
      rotate: {
        "-15": "-15deg",
        "-10": "-10deg",
        10: "10deg",
        15: "15deg",
      },
      colors: {
        // This is so we can reference data driven colours in class declarations
        "3DB4F5": "#3DB4F5",
        "1E44A7": "#1E44A7",
        343434: "#343434",
        EFEFEF: "#EFEFEF",
        D1D1D1: "#D1D1D1",
        "6C6C6C": "#6C6C6C",
        "4E4E4E": "#4E4E4E",
        FFFFFF: "#FFFFFF",
        black: "#343434",
        impact: {
          grey: {
            1: "#EFEFEF",
            2: "#D1D1D1",
            3: "#6C6C6C",
            4: "#4E4E4E",
          },
          blue: {
            1: "#3DB4F5",
            2: "#007BB8",
            3: "#005C96",
          },
          darkBlue: {
            1: "#1E44A7",
            2: "#003696",
            3: "#001167",
          },
        },
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus", "before"],
  },
  plugins: [require("tailwindcss-textshadow"), require("tailwindcss-pseudo-elements")],
}
