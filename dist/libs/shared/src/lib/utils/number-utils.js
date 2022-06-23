"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithCommas = void 0;
const numberWithCommas = (x) => (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
exports.numberWithCommas = numberWithCommas;
//# sourceMappingURL=number-utils.js.map