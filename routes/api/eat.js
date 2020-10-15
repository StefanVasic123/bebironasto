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
    const { userId, startEating, endEating, stateEating, startRightBreast, endRightBreast, startLeftBreast, endLeftBreast, shortDate, year, month, day, hours, minutes, mealDuration, rightBreastDuration, leftBreastDuration } = req.body;
    const newEat = new Eat({
        userId,
        startEating, 
        endEating,
        stateEating,
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
    const { userId, startEating, endEatingAdapted, shortDate, year, month, day, hours, minutes, mealDuration, adaptedQuantity , adapted } = req.body;
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

// Post data for current state
router.post('/state', (req, res) => {
    const { stateEating, userId, setBreastFeeding, setAdaptedFeeding, startLeftBreast, leftStart, leftIsFirst, startEating, setRightBreastBtnStart, setLeftBreastBtnStart, setLeftBreastBtnOver, setEndBtn, setStartBtn, setBackEating, stateId } = req.body;
    const newState = new Eat({
        stateEating,
        userId,
        setBreastFeeding, 
        setAdaptedFeeding, 
        startLeftBreast, 
        leftStart, 
        leftIsFirst, 
        startEating, 
        setRightBreastBtnStart, 
        setLeftBreastBtnStart, 
        setLeftBreastBtnOver, 
        setEndBtn, 
        setStartBtn, 
        setBackEating,
        stateId
    })
    newState.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false}))
})

// Post data when its started eating without left or right
router.post('/stateStart', (req, res) => {
    const { stateEating, userId, setBreastFeeding, setAdaptedFeeding, startEating, setLeftBreastBtnStart, setRightBreastBtnStart, setEndBtn, setStartBtn, setBackEating, stateId } = req.body;
    const newState = new Eat({
        stateEating,
        userId,
        setBreastFeeding, 
        setAdaptedFeeding, 
        startEating, 
        setLeftBreastBtnStart, 
        setRightBreastBtnStart, 
        setEndBtn, 
        setStartBtn, 
        setBackEating,
        stateId
    })
    newState.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false}))
})

// Post data for current state (if right is first clicked)
router.post('/stateRight', (req, res) => {
    const { stateEating, userId, setBreastFeeding, setAdaptedFeeding, startRightBreast, rightStart, rightIsFirst, startEating, setLeftBreastBtnStart, setRightBreastBtnStart, setRightBreastBtnOver, setEndBtn, setStartBtn, setBackEating, stateId } = req.body;
    const newState = new Eat({
        stateEating,
        userId,
        setBreastFeeding, 
        setAdaptedFeeding, 
        startRightBreast, 
        rightStart, 
        rightIsFirst, 
        startEating, 
        setLeftBreastBtnStart, 
        setRightBreastBtnStart, 
        setRightBreastBtnOver, 
        setEndBtn, 
        setStartBtn, 
        setBackEating,
        stateId
    })
    newState.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false}))
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

// Get current state
router.post('/getState', (req, res) => {
    Eat.find({ userId: req.body.userId, stateEating: req.body.stateEating })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

// Find and replace current state
router.post('/update', (req, res) => {
    Eat.findOneAndUpdate({ userId: req.body.userId, stateEating: req.body.stateEating },
        { $set: {
        userId: req.body.userId,
        stateEating: req.body.stateEating,
        setBreastFeeding: req.body.setBreastFeeding,
        setAdaptedFeeding: req.body.setAdaptedFeeding,
        setLeftBreast: req.body.setLeftBreast,
        leftEnd: req.body.leftEnd,
        setLeftBreastBtnOver: req.body.setLeftBreastBtnOver,
        setRightBreastBtnStart: req.body.setRightBreastBtnStart,
        startRightBreast: req.body.startRightBreast,
        rightStart: req.body.rightStart,
        rightIsFirst: req.body.rightIsFirst,
        setLeftBreastBtnStart: req.body.setLeftBreastBtnStart,
        rightEnd: req.body.rightEnd
        }},
        (err, result) => {
            if(err) return res.send(err)
            res.send(result)
        })
})

// Find and replace current state (if right is clicked after left)
router.post('/updateRight', (req, res) => {
    Eat.findOneAndUpdate({ userId: req.body.userId, stateEating: req.body.stateEating },
        { $set: {
        userId: req.body.userId,
        stateEating: req.body.stateEating,
        setRightBreastBtnStart: req.body.setRightBreastBtnStart,
        rightIsFirst: req.body.rightIsFirst,
        rightEnd: req.body.rightEnd,
        setStartBtn: req.body.setStartBtn,
        setBackEating: req.body.setBackEating,
        setEndBtn: req.body.setEndBtn,
        startRightBreast: req.body.startRightBreast
        }},
        (err, result) => {
            if(err) return res.send(err)
            res.send(result)
        })
})

// Find and replace current state (if left is clicked after right)
router.post('/updateLeft', (req, res) => {
    Eat.findOneAndUpdate({userId: req.body.userId, stateEating: req.body.stateEating },
        { $set: {
        userId: req.body.userId,
        stateEating: req.body.stateEating,
        setBreastFeeding: req.body.setBreastFeeding,
        setAdaptedFeeding: req.body.setAdaptedFeeding,
        setLeftBreastBtnStart: req.body.setLeftBreastBtnStart,
        leftIsFirst: req.body.leftIsFirst,
        setRightBreastBtnStart: req.body.setRightBreastBtnStart,
        leftEnd: req.body.leftEnd
        }},
        (err, result) => {
            if(err) return res.send(err)
            res.send(result)
        })
})

// Find and replace current state of second left button
router.post('/updateLeftEnd', (req, res) => {
    Eat.findOneAndUpdate({ userId: req.body.userId, stateEating: req.body.stateEating },
        { $set: {
        userId: req.body.userId,
        stateEating: req.body.stateEating,
        endLeftBreast: req.body.endLeftBreast,
        leftEnd: req.body.leftEnd,
        leftStart: req.body.leftStart,
        setLeftBreastBtnOver: req.body.setLeftBreastBtnOver,
        setRightBreastBtnStart: req.body.setRightBreastBtnStart
        }},
        (err, result) => {
            if(err) return res.send(err)
            res.send(result)
        })
})

// Find and replace current state of second right button
router.post('/updateRightEnd', (req, res) => {
    Eat.findOneAndUpdate({ userId: req.body.userId, stateEating: req.body.stateEating },
        { $set: {
        userId: req.body.userId,
        stateEating: req.body.stateEating,
        endRightBreast: req.body.endRightBreast,
        rightEnd: req.body.rightEnd,
        rightStart: req.body.rightStart,
        setRightBreastBtnOver: req.body.setRightBreastBtnOver,
        setLeftBreastBtnStart: req.body.setLeftBreastBtnStart
        }},
        (err, result) => {
            if(err) return res.send(err)
            res.send(result)
        })
})

// Find if state exist or it is closed window
router.post('/:id', (req, res) => {
    Eat.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})


// Delete specific item by id
router.delete('/:id', (req, res) => {
    Eat.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;