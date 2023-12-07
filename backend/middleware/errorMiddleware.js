/**
 * Handles error and sends response with appropriate status code and error message.
 * @param {*} err - The error object.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}


module.exports = {
    errorHandler
}
