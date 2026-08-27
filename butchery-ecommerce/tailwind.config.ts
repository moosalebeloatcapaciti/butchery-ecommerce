import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        char: {
          DEFAULT: "#1C1210", // charcoal-brown, near-black base
          light: "#2B1D19",
        },
        ember: {
          DEFAULT: "#C4361E", // hot coal red
          dark: "#8E2513",
          light: "#E85B3D",
        },
        gold: {
          DEFAULT: "#D9A441", // warm gold / spice
          light: "#F0C874",
        },
        smoke: {
          DEFAULT: "#F5EFE6", // warm cream for light sections
        },
        ash: "#8A7B6F",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "coal-grain":
          "radial-gradient(circle at 20% 20%, rgba(217,164,65,0.08), transparent 40%), radial-gradient(circle at 80% 60%, rgba(196,54,30,0.10), transparent 45%)",
      },
    },
  },
  plugins: [],
};
export default config;
