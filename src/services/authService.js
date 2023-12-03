import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function sendOtp(email, navigate) {

    return async (dispatch) => {

        try {

            const response = await axios.post(`http://localhost:8000/sendOTP`, {

                email
            });

            console.log("sendOtp API response: ", response);

            console.log(response.data.success);

            if (!response.data.success) {

                throw new Error(response.data.message)
            }

            navigate("/otp");

        } catch (error) {

            console.log("sendOtp API error: ", error);

        }

    }
}

export function signUp(firstName, lastName, email, password, confirmPassword, otp, navigate) {

    return async (dispatch) => {

        const signupData = { firstName, lastName, email, password, confirmPassword, otp };

        try {

            const response = await axios.post(`http://localhost:8000/signup`, signupData);

            console.log('Signup successful:', response.data);

            if (!response.data.success) {

                throw new Error(response.data.message)
            }

            navigate("/login");

        } catch (error) {

            console.log("signup API error: ", error)

            navigate("/signup");
        }
    }
}


