import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      aspectRatio: {
        "9/16": "9 / 16",
        "12/9": "12 / 9",
      },
    },
  },

  plugins: [typography, forms, containerQueries],
} satisfies Config;
