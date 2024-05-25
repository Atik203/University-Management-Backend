"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/v1/users', user_route_1.userRoute);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Server is running...');
}));
// 404 Route
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
// Error Handler
app.use((error, req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).json({
            success: false,
            message: error.errors.map((err) => err.message).join(', '),
        });
    }
    else if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
    }
    else {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.default = app;
