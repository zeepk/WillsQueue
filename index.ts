import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { entryRouter } from './src/routes/entries';
dotenv.config();

const connectionString = process.env.MONGO_DB_CONN_STRING;
if (connectionString) {
    mongoose.connect(connectionString);
}

const app = express();

const allowedOrigins = [process.env.REACT_APP_BASE_URL, process.env.API_URL];

const getCORSOrigin = (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
    } else {
        callback(new Error(`Origin "${origin}" is not allowed by CORS`));
    }
};

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());
app.use(cors({ origin: getCORSOrigin, credentials: true }));

app.use(entryRouter);

app.get('/api/test', (req, res) => {
    res.send('ok');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('The application is listening on port 8080!');
});
