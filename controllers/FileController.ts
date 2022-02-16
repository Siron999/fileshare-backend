import fileService from "../services/FileService";
import {NextFunction, Request, Response} from "express";

const fileController = () => {
    return {
        handleUpload: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
            const file = await fileService().upload(req, res, next);
            return res.send({
                file: file,
                link: `${process.env.CLIENT_URL}/download/${file._id}`
            })
        },
        getDownloadLink: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
            return fileService().getDownloadLink(req, res, next);
        },
        handleDownload: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
            return await fileService().download(req, res, next);
        }
    }
}

export default fileController;




