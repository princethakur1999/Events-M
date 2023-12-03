const mongoose = require('mongoose');

const { sendEmail } = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60
    }
});

// Function to send emails
sendVerificationEmail = async (email, otp) => {

    try {

        await sendEmail(email, 'Email Verification', otp);

        console.log('Email sent successfully!');

    } catch (error) {

        console.log('Error occurred while sending mail: ', error);

        throw error;
    }
}

OTPSchema.pre('save', async function (next) {

    console.log("New document saved to the database");

    // Only send an email when a new document is created
    if (this.isNew) {

        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});


module.exports = mongoose.model('OTP', OTPSchema);
