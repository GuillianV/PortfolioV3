export class Resolution {
	private resolution: number | null;
	private name: string;
	constructor(name: string, resolution: number | null) {
		this.name = name;
		this.resolution = resolution;
	}

	/**
	 *
	 * @returns {string} The name of the resolution
	 */
	public key(): string {
		return this.name;
	}

	/**
	 *
	 * @returns {number} The value of the resolution in number
	 */
	public value(): number | null {
		if (this.resolution) {
			return this.resolution;
		}
		return null;
	}

	/**
	 *
	 * @returns {string} The value of the resolution in string
	 */
	public toString(): string {
		if (this.resolution) {
			return this.resolution.toString();
		} else {
			return 'full';
		}
	}

	/**
	 * @description Returns the resolution object from the input
	 *
	 * @param resolution {undefined | null | string | number | Resolution}
	 * @returns Resolution
	 *
	 * @example fromInput('1920') // resolutionFullHd
	 */
	public static fromInput(resolution: undefined | null | string | number | Resolution): Resolution {
		if (resolution instanceof Resolution) {
			return resolution;
		}

		if (
			resolution == null ||
			(typeof resolution === 'number' && isNaN(resolution as number)) ||
			(typeof resolution === 'string' && isNaN(parseInt(resolution) as number))
		) {
			return resolutionMax;
		}

		const resolutionsFound = resolutions.find((r) => r.value() === parseInt(resolution.toString()));

		if (resolutionsFound === undefined) return resolutionMax;

		return resolutionsFound;
	}
}

const resolutionMax = new Resolution('Max Picture Size', null);
const resolutionFullHd = new Resolution('Full HD (1920×1080)', 1920);
const resolutionHd = new Resolution('HD (1280×720)', 1280);
const resolutionXga = new Resolution('XGA (1024×768)', 1024);
const resolutionSvga = new Resolution('SVGA (800×600)', 800);
const resolutionVga = new Resolution('VGA (640×480)', 640);
const resolutionQvga = new Resolution('QVGA (320×240)', 320);

const resolutions = [
	resolutionMax,
	resolutionFullHd,
	resolutionHd,
	resolutionXga,
	resolutionSvga,
	resolutionVga,
	resolutionQvga
];

export default resolutions;
export {
	resolutionMax,
	resolutionFullHd,
	resolutionHd,
	resolutionXga,
	resolutionSvga,
	resolutionVga,
	resolutionQvga
};
