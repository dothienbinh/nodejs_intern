import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/";
import connectDB from "./configs/connectDB";
import multer from 'multer';
import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import handleHttpErrors from './middleware/errorHandler';
import swaggerConfig from './configs/apidocs/apidocs.config';
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8080;

app.use(cookies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicDir = (__dirname + `\\public\\image\\`);
app.use(express.static(publicDir));

configViewEngine(app);
initWebRoute(app);
app.use(handleHttpErrors);
console.log('...check');

connectDB();

swaggerConfig(app, '/apidocs', 'v1');



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})