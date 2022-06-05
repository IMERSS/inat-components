import * as utils from "../client/src/utils/api";

export enum Apis {
    recentObservations = "recentObservations"
}

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

                console.log(obs);
            }
        });
    });
}

process();

