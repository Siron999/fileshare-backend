import {NextFunction, Request, Response} from "express";
import fileController from "../controllers/FileController";
import fileService from "../services/FileService";
import globalTryCatch from "../utils/utils";

import express from "express";

const router = express.Router();

router.post('/upload', fileService().multerUpload, globalTryCatch(fileController().handleUpload));
router.get('/download-link/:id', globalTryCatch(fileController().getDownloadLink));
router.get('/download/:fName', globalTryCatch(fileController().handleDownload));

export default router;
