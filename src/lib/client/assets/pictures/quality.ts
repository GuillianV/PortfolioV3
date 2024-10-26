export class Quality {
	private quality: number;
	private name: string;
	constructor(name: string, quality: number) {
		this.name = name;
		this.quality = quality;
	}

	/**
	 *
	 * @returns {string} The name of the quality
	 */

	public key(): string {
		return this.name;
	}

	/**
	 *
	 * @returns {number} The value of the quality in number
	 */
	public value(): number {
		return this.quality;
	}

	/**
	 *
	 * @returns {string} The value of the quality in string
	 */
	public toString(): string {
		return this.quality.toString();
	}

	/**
	 * @description Returns the quality object from the input
	 *
	 * @param quality {undefined | null | string | number | Quality}
	 * @returns Quality
	 *
	 * @example fromInput('100') // quality100
	 */

	public static fromInput(quality: undefined | null | string | number | Quality): Quality {
		if (quality instanceof Quality) {
			return quality;
		}

		if (
			quality == null ||
			(typeof quality === 'number' && isNaN(quality as number)) ||
			(typeof quality === 'string' && isNaN(parseInt(quality) as number))
		) {
			return quality100;
		}

		const qualitysFound = qualities.find((r) => r.value() === parseInt(quality.toString()));

		if (qualitysFound === undefined) return quality100;

		return qualitysFound;
	}
}

const quality100 = new Quality('100', 100);
const quality90 = new Quality('90', 90);
const quality80 = new Quality('80', 80);
const quality70 = new Quality('70', 70);
const quality60 = new Quality('60', 60);
const quality50 = new Quality('50', 50);

const qualities = [quality100, quality90, quality80, quality70, quality60, quality50];

export default qualities;
export { quality50, quality60, quality70, quality80, quality90, quality100 };
