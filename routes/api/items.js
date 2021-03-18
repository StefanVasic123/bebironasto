const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// For using find/save etc in routing process, we have to get Scheme (Item Model)
const Item = require('../../models/Item');

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
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(item => res.json(item))
})

// DELETE Route
// @desc Delete A Post
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))

})

module.exports = router;