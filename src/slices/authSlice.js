import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    signupData: null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
}

const authSlice = createSlice({

    name: 'auth',
    initialState: initialState,
    reducers: {

        setUserToken: (state, value) => {

            state.token = value.payload;
        },

        setSignupData: (state, value) => {

            state.signupData = value.payload;
        }
    }
})

export const { setSignupData, setUserToken } = authSlice.actions;

export default authSlice.reducer;