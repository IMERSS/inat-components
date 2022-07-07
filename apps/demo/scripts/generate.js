const path = require("path");
const generate = require("@imerss/inat-components-utils");
const config = require("../src/inat.config.json");

(async () => {
	const folder = path.resolve(__dirname, "../public/source");
	await generate.default(config, folder);
})();