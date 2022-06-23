/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/inat-components-utils/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const inat_components_utils_1 = tslib_1.__importDefault(__webpack_require__("./libs/inat-components-utils/src/lib/inat-components-utils.ts"));
exports["default"] = inat_components_utils_1.default;


/***/ }),

/***/ "./libs/inat-components-utils/src/lib/inat-components-utils.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfigurations = void 0;
const tslib_1 = __webpack_require__("tslib");
const fs_1 = tslib_1.__importDefault(__webpack_require__("fs"));
const sleep_promise_1 = tslib_1.__importDefault(__webpack_require__("sleep-promise"));
const cli_progress_1 = tslib_1.__importDefault(__webpack_require__("cli-progress"));
const shared_1 = __webpack_require__("./libs/shared/src/index.ts");
const api_1 = __webpack_require__("./libs/shared/src/lib/api/index.ts");
const utils_1 = __webpack_require__("./libs/shared/src/lib/utils/index.ts");
const getConfigurations = (config) => {
    const configurations = [];
    config.taxa.forEach((taxonInfo) => {
        config.places.forEach((placeInfo) => {
            const currentYear = (0, utils_1.getCurrentYear)();
            // ------------------------------------------------------------------------------------
            // Recent observations
            configurations.push({
                api: shared_1.Feature.recentObservations,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: (0, utils_1.getSourceFile)(shared_1.Feature.recentObservations, taxonInfo, placeInfo)
            });
            // ------------------------------------------------------------------------------------
            // Common taxa. For this, generate the last 10 years of info plus one for all years
            const baseCommonTaxaData = {
                api: shared_1.Feature.commonTaxa,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: (0, utils_1.getSourceFile)(shared_1.Feature.commonTaxa, taxonInfo, placeInfo, "all")
            };
            configurations.push(Object.assign(Object.assign({}, baseCommonTaxaData), { year: "all" }));
            for (let year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(Object.assign(Object.assign({}, baseCommonTaxaData), { filename: (0, utils_1.getSourceFile)(shared_1.Feature.commonTaxa, taxonInfo, placeInfo, year), year }));
            }
            // ------------------------------------------------------------------------------------
            // Favourites. For this, generate the last 10 years of info plus one for all years
            const baseFavouritesData = {
                api: shared_1.Feature.favourites,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: (0, utils_1.getSourceFile)(shared_1.Feature.favourites, taxonInfo, placeInfo, "all")
            };
            configurations.push(Object.assign(Object.assign({}, baseFavouritesData), { year: "all" }));
            for (let year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(Object.assign(Object.assign({}, baseFavouritesData), { filename: (0, utils_1.getSourceFile)(shared_1.Feature.favourites, taxonInfo, placeInfo, year), year }));
            }
            // ------------------------------------------------------------------------------------
            // Stats
            const baseStatsData = {
                api: shared_1.Feature.stats,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: (0, utils_1.getSourceFile)(shared_1.Feature.stats, taxonInfo, placeInfo, "all")
            };
            configurations.push(Object.assign(Object.assign({}, baseStatsData), { year: "all" }));
            for (let year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(Object.assign(Object.assign({}, baseStatsData), { filename: (0, utils_1.getSourceFile)(shared_1.Feature.stats, taxonInfo, placeInfo, year), year }));
            }
        });
    });
    return configurations;
};
exports.getConfigurations = getConfigurations;
const generateFile = (config, folder) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let data;
    if (config.api === shared_1.Feature.recentObservations) {
        data = yield (0, api_1.getRecentObservations)({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage
        });
    }
    else if (config.api === shared_1.Feature.commonTaxa) {
        data = yield (0, api_1.getCommonTaxa)({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage,
            year: config.year
        });
    }
    else if (config.api === shared_1.Feature.favourites) {
        data = yield (0, api_1.getFavourites)({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage,
            year: config.year
        });
    }
    else if (config.api === shared_1.Feature.stats) {
        data = yield (0, api_1.getSummary)({
            taxonId: config.taxonId,
            placeId: config.placeId,
            year: config.year
        });
    }
    const filename = config.filename;
    const filenameWithPath = `${folder}/${filename}`;
    const content = config.minify ? JSON.stringify(data) : JSON.stringify(data, null, "\t");
    if (fs_1.default.existsSync(filenameWithPath)) {
        fs_1.default.unlinkSync(filenameWithPath);
    }
    fs_1.default.writeFileSync(filenameWithPath, content);
});
const process = (config, folder) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let currentIndex = 0;
    const loadingBar = new cli_progress_1.default.SingleBar({}, cli_progress_1.default.Presets.shades_classic);
    const processQueue = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield generateFile(queue[currentIndex], folder);
        loadingBar.update(currentIndex);
        currentIndex++;
        yield (0, sleep_promise_1.default)(1000);
        if (currentIndex < queue.length) {
            yield processQueue();
        }
        else {
            loadingBar.stop();
        }
    });
    const queue = (0, exports.getConfigurations)(config);
    loadingBar.start(queue.length, 0);
    yield processQueue();
});
exports["default"] = process;


