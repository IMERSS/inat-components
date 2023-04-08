export {};
declare global {
	interface Window {
		initStandalone: any;
	}
}

window.initStandalone = window.initStandalone || {};
