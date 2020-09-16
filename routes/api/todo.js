const express = require('express');
const router = express.Router();

const Todo = require('../../models/Todo');

// Post shopping item from input field
router.post('/shopping', (req, res) => {
    const { userId, shopping, minutes, hours, day, month, year, shortDate } = req.body;
    const newTodo = new Todo({
        userId,
        shopping,
        minutes,
        hours,
        day,
        month,
        year,
        shortDate
    })
    newTodo.save()
    .then(item => res.json(item))
})

// Post notes from textarea field
router.post('/notes', (req, res) => {
    const { userId, notes, minutes, hours, day, month, year, shortDate } = req.body;
    const newTodoNotes = new Todo({
        userId,
        notes,
        minutes,
        hours,
        day,
        month,
        year,
        shortDate
    })
    newTodoNotes.save()
    .then(item => res.json(item))
})

// Get data of shopping list
router.post('/shoppingList', (req, res) => {
    Todo.find({ userId: req.body.userId, notes: req.body.notes })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

// Get data of notes list
router.post('/notesList', (req, res) => {
    Todo.find({ userId: req.body.userId, shopping: req.body.shopping })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// DELETE Route
// @desc Delete A Post
// @access Public
router.delete('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;