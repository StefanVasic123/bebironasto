const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    shopping: {
        type: String
    },
    notes: {
        type: String
    },
    minutes: {
        type: Number,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    shortDate: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Todo = mongoose.model('todo', TodoSchema);