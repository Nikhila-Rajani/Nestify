"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieManager = void 0;
class CookieManager {
    /**
     * Sets authentication cookies for access and refresh tokens.
     *
     * @param res - Express Response object.
     * @param tokens - An object containing accessToken and refreshToken.
     * @param options - Optional configuration overrides.
     */
    static setAuthCookies(res, tokens, options) {
        var _a, _b, _c, _d, _e;
        const secure = (_a = options === null || options === void 0 ? void 0 : options.secure) !== null && _a !== void 0 ? _a : true;
        res.cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure,
            sameSite: (_b = options === null || options === void 0 ? void 0 : options.sameSite) !== null && _b !== void 0 ? _b : "none",
            maxAge: (_c = options === null || options === void 0 ? void 0 : options.accessTokenMaxAge) !== null && _c !== void 0 ? _c : 30 * 60 * 1000, // default: 10 minutes
        });
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure,
            sameSite: (_d = options === null || options === void 0 ? void 0 : options.sameSite) !== null && _d !== void 0 ? _d : "none",
            maxAge: (_e = options === null || options === void 0 ? void 0 : options.refreshTokenMaxAge) !== null && _e !== void 0 ? _e : 7 * 24 * 60 * 60 * 1000, // default: 7 days
        });
    }
    /**
     * Clears authentication cookies.
     *
     * @param res - Express Response object.
     * @param options - Optional configuration overrides.
     */
    static clearAuthCookies(res, options) {
        var _a, _b, _c;
        const secure = (_a = options === null || options === void 0 ? void 0 : options.secure) !== null && _a !== void 0 ? _a : process.env.NODE_ENV === "production";
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure,
            sameSite: (_b = options === null || options === void 0 ? void 0 : options.sameSite) !== null && _b !== void 0 ? _b : "none",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure,
            sameSite: (_c = options === null || options === void 0 ? void 0 : options.sameSite) !== null && _c !== void 0 ? _c : "none",
        });
    }
    /**
     * Returns common cookie options for the access token.
     */
    static getCookieOptions() {
        const secure = process.env.NODE_ENV === "production";
        return {
            httpOnly: true,
            secure,
            sameSite: "none",
            maxAge: 30 * 60 * 1000, // default: 10 minutes
        };
    }
}
exports.CookieManager = CookieManager;
