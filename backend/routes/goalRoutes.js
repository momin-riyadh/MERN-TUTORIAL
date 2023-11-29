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

router.route('/')
    .get(getGoals)
    .post(setGoal);

router.route('/:id')
    .put(updateGoal)
    .delete(deleteGoal);

module.exports = router;
