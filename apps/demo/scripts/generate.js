const path = require("path");
const utils = require("@imerss/inat-components-utils");
const config = require("../src/inat.config.json");

(async () => {
	const folder = path.resolve(__dirname, "../public/source");
	await utils.generate(config, folder);
})();