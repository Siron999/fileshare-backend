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
const FileService_1 = __importDefault(require("../services/FileService"));
const fileController = () => {
    return {
        handleUpload: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            const file = yield (0, FileService_1.default)().upload(req, res, next);
            return res.send({
                file: file,
                link: `${process.env.CLIENT_URL}/download/${file._id}`
            });
        }),
        getDownloadLink: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            return (0, FileService_1.default)().getDownloadLink(req, res, next);
        }),
        handleDownload: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, FileService_1.default)().download(req, res, next);
        })
    };
};
exports.default = fileController;
