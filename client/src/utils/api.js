var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as C from "../constants";
export const getRecentObservations = ({ taxonId, placeId, perPage }) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${C.BASE_URL}/v1/observations?photos=true&per_page=${perPage}&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
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
export const getCommonTaxa = (taxonId, placeId, year, onSuccess) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }
    const response = yield fetch(url);
    const resp = yield response.json();
    const sortedTaxa = resp.results.sort((a, b) => {
        if (a.taxon.observations_count > b.taxon.observations_count) {
            return -1;
        }
        else if (a.taxon.observations_count < b.taxon.observations_count) {
            return 1;
        }
        return 0;
    });
    onSuccess(sortedTaxa);
});
export const getFavourites = (taxonId, placeId, year, onSuccess) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_URL}/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
    if (year) {
        url += `&d1=${year}-01-01&d1=${year}-12-31`;
    }
    const response = yield fetch(url);
    const obs = yield response.json();
    onSuccess(obs.results);
});
export const getSummary = (taxonId, placeId, onSuccess) => __awaiter(void 0, void 0, void 0, function* () {
    const observers = yield getObserverSummary(taxonId, placeId);
    onSuccess({
        numObservers: observers.total_results
    });
});
export const getObserverSummary = (taxonId, placeId) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `${C.BASE_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
    const response = yield fetch(url);
    return yield response.json();
});
