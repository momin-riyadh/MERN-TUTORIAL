/**
 * @type {express.Application}
 * @description This variable represents an instance of the Express framework.
 *              It is used to create and configure an Express application.
 * @see {@link https://expressjs.com/}
 */
const express = require('express');

const colors = require('colors');
/**
 * A variable to load and access environment variables from a `.env` file using the `dotenv` package.
 *
 * @see {@link https://www.npmjs.com/package/dotenv|dotenv} for more information about the `dotenv` package.
 * @since 1.0.0
 */
const dotenv = require('dotenv').config();
const { /**
 * A variable representing the error handler module.
 * This module is responsible for handling application errors and logging them.
 *
 * @module errorHandler
 */
    errorHandler
} = require('./middleware/errorMiddleware');

const connectDB = require('./config/db')
/**
 * The port number for the server.
 *
 * The port variable is used to determine the port on which the server should listen. It is assigned the value of the PORT environment variable, if present, or a default value of 3000.
 *
 * @type {number}
 * @default 3000
 */
const port = process.env.PORT || 3000;

connectDB()


/**
 * The app variable holds an instance of an Express application.
 * This object is used to define and configure the web server and handle incoming requests.
 *
 * @type {object}
 */
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use('/api/goals/', require('./routes/goalRoutes'));


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
