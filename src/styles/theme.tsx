/* eslint-disable import/no-default-export */
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		bg: {
			primary:
				"hsl(267.15328467153284, 14.285714285714283%, 17.84313725490196%)",
			secondary:
				"hsl(267.15328467153284, 7.462686567164178%, 13.137254901960786%)",
		},
		brand: {
			error: "#cf6679",
			secondary: "#f6a",
			primary: "#7549ac",
			primary2: "hsl(41.99999999999999, 95.89041095890413%, 50.37254901960785%)",
		},
		text: {
			50: "#FAFAFA",
			100: "#F5F5F5",
			200: "#EEEEEE",
			300: "#E0E0E0",
			400: "#BDBDBD",
			500: "#9E9E9E",
			600: "#757575",
			700: "#616161",
			800: "#424242",
			900: "#212121",
			1000: "#161616",
		},
	},
	styles: {
		global: () => ({
			html: {
				height: "100%",
			},
			body: {
				fontFamily:
					"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
				color: "white",
				lineHeight: "base",
				padding: 0,
				margin: 0,
				backgroundColor: "bg.primary",
			},
			a: {
				color: "inherit",
				textDecoration: "none",
			},
			ul: {
				listStyle: "none",
			},
		}),
	},
});

export default theme;
