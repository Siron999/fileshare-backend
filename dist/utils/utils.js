"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalTryCatch = (fn) => {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch((err) => next(new Error(err.message)));
    };
};
exports.default = globalTryCatch;
