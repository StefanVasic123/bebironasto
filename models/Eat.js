const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EatSchema = new Schema({
    userId: {
        type: String,
    },
    startEating: {
        type: String,
    },
    endEating: {
        type: String,
    },
    endEatingAdapted: {
        type: String
    },
    startRightBreast: {
        type: String
    },
    endRightBreast: {
        type: String
    },
    startLeftBreast: {
        type: String
    },
    endLeftBreast: {
        type: String
    },
    shortDate: {
        type: String
    },
    year: {
        type: Number
    },
    month: {
        type: Number
    },
    day: {
        type: Number
    },
    hours: {
        type: Number
    },
    minutes: {
        type: Number
    },
    mealDuration: {
        type: Number
    }, 
    rightBreastDuration: {
        type: Number,
        default: 0
    },
    leftBreastDuration: {
        type: Number,
        default: 0
    },
    adaptedQuantity: {
        type: Number,
        default: 0
    },
    adapted: {
        type: Boolean
    },
    setBreastFeeding: {
        type: Boolean
    },
    setAdaptedFeeding: {
        type: Boolean
    },
    leftStart: {
        type: Boolean
    },
    leftIsFirst: {
        type: Boolean
    },
    setRightBreastBtnStart: {
        type: Boolean
    },
    setLeftBreastBtnStart: {
        type: Boolean
    },
    setLeftBreastBtnOver: {
        type: Boolean
    },
    setEndBtn: {
        type: Boolean
    },
    setStartBtn: {
        type: Boolean
    },
    setBackEating: {
        type: Boolean
    },
    stateEating: {
        type: Boolean
    },
    leftEnd: {
        type: Boolean
    },
    rightStart: {
        type: Boolean
    },
    rightIsFirst: {
        type: Boolean
    },
    rightEnd: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Eat = mongoose.model('eat', EatSchema);