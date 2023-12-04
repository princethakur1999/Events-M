import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../slices/authSlice';
import { sendOtp } from '../services/authService';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {

            const signupData = { ...formData };

            dispatch(setSignupData(signupData));

            dispatch(sendOtp(email, navigate));

            setErrorMessage('');

        } catch (error) {

            // Handle signup-related errors
            setErrorMessage(error.message || 'An error occurred during signup. Please try again.');

        } finally {
            setLoading(false); // Stop loading, regardless of success or failure
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-3xl font-semibold mb-2 text-center text-gray-700">Sign Up</h2>

                {errorMessage && <div className="mb-4 text-red-500 text-center">{errorMessage}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="mb-2">

                        <label htmlFor="firstName" className="block text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-rose-500"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lastName" className="block text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <button
                            type="submit"
                            className="bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-rose-600 focus:outline-none focus:border-rose-500 w-full"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
