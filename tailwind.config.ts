const { nextui } = require("@nextui-org/react");
const withMT = require("@material-tailwind/react/utils/withMT");
import type { Config } from "tailwindcss";

export default withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        corTema: "#e67c47",
        corSubTema: "#3774de",
        corHeader: "#005abb",
        corMenuAtivo: "#cf5e25",
        corMenuHover: "#e67c47",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#e67c47",
            foreground: "#fff",
          },
          secondary: {
            DEFAULT: "#3774de",
            foreground: "#fff",
          },
          danger: {
            DEFAULT: "#FF0037",
            foreground: "#fff",
          },
        }
      },
    }
  })],
}) satisfies Config;

