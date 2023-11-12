import { combineReducers } from '@reduxjs/toolkit';

import adminReducer from '../slices/adminSlice';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';


const rootReducer = combineReducers({

    admin: adminReducer,
    auth: authReducer,
    profile: profileReducer,
});

export default rootReducer;