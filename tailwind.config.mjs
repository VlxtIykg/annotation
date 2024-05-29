/** @type {import('tailwindcss').Config} */
import colors, { emerald } from 'tailwindcss/colors'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
      },
      slate: {
        50: '#f9f9f9',
        100: '#f3f3f3',
        200: '#e3e3e3',
        300: '#d4d4d4',
        400: '#b6b6b6',
        500: '#989898',
        600: '#878787',
        700: '#5c5c5c',
        800: '#434343',
        900: '#2d2d2d',
      },
      midnight: '#121063',
			tahiti: {
        light: '#67e8f9',
        DEFAULT: '#06b6d4',
        dark: '#0e7490',
      },
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuschia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      std: {
        "accent-1": '#f7f7f7',
      },
		},
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
		extend: {
			colors: {
				'black': {
					DEFAULT: "#0a0a0a",
				},
			},
      keyframes: {
        animate: {
          '0%': {        
            transform: 'translateX(-100%) translateY(-100%)',
            width: 0,
            height: 0,
          },
          '100%': {
            transform: 'translateX(100%) translateY(100%)',
            width: '100%',
            height: '100%',
          }
        }
      },
      animation: {
        'animation': 'animate 3s linear infinite',
      }
		},
	},
	plugins: [],
}
