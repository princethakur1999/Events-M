import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
}

const adminSlice = createSlice({

    name: 'admin',
    initialState: initialState,
    reducers: {

        setAdminToken: (state, value) => {

            state.token = value.payload;
        },


    }
})

export const { setAdminToken } = adminSlice.actions;

export default adminSlice.reducer;