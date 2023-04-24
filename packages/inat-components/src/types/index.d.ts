import { TaxonPanelProps } from "../components/taxon-panel/taxon-panel";

export {};
declare global {
	interface Window {
		inatComponents: {
			initTaxonPanel: (domId: string, taxonPanelProps: TaxonPanelProps) => void;
		}
	}
}

window.initStandalone = window.initStandalone || {};

export enum DataSource {
	autoLoad = "autoLoad",
	url = "url"
}
