const jwt = require('jsonwebtoken');

require('dotenv').config();

const Form = require('../models/form');

const { sendEmail } = require('../utils/mailSender');

const adminLogin = async (req, res) => {

    try {

        const ADMIN_PIN = process.env.ADMIN_PIN;

        const pin = req.query.pin; // Accessing the pin from the query parameters

        if (!pin) {

            return res.status(401).json({

                success: false,
                error: 'Please provide your PIN',
            });
        }

        if (!ADMIN_PIN) {

            return res.status(500).json({

                success: false,
                message: 'Admin PIN not set',
            });
        }

        if (pin === ADMIN_PIN) {

            const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {

                expiresIn: '1h', // Token expiration time
            });

            return res.status(200).json({

                success: true,
                message: 'Admin logged in successfully',
                token,
            });

        } else {

            return res.status(401).json({

                success: false,
                message: 'Invalid PIN',
            });
        }
    } catch (error) {

        console.error('Error:', error);

        return res.status(500).json({

            success: false,
            message: 'Server Error',
        });
    }
};



const getAllForms = async (req, res) => {

    try {

        const forms = await Form.find();

        console.log("FORMS: " + forms);

        console.log("Forms Length: " + forms.length);


        res.status(200).json({

            success: true,
            message: "Fetched all the forms.",
            count: forms.length,
            forms: forms,
        });

    } catch (error) {



        res.status(500).json({

            success: false,
            message: "Could not fetch the forms.",
            error: error.message
        });
    }
};


const editForm = async (req, res) => {

    try {

        const formId = req.params.formId;

        const form = await Form.findById(formId);

        if (!form) {

            return res.status(404).json({

                success: false,
                message: 'Form not found.'
            });
        }

        res.status(200).json({

            success: true,
            message: "Fetched form data.",
            form: form,
        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Could not fetch the form.",
            error: error.message
        });
    }
};

const updateForm = async (req, res) => {

    const formId = req.params.formId;

    const eventData = req.body;

    try {

        const updatedForm = await Form.findByIdAndUpdate(formId, eventData, { new: true });

        console.log(updateForm);

        if (!updatedForm) {

            return res.status(404).json({

                success: false,
                message: 'Data not found!',
            });
        }

        return res.status(200).json({

            success: true,
            message: 'Form updated successfully!',
            data: updatedForm,

        });

    } catch (error) {

        return res.status(500).json({

            message: 'Error updating form',
            error: error.message,
        });
    }
};

const sendStatusEmail = async (req, res) => {

    try {

        const formId = req.params.formId;

        console.log(formId);

        if (!formId) {

            return res.status(404).json({

                success: false,
                message: "No form ID provided",
            })
        };

        const form = await Form.findOne({ _id: formId }).exec();;

        console.log(form);

        if (!form) {

            return res.status(404).json({

                success: false,
                message: "Form does not exist!"
            })
        };

        const email = form.eventOrganizerEmail;

        const status = form.status;

        console.log("Status: " + status);


        const eventName = form.eventName;

        await sendEmail(email, `IQAC: ${eventName} Event Status`, status);

        return res.status(200).json({

            success: true,
            message: `An Email has been sent to ${email}`
        })


    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Failed to send an email!",
            error: error.message
        })
    }
}



module.exports = {
    adminLogin,
    getAllForms,
    editForm,
    updateForm,
    sendStatusEmail
};


