const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {

	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],

	theme: {
		fontFamily: {
			sans: ["TTInterphasesPro", "sans-serif"]
		},

		extend: {
			boxShadow: {
				b: "0 5px 8px -1px rgba(0, 0, 0, 0.1)",
			},
			colors: {
				transparent: "transparent",
				primaryHighlight: "#f4f4f4",
				primary: "#2a3846",
				highlight: "#4501A8", //purple
				"highlight-dark": "#370286", //dark purple
				"highlight-light": "#5800d4", //light purple
				background: "#e9f0f5", //light grey
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography")
	],
};
