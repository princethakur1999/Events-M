const User = require('../models/user');

exports.profile = async (req, res) => {

    try {

        const email = req.params.email; // Access email from URL parameters

        // Fetch the user profile data based on the user's email
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the user profile data
        return res.status(200).json({

            success: true,
            message: "Profile fetched successfully",
            data: user
        })

    } catch (error) {

        console.error('Error fetching user data:', error);

        res.status(500).json({

            success: false,
            message: "An unexpected error occurred",
        });
    }
};
