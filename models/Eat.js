const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EatSchema = new Schema({
    userId: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    mealDuration: {
        type: Number,
        required: true
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
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Eat = mongoose.model('eat', EatSchema);