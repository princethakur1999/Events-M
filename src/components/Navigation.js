import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../slices/authSlice';
import { setAdminToken } from '../slices/adminSlice';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

function Navigation() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userToken = useSelector((state) => state.auth.token);
    const adminToken = useSelector((state) => state.admin.token);

    const userLogout = () => {

        dispatch(setUserToken(null));
        dispatch(setAdminToken(null));

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        navigate('/');
    };

    const adminLogout = () => {

        dispatch(setAdminToken(null));
        dispatch(setUserToken(null));

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/');
    };

    return (

        <nav className="bg-rose-900 p-4 borde border-b border-slate-500">

            <div className="container mx-auto flex justify-between items-center">

                <Link to="/" className="text-white text-2xl font-bold hidden  sm:hidden md:inline">
                    SSU
                </Link>

                <ul className="flex space-x-4 justify-center items-center">

                    <li>
                        <Link to="/" className="text-white text-[1.5rem] p-2 block">
                            <AiFillHome />
                        </Link>
                    </li>

                    {
                        userToken &&
                        <>
                            <li>
                                <NavLink to="/profile" className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/form" className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Form
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={userLogout} className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Logout
                                </button>
                            </li>
                        </>
                    }

                    {
                        !userToken && !adminToken &&
                        <>
                            <li>
                                <NavLink to="/signup" className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Signup
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Login
                                </NavLink>
                            </li>
                        </>
                    }

                    {
                        !userToken && adminToken &&
                        <>
                            <li>
                                <NavLink to="/forms" className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Store
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard" className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Dashboard
                                </NavLink>
                            </li>

                            <li>
                                <button onClick={adminLogout} className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                    Logout
                                </button>
                            </li>
                        </>
                    }


                    {
                        !userToken && !adminToken &&
                        <li>
                            <NavLink to="/admin-login" className="text-white p-2 hover:bg-white hover:text-rose-900 hover:rounded-2xl">
                                Admin
                            </NavLink>
                        </li>

                    }


                </ul>
            </div>
        </nav >
    );
}

export default Navigation;
