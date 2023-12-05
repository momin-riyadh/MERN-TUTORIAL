const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

/**
 * Function to handle GET request for goals.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json({goals})
});
/**
 * Sets goals for the given request and response objects.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {undefined}
 */
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json({goal})
})


/**
 * Updates goals.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {undefined}
 */
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goals ${req.params.id}`})
})

/**
 * Deletes goals.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goals ${req.params.id}`})
});


module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}
