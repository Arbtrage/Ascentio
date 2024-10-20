import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1800px',
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeOut: {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				box1: {
					"0%, 50%": { transform: "translate(100%, 0)" },
					"100%": { transform: "translate(200%, 0)" },
				},
				box2: {
					"0%": { transform: "translate(0, 100%)" },
					"50%": { transform: "translate(0, 0)" },
					"100%": { transform: "translate(100%, 0)" },
				},
				box3: {
					"0%, 50%": { transform: "translate(100%, 100%)" },
					"100%": { transform: "translate(0, 100%)" },
				},
				box4: {
					"0%": { transform: "translate(200%, 0)" },
					"50%": { transform: "translate(200%, 100%)" },
					"100%": { transform: "translate(100%, 100%)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fadeIn: "fadeIn 0.5s ease-in-out forwards",
				fadeOut: "fadeOut 0.5s ease-in-out forwards",
				box1: "box1 var(--duration) linear infinite",
				box2: "box2 var(--duration) linear infinite",
				box3: "box3 var(--duration) linear infinite",
				box4: "box4 var(--duration) linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
