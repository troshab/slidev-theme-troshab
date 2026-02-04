import { defineConfig } from 'unocss'

export default defineConfig({
  // Safelist for dynamic classes that UnoCSS can't detect via static analysis
  safelist: [
    // Column spans for two-cols layout
    'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6', 'col-span-7', 'col-span-8', 'col-span-9',
    // Grid classes
    'grid', 'grid-cols-12',
    // Gap classes
    'gap-0', 'gap-1', 'gap-2', 'gap-4', 'gap-6', 'gap-8',
    // Alignment classes
    'items-start', 'items-center', 'items-end',
  ],

  shortcuts: {
    // 12-column grid system
    'grid-cols': 'grid grid-cols-12 gap-4',

    // Column width shortcuts (left column width)
    'is-3': 'col-span-3',
    'is-4': 'col-span-4',
    'is-5': 'col-span-5',
    'is-6': 'col-span-6',
    'is-7': 'col-span-7',
    'is-8': 'col-span-8',
    'is-9': 'col-span-9',

    // Semantic aliases
    'is-half': 'col-span-6',
    'is-one-third': 'col-span-4',
    'is-two-thirds': 'col-span-8',
    'is-one-quarter': 'col-span-3',
    'is-three-quarters': 'col-span-9',

    // Layout utilities
    'slide-content': 'h-full w-full p-8',
    'slide-content-full': 'h-full w-full',
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center',

    // Text utilities
    'text-slide-title': 'text-4xl font-bold mb-4',
    'text-slide-subtitle': 'text-2xl opacity-80',
    'text-section-title': 'text-5xl font-bold',
    'text-quote': 'text-3xl italic leading-relaxed',
    'text-quote-author': 'text-xl opacity-70 mt-4',

    // Note: Block and Theorem component styles are defined in CSS (colors.css + base.css)
    // to properly use CSS variables for theming. Do not add UnoCSS shortcuts for these.
  },

  rules: [
    // Dynamic column spans
    [/^col-left-(\d+)$/, ([, d]) => ({ 'grid-column': `span ${d}` })],
    [/^col-right-(\d+)$/, ([, d]) => ({ 'grid-column': `span ${12 - parseInt(d)}` })],
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'Monaco', 'monospace'],
      },
    },
  },
})
