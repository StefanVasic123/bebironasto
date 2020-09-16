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

module.exports = router;