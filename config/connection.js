"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";
mongoose_1.default.connect(MONGODB_URI);
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
});
exports.default = mongoose_1.default.connection;
