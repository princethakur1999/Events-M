const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = require('../models/user');
const OTP = require('../models/otp');


require('dotenv').config();


// Function to generate a random 6-digit integer OTP
function generateNumericOTP() {

    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check if OTP is unique
async function isOTPUnique(otp) {

    const result = await OTP.findOne({ otp });

    return !result; // Returns true if the OTP is unique, false otherwise
}

// Function to generate a unique OTP
async function generateUniqueNumericOTP() {

    let otp;

    do {
        otp = generateNumericOTP();

    } while (!(await isOTPUnique(otp)));

    return otp.toString(); // Convert to string to ensure it's exactly 6 digits
}

// Update your sendOTP function
exports.sendOTP = async (req, res) => {

    try {

        // Fetch email from request's body
        const { email } = req.body;

        // Check if the user already exists
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {

            return res.status(401).json({

                success: false,
                message: 'User already registered',
            });
        }

        // Generate a unique 6-digit OTP
        const otp = await generateUniqueNumericOTP();

        // Create a new OTP document
        const otpDocument = new OTP({ email, otp });

        // Save the OTP document to the database
        await otpDocument.save();

        return res.status(200).json({

            success: true,
            message: 'OTP sent successfully',
            otpDocument,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: error.message,
        });
    }
};


//signup
exports.signup = async (req, res) => {

    try {

        // Fetch data from request's body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp

        } = req.body;

        console.log('First Name: ', firstName);
        console.log('Last Name: ', lastName);
        console.log('Email: ', email);
        console.log('Password: ', password);
        console.log('Confirm Password: ', confirmPassword);
        console.log('OTP: ', otp);

        // Validate that all required fields are provided
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {

            return res.status(400).json({

                success: false,
                message: 'All fields are required!',
            });
        }

        // Matching both passwords
        if (password !== confirmPassword) {

            return res.status(400).json({

                success: false,
                message: 'Password and Confirm Password do not match'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: 'User is already registered'
            });
        }

        // Find the most recent OTP stored for the user
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        console.log("Recent OTP: ", recentOtp);

        // Validate OTP
        if (!recentOtp) {

            return res.status(400).json({

                success: false,
                message: 'Unable to find OTP'
            });

        } else if (otp !== recentOtp.otp) {

            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Return response
        return res.status(200).json({

            success: true,
            message: 'User registered successfully.',
            user: newUser // You can include the new user details in the response if needed.
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: 'User cannot be registered. An error occurred.',
            error: error.message // Include the error message in the response for debugging.
        });
    }
}


//login
exports.login = async (req, res) => {

    try {

        //Get data from request body
        const { email, password } = req.body;

        //Validations on data
        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: 'All fields are required',
            });
        }
        //Check user exists or not
        const userPresentInDb = await User.findOne({ email });

        if (!userPresentInDb) {

            return res.status(400).json({

                success: false,
                message: 'User doest not exist, Signup frist.'
            });
        }

        //Generate JWT, after password matching
        if (await bcrypt.compare(password, userPresentInDb.password)) {

            const payload = {

                email: userPresentInDb.email,
                id: userPresentInDb._id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '27h' });

            userPresentInDb.token = token;

            userPresentInDb.password = undefined;

            //Create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            return res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user: userPresentInDb,
                message: 'Logged in successfully.'
            });

        } else {

            return res.status(401).json({

                success: false,
                message: 'Password incorrect!'
            });
        }

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: 'Login failure!'
        });
    }
}