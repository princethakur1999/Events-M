const mongoose = require('mongoose');

// Define the schema for the form data
const FormSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    objectives: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventOrganizer: {
        type: String,
        required: true
    },
    eventOrganizerEmail: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    keyAttendees: {
        type: String,
        required: true
    },
    totalAttendees: {
        type: Number,
        required: true
    },
    dateOfRequest: {
        type: Date,
        required: true
    },
    benefitDetails: {
        type: String,
    },
    venue: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    netRevenue: {
        type: Number,
        required: true
    },
    remarks: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Cancelled'],
        default: 'Pending'
    }
});

// Create a Mongoose model
module.exports = mongoose.model('Form', FormSchema);
