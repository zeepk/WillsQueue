import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { entryRouter } from './src/routes/entries';
import { flagRouter } from './src/routes/flags';
import { Server } from 'socket.io';
import http from 'http';
dotenv.config();

const connectionString = process.env.MONGO_DB_CONN_STRING;
if (connectionString) {
    mongoose.connect(connectionString);
}

const app = express();

const allowedOrigins = [
    process.env.REACT_APP_BASE_URL,
    process.env.REACT_APP_API_URL,
];
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
app.use(flagRouter);

// socket.io
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
    socket.on('move-entry', () => {
        io.emit('fetch-entries');
    });
    socket.on('change-flag', () => {
        io.emit('fetch-flags');
    });
});

app.get('/api/test', (req, res) => {
    res.send('ok');
});

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

const port = process.env.PORT || 8080;

// app.listen(port, () => {
//     console.log(`The application is listening on port ${port}!`);
// });

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
