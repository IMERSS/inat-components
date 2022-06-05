import * as utils from "../client/src/utils/api";
import fs from "fs";

export enum Apis {
    recentObservations = "recentObservations"
}

// TODO should Type this too
const configurationSets = [
    {
        name: "Demo files",
        filenamePrefix: "",
        configurations: [

            // Recent observations. Each of these configurations generates a single file
            {
                api: Apis.recentObservations,
                refreshTime: 60, // N/A for demo
                perPage: 100,
                taxonId: 47157,
                placeId: 7085,
                filenameSuffix: "lepidoptera-recent-",
                //minify: false
            },
            {
                api: Apis.recentObservations,
                refreshTime: 60,
                perPage: 100,
                taxonId: 47157,
                placeId: 7085,
                filenameSuffix: "coleoptera-recent-"
            },
            {
                api: Apis.recentObservations,
                refreshTime: 60,
                perPage: 100,
                taxonId: 47157,
                placeId: 7085,
                filenameSuffix: "diptera-recent-"
            },
            {
                api: Apis.recentObservations,
                refreshTime: 60,
                perPage: 100,
                taxonId: 47157,
                placeId: 7085,
                filenameSuffix: "mantodea-recent-"
            }

            // Common taxa

            // Favourites

            // Stats

        ]
    }
];

const process = () => {
    // const promises: Promise<any>[] = [];
    configurationSets.map((set) => {
        set.configurations.map(async (action) => {

            if (action.api === Apis.recentObservations) {
                const obs = await utils.getRecentObservations({
                    taxonId: action.taxonId,
                    placeId: action.placeId,
                    perPage: action.perPage
                });

                const filename = `${set.filenamePrefix}${action.filenameSuffix}${action.taxonId}.json`;
                const filenameWithPath = `${__dirname}/public/${filename}`;

                // @ts-ignore-line
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

