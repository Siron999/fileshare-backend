import File from "../models/File";
import multer from 'multer';
import {NextFunction, Request, Response} from "express";

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: Function): void => callback(null, 'dist/uploads'),
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
        callback(null, uniqueName);
    }
});

const fileService = () => {
    return {
        multerUpload: multer({
            storage,
            limits: {fileSize: 1000000 * 100},
        }).single('uploadFile'),
        upload: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            if (!req.file) {
                next(new Error("File not found"));
            }
            const file = new File({
                originalFileName: req.file?.originalname,
                fileName: req.file?.filename,
            })
            return file.save();
        },
        getDownloadLink: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            if (!req.params.id) {
                next(new Error("ID not specified"));
            }
            const file = await File.findById(req.params.id);
            if (!file) {
                next(new Error("File not found"));
            }
            return res.send({
                file,
                link: `${process.env.BASE_URL}/file/download/${file.fileName}`
            });
        },
        download: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            if (!req.params.fName) {
                next(new Error("File name not specified"));
            }
            const file = await File.findOne({
                fileName: req.params.fName
            });
            if (!file) {
                next(new Error("File not found"));
            }
            const filePath = `${__dirname}/../uploads/${req.params.fName}`
            return res.download(filePath, file.originalFileName);
        },
    }
};

export default fileService;



