"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.getCurrentYear = void 0;
const date_fns_1 = require("date-fns");
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
//# sourceMappingURL=date-utils.js.map