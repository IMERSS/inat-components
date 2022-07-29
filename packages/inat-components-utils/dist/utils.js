'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var sleep = require('sleep-promise');
var cliProgress = require('cli-progress');
var fetch = require('isomorphic-unfetch');
require('date-fns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var sleep__default = /*#__PURE__*/_interopDefaultLegacy(sleep);
var cliProgress__default = /*#__PURE__*/_interopDefaultLegacy(cliProgress);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var BASE_API_URL = 'https://api.inaturalist.org';

var getCommonTaxa = function (_a) {
    var year = _a.year, taxonId = _a.taxonId, placeId = _a.placeId, perPage = _a.perPage;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, response, resp, sortedTaxa;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = "".concat(BASE_API_URL, "/v1/observations/species_counts?verifiable=true&spam=false&place_id=").concat(placeId, "&taxon_id=").concat(taxonId, "&locale=en-US&per_page=").concat(perPage);
                    if (year !== "all") {
                        url += "&d1=".concat(year, "-01-01&d2=").concat(year, "-12-31");
                    }
                    return [4 /*yield*/, fetch__default["default"](url, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json'
                            }
                        })];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    resp = _b.sent();
                    sortedTaxa = resp.results.sort(function (a, b) {
                        if (a.count > b.count) {
                            return -1;
                        }
                        else if (a.count < b.count) {
                            return 1;
                        }
                        return 0;
                    });
                    return [2 /*return*/, {
                            totalResults: resp.total_results,
                            results: sortedTaxa.map(function (row) {
                                var _a, _b;
                                return ({
                                    id: row.taxon.id,
                                    imageUrl: ((_b = (_a = row.taxon) === null || _a === void 0 ? void 0 : _a.default_photo) === null || _b === void 0 ? void 0 : _b.square_url) || "",
                                    obsCount: row.count,
                                    taxonName: row.taxon.name || "",
                                    taxonCommonName: row.taxon.preferred_common_name
                                });
                            })
                        }];
            }
        });
    });
};

var getFavourites = function (_a) {
    var year = _a.year, taxonId = _a.taxonId, placeId = _a.placeId, perPage = _a.perPage;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, response, resp, sortedTaxa;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = "".concat(BASE_API_URL, "/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=").concat(placeId, "&taxon_id=").concat(taxonId, "&locale=en-US&per_page=").concat(perPage);
                    if (year !== "all") {
                        url += "&d1=".concat(year, "-01-01&d2=").concat(year, "-12-31");
                    }
                    return [4 /*yield*/, fetch__default["default"](url, {
                        // method: 'GET',
                        // headers: {
                        //     Accept: 'application/json'
                        // }
                        })];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    resp = _b.sent();
                    sortedTaxa = resp.results.filter(function (i) { return i.faves.length > 0; }).sort(function (a, b) {
                        if (a.faves.length > b.faves.length) {
                            return -1;
                        }
                        else if (a.faves.length < b.faves.length) {
                            return 1;
                        }
                        return 0;
                    });
                    return [2 /*return*/, {
                            totalResults: resp.total_results,
                            results: sortedTaxa.map(function (row) {
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
                        }];
            }
        });
    });
};

var getRecentObservations = function (_a) {
    var taxonId = _a.taxonId, placeId = _a.placeId, perPage = _a.perPage;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, response, obs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = "".concat(BASE_API_URL, "/v1/observations?photos=true&per_page=").concat(perPage, "&taxon_id=").concat(taxonId, "&place_id=").concat(placeId, "&order=desc&order_by=observed_on");
                    return [4 /*yield*/, fetch__default["default"](url)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    obs = _b.sent();
                    return [2 /*return*/, {
                            totalResults: obs.total_results,
                            results: obs.results.map(function (obs) {
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
                        }];
            }
        });
    });
};

