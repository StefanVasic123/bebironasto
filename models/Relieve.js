const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* const relieveMap = new Schema({ 
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}) */
// Create Schema
const RelieveSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
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
    act: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Relieve = mongoose.model('relieve', RelieveSchema); // It create bebironcollections collection on mongoDB