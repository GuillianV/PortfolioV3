import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import scrollbar from 'tailwind-scrollbar';
import { backoffice } from './themes/back/custom';
import { limeTheme } from './themes/back/lime';

/** @type {import('tailwindcss').Config} */
module.exports = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	theme: {
		extend: {}
	},

	plugins: [
		forms,
		scrollbar,
		skeleton({
			themes: {
				custom: [
					// backoffice
					limeTheme
				]
			}
		})
	]
};
