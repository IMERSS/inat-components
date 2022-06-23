"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentObservations = void 0;
const tslib_1 = require("tslib");
const shared_1 = require("@imerss/shared");
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
//# sourceMappingURL=recent-observations.js.map