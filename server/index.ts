import * as utils from "../client/src/utils/api";

const configurations = [
    {
        name: "BC Leps",
        filenamePrefix: "bcleps-",
        refreshTime: 60, // in minutes
        numYears: 10, // generates separate files for each year data + one for all time
        configs: [
            { taxonId: 47157, placeId: 7085 }
        ]
    }
];


// process configurations here
configurations.forEach(() => {
    console.log(utils);
    // utils.getRecentObservations()
});
