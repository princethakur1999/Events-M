import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { setUserToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const { email, password } = formData;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        // Client-side validation
        if (!email || !password) {

            setErrorMessage('Please enter both email and password.');

            return;
        }

        try {

            setLoading(true); // Start loading

            const response = await axios.post(`http://localhost:8000/login`, {
                email,
                password,
            });

            if (!response.data.success) {

                throw new Error(response.data.message); // Throw the specific error message from the server
            }

            // Clear any previous error message if successful
            setErrorMessage('');

            dispatch(setUser(response.data.user));
            dispatch(setUserToken(response.data.token));

            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify({ ...response.data.user }));

            navigate(`/profile`);

        } catch (error) {

            setErrorMessage(error.message || 'An error occurred. Please try again later.');

        } finally {

            setLoading(false); // Stop loading, regardless of success or failure
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded shadow-md w-96">

                <h2 className="text-2xl font-semibold mb-4">Log In</h2>

                {
                    errorMessage &&
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                }

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-rose-600 focus:outline-none focus:border-rose-500"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
