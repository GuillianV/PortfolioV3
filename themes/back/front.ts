import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const frontTheme: CustomThemeConfig = {
    name: 'front',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "0px",
		"--theme-rounded-container": "0px",
		"--theme-border-base": "0px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #DEF81B 
		"--color-primary-50": "250 254 221", // #fafedd
		"--color-primary-100": "248 254 209", // #f8fed1
		"--color-primary-200": "247 253 198", // #f7fdc6
		"--color-primary-300": "242 252 164", // #f2fca4
		"--color-primary-400": "232 250 95", // #e8fa5f
		"--color-primary-500": "222 248 27", // #DEF81B
		"--color-primary-600": "200 223 24", // #c8df18
		"--color-primary-700": "167 186 20", // #a7ba14
		"--color-primary-800": "133 149 16", // #859510
		"--color-primary-900": "109 122 13", // #6d7a0d
		// secondary | #37313B 
		"--color-secondary-50": "225 224 226", // #e1e0e2
		"--color-secondary-100": "215 214 216", // #d7d6d8
		"--color-secondary-200": "205 204 206", // #cdccce
		"--color-secondary-300": "175 173 177", // #afadb1
		"--color-secondary-400": "115 111 118", // #736f76
		"--color-secondary-500": "55 49 59", // #37313B
		"--color-secondary-600": "50 44 53", // #322c35
		"--color-secondary-700": "41 37 44", // #29252c
		"--color-secondary-800": "33 29 35", // #211d23
		"--color-secondary-900": "27 24 29", // #1b181d
		// tertiary | #404040 
		"--color-tertiary-50": "226 226 226", // #e2e2e2
		"--color-tertiary-100": "217 217 217", // #d9d9d9
		"--color-tertiary-200": "207 207 207", // #cfcfcf
		"--color-tertiary-300": "179 179 179", // #b3b3b3
		"--color-tertiary-400": "121 121 121", // #797979
		"--color-tertiary-500": "64 64 64", // #404040
		"--color-tertiary-600": "58 58 58", // #3a3a3a
		"--color-tertiary-700": "48 48 48", // #303030
		"--color-tertiary-800": "38 38 38", // #262626
		"--color-tertiary-900": "31 31 31", // #1f1f1f
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "249 221 234", // #f9ddea
		"--color-error-100": "246 209 228", // #f6d1e4
		"--color-error-200": "244 198 221", // #f4c6dd
		"--color-error-300": "238 163 200", // #eea3c8
		"--color-error-400": "225 94 159", // #e15e9f
		"--color-error-500": "212 25 118", // #D41976
		"--color-error-600": "191 23 106", // #bf176a
		"--color-error-700": "159 19 89", // #9f1359
		"--color-error-800": "127 15 71", // #7f0f47
		"--color-error-900": "104 12 58", // #680c3a
		// surface | #0E0027 
		"--color-surface-50": "255 255 255", // #dbd9df
		"--color-surface-100": "207 204 212", // #cfccd4
		"--color-surface-200": "195 191 201", // #c3bfc9
		"--color-surface-300": "159 153 169", // #9f99a9
		"--color-surface-400": "86 77 104", // #564d68
		"--color-surface-500": "14 0 39", // #0E0027
		"--color-surface-600": "13 0 35", // #0d0023
		"--color-surface-700": "11 0 29", // #0b001d
		"--color-surface-800": "8 0 23", // #080017
		"--color-surface-900": "7 0 19", // #070013
		
	}
}