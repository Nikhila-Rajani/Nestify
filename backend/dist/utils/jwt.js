"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret';
const generateAccessToken = (payload) => {
    console.log('Generating access token with payload:', payload);
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    console.log('Generating refresh token with payload:', payload);
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
};
exports.verifyToken = verifyToken;
