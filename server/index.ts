import fs from "fs";
import { getRecentObservations } from "../client/src/utils/recentObservations";
import { getCommonTaxa } from "../client/src/utils/commonTaxa";
import {INatApi, ConfigurationSet} from "../client/src/typings";
import {getDemoConfigurations} from "../client/src/demo/demo.config";


const configurationSets: ConfigurationSet[] = [
    {
        name: "Demo files",
        filenamePrefix: "",
        configurations: getDemoConfigurations()
    }
];

// TODO add 1.5 second timeout on each request. iNat locks down 1 request per second.
const process = () => {
    configurationSets.map((set) => {
        set.configurations.map(async (config) => {
            let data;
            if (config.api === INatApi.recentObservations) {
                data = await getRecentObservations({
                    taxonId: config.taxonId,
                    placeId: config.placeId,
                    perPage: config.perPage
                });
            } else if (config.api === INatApi.commonTaxa) {
                data = await getCommonTaxa({
                    taxonId: config.taxonId,
                    placeId: config.placeId,
                    perPage: config.perPage,
                    year: config.year as string
                });
            }

            const filename = `${set.filenamePrefix}${config.filename}`;
            const filenameWithPath = `${__dirname}/public/${filename}`;
            const content = config.minify ? JSON.stringify(data) : JSON.stringify(data, null, "\t");

            if (fs.existsSync(filenameWithPath)) {
                fs.unlinkSync(filenameWithPath);
            }
            fs.writeFileSync(filenameWithPath, content);
        });
    });
}

process();