var getSummary = function (_a) {
    var taxonId = _a.taxonId, placeId = _a.placeId, year = _a.year;
    return __awaiter(void 0, void 0, void 0, function () {
        var observers, observations, seasonalityData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getObserverSummary(taxonId, placeId, year)];
                case 1:
                    observers = _b.sent();
                    return [4 /*yield*/, getObservationSummary(taxonId, placeId, year)];
                case 2:
                    observations = _b.sent();
                    return [4 /*yield*/, getSeasonalityData(taxonId, placeId, year)];
                case 3:
                    seasonalityData = _b.sent();
                    return [2 /*return*/, {
                            observers: observers,
                            observations: observations,
                            seasonalityData: seasonalityData
                        }];
            }
        });
    });
};
var getObserverSummary = function (taxonId, placeId, year) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "".concat(BASE_API_URL, "/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=").concat(placeId, "&taxon_id=").concat(taxonId, "&locale=en-US&per_page=10");
                if (year !== "all") {
                    url += "&d1=".concat(year, "-01-01&d2=").concat(year, "-12-31");
                }
                return [4 /*yield*/, fetch__default["default"](url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, {
                        totalCount: data.total_results,
                        top: data.results.map(function (result) { return ({
                            id: result.user.id,
                            userName: result.user.login,
                            numObservations: result.observation_count,
                            iconUrl: result.user.icon_url
                        }); })
                    }];
        }
    });
}); };
var getObservationSummary = function (taxonId, placeId, year) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "".concat(BASE_API_URL, "/v1/observations?photos=true&per_page=1&taxon_id=").concat(taxonId, "&place_id=").concat(placeId, "&order=desc&order_by=observed_on");
                if (year !== "all") {
                    url += "&d1=".concat(year, "-01-01&d2=").concat(year, "-12-31");
                }
                return [4 /*yield*/, fetch__default["default"](url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, {
                        totalCount: data.total_results
                    }];
        }
    });
}); };
var getSeasonalityData = function (taxonId, placeId, year) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "".concat(BASE_API_URL, "/v1/observations/histogram?verifiable=true&taxon_id=").concat(taxonId, "&place_id=").concat(placeId, "&locale=en-US&date_field=observed&interval=month_of_year");
                if (year !== "all") {
                    url += "&d1=".concat(year, "-01-01&d2=").concat(year, "-12-31");
                }
                return [4 /*yield*/, fetch__default["default"](url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                resp = _a.sent();
                return [2 /*return*/, {
                        monthOfYear: resp.results.month_of_year
                    }];
        }
    });
}); };

var DataSource;
(function (DataSource) {
    DataSource["autoLoad"] = "autoLoad";
    DataSource["dataProp"] = "dataProp";
    DataSource["url"] = "url";
})(DataSource || (DataSource = {}));
var Feature;
(function (Feature) {
    Feature["commonTaxa"] = "commonTaxa";
    Feature["favourites"] = "favourites";
    Feature["recentObservations"] = "recentObservations";
    Feature["stats"] = "stats";
})(Feature || (Feature = {}));
// I know this is duplicated, but it's very possible they could be different in future
var Tab;
(function (Tab) {
    Tab["recent"] = "recent";
    Tab["commonTaxa"] = "commonTaxa";
    Tab["favourites"] = "favourites";
    Tab["stats"] = "stats";
})(Tab || (Tab = {}));

/*
 * Note that right now the source filenames aren't configurable.
 */
var getSourceFile = function (api, taxonInfo, placeInfo, year) {
    if (!taxonInfo || !placeInfo) {
        return '';
    }
    var yearStr = year === "all" ? "allyears" : year;
    var filename = "";
    if (api === Feature.recentObservations) {
        filename = "".concat(taxonInfo.short, "-").concat(placeInfo.short, "-recent.json");
    }
    else if (api === Feature.commonTaxa) {
        filename = "".concat(taxonInfo.short, "-").concat(placeInfo.short, "-").concat(yearStr, "-commonTaxa.json");
    }
    else if (api === Feature.favourites) {
        filename = "".concat(taxonInfo.short, "-").concat(placeInfo.short, "-").concat(yearStr, "-favourites.json");
    }
    else if (api === Feature.stats) {
        filename = "".concat(taxonInfo.short, "-").concat(placeInfo.short, "-").concat(yearStr, "-stats.json");
    }
    return filename;
};

var getCurrentYear = function () { return new Date().getFullYear(); };

