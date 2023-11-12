const mongoose = require('mongoose');

// Define the Admin schema
const adminSchema = new mongoose.Schema({


    email: {
        type: String,
        required: true,
        unique: true
    },
    PIN: {
        type: String,
        required: true
    }
});

// Create the Admin model based on the schema
module.exports = mongoose.model('Admin', adminSchema);

