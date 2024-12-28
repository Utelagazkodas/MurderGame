import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    }
  },

  plugins: [typography]
} satisfies Config;
