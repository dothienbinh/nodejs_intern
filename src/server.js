import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/";
import connectDB from "./configs/connectDB";
import multer from 'multer';
import bodyParser from 'body-parser';
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicDir = (__dirname + `\\public\\image\\`);
app.use(express.static(publicDir));

configViewEngine(app);
initWebRoute(app);
console.log('...check');

connectDB();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})