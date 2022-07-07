import { jsxs, jsx } from 'react/jsx-runtime';
import { useCallback, useState, useEffect } from 'react';
import { formatDate, C, DataSource, getRecentObservations, numberWithCommas, getCommonTaxa, getFavourites, getSummary, getCurrentYear, Tab, getSourceFile, Feature } from 'inat-components-shared';
export * from 'inat-components-shared';
import LoadingSpinner from 'react-spinners/MoonLoader';

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

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$6 = ".observation-module_obs__-5hGT {\n  cursor: pointer;\n  border-radius: 8px;\n  background-color: #f9f9f9;\n  text-align: center;\n  transition: all 0.15s ease-in-out; }\n  .observation-module_obs__-5hGT:hover {\n    background-color: #e1e1e1; }\n\n.observation-module_obs__-5hGT h3 {\n  margin: 0; }\n\n.observation-module_image__BBTP8 {\n  max-width: 100%;\n  max-height: 100%; }\n";
var styles$6 = {"obs":"observation-module_obs__-5hGT","image":"observation-module_image__BBTP8"};
styleInject(css_248z$6);

var Observation = function (_a) {
    var imageUrl = _a.imageUrl, linkUrl = _a.linkUrl, children = _a.children;
    var gotoObservation = useCallback(function () {
        window.open(linkUrl);
    }, [linkUrl]);
    return (jsxs("article", __assign({ className: styles$6.obs, onClick: gotoObservation }, { children: [jsx("div", { style: {
                    width: 200,
                    height: 200,
                    overflow: "hidden",
                    borderRadius: 5,
                    background: "url(".concat(imageUrl, ") 50% 50% no-repeat"),
                    margin: "0 auto",
                    backgroundSize: "cover"
                } }), children] })));
};

var css_248z$5 = ".general-module_page__ziNB9 {\n  padding: 80px 10px 10px;\n  margin: 0 auto;\n  max-width: 1100px; }\n  .general-module_page__ziNB9 h1 {\n    border-bottom: 1px solid #efefef;\n    padding-bottom: 2px;\n    margin-bottom: 25px; }\n\n.general-module_grid__VwNiL {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  width: 100%;\n  grid-gap: 8px;\n  text-align: center; }\n\n.general-module_obsLabel__9R-PO {\n  padding: 10px 20px; }\n  .general-module_obsLabel__9R-PO a {\n    text-decoration: none;\n    color: #336699; }\n    .general-module_obsLabel__9R-PO a:hover {\n      text-decoration: underline; }\n\n.general-module_loader__gBvfF {\n  position: absolute;\n  top: 50px;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.general-module_loaderBg__URuj7 {\n  position: absolute;\n  background-color: #cccccc;\n  padding: 20px;\n  width: 100px;\n  border-radius: 10px;\n  height: 100%;\n  opacity: 0.8; }\n\n.general-module_count__Gnr8W {\n  background-color: #efefef;\n  color: #666666;\n  padding: 2px 8px;\n  margin-top: 6px;\n  display: inline-block;\n  border-radius: 3px;\n  font-weight: bold;\n  font-size: 18px; }\n";
var styles$5 = {"page":"general-module_page__ziNB9","grid":"general-module_grid__VwNiL","obsLabel":"general-module_obsLabel__9R-PO","loader":"general-module_loader__gBvfF","loaderBg":"general-module_loaderBg__URuj7","count":"general-module_count__Gnr8W"};
styleInject(css_248z$5);

var Loader = function (_a) {
    var loading = _a.loading;
    var loaderClasses = styles$5.loader;
    // if (loading) {
    //     loaderClasses += ` ${styles.loading}`;
    // }
    if (!loading) {
        return null;
    }
    return (jsxs("div", __assign({ className: loaderClasses }, { children: [jsx("div", { className: styles$5.loaderBg }), jsx(LoadingSpinner, { color: "#000000" })] })));
};

var NoResults = function () {
    return (jsx("p", { children: "No results found." }));
};

var css_248z$4 = ".recent-observations-module_panel__6XEDa {\n  position: relative; }\n";
var styles$4 = {"panel":"recent-observations-module_panel__6XEDa"};
styleInject(css_248z$4);