/***/ }),

/***/ "./libs/shared/src/constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BASE_URL = exports.PER_PAGE = exports.BASE_API_URL = void 0;
exports.BASE_API_URL = 'https://api.inaturalist.org';
exports.PER_PAGE = 100;
exports.BASE_URL = "https://www.inaturalist.org"; // /people/name_here


/***/ }),

/***/ "./libs/shared/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C = void 0;
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/typings.ts"), exports);
exports.C = tslib_1.__importStar(__webpack_require__("./libs/shared/src/constants.ts"));


/***/ }),

/***/ "./libs/shared/src/lib/api/common-taxa.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCommonTaxa = void 0;
const tslib_1 = __webpack_require__("tslib");
const C = tslib_1.__importStar(__webpack_require__("./libs/shared/src/constants.ts"));
const getCommonTaxa = ({ year, taxonId, placeId, perPage }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_API_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${perPage}`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }
    const response = yield fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });
    const resp = yield response.json();
    const sortedTaxa = resp.results.sort((a, b) => {
        if (a.count > b.count) {
            return -1;
        }
        else if (a.count < b.count) {
            return 1;
        }
        return 0;
    });
    return {
        totalResults: resp.total_results,
        results: sortedTaxa.map((row) => {
            var _a, _b;
            return ({
                id: row.taxon.id,
                imageUrl: ((_b = (_a = row.taxon) === null || _a === void 0 ? void 0 : _a.default_photo) === null || _b === void 0 ? void 0 : _b.square_url) || "",
                obsCount: row.count,
                taxonName: row.taxon.name || "",
                taxonCommonName: row.taxon.preferred_common_name
            });
        })
    };
});
exports.getCommonTaxa = getCommonTaxa;


/***/ }),

/***/ "./libs/shared/src/lib/api/favourites.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFavourites = void 0;
const tslib_1 = __webpack_require__("tslib");
const C = tslib_1.__importStar(__webpack_require__("./libs/shared/src/constants.ts"));
const getFavourites = ({ year, taxonId, placeId, perPage }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_API_URL}/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${perPage}`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }
    const response = yield fetch(url, {
    // method: 'GET',
    // headers: {
    //     Accept: 'application/json'
    // }
    });
    const resp = yield response.json();
    const sortedTaxa = resp.results.filter((i) => i.faves.length > 0).sort((a, b) => {
        if (a.faves.length > b.faves.length) {
            return -1;
        }
        else if (a.faves.length < b.faves.length) {
            return 1;
        }
        return 0;
    });
    return {
        totalResults: resp.total_results,
        results: sortedTaxa.map((row) => {
            var _a, _b;
            return ({
                id: row.id,
                imageUrl: ((_b = (_a = row.taxon) === null || _a === void 0 ? void 0 : _a.default_photo) === null || _b === void 0 ? void 0 : _b.square_url) || "",
                obsDate: row.observed_on_string,
                obsUrl: row.uri,
                taxonName: row.taxon.name || "",
                taxonCommonName: row.taxon.preferred_common_name,
                numFaves: row.faves.length
            });
        })
    };
});
exports.getFavourites = getFavourites;


/***/ }),

/***/ "./libs/shared/src/lib/api/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/lib/api/common-taxa.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/lib/api/favourites.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/lib/api/recent-observations.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/lib/api/summary.ts"), exports);


/***/ }),

