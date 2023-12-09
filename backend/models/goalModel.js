const mongoose = require('mongoose');
/**
 * A mongoose schema for goals.
 *
 * @typedef {Object} GoalSchema
 * @property {string} text - The text of the goal.
 *
 * @property {boolean} timestamps - Indicates if timestamps should be enabled.
 */
const goalSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
    },

    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Goal', goalSchema)
