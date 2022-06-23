"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceFile = void 0;
const typings_1 = require("../../typings");
/*
 * Right now the generated source filenames aren't configurable.
 */
const getSourceFile = (api, taxonInfo, placeInfo, year) => {
    const yearStr = year === "all" ? "allyears" : year;
    let filename = "";
    if (api === typings_1.Feature.recentObservations) {
        filename = `${taxonInfo.short}-${placeInfo.short}-recent.json`;
    }
    else if (api === typings_1.Feature.commonTaxa) {
        filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-commonTaxa.json`;
    }
    else if (api === typings_1.Feature.favourites) {
        filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-favourites.json`;
    }
    else if (api === typings_1.Feature.stats) {
        filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-stats.json`;
    }
    return filename;
};
exports.getSourceFile = getSourceFile;
//# sourceMappingURL=config-utils.js.map