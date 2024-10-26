/**
 * @example IsJsonString('{"key": "value"}') // true
 *
 * @description Check if a string is a valid JSON
 *
 * @param str {string}
 * @returns {boolean}
 */
export function IsJsonString(str: string) {
	try {
		JSON.parse(str);
	} catch (e) {
		console.warn(e, 'Erreur lors de la vérification du JSON');
		return false;
	}
	return true;
}

/**
 * @example IsEmptyString('') // true
 *
 * @description Check if a string is empty
 *
 * @param str {string | null | undefined | FormDataEntryValue}
 * @returns {boolean}
 */
export function IsEmptyString(str: string | null | undefined | FormDataEntryValue) {
	try {
		return str == null || typeof str !== 'string' || str.length <= 0;
	} catch (e) {
		console.warn(e, 'Erreur lors de la vérification de la chaine');
		return false;
	}
}

export const PhotoExtensions = [
	'heic',
	'heif',
	'avif',
	'jpeg',
	'jpg',
	'jpe',
	'tile',
	'png',
	'tiff',
	'tif',
	'webp'
];

/**
 *
 * @description Check if a file is a photo
 * @example IsPhoto(file)
 *
 * @param obj {File | null | undefined | FormDataEntryValue}
 * @returns {boolean}
 */
export function IsPhoto(obj: File | null | undefined | FormDataEntryValue): boolean {
	try {
		if (obj == null || typeof obj !== 'object' || !(obj instanceof File)) return false;

		const fileExtension = GetExtension(obj.name);
		return PhotoExtensions.includes(fileExtension);
	} catch (e) {
		console.warn(e, "Erreur lors de la vérification de l'image");
		return false;
	}
}

const VideoExtensions = ['webm', 'mp4', 'ogg', 'ogv', 'avi', 'wmv', 'mov'];

/**
 *
 * @description Check if a file is a video
 * @example IsVideo(file)
 *
 * @param obj {File | null | undefined | FormDataEntryValue}
 * @returns {boolean}
 */
export function IsVideo(obj: File | null | undefined | FormDataEntryValue): boolean {
	try {
		if (obj == null || typeof obj !== 'object' || !(obj instanceof File)) return false;

		const fileExtension = GetExtension(obj.name);
		return VideoExtensions.includes(fileExtension);
	} catch (e) {
		console.warn(e, 'Erreur lors de la vérification de la vidéo');
		return false;
	}
}

const CompressedExtensions = ['zip', 'rar', '7z', 'gz', 'bz2', 'tar', 'xz', 'zst'];

/**
 *
 * @description Check if a filename is a compressed file
 * @example IsCompressedExtension(filename)
 *
 * @param obj {string}
 * @returns {boolean}
 */
export function IsCompressedExtension(obj: string): boolean {
	try {
		if (obj == null || typeof obj !== 'string') return false;

		const fileExtension = GetExtension(obj);
		return CompressedExtensions.includes(fileExtension);
	} catch (e) {
		console.warn(e, 'Erreur lors de la vérification du format compressé');
		return false;
	}
}

/**
 *
 * @description Check if a file is a svg
 * @example IsSvg(file)
 *
 * @param obj {File | null | undefined | FormDataEntryValue}
 * @returns {boolean}
 */
export function IsSvg(obj: File | null | undefined | FormDataEntryValue): boolean {
	try {
		if (obj == null || typeof obj !== 'object' || !(obj instanceof File)) return false;

		const fileExtension = GetExtension(obj.name);
		return fileExtension.includes('svg');
	} catch (e) {
		console.warn(e, 'Erreur lors de la vérification du SVG');
		return false;
	}
}

/**
 * @description Get the extension of a file
 *
 * @example GetExtension('file.jpg') // jpg
 * @param fname {string}
 * @returns {string}
 */
export function GetExtension(fname: string) {
	const pos = fname.lastIndexOf('.');
	const strlen = fname.length;
	let extension;
	if (pos != -1 && strlen != pos + 1) {
		const ext = fname.split('.');
		const len = ext.length;
		extension = ext[len - 1].toLowerCase();
	} else {
		extension = 'No extension found';
	}
	return extension;
}
