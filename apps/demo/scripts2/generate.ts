import path from "path";
import { generate } from "@imerss/inat-components";
import config from "../src/inat.config.json";

(async () => {
	const folder = path.resolve(__dirname, "../public/source");
	await generate(config, folder);
})();