import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      aspectRatio: {
        "4/5": "4 / 5",
      },
    },
  },

  safelist: [
    "text-red-500",
    "text-green-500",
    "bg-red-500",
    "bg-green-500",
    "line-through",
    "text-green-300",
    "text-green-800"
  ],

  plugins: [typography, forms, containerQueries],
} satisfies Config;
