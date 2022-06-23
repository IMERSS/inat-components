import path from "path";
import generate from "@imerss/inat-components-utils";
import config from "../../inat.config.json";

(async () => {
	const folder = path.resolve(__dirname, "../files");
	await generate(config, folder);
})();