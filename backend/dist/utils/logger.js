"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// Define log format
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
// Create a logger instance
const logger = winston_1.default.createLogger({
    level: "info", //Set the default logging level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), logFormat),
    transports: [
        new winston_1.default.transports.Console(), // Logs to console
        new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" }), // Logs to file
        new winston_1.default.transports.File({ filename: "logs/combined.log" }), // Logs to file
    ],
});
exports.default = logger;
