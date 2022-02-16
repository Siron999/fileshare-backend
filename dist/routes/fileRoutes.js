"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileController_1 = __importDefault(require("../controllers/FileController"));
const FileService_1 = __importDefault(require("../services/FileService"));
const utils_1 = __importDefault(require("../utils/utils"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/upload', (0, FileService_1.default)().multerUpload, (0, utils_1.default)((0, FileController_1.default)().handleUpload));
router.get('/download-link/:id', (0, utils_1.default)((0, FileController_1.default)().getDownloadLink));
router.get('/download/:fName', (0, utils_1.default)((0, FileController_1.default)().handleDownload));
exports.default = router;
