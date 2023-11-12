import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function saveFormData(formData, navigate) {

    return async (dispatch) => {

        try {
            console.log("MY DATA: ", formData.venue);

            const response = await axios.post(`http://localhost:8000/form`, { formData: formData });

            console.log("saveFormData API response: ", response.data);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            console.log(response.data.message);

            navigate("/profile");

        } catch (error) {

            console.log("saveFormData API error: ", error.response ? error.response.data : error.message);
        }
    };
}
