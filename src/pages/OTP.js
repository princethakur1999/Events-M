import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import { sendOtp, signUp } from '../services/authService';

const OTP = () => {

    const [otp, setOtp] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signupData } = useSelector((state) => state.auth);

    useEffect(() => {

        if (!signupData) {

            navigate('/signup');
        }

    }, [signupData, navigate]);

    function handleChange(event) {

        const { value } = event.target;

        setOtp(value);
    }

    function handleSubmit(event) {

        event.preventDefault();

        const { firstName, lastName, email, password, confirmPassword, } = signupData;

        dispatch(signUp(firstName, lastName, email, password, confirmPassword, otp, navigate));

        console.log('signupData: ', signupData);
        console.log('otp: ', otp);
        console.log('otp type: ', typeof otp);
    }

    return (

        <div className='flex w-full min-h-[calc(100vh-4rem)] justify-center items-center'>

            <div className='flex flex-col gap-9 md:p-11 lg:p-8 p-2 w-screen lg:w-[31.75rem]'>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-richblack-5 text-3xl font-semibold'>Verify email</h1>
                    <p className='text-richblack-100 text-lg '>Enter the code that has been sent to you.</p>
                </div>

                <div className='mx-auto lg:mx-[unset]'>
                    <input
                        type='text'
                        placeholder='Enter OTP'
                        onChange={handleChange}
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-rose-500'
                    />
                </div>

                <button onClick={handleSubmit} className='bg-rose-900 text-white px-4 py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring focus:border-rose-500'>
                    Verify Email
                </button>

                <div className='flex justify-between'>

                    <Link to='/login' className='text-richblack-5 font-medium flex gap-1 items-center'>
                        Back To Login
                    </Link>

                    <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} className='text-blue-100 flex items-center gap-1'>
                        Resend it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTP;
