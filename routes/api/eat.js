const express = require('express');
const router = express.Router();

const Eat = require('../../models/Eat');

// GET route
// @desc Get items from eat collection
// Public
router.get('/find', (req, res) => {
    Eat.find(req.params.userId)
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false}))
})

// POST route
// @desc Post userId, start and end time 
// Public
router.post('/', (req, res) => {
    const { userId, startEating, endEating, startRightBreast, endRightBreast, startLeftBreast, endLeftBreast, shortDate, year, month, day, hours, minutes, mealDuration, rightBreastDuration, leftBreastDuration } = req.body;
    const newEat = new Eat({
        userId,
        startEating, 
        endEating,
        startRightBreast,
        endRightBreast,
        startLeftBreast,
        endLeftBreast,
        shortDate,
        year,
        month,
        day,
        hours,
        minutes,
        mealDuration,
        rightBreastDuration,
        leftBreastDuration
        })
    newEat.save()
    .then(item => res.json(item))
})

// Post data for adapted meals
router.post('/adapted', (req, res) => {
    const { userId, startEating, endEatingAdapted, shortDate, year, month, day, hours, minutes, mealDuration, adaptedQuantity , adapted} = req.body;
    const newEatAdapted = new Eat({
        userId,
        startEating, 
        endEatingAdapted,
        shortDate,
        year,
        month,
        day,
        hours,
        minutes,
        mealDuration,
        adaptedQuantity,
        adapted
    })
    newEatAdapted.save()
    .then(item => res.json(item))
})

// Get data of specific user for specific day
router.post('/thisDay', (req, res) => {
    Eat.find({ userId: req.body.userId, shortDate: req.body.shortDate }) 
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Get data of specific user for specific month 
router.post('/thisMonth', (req, res) => {
    Eat.find({ userId: req.body.userId, month: req.body.month })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Get data of specific user for specific period
router.post('/thisPeriod', (req, res) => {
    Eat.find({ userId: req.body.userId, month: req.body.month, day: req.body.day })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

module.exports = router;