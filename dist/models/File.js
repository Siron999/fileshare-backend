"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fileSchema = new mongoose_1.default.Schema({
    originalFileName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    fileName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const File = mongoose_1.default.model('File', fileSchema);
exports.default = File;
