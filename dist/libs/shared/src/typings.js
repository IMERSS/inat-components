"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=typings.js.map