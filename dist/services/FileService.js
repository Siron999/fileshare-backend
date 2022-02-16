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
const File_1 = __importDefault(require("../models/File"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => callback(null, 'dist/uploads'),
    filename(req, file, callback) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
        callback(null, uniqueName);
    }
});
const fileService = () => {
    return {
        multerUpload: (0, multer_1.default)({
            storage,
            limits: { fileSize: 1000000 * 100 },
        }).single('uploadFile'),
        upload: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            if (!req.file) {
                next(new Error("File not found"));
            }
            const file = new File_1.default({
                originalFileName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
                fileName: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
            });
            return file.save();
        }),
        getDownloadLink: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.params.id) {
                next(new Error("ID not specified"));
            }
            const file = yield File_1.default.findById(req.params.id);
            if (!file) {
                next(new Error("File not found"));
            }
            return res.send({
                file,
                link: `${process.env.BASE_URL}/file/download/${file.fileName}`
            });
        }),
        download: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.params.fName) {
                next(new Error("File name not specified"));
            }
            const file = yield File_1.default.findOne({
                fileName: req.params.fName
            });
            if (!file) {
                next(new Error("File not found"));
            }
            const filePath = `${__dirname}/../uploads/${req.params.fName}`;
            return res.download(filePath, file.originalFileName);
        }),
    };
};
exports.default = fileService;
