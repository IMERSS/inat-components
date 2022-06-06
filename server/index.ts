import * as utils from "../client/src/utils/recentObservations";
import fs from "fs";
import {INatApi, ConfigurationSet} from "../client/src/typings";
import {getDemoConfigurations} from "../client/src/demo/demo.config";


const configurationSets: ConfigurationSet[] = [
    {
        name: "Demo files",
        filenamePrefix: "",
        configurations: getDemoConfigurations()
    }
];

const process = () => {
    configurationSets.map((set) => {
        set.configurations.map(async (config) => {

            if (config.api === INatApi.recentObservations) {
                const obs = await utils.getRecentObservations({
                    taxonId: config.taxonId,
                    placeId: config.placeId,
                    perPage: config.perPage
                });

                const filename = `${set.filenamePrefix}${config.filename}`;
                const filenameWithPath = `${__dirname}/public/${filename}`;

                let content = config.minify ? JSON.stringify(obs) : JSON.stringify(obs, null, "\t");

                if (fs.existsSync(filenameWithPath)) {
                    fs.unlinkSync(filenameWithPath);
                }
                fs.writeFileSync(filenameWithPath, content);
            }
        });
    });
}

process();