/***/ "./libs/shared/src/lib/api/recent-observations.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRecentObservations = void 0;
const tslib_1 = __webpack_require__("tslib");
const shared_1 = __webpack_require__("./libs/shared/src/index.ts");
const getRecentObservations = ({ taxonId, placeId, perPage }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = `${shared_1.C.BASE_API_URL}/v1/observations?photos=true&per_page=${perPage}&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
    const response = yield fetch(url);
    const obs = yield response.json();
    return {
        totalResults: obs.total_results,
        results: obs.results.map((obs) => {
            var _a;
            return {
                id: obs.id,
                imageUrl: obs.observation_photos[0].photo.url,
                obsUrl: obs.uri,
                obsDate: obs.observed_on_string,
                taxonName: ((_a = obs === null || obs === void 0 ? void 0 : obs.taxon) === null || _a === void 0 ? void 0 : _a.name) || "",
                taxonCommonName: obs === null || obs === void 0 ? void 0 : obs.taxon.preferred_common_name,
                observerUsername: obs.user.login
            };
        })
    };
});
exports.getRecentObservations = getRecentObservations;


/***/ }),

/***/ "./libs/shared/src/lib/api/summary.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSeasonalityData = exports.getObservationSummary = exports.getObserverSummary = exports.getSummary = void 0;
const tslib_1 = __webpack_require__("tslib");
const C = tslib_1.__importStar(__webpack_require__("./libs/shared/src/constants.ts"));
const getSummary = ({ taxonId, placeId, year }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const observers = yield (0, exports.getObserverSummary)(taxonId, placeId, year);
    const observations = yield (0, exports.getObservationSummary)(taxonId, placeId, year);
    const seasonalityData = yield (0, exports.getSeasonalityData)(taxonId, placeId, year);
    return {
        observers,
        observations,
        seasonalityData
    };
});
exports.getSummary = getSummary;
const getObserverSummary = (taxonId, placeId, year) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_API_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=10`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }
    const response = yield fetch(url);
    const data = yield response.json();
    return {
        totalCount: data.total_results,
        top: data.results.map((result) => ({
            id: result.user.id,
            userName: result.user.login,
            numObservations: result.observation_count,
            iconUrl: result.user.icon_url
        }))
    };
});
exports.getObserverSummary = getObserverSummary;
const getObservationSummary = (taxonId, placeId, year) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_API_URL}/v1/observations?photos=true&per_page=1&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }
    const response = yield fetch(url);
    const data = yield response.json();
    return {
        totalCount: data.total_results
    };
});
exports.getObservationSummary = getObservationSummary;
const getSeasonalityData = (taxonId, placeId, year) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_API_URL}/v1/observations/histogram?verifiable=true&taxon_id=${taxonId}&place_id=${placeId}&locale=en-US&date_field=observed&interval=month_of_year`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }
    const response = yield fetch(url);
    const resp = yield response.json();
    return {
        monthOfYear: resp.results.month_of_year
    };
});
exports.getSeasonalityData = getSeasonalityData;


/***/ }),

/***/ "./libs/shared/src/lib/utils/config-utils.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSourceFile = void 0;
const typings_1 = __webpack_require__("./libs/shared/src/typings.ts");
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


/***/ }),

/***/ "./libs/shared/src/lib/utils/date-utils.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatDate = exports.getCurrentYear = void 0;
const date_fns_1 = __webpack_require__("date-fns");
const getCurrentYear = () => new Date().getFullYear();
exports.getCurrentYear = getCurrentYear;
// not 100% this shows the date in the right timezone, but it's fine for BC
const formatDate = (date, dateFormat = "MMM do, h:mm b") => {
    let formattedDate = "";
    try {
        formattedDate = (0, date_fns_1.format)(Date.parse(date), dateFormat);
    }
    catch (e) {
        console.log("Failed to parse date: ", date);
    }
    return formattedDate;
};
exports.formatDate = formatDate;


/***/ }),

/***/ "./libs/shared/src/lib/utils/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/lib/utils/config-utils.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/lib/utils/date-utils.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/shared/src/lib/utils/number-utils.ts"), exports);


/***/ }),

/***/ "./libs/shared/src/lib/utils/number-utils.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.numberWithCommas = void 0;
const numberWithCommas = (x) => (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
exports.numberWithCommas = numberWithCommas;


/***/ }),

/***/ "./libs/shared/src/typings.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tab = exports.Feature = exports.DataSource = void 0;
var DataSource;
(function (DataSource) {
    DataSource["autoLoad"] = "autoLoad";
    DataSource["dataProp"] = "dataProp";
    DataSource["url"] = "url";
})(DataSource = exports.DataSource || (exports.DataSource = {}));
var Feature;
(function (Feature) {
    Feature["commonTaxa"] = "commonTaxa";
    Feature["favourites"] = "favourites";
    Feature["recentObservations"] = "recentObservations";
    Feature["stats"] = "stats";
})(Feature = exports.Feature || (exports.Feature = {}));
// I know this is duplicated, but it's very possible they could be different in future
var Tab;
(function (Tab) {
    Tab["recent"] = "recent";
    Tab["commonTaxa"] = "commonTaxa";
    Tab["favourites"] = "favourites";
    Tab["stats"] = "stats";
})(Tab = exports.Tab || (exports.Tab = {}));


/***/ }),

/***/ "cli-progress":
/***/ ((module) => {

module.exports = require("cli-progress");

/***/ }),

/***/ "date-fns":
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ "sleep-promise":
/***/ ((module) => {

module.exports = require("sleep-promise");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "./apps/inat.config.json":
/***/ ((module) => {

module.exports = JSON.parse('{"taxa":[{"label":"Butterflies and moth","short":"leps","taxonId":47157}],"places":[{"label":"BC","short":"bc","placeId":7085}],"features":{"recentObservations":{"numResults":100}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const path_1 = tslib_1.__importDefault(__webpack_require__("path"));
const inat_components_utils_1 = tslib_1.__importDefault(__webpack_require__("./libs/inat-components-utils/src/index.ts"));
const inat_config_json_1 = tslib_1.__importDefault(__webpack_require__("./apps/inat.config.json"));
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const folder = path_1.default.resolve(__dirname, "../files");
    yield (0, inat_components_utils_1.default)(inat_config_json_1.default, folder);
}))();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map