/** 
 * @type {import('tailwindcss').Config} 
 */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
		extend: {
      colors: {
        'black': {
          DEFAULT: "#0a0a0a",
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
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
