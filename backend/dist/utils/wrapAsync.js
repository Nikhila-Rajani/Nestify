"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsync = void 0;
const wrapAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
exports.wrapAsync = wrapAsync;