var RecentObservationLabel = function (obs) { return (jsxs("div", __assign({ className: styles$5.obsLabel }, { children: [jsx("h3", { children: obs.taxonCommonName || obs.taxonName }), jsx("div", { children: formatDate(obs.obsDate) }), jsx("div", { children: jsx("a", __assign({ href: "".concat(C.BASE_URL, "/people/").concat(obs.observerUsername), target: "_blank", rel: "noreferrer", onClick: function (e) { return e.stopPropagation(); } }, { children: obs.observerUsername })) })] }))); };
var RecentObservations = function (_a) {
    var taxonId = _a.taxonId, placeId = _a.placeId, data = _a.data, dataUrl = _a.dataUrl, _b = _a.source, source = _b === void 0 ? DataSource.autoLoad : _b, _c = _a.perPage, perPage = _c === void 0 ? C.PER_PAGE : _c, components = _a.components, className = _a.className;
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(function () { return (source === DataSource.dataProp) ? data : []; }), observations = _e[0], setObservations = _e[1];
    useEffect(function () {
        if (source !== DataSource.autoLoad) {
            return;
        }
        if (!taxonId) {
            console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
            return;
        }
        if (!placeId) {
            console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var obs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, getRecentObservations({ taxonId: taxonId, placeId: placeId, perPage: perPage })];
                    case 1:
                        obs = _a.sent();
                        setObservations(obs.results);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, taxonId, placeId, perPage]);
    useEffect(function () {
        if (source !== DataSource.url) {
            return;
        }
        if (!dataUrl) {
            console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var obs, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, fetch(dataUrl)];
                    case 1:
                        obs = _a.sent();
                        return [4 /*yield*/, obs.json()];
                    case 2:
                        json = _a.sent();
                        setObservations(json.results);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, dataUrl]);
    var Load = (components === null || components === void 0 ? void 0 : components.loader) ? components.loader : Loader;
    var Label = (components === null || components === void 0 ? void 0 : components.label) ? components.label : RecentObservationLabel;
    var classes = styles$4.panel;
    if (className) {
        classes += " ".concat(className);
    }
    return (jsxs("div", __assign({ className: classes }, { children: [jsx(Load, { loading: loading }), jsxs("div", __assign({ className: styles$5.grid }, { children: [!loading && observations.length === 0 && jsx(NoResults, {}), observations.map(function (obs) { return (jsx(Observation, __assign({ imageUrl: obs.imageUrl.replace(/square/, "medium"), linkUrl: obs.obsUrl }, { children: jsx(Label, __assign({}, obs)) }), obs.id)); })] }))] })));
};

var css_248z$3 = "/*\n * Replace this with your own classes\n *\n * e.g.\n * .container {\n * }\n*/\n";
var styles$3 = {};
styleInject(css_248z$3);

var Error = function (props) {
    return (jsx("div", __assign({ className: styles$3['container'] }, { children: jsx("h1", { children: "Welcome to Error!" }) })));
};

