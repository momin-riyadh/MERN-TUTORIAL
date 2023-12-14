const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            // Verify Token
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            //Get User From th Token
            req.user = await User.findById(decode.id).select('-password')
            next()
        } catch (e) {
            console.log(e)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

module.exports = {
    protect
}
