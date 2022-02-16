import {NextFunction, Request, Response} from "express";

const globalTryCatch = (fn: Function) => {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch((err) => next(new Error(err.message)));
    }
}

export default globalTryCatch;
