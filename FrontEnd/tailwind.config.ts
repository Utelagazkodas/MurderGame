import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
        '13/16' : '13 / 16'
      },
    }
  },

  plugins: [typography]
} satisfies Config;
