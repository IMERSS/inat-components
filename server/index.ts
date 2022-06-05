import * as utils from "../client/src/utils/api";
import fs from "fs";

export enum Apis {
    recentObservations = "recentObservations"
}

// should Type this too
const configurations = [
    {
        name: "BC Leps",
        filenamePrefix: "bcleps-",
        actions: [
            {
                api: Apis.recentObservations,
                refreshTime: 60,
                perPage: 100,
                taxonId: 47157,
                placeId: 7085,
                filenameSuffix: "recent-obs-",
                minify: false
            }
        ]
    }
];

const process = () => {
    const promises: Promise<any>[] = [];
    configurations.map((config) => {
        config.actions.map(async (action) => {

            if (action.api === Apis.recentObservations) {
                const obs = await utils.getRecentObservations({
                    taxonId: action.taxonId,
                    placeId: action.placeId,
                    perPage: action.perPage
                });

                const filename = `${config.filenamePrefix}${action.filenameSuffix}${action.taxonId}.json`;
                const filenameWithPath = `${__dirname}/public/${filename}`;
                let content = action.minify ? JSON.stringify(obs) : JSON.stringify(obs, null, "\t");

                if (fs.existsSync(filenameWithPath)) {
                    fs.unlinkSync(filenameWithPath);
                }
                fs.writeFileSync(filenameWithPath, content);
            }
        });
    });
}

process();

