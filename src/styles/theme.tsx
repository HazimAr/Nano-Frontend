/* eslint-disable import/no-default-export */
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		bg: {
			primaryLight: 'hsl(334, 88%, 50%)',
			primary: 'hsl(334, 88%, 17%)',
			primary2: 'hsl(334, 88%, 14%)',
			primaryDark: 'hsl(334, 88%, 12%)',
			secondary: 'hsl(267.15328467153284, 7.462686567164178%, 13.137254901960786%)',
			steel: '#43464B',
		},
		red_black: {
			red: 'hsl(357, 71%, 52%)',
			gray: '	hsl(0, 0%, 5%)',
			black: 'hsl(0, 0%, 3%)',
		},
		theme_blue: {
			base_dark: 'hsl(206, 40%, 22%)',
			base_light: 'hsl(206, 40%, 30%)',
			//
			18: 'hsl(206, 40%, 18%)',
			15: 'hsl(206, 40%, 15%)',
			5: 'hsl(206, 40%, 5%)',
		},
		osu: 'hsl(333, 100%, 70%)',
		_osu: {
			100: 'hsl(333, 100%, 10%)',
			200: 'hsl(333, 100%, 20%)',
			300: 'hsl(333, 100%, 30%)',
			400: 'hsl(333, 100%, 40%)',
			500: 'hsl(333, 100%, 50%)',
			600: 'hsl(333, 100%, 60%)',
			700: 'hsl(333, 100%, 70%)',
			800: 'hsl(333, 100%, 80%)',
			900: 'hsl(333, 100%, 90%)',
		},
		// osu: '#FF66AA',
		discord: 'hsl(227, 58%, 65%)',
		// discord: '#7289da',
		light_white: 'hsl(0, 0%, 70%)',
		brand: {
			error: '#cf6679',
			secondary: '#f6a',
			primary: '#7549ac',
			primary2: '#fab107',
		},
		text: {
			50: '#FAFAFA',
			100: '#F5F5F5',
			200: '#EEEEEE',
			300: '#E0E0E0',
			400: '#BDBDBD',
			500: '#9E9E9E',
			600: '#757575',
			700: '#616161',
			800: '#424242',
			900: '#212121',
			1000: '#161616',
		},
		rounded: '10px',
	},
	styles: {
		global: () => ({
			html: {
				height: '100%',
			},
			body: {
				margin: 0,
				padding: 0,
				fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
				color: 'white',
				lineHeight: 'base',
				backgroundColor: 'red_black.black',
			},
			a: {
				color: 'inherit',
				textDecoration: 'none',
			},
			ul: {
				listStyle: 'none',
			},
			'&::-webkit-scrollbar': {
				background: '#000000',
				width: '0.44em',
			},
			'&::-webkit-scrollbar-track': {
				// boxShadow: "inset 0 0 2px #1A1A1D",
				background: 'red_black.black',
				borderRadius: '0px',
			},
			'&::-webkit-scrollbar-thumb': {
				background: 'gray',
				borderRadius: '50px',
			},
			'@font-face': {
				fontFamily: 'Gagalin',
				src: "url('/fonts/Gagalin.ttf')",
			},
			'.avatar': {
				borderRadius: '50%',
			},
		}),
	},
});

export default theme;
