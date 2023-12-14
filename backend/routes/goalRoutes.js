/**
 * The express variable is assigned the value of the express module, which is
 * used to create web applications and APIs in Node.js.
 *
 * @type {Object}
 * @see {@link https://expressjs.com/}
 */
const express = require('express');
/**
 * Router variable for defining routes in an Express application.
 *
 * @type {Router}
 * @name router
 * @memberOf express
 */
const router = express.Router();
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController');
const {protect} = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getGoals)
    .post(protect, setGoal);

router.route('/:id')
    .put(protect, updateGoal)
    .delete(protect, deleteGoal);

module.exports = router;
