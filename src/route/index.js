import express from "express";
// import homeController from '../controller/homeController';
// import pool from "../configs/connectDB";
import jobRouter from './job';
import reviewRouter from './review';
import usersRouter from './users';
import tokenRouter from './token';
// let router = express.Router();

function initWebRoute(app) {

    app.use('/job', jobRouter);

    app.use('/review', reviewRouter);

    app.use('/user', usersRouter);
    
    app.use('/', tokenRouter);
    
}

export default initWebRoute;

