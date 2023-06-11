import { TaxonPanelProps } from "@imerss/inat-components";

export {};
declare global {
	interface Window {
		inatComponents: {
			initTaxonPanel: (domId: string, taxonPanelProps: TaxonPanelProps) => void;
		}
	}
}

window.initStandalone = window.initStandalone || {};
