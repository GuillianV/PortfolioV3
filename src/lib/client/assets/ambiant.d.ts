export type AssetCategory = {
	id: string;
	path: string;
	filename: string;
	extension: string;
	originalFilename: string;
	createdAt: Date;
	assetCategoryId: string;
	assetCategory: {
		name: string;
	};
};

export type AssetPickerAction = {
	open: boolean;
	assetType: string;
	assetPickerId: string;
};

export type AssetAction = {
	actionName: string;
	assetType: string;
	asset: Asset | null;
	assetPickerId: string;
};