var getConfigurations = function (config) {
    var configurations = [];
    config.taxa.forEach(function (taxonInfo) {
        config.places.forEach(function (placeInfo) {
            var currentYear = getCurrentYear();
            // Recent observations
            configurations.push({
                api: Feature.recentObservations,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.recentObservations, taxonInfo, placeInfo)
            });
            // Common taxa
            var baseCommonTaxaData = {
                api: Feature.commonTaxa,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, "all")
            };
            configurations.push(__assign(__assign({}, baseCommonTaxaData), { year: "all" }));
            for (var year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(__assign(__assign({}, baseCommonTaxaData), { filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, year), year: year }));
            }
            // Favourites. For this, generate the last 10 years of info plus one for all years
            var baseFavouritesData = {
                api: Feature.favourites,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, "all")
            };
            configurations.push(__assign(__assign({}, baseFavouritesData), { year: "all" }));
            for (var year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(__assign(__assign({}, baseFavouritesData), { filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, year), year: year }));
            }
            // Stats
            var baseStatsData = {
                api: Feature.stats,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.stats, taxonInfo, placeInfo, "all")
            };
            configurations.push(__assign(__assign({}, baseStatsData), { year: "all" }));
            for (var year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(__assign(__assign({}, baseStatsData), { filename: getSourceFile(Feature.stats, taxonInfo, placeInfo, year), year: year }));
            }
        });
    });
    return configurations;
};
var generateFile = function (config, folder) { return __awaiter(void 0, void 0, void 0, function () {
    var data, taxonId, placeId, perPage, year, e_1, filename, filenameWithPath, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taxonId = config.taxonId, placeId = config.placeId, perPage = config.perPage, year = config.year;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                if (!(config.api === Feature.recentObservations)) return [3 /*break*/, 3];
                return [4 /*yield*/, getRecentObservations({ taxonId: taxonId, placeId: placeId, perPage: perPage })];
            case 2:
                data = _a.sent();
                return [3 /*break*/, 9];
            case 3:
                if (!(config.api === Feature.commonTaxa)) return [3 /*break*/, 5];
                return [4 /*yield*/, getCommonTaxa({ taxonId: taxonId, placeId: placeId, perPage: perPage, year: year })];
            case 4:
                data = _a.sent();
                return [3 /*break*/, 9];
            case 5:
                if (!(config.api === Feature.favourites)) return [3 /*break*/, 7];
                return [4 /*yield*/, getFavourites({ taxonId: taxonId, placeId: placeId, perPage: perPage, year: year })];
            case 6:
                data = _a.sent();
                return [3 /*break*/, 9];
            case 7:
                if (!(config.api === Feature.stats)) return [3 /*break*/, 9];
                return [4 /*yield*/, getSummary({ taxonId: taxonId, placeId: placeId, year: year })];
            case 8:
                data = _a.sent();
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                e_1 = _a.sent();
                console.log("ERROR -- [", config.api, "]", e_1);
                return [2 /*return*/];
            case 11:
                filename = config.filename;
                filenameWithPath = "".concat(folder, "/").concat(filename);
                content = config.minify ? JSON.stringify(data) : JSON.stringify(data, null, "\t");
                if (fs__default["default"].existsSync(filenameWithPath)) {
                    fs__default["default"].unlinkSync(filenameWithPath);
                }
                fs__default["default"].writeFileSync(filenameWithPath, content);
                return [2 /*return*/];
        }
    });
}); };
var process = function (config, folder) { return __awaiter(void 0, void 0, void 0, function () {
    var currentIndex, loadingBar, processQueue, queue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentIndex = 0;
                loadingBar = new cliProgress__default["default"].SingleBar({}, cliProgress__default["default"].Presets.shades_classic);
                processQueue = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, generateFile(queue[currentIndex], folder)];
                            case 1:
                                _a.sent();
                                loadingBar.update(currentIndex);
                                currentIndex++;
                                return [4 /*yield*/, sleep__default["default"](1000)];
                            case 2:
                                _a.sent();
                                if (!(currentIndex < queue.length)) return [3 /*break*/, 4];
                                return [4 /*yield*/, processQueue()];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                loadingBar.stop();
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                queue = getConfigurations(config);
                loadingBar.start(queue.length, 0);
                return [4 /*yield*/, processQueue()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

exports["default"] = process;
exports.getConfigurations = getConfigurations;
