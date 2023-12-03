import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Edit({ formId }) {

    const [eventData, setEventData] = useState(null);

    const navigate = useNavigate();

    const formEdit = async () => {

        try {

            const response = await axios.get(`http://localhost:8000/edit/${formId}`);

            if (response.data && response.data.success) {

                setEventData(response.data.form);

            } else {

                console.error('Error editing form: Unexpected response format');
            }

        } catch (error) {

            console.error('Error editing form:', error);
        }
    };

    const handleDataChange = (e) => {

        const { name, value } = e.target;

        setEventData((prevData) => ({

            ...prevData,
            [name]: value,

        }));
    };

    useEffect(() => {

        formEdit();

    }, [formId]);

    const handleEdit = async () => {

        try {

            const response = await axios.put(`http://localhost:8000/update/${formId}`, eventData);

            if (response.data && response.data.success) {

                alert('Form updated successfully.');

                const emailResponse = await axios.get(`http://localhost:8000/sendemail/${formId}`);

                if (emailResponse.data && emailResponse.data.success) {

                    navigate('/');
                }
            } else {

                alert(response.data.message);
            }

        } catch (error) {

            console.log('Error updating form: ', error);
        }
    };

    if (!eventData) {

        return <div className='text-black text-center mt-8 text-[1.5rem]'>Loading...</div>;
    }

    return (

        <div className="container mx-auto p-4 md:w-[60%]">

            {
                Object.entries(eventData)

                    .filter(([key]) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'remarks')

                    .map(([key, value]) => (

                        <div key={key} className="mb-4">

                            <label htmlFor={key} className="block text-gray-700 font-bold mb-2">
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
                            </label>

                            {
                                key === 'status' ?
                                    (
                                        <select
                                            id={key}
                                            name={key}
                                            value={eventData ? eventData[key] || '' : ''}
                                            onChange={handleDataChange}
                                            className="w-full bg-gray-200 rounded p-2"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    )
                                    :
                                    (
                                        <input
                                            type="text"
                                            id={key}
                                            name={key}
                                            value={eventData ? eventData[key] || '' : ''}
                                            onChange={handleDataChange}
                                            className="w-full bg-gray-200 rounded p-2"
                                        />
                                    )
                            }
                        </div>
                    ))}
            <button onClick={handleEdit} className="bg-rose-700 text-white px-4 py-2 rounded mt-4">
                Update
            </button>
        </div>
    );
}

export default Edit;
