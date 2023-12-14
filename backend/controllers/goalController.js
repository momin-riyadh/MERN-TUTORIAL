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
    const goals = await Goal.find({user: req.user.id})
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
        text: req.body.text,
        user: req.user.id
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
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal Not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})

/**
 * Deletes goals.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const deleteGoal = asyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        return res.status(404).json({ message: 'Goal Not Found' });
    }

    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id});
});

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}
