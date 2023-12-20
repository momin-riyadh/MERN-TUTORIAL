const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/**
 * Get User
 */

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({users})
})


/**
 * Registers a user.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!email || !name || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }


    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, email, password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data');
        return
    }
    res.json({message: 'Register User'})
})


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
        return
    }

});


/*
* @access Private Route
*
*/

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

//Geerate a Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {registerUser, loginUser, getMe, getUsers}
