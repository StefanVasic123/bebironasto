const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const SleepSchema = new Schema({
    userId: {
        type: String,
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
    },
    hours: {
        type: Number,
    },
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
    shortDate: {
        type: String,
    },
    setEndSleeping: {
        type: Boolean
    },
    setInputGroup: {
        type: Boolean
    },
    setStartSleeping: {
        type: Boolean
    },
    stateSleeping: {
        type: Boolean
    },
    startSleeping: {
        type: String
    },
    setSecondText: {
        type: Boolean
    },
    setMainText: {
        type: Boolean
    },
    setDataGrid: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Sleep = mongoose.model('sleep', SleepSchema);