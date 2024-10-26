import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const limeTheme: CustomThemeConfig = {
	name: 'lime',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '32px',
		'--theme-border-base': '0px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': 'var(--color-surface-300)',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #e1ff00
		'--color-primary-50': '251 255 217', // #fbffd9
		'--color-primary-100': '249 255 204', // #f9ffcc
		'--color-primary-200': '248 255 191', // #f8ffbf
		'--color-primary-300': '243 255 153', // #f3ff99
		'--color-primary-400': '234 255 77', // #eaff4d
		'--color-primary-500': '225 255 0', // #e1ff00
		'--color-primary-600': '203 230 0', // #cbe600
		'--color-primary-700': '169 191 0', // #a9bf00
		'--color-primary-800': '135 153 0', // #879900
		'--color-primary-900': '110 125 0', // #6e7d00
		// secondary | #97B9FF
		'--color-secondary-50': '239 245 255', // #eff5ff
		'--color-secondary-100': '234 241 255', // #eaf1ff
		'--color-secondary-200': '229 238 255', // #e5eeff
		'--color-secondary-300': '213 227 255', // #d5e3ff
		'--color-secondary-400': '182 206 255', // #b6ceff
		'--color-secondary-500': '151 185 255', // #97B9FF
		'--color-secondary-600': '136 167 230', // #88a7e6
		'--color-secondary-700': '113 139 191', // #718bbf
		'--color-secondary-800': '91 111 153', // #5b6f99
		'--color-secondary-900': '74 91 125', // #4a5b7d
		// tertiary | #424242
		'--color-tertiary-50': '227 227 227', // #e3e3e3
		'--color-tertiary-100': '217 217 217', // #d9d9d9
		'--color-tertiary-200': '208 208 208', // #d0d0d0
		'--color-tertiary-300': '179 179 179', // #b3b3b3
		'--color-tertiary-400': '123 123 123', // #7b7b7b
		'--color-tertiary-500': '66 66 66', // #424242
		'--color-tertiary-600': '59 59 59', // #3b3b3b
		'--color-tertiary-700': '50 50 50', // #323232
		'--color-tertiary-800': '40 40 40', // #282828
		'--color-tertiary-900': '32 32 32', // #202020
		// success | #abfd30
		'--color-success-50': '242 255 224', // #f2ffe0
		'--color-success-100': '238 255 214', // #eeffd6
		'--color-success-200': '234 255 203', // #eaffcb
		'--color-success-300': '221 254 172', // #ddfeac
		'--color-success-400': '196 254 110', // #c4fe6e
		'--color-success-500': '171 253 48', // #abfd30
		'--color-success-600': '154 228 43', // #9ae42b
		'--color-success-700': '128 190 36', // #80be24
		'--color-success-800': '103 152 29', // #67981d
		'--color-success-900': '84 124 24', // #547c18
		// error | #ff144f
		'--color-error-50': '255 220 229', // #ffdce5
		'--color-error-100': '255 208 220', // #ffd0dc
		'--color-error-200': '255 196 211', // #ffc4d3
		'--color-error-300': '255 161 185', // #ffa1b9
		'--color-error-400': '255 91 132', // #ff5b84
		'--color-error-500': '255 20 79', // #ff144f
		'--color-error-600': '230 18 71', // #e61247
		'--color-error-700': '191 15 59', // #bf0f3b
		'--color-error-800': '153 12 47', // #990c2f
		'--color-error-900': '125 10 39', // #7d0a27
		// warning | #fdbb08
		'--color-warning-50': '255 245 218', // #fff5da
		'--color-warning-100': '255 241 206', // #fff1ce
		'--color-warning-200': '255 238 193', // #ffeec1
		'--color-warning-300': '254 228 156', // #fee49c
		'--color-warning-400': '254 207 82', // #fecf52
		'--color-warning-500': '253 187 8', // #fdbb08
		'--color-warning-600': '228 168 7', // #e4a807
		'--color-warning-700': '190 140 6', // #be8c06
		'--color-warning-800': '152 112 5', // #987005
		'--color-warning-900': '124 92 4', // #7c5c04
		// surface | #C8CDD0
		'--color-surface-50': '247 248 248', // #f7f8f8
		'--color-surface-100': '244 245 246', // #f4f5f6
		'--color-surface-200': '241 243 243', // #f1f3f3
		'--color-surface-300': '233 235 236', // #e9ebec
		'--color-surface-400': '217 220 222', // #d9dcde
		'--color-surface-500': '200 205 208', // #C8CDD0
		'--color-surface-600': '180 185 187', // #b4b9bb
		'--color-surface-700': '150 154 156', // #969a9c
		'--color-surface-800': '120 123 125', // #787b7d
		'--color-surface-900': '98 100 102' // #626466
	}
};
