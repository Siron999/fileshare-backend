import express, {NextFunction, Request, Response, Errback} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import connect from './config/DBConfig';
import createError from 'http-errors';
import path from 'path';
import cors from 'cors';


//importing rotes
import fileRouter from './routes/fileRoutes';
import mainRouter from './routes/index';

dotenv.config();

const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//setting up routes
app.use('/file', fileRouter);
app.use('', mainRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(new createError.NotFound('Page Not Found'));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    // render the error page
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on PORT: ${PORT}`);
    connect();
})

