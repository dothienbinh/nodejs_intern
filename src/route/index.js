import express from "express";
// import homeController from '../controller/homeController';
// import pool from "../configs/connectDB";
import loginRouter from './login';
import jobRouter from './job';
import reviewRouter from './review';
import usersRouter from './users';
import homeRouter from './home';
// let router = express.Router();

function initWebRoute(app) {

    app.use('/job', jobRouter);

    app.use('/login', loginRouter);

    app.use('/review', reviewRouter);

    app.use('/user', usersRouter);
    
    app.use('/', homeRouter);
    
}

export default initWebRoute;