var CommonTaxaLabel = function (data) { return (jsxs("div", __assign({ className: styles$5.obsLabel }, { children: [jsx("h3", { children: data.taxonCommonName || data.taxonName }), jsx("label", __assign({ className: styles$5.count }, { children: numberWithCommas(data.obsCount) }))] }))); };
var CommonTaxa = function (_a) {
    var year = _a.year, source = _a.source, taxonId = _a.taxonId, placeId = _a.placeId, _b = _a.perPage, perPage = _b === void 0 ? C.PER_PAGE : _b, data = _a.data, dataUrl = _a.dataUrl, components = _a.components, className = _a.className;
    var _c = useState(function () { return (source === DataSource.dataProp) ? data : []; }), taxa = _c[0], setTaxa = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    useEffect(function () {
        if (source !== DataSource.autoLoad) {
            return;
        }
        if (!taxonId) {
            console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
            return;
        }
        if (!placeId) {
            console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, getCommonTaxa({ taxonId: taxonId, placeId: placeId, year: year, perPage: perPage })];
                    case 1:
                        resp = _a.sent();
                        setTaxa(resp.results);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, year, placeId, taxonId, perPage]);
    useEffect(function () {
        if (source !== DataSource.url) {
            return;
        }
        if (!dataUrl) {
            console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var obs, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, fetch(dataUrl)];
                    case 1:
                        obs = _a.sent();
                        return [4 /*yield*/, obs.json()];
                    case 2:
                        json = _a.sent();
                        setTaxa(json.results);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, dataUrl]);
    var Load = (components === null || components === void 0 ? void 0 : components.loader) ? components.loader : Loader;
    var Label = (components === null || components === void 0 ? void 0 : components.label) ? components.label : CommonTaxaLabel;
    (components === null || components === void 0 ? void 0 : components.error) ? components.error : Error;
    var classes = styles$5.panel;
    if (className) {
        classes += " ".concat(className);
    }
    return (jsxs("div", __assign({ className: classes }, { children: [jsx(Load, { loading: loading }), !loading && taxa.length === 0 && jsx(NoResults, {}), jsx("div", __assign({ className: styles$5.grid }, { children: taxa.map(function (data) { return (jsx(Observation, __assign({ imageUrl: data.imageUrl.replace(/square/, "medium"), linkUrl: "".concat(C.BASE_URL, "/").concat(data.id) }, { children: jsx(Label, __assign({}, data)) }), data.id)); }) }))] })));
};

var FavouritesLabel = function (data) { return (jsxs("div", __assign({ className: styles$5.obsLabel }, { children: [jsx("h3", { children: data.taxonCommonName || data.taxonName }), jsx("div", { children: data.observerUsername }), jsx("div", { children: formatDate(data.obsDate) }), jsx("label", __assign({ className: styles$5.count }, { children: data.numFaves }))] }))); };
var Favourites = function (_a) {
    var year = _a.year, source = _a.source, taxonId = _a.taxonId, placeId = _a.placeId, data = _a.data, dataUrl = _a.dataUrl, components = _a.components, className = _a.className, _b = _a.perPage, perPage = _b === void 0 ? C.PER_PAGE : _b;
    var _c = useState(function () { return (source === DataSource.dataProp) ? data : []; }), observations = _c[0], setObservations = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    useEffect(function () {
        if (source !== DataSource.autoLoad) {
            return;
        }
        if (!taxonId) {
            console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
            return;
        }
        if (!placeId) {
            console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, getFavourites({ taxonId: taxonId, placeId: placeId, year: year, perPage: perPage })];
                    case 1:
                        resp = _a.sent();
                        setObservations(resp.results);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, year, placeId, taxonId, perPage]);
    useEffect(function () {
        if (source !== DataSource.url) {
            return;
        }
        if (!dataUrl) {
            console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var obs, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, fetch(dataUrl)];
                    case 1:
                        obs = _a.sent();
                        return [4 /*yield*/, obs.json()];
                    case 2:
                        json = _a.sent();
                        setObservations(json.results);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, dataUrl]);
    var Load = (components === null || components === void 0 ? void 0 : components.loader) ? components.loader : Loader;
    var Label = (components === null || components === void 0 ? void 0 : components.label) ? components.label : FavouritesLabel;
    var classes = styles$5.panel;
    if (className) {
        classes += " ".concat(className);
    }
    return (jsxs("div", __assign({ className: classes }, { children: [jsx(Load, { loading: loading }), !loading && observations.length === 0 && jsx(NoResults, {}), jsx("div", __assign({ className: styles$5.grid }, { children: observations.map(function (obs) { return (jsx(Observation, __assign({ imageUrl: obs.imageUrl.replace(/square/, "medium"), linkUrl: obs.obsUrl }, { children: jsx(Label, __assign({}, obs)) }), obs.id)); }) }))] })));
};

