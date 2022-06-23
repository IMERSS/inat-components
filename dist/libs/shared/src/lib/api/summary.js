"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeasonalityData = exports.getObservationSummary = exports.getObserverSummary = exports.getSummary = void 0;
const tslib_1 = require("tslib");
const C = require("../../constants");
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
//# sourceMappingURL=summary.js.map