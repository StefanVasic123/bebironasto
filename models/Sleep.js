const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const SleepSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    startSleep: {
        type: Number
    },
    finishSleep: {
        type: Number
    },
    sleepingDuration: {
        type: Number,
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

module.exports = Sleep = mongoose.model('sleep', SleepSchema);