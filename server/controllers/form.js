const Form = require('../models/form');



// Function to create a new form entry
const createForm = async (req, res) => {

    try {
        const {
            eventName,
            category,
            objectives,
            eventDate,
            eventOrganizer,
            eventOrganizerEmail,
            contact,
            keyAttendees,
            totalAttendees,
            dateOfRequest,
            benefitDetails,
            venue,
            budget,
            netRevenue,
            remarks
        } = req.body.formData;

        // Correcting "remarks" field cast issue
        const remarksValue = remarks === 'true'; // or use Boolean(remarks) or any appropriate parsing

        // Check for required fields
        if (!eventName || !category || !objectives || !eventDate || !eventOrganizer || !eventOrganizerEmail || !contact || !keyAttendees || !totalAttendees || !dateOfRequest || !venue || !budget || !netRevenue || !remarks) {

            return res.status(400).json({

                success: false,
                message: 'All required fields must be filled.'
            });
        }

        const savedForm = await Form.create({
            eventName,
            category,
            objectives,
            eventDate,
            eventOrganizer,
            eventOrganizerEmail,
            contact,
            keyAttendees,
            totalAttendees,
            dateOfRequest,
            benefitDetails,
            venue,
            budget,
            netRevenue,
            remarks: remarksValue // Assign the corrected value to remarks
        });

        res.status(201).json({

            success: true,
            data: savedForm,
            message: 'Form created successfully',
        });

    } catch (error) {

        res.status(500).json({

            success: false,
            error: error.message,
            message: 'Failed to create form',
        });
    }
};

const getEventDetails = async (req, res) => {

    try {

        const email = req.params.email;

        const eventDetails = await Form.findOne({ eventOrganizerEmail: email }).sort({ createdAt: -1 }).exec();

        if (!eventDetails) {

            return res.status(404).json({

                success: false,
                message: 'Event details not found'
            });
        }

        console.log("MERA DETAILS: " + eventDetails); // Log the event details (for debugging purposes)

        return res.status(200).json({

            success: true,
            data: eventDetails,
            message: 'Event details fetched successfully',
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Function to update a form entry
const updateForm = async (req, res) => {

    try {
        const formId = req.params.id;

        const update = req.body;


        const updatedForm = await Form.findByIdAndUpdate(formId, update, { new: true });

        if (!updatedForm) {

            res.status(404).json({ message: 'Form not found' });

        } else {

            res.status(200).json(updatedForm);
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Function to delete a form entry
const deleteForm = async (req, res) => {

    try {
        const formId = req.params.id;

        const deletedForm = await Form.findByIdAndRemove(formId);

        if (!deletedForm) {

            res.status(404).json({ message: 'Form not found' });

        } else {

            res.status(200).json({ message: 'Form deleted' });
        }

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createForm,
    getEventDetails,
    updateForm,
    deleteForm,
};
