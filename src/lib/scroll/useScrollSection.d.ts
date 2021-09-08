export declare const useScrollSection: (id: string) => {
	onClick: () => void;
	selected: boolean;
};
export declare const useScrollSections: () => {
	id: string;
	meta: unknown;
	onClick: () => void;
	selected: boolean;
}[];
