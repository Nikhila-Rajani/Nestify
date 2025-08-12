"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import:
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// ROUTES:
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const hostRoutes_1 = __importDefault(require("./routes/hostRoutes"));
const otpRoutes_1 = __importDefault(require("./routes/Common/otpRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Cors initalisation
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    Credential: true
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/v1/user', userRoutes_1.default);
app.use('/v1/admin', adminRoutes_1.default);
app.use('/v1/host', hostRoutes_1.default);
app.use('/v1/user/otp', otpRoutes_1.default);
app.use('*', (req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Nestify backend running on port ${PORT}`);
    }
    else {
        console.error("Server Error :", error.message);
    }
});
exports.default = app;
