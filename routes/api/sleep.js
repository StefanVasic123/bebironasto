const express = require('express');
const router = express.Router();

const Sleep = require('../../models/Sleep');

// Send data to db
router.post('/', (req, res) => {
    const { userId, startSleep, finishSleep, sleepingDuration, minutes, hours, day, month, year, shortDate } = req.body;
    const newSleep = new Sleep({
        userId,
        startSleep,
        finishSleep,
        sleepingDuration,
        minutes,
        hours, 
        day,
        month,
        year,
        shortDate
    })
    newSleep.save()
    .then(item => res.json(item))
})

router.post('/startSleeping', (req, res) => {
    const { userId, setInputGroup, setEndSleeping, setStartSleeping, stateSleeping, startSleeping } = req.body;
    const newSleepingRequest = new Sleep({
        userId, 
        setInputGroup, 
        setEndSleeping, 
        setStartSleeping, 
        stateSleeping, 
        startSleeping
    })
    newSleepingRequest.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Get data for specific day and user
router.post('/thisDay', (req, res) => {
    Sleep.find({ userId: req.body.userId, shortDate: req.body.shortDate })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Get data for specific month and user
router.post('/thisMonth', (req, res) => {
    Sleep.find({ userId: req.body.userId, month: req.body.month })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Get data for specific period and user
router.post('/thisPeriod', (req, res) => {
    Sleep.find({ userId: req.body.userId, month: req.body.month, day: req.body.day })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

// Get state data
router.post('/getState', (req, res) => {
    Sleep.find({ userId: req.body.userId, stateSleeping: req.body.stateSleeping })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

// Delete specific data by id
router.delete('/:id', (req, res) => {
    Sleep.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;