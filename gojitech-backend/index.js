// Import config using dotenv from .env file
import './config.js';
// Setup connection to mongoose
import './mongoose.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Dotenv for loading custom env variables from .env file
//Import Route files here
import basic from "./routes/basic/index.js";

const app = express();

// Middlewares
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

//Routes
app.use('/', basic);


app.listen(process.env.PORT, () => console.log(`Goji Tech ${process.env.NODE_ENV} backend listening on port ${process.env.PORT}!`));
