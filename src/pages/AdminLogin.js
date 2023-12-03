import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { setAdminToken } from '../slices/adminSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL;


const AdminLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [adminPin, setAdminPin] = useState('');

    const [error, setError] = useState(false);


    const sendAdminLoginRequest = async () => {


        const pin = adminPin;


        try {

            const response = await axios.post(`http://localhost:8000/admin-login?pin=${pin}`);

            console.log('Response:', response.data);

            if (!response.data.success) {

                throw new Error(response.data.message)
            }

            dispatch(setAdminToken(response.data.token));


            localStorage.setItem('adminToken', response.data.token);


            alert('Welcome to Admin Dashboard');


            navigate('/dashboard');


        } catch (error) {

            console.error('Error:', error.message);

            setError(true);
        }
    };


    return (

        <div className="flex items-center justify-center h-screen">

            <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">

                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

                <input
                    type="password"
                    placeholder="Enter PIN"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-rose-500"
                />
                <button
                    onClick={sendAdminLoginRequest}
                    className="w-full bg-rose-900 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>

                {
                    error &&
                    (
                        <p className="text-red-500 text-center mt-2">Invalid PIN. Please try again.</p>
                    )
                }
            </div>
        </div>
    );
};

export default AdminLogin;
