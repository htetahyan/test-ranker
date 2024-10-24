import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(new_assessments)/assessments/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(new_assessments)/tests/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(new_assessments)/questions/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(new_assessments)/assessments/[id]/preview/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(new_assessments)/assessments/[id]/edit/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(new_assessments)/assessments/[id]/edit/tests/**/*.{js,ts,jsx,tsx,mdx}",
    
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  plugins: [nextui()],
};
export default config;
