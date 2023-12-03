import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveFormData } from '../services/formService';

const Form = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        eventName: '',
        category: '',
        objectives: '',
        eventDate: '',
        eventOrganizer: '',
        eventOrganizerEmail: '',
        contact: '',
        keyAttendees: '',
        totalAttendees: 0,
        dateOfRequest: '',
        benefitDetails: '',
        venue: '',
        budget: 0,
        netRevenue: 0,
        termsAndConditions: `
            Requests for events should be submitted at least 10 days prior to the proposed event date.
            As a part of the event documentation, the requester must submit two geotag photographs to event@srisriuniversity.edu.in.
            Within 3 days after the completion of the event, a one-page report must be submitted to iqac@srisriuniversity.edu.in along with the attendance of the participants (if taken).
            Any damages caused during the event will be the sole responsibility of the department organizing the event.
        `,
        remarks: false,
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prevData) => ({

            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const requiredFields = [
            'eventName',
            'category',
            'objectives',
            'eventDate',
            'eventOrganizer',
            'eventOrganizerEmail',
            'contact',
            'keyAttendees',
            'totalAttendees',
            'dateOfRequest',
            'venue',
            'budget',
            'netRevenue',
            'remarks',
        ];

        const isValid = requiredFields.every((field) => formData[field] !== '');

        if (isValid) {

            dispatch(saveFormData(formData, navigate));

        } else {

            alert('Please fill in all the required fields.');
        }

    };

    return (

        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 my-8 rounded-lg shadow-md">

            {/* Event Name */}
            <div className="mb-4">
                <label htmlFor="eventName" className="block mb-2">Event Name</label>
                <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Category (Radio Buttons) */}
            <div className="mb-4">
                <label className="block mb-2">Category</label>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="category"
                            value="Workshop"
                            checked={formData.category === 'Workshop'}
                            onChange={handleChange}
                            className="form-radio text-black"
                        />
                        <span className="ml-2">Workshop</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            name="category"
                            value="Seminar"
                            checked={formData.category === 'Seminar'}
                            onChange={handleChange}
                            className="form-radio text-black focus-within:outline-none"
                        />
                        <span className="ml-2">Seminar</span>
                    </label>
                    {/* Add more radio buttons for other categories */}
                </div>
            </div>

            {/* Objectives */}
            <div className="mb-4">
                <label htmlFor="objectives" className="block mb-2">Objectives</label>
                <textarea
                    id="objectives"
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                ></textarea>
            </div>

            {/* Event Date */}
            <div className="mb-4">
                <label htmlFor="eventDate" className="block mb-2">Event Date</label>
                <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Event Organizer */}
            <div className="mb-4">
                <label htmlFor="eventOrganizer" className="block mb-2">Event Organizer</label>
                <input
                    type="text"
                    id="eventOrganizer"
                    name="eventOrganizer"
                    value={formData.eventOrganizer}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Event Organizer */}
            <div className="mb-4">
                <label htmlFor="eventOrganizerEmail" className="block mb-2">Event Organizer Email</label>
                <input
                    type="email"
                    id="eventOrganizerEmail"
                    name="eventOrganizerEmail"
                    value={formData.eventOrganizerEmail}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Contact */}
            <div className="mb-4">
                <label htmlFor="contact" className="block mb-2">Contact</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Key Attendees */}
            <div className="mb-4">
                <label htmlFor="keyAttendees" className="block mb-2">Key Attendees</label>
                <input
                    type="text"
                    id="keyAttendees"
                    name="keyAttendees"
                    value={formData.keyAttendees}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Total Attendees */}
            <div className="mb-4">
                <label htmlFor="totalAttendees" className="block mb-2">Total Attendees</label>
                <input
                    type="text"
                    id="totalAttendees"
                    name="totalAttendees"
                    value={formData.totalAttendees}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Date of Request */}
            <div className="mb-4">
                <label htmlFor="dateOfRequest" className="block mb-2">Date of Request</label>
                <input
                    type="date"
                    id="dateOfRequest"
                    name="dateOfRequest"
                    value={formData.dateOfRequest}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>



            {/* Benefit Details*/}
            {
                <div className="mb-4">
                    <label htmlFor="benefitDetails" className="block mb-2">Benefit Details</label>
                    <textarea
                        id="benefitDetails"
                        name="benefitDetails"
                        value={formData.benefitDetails}
                        onChange={handleChange}
                        className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                    ></textarea>
                </div>
            }

            {/* Venue */}
            <div className="mb-4">
                <label htmlFor="venue" className="block mb-2">Venue</label>
                <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Budget */}
            <div className="mb-4">
                <label htmlFor="budget" className="block mb-2">Budget</label>
                <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Net Revenue */}
            <div className="mb-4">
                <label htmlFor="netRevenue" className="block mb-2">Net Revenue</label>
                <input
                    type="text"
                    id="netRevenue"
                    name="netRevenue"
                    value={formData.netRevenue}
                    onChange={handleChange}
                    className="w-full border border-slate-500 text-black p-2 rounded focus-within:outline-none"
                />
            </div>

            {/* Terms & Conditions */}
            <div className="mb-4 py-4">
                <label htmlFor="termsAndConditions" className="block mb-2">Terms & Conditions</label>

                <div className="text-xs">
                    {
                        formData.termsAndConditions.split('\n').map((item, index) => (
                            <p className="mb-6 text-black text-justify" key={index}>{item}</p>
                        ))
                    }
                </div>
            </div>

            {/* Remarks (Checkbox) */}
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        id="remarksCheckbox"
                        name="remarks"
                        checked={formData.remarks}
                        onChange={handleChange}
                        className="form-checkbox"
                    />
                    <span className="ml-2">I agree to the terms and conditions</span>
                </label>
            </div>


            {/* Submit Button */}
            <div className="mb-4">
                <button
                    type="submit"
                    className={`bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-700 ${!formData.remarks ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!formData.remarks}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Form;
