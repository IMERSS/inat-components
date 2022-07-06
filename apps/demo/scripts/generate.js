import path from "path";
import { generate } from "@imerss/inat-components-utils";
import config from "../src/inat.config.json" assert { type: "json" };

(async () => {
	const folder = path.resolve(__dirname, "../public/source");
	await generate(config, folder);
})();