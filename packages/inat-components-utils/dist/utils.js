'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var sleep = require('sleep-promise');
var cliProgress = require('cli-progress');
var inatComponentsShared = require('@imerss/inat-components-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var sleep__default = /*#__PURE__*/_interopDefaultLegacy(sleep);
var cliProgress__default = /*#__PURE__*/_interopDefaultLegacy(cliProgress);

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

var getConfigurations = function (config) {
    var configurations = [];
    config.taxa.forEach(function (taxonInfo) {
        config.places.forEach(function (placeInfo) {
            var currentYear = inatComponentsShared.getCurrentYear();
            // Recent observations
            configurations.push({
                api: inatComponentsShared.Feature.recentObservations,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: inatComponentsShared.getSourceFile(inatComponentsShared.Feature.recentObservations, taxonInfo, placeInfo)
            });
            // Common taxa
            var baseCommonTaxaData = {
                api: inatComponentsShared.Feature.commonTaxa,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: inatComponentsShared.getSourceFile(inatComponentsShared.Feature.commonTaxa, taxonInfo, placeInfo, "all")
            };
            configurations.push(__assign(__assign({}, baseCommonTaxaData), { year: "all" }));
            for (var year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(__assign(__assign({}, baseCommonTaxaData), { filename: inatComponentsShared.getSourceFile(inatComponentsShared.Feature.commonTaxa, taxonInfo, placeInfo, year), year: year }));
            }
            // Favourites. For this, generate the last 10 years of info plus one for all years
            var baseFavouritesData = {
                api: inatComponentsShared.Feature.favourites,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: inatComponentsShared.getSourceFile(inatComponentsShared.Feature.favourites, taxonInfo, placeInfo, "all")
            };
            configurations.push(__assign(__assign({}, baseFavouritesData), { year: "all" }));
            for (var year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(__assign(__assign({}, baseFavouritesData), { filename: inatComponentsShared.getSourceFile(inatComponentsShared.Feature.favourites, taxonInfo, placeInfo, year), year: year }));
            }
            // Stats
            var baseStatsData = {
                api: inatComponentsShared.Feature.stats,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: inatComponentsShared.getSourceFile(inatComponentsShared.Feature.stats, taxonInfo, placeInfo, "all")
            };
            configurations.push(__assign(__assign({}, baseStatsData), { year: "all" }));
            for (var year = currentYear - 10; year <= currentYear; year++) {
                configurations.push(__assign(__assign({}, baseStatsData), { filename: inatComponentsShared.getSourceFile(inatComponentsShared.Feature.stats, taxonInfo, placeInfo, year), year: year }));
            }
        });
    });
    return configurations;
};
var generateFile = function (config, folder) { return __awaiter(void 0, void 0, void 0, function () {
    var data, filename, filenameWithPath, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(config.api === inatComponentsShared.Feature.recentObservations)) return [3 /*break*/, 2];
                return [4 /*yield*/, inatComponentsShared.getRecentObservations({
                        taxonId: config.taxonId,
                        placeId: config.placeId,
                        perPage: config.perPage
                    })];
            case 1:
                data = _a.sent();
                return [3 /*break*/, 8];
            case 2:
                if (!(config.api === inatComponentsShared.Feature.commonTaxa)) return [3 /*break*/, 4];
                return [4 /*yield*/, inatComponentsShared.getCommonTaxa({
                        taxonId: config.taxonId,
                        placeId: config.placeId,
                        perPage: config.perPage,
                        year: config.year
                    })];
            case 3:
                data = _a.sent();
                return [3 /*break*/, 8];
            case 4:
                if (!(config.api === inatComponentsShared.Feature.favourites)) return [3 /*break*/, 6];
                return [4 /*yield*/, inatComponentsShared.getFavourites({
                        taxonId: config.taxonId,
                        placeId: config.placeId,
                        perPage: config.perPage,
                        year: config.year
                    })];
            case 5:
                data = _a.sent();
                return [3 /*break*/, 8];
            case 6:
                if (!(config.api === inatComponentsShared.Feature.stats)) return [3 /*break*/, 8];
                return [4 /*yield*/, inatComponentsShared.getSummary({
                        taxonId: config.taxonId,
                        placeId: config.placeId,
                        year: config.year
                    })];
            case 7:
                data = _a.sent();
                _a.label = 8;
            case 8:
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
