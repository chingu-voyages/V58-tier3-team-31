/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors: {
            "pine-green": "#01796F"
        }
    },
  },
  plugins: [],
}

// Forest Green	#228B22	Classic, rich, natural dark green.
// Hunter Green	#355E3B	A very deep, sophisticated, almost black-green.
// Pine Green	#01796F	A dark cyan-green, slightly cooler than forest green.
// Dark Olive Green	#556B2F	An earthy, muted dark green with a yellow undertone.
// Deep Emerald	#046307	A very dark, vibrant green often used for high contrast.
// A Custom Safe Green	#1A4314	A darker shade that works well for primary buttons against a light background.