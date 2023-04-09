export {};
declare global {
	interface Window {
		initStandalone: any;
	}
}

window.initStandalone = window.initStandalone || {};

export enum DataSource {
	autoLoad = "autoLoad",
	url = "url"
}