var css_248z$2 = ".summary-module_summaryPage__NMmsj {\n  position: relative; }\n  .summary-module_summaryPage__NMmsj section {\n    display: flex; }\n\n.summary-module_top__TKW0j {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n  .summary-module_top__TKW0j .summary-module_avatar__16ZeD, .summary-module_top__TKW0j .summary-module_noAvatar__OsMWn {\n    margin-right: 10px;\n    border-radius: 20px;\n    width: 40px;\n    height: 40px; }\n  .summary-module_top__TKW0j .summary-module_noAvatar__OsMWn {\n    display: inline-block;\n    background-color: #efefef; }\n  .summary-module_top__TKW0j h3 {\n    flex: 1;\n    color: black; }\n  .summary-module_top__TKW0j label {\n    flex: 0;\n    background-color: #efefef;\n    color: #666666;\n    padding: 2px 8px;\n    margin-top: 6px;\n    border-radius: 3px;\n    font-weight: bold;\n    font-size: 16px; }\n  .summary-module_top__TKW0j li {\n    border-radius: 3px; }\n    .summary-module_top__TKW0j li a {\n      display: flex;\n      align-items: center;\n      text-decoration: none; }\n    .summary-module_top__TKW0j li:hover {\n      background-color: #efefef; }\n\n.summary-module_countSummary__Xc2Kd {\n  list-style-type: none;\n  line-height: 28px;\n  font-size: 16px;\n  padding: 0;\n  margin: 0 0 30px; }\n\n.summary-module_seasonalityBlock__BL8L- {\n  flex: 3; }\n\n.summary-module_observersBlock__0wnbm {\n  flex: 1;\n  margin-left: 40px;\n  margin-bottom: -40px; }\n\n@media screen and (max-width: 800px) {\n  .summary-module_summaryPage__NMmsj section {\n    display: block; }\n  .summary-module_seasonalityBlock__BL8L- {\n    height: 250px;\n    margin-bottom: 80px; }\n  .summary-module_observersBlock__0wnbm {\n    margin-left: 0; } }\n";
var styles$2 = {"summaryPage":"summary-module_summaryPage__NMmsj","top":"summary-module_top__TKW0j","avatar":"summary-module_avatar__16ZeD","noAvatar":"summary-module_noAvatar__OsMWn","countSummary":"summary-module_countSummary__Xc2Kd","seasonalityBlock":"summary-module_seasonalityBlock__BL8L-","observersBlock":"summary-module_observersBlock__0wnbm"};
styleInject(css_248z$2);

var ObserverList = function (_a) {
    var observers = _a.observers;
    return (jsx("ul", __assign({ className: styles$2.top }, { children: observers.map(function (obs) { return (jsx("li", { children: jsxs("a", __assign({ href: "".concat(C.BASE_URL, "/people/").concat(obs.userName), target: "_blank", rel: "noreferrer" }, { children: [obs.iconUrl ? jsx("img", { src: obs.iconUrl || "", className: styles$2.avatar, alt: "User icon" }) :
                        jsx("div", { className: styles$2.noAvatar }), jsx("h3", { children: obs.userName }), jsx("label", { children: numberWithCommas(obs.numObservations) })] })) }, obs.id)); }) })));
};

var SeasonalityGraph = function (blah) { return null; };
// export const SeasonalityGraph = ({ data }: any) => {
//     const primaryAxis = React.useMemo<
//         AxisOptions<typeof data[number]["data"][number]>
//         >(
//         () => ({
//             getValue: (datum: any) => datum.primary as any
//         }),
//         []
//     );
//
//     const secondaryAxes = React.useMemo<
//         AxisOptions<typeof data[number]["data"][number]>[]
//         >(
//         () => [
//             {
//                 getValue: (datum: any) => datum.secondary,
//                 elementType: "area"
//             }
//         ],
//         []
//     );
//
//     const formattedData = [
//         {
//             "label": "Observations",
//             "data": Object.keys(data).map((monthNum) => ({
//                 primary: format(new Date(2000, parseInt(monthNum, 10)-1, 1), 'MMMM'),
//                 secondary: data[monthNum]
//             }))
//         }
//     ];
//
//     return (
//         <Chart
//             options={{
//                 data: formattedData,
//                 primaryAxis,
//                 secondaryAxes
//             }}
//         />
//     );
// }

