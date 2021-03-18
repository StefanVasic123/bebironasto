const express = require('express');
const router = express.Router();

// For using find/save etc in routing process, we have to get Scheme (Item Model)
const Relieve = require('../../models/Relieve');

// GET Route
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

// POST Route
// @desc Create A Post
// @access Public
router.post('/', (req, res) => {
    const { userId, description, shortDate, year, month, day, hours, minutes, act } = req.body;
/*    User.findOne({ userId })
        .then(user => {
            if(user) return console.log(user);
        }) */
    const newRelieve = new Relieve({
        userId,
        description, 
        shortDate,
        year,
        month,
        day,
        hours,
        minutes,
        act
    })
    newRelieve.save()
    .then(item => res.json(item))
})

// GET Route
// @desc Get all user data by user ID
// Public
router.post('/find', (req, res) => {
    Relieve.find({ userId: req.body.userId })
        .then(item => res.json(item)) //  item.find(item.description)
        .catch(err => res.status(400).json({ success: false}))
})

// POST Route
// @desc Get user data by user ID for specific day
// Private
router.post('/findDay', (req, res) => {
    Relieve.find({ userId: req.body.userId, shortDate: req.body.shortDate }) 
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

// POST Route
// @desc Get user data by user ID for specific month
// Private
router.post('/findMonth', (req, res) => {
    Relieve.find({ userId: req.body.userId, month: req.body.month })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})
  
// POST Route
// @desc Get user data by user ID for specific year
// Private
router.post('/findYear', (req, res) => {
    Relieve.find({ userId: req.body.userId, year: req.body.year })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

// POST Route 
// @desc Get user data by user ID for specific period
// Private
router.post('/findPeriod', (req, res) => {
    Relieve.find({ userId: req.body.userId, month: req.body.month, day: req.body.day })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})
// DELETE Route
// @desc Delete A Post
// @access Public
router.delete('/:id', (req, res) => {
    Relieve.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;