var Summary = function (_a) {
    var _b, _c, _d;
    var source = _a.source; _a.data; var dataUrl = _a.dataUrl, taxonId = _a.taxonId, placeId = _a.placeId, year = _a.year;
    var _e = useState({}), summaryData = _e[0], setSummaryData = _e[1];
    var _f = useState(false), loading = _f[0], setLoading = _f[1];
    useEffect(function () {
        if (source !== DataSource.autoLoad) {
            return;
        }
        if (!taxonId) {
            console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
            return;
        }
        if (!placeId) {
            console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, getSummary({ taxonId: taxonId, placeId: placeId, year: year })];
                    case 1:
                        data = _a.sent();
                        setSummaryData(data);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, year, placeId, taxonId]);
    useEffect(function () {
        if (source !== DataSource.url) {
            return;
        }
        if (!dataUrl) {
            console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
            return;
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var obs, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, fetch(dataUrl)];
                    case 1:
                        obs = _a.sent();
                        return [4 /*yield*/, obs.json()];
                    case 2:
                        json = _a.sent();
                        setSummaryData(json);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [source, dataUrl]);
    return (jsxs("div", __assign({ className: styles$2.summaryPage }, { children: [jsx(Loader, { loading: loading }), jsxs("ul", __assign({ className: styles$2.countSummary }, { children: [jsxs("li", { children: ["Total number of observers: ", jsx("b", { children: ((_b = summaryData.observers) === null || _b === void 0 ? void 0 : _b.totalCount) ? numberWithCommas(summaryData.observers.totalCount) : "" })] }), jsxs("li", { children: ["Total number of observations: ", jsx("b", { children: ((_c = summaryData.observations) === null || _c === void 0 ? void 0 : _c.totalCount) ? numberWithCommas(summaryData.observations.totalCount) : "" })] })] })), jsxs("section", { children: [jsxs("div", __assign({ className: styles$2.seasonalityBlock }, { children: [jsx("h1", { children: "Seasonality" }), summaryData.seasonalityData && jsx(SeasonalityGraph, { data: summaryData.seasonalityData.monthOfYear })] })), jsxs("div", __assign({ className: styles$2.observersBlock }, { children: [jsx("h1", { children: "Top observers" }), ((_d = summaryData.observers) === null || _d === void 0 ? void 0 : _d.top) && jsx(ObserverList, { observers: summaryData.observers.top })] }))] })] })));
};

var css_248z$1 = ".year-dropdown-module_dropdown__iD9sj {\n  font-size: 18px; }\n";
var styles$1 = {"dropdown":"year-dropdown-module_dropdown__iD9sj"};
styleInject(css_248z$1);

var Years = function (_a) {
    var value = _a.value, onChange = _a.onChange, className = _a.className;
    var years = useState(function () {
        var currentYear = getCurrentYear();
        var years = [];
        for (var i = currentYear; i >= currentYear - 10; i--) {
            years.push(i);
        }
        return years;
    })[0];
    var classes = styles$1.dropdown;
    if (className) {
        classes += " ".concat(className);
    }
    return (jsxs("select", __assign({ className: classes, onChange: function (e) { return onChange(e.target.value); }, defaultValue: value }, { children: [jsx("option", __assign({ value: "all" }, { children: "All years" })), years.map(function (year) { return jsx("option", __assign({ value: year }, { children: year }), year); })] })));
};

var css_248z = ".tabs-module_tabs__UMeM9 {\n  display: flex;\n  flex-direction: row;\n  list-style: none;\n  font-size: 18px;\n  padding: 0;\n  margin-bottom: 30px; }\n  .tabs-module_tabs__UMeM9 li {\n    margin: 0 20px;\n    padding: 4px 20px;\n    cursor: pointer;\n    color: #999999;\n    transition: all 0.2s ease-in-out; }\n    .tabs-module_tabs__UMeM9 li.tabs-module_selected__SVr0E, .tabs-module_tabs__UMeM9 li:hover {\n      border-bottom: 5px solid #0099cc;\n      color: black; }\n\n@media screen and (max-width: 600px) {\n  .tabs-module_tabs__UMeM9 li {\n    margin: 0 5px;\n    padding: 4px 6px; } }\n";
var styles = {"tabs":"tabs-module_tabs__UMeM9","selected":"tabs-module_selected__SVr0E"};
styleInject(css_248z);

var _a;
var defaultTitles = (_a = {},
    _a[Tab.recent] = "Recent",
    _a[Tab.commonTaxa] = "Most common",
    _a[Tab.favourites] = "Most favourited",
    _a[Tab.stats] = "General stats",
    _a);
var useFeatureTitles = function (features) {
    var _a = useState(defaultTitles), titles = _a[0], setTitles = _a[1];
    useEffect(function () {
        var _a;
        var _b, _c, _d, _e;
        setTitles((_a = {},
            _a[Tab.recent] = ((_b = features.recentObservations) === null || _b === void 0 ? void 0 : _b.label) || defaultTitles[Tab.recent],
            _a[Tab.commonTaxa] = ((_c = features.commonTaxa) === null || _c === void 0 ? void 0 : _c.label) || defaultTitles[Tab.commonTaxa],
            _a[Tab.favourites] = ((_d = features.favourites) === null || _d === void 0 ? void 0 : _d.label) || defaultTitles[Tab.favourites],
            _a[Tab.stats] = ((_e = features.stats) === null || _e === void 0 ? void 0 : _e.label) || defaultTitles[Tab.stats],
            _a));
    }, [features]);
    return titles;
};

var Tabs = function (_a) {
    var selectedTab = _a.selectedTab, onChangeTab = _a.onChangeTab, features = _a.features;
    var titles = useFeatureTitles(features);
    return (jsxs("ul", __assign({ className: styles.tabs }, { children: [features.recentObservations && (jsx("li", __assign({ onClick: function () { return onChangeTab(Tab.recent); }, className: selectedTab === Tab.recent ? styles.selected : "" }, { children: titles[Tab.recent] }))), features.commonTaxa && (jsx("li", __assign({ onClick: function () { return onChangeTab(Tab.commonTaxa); }, className: selectedTab === Tab.commonTaxa ? styles.selected : "" }, { children: titles[Tab.commonTaxa] }))), features.favourites && (jsx("li", __assign({ onClick: function () { return onChangeTab(Tab.favourites); }, className: selectedTab === Tab.favourites ? styles.selected : "" }, { children: titles[Tab.favourites] }))), features.stats && (jsx("li", __assign({ onClick: function () { return onChangeTab(Tab.stats); }, className: selectedTab === Tab.stats ? styles.selected : "" }, { children: titles[Tab.stats] })))] })));
};

var TaxonPanel = function (_a) {
    var taxonId = _a.taxonId, placeId = _a.placeId, dataSource = _a.dataSource, features = _a.features, sourceFolder = _a.sourceFolder;
    var _b = useState(Tab.recent), tab = _b[0], setTab = _b[1];
    var _c = useState("all"), year = _c[0], setYear = _c[1];
    var titles = useFeatureTitles(features);
    var getCurrentTab = function () {
        switch (tab) {
            case Tab.recent: {
                var props = {
                    source: dataSource
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.recentObservations, taxonId, placeId);
                }
                else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return (jsx(RecentObservations, __assign({}, props)));
            }
            case Tab.commonTaxa: {
                var props = {
                    source: dataSource,
                    year: year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.commonTaxa, taxonId, placeId, year);
                }
                else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return (jsx(CommonTaxa, __assign({}, props)));
            }
            case Tab.favourites: {
                var props = {
                    source: dataSource,
                    year: year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.favourites, taxonId, placeId, year);
                }
                else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return (jsx(Favourites, __assign({}, props)));
            }
            case Tab.stats: {
                var props = {
                    source: dataSource,
                    year: year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.stats, taxonId, placeId, year);
                }
                else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return jsx(Summary, __assign({}, props));
            }
        }
    };
    return (jsxs("div", __assign({ className: styles$5.page }, { children: [jsx(Tabs, { selectedTab: tab, onChangeTab: setTab, features: features }), jsxs("div", { children: [tab !== Tab.recent && (jsx("div", __assign({ style: { float: "right" } }, { children: jsx(Years, { value: year, onChange: setYear }) }))), jsx("h1", { children: titles[tab] })] }), getCurrentTab()] })));
};

export { CommonTaxa, CommonTaxaLabel, Favourites, FavouritesLabel, Observation, RecentObservationLabel, RecentObservations, SeasonalityGraph, Summary, TaxonPanel as default };
