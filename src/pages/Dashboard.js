import React from 'react';
import { useSelector } from 'react-redux';


const Dashboard = () => {

    const adminToken = useSelector((state) => state.admin.token);

    if (!adminToken) {

        return (

            <div className='w-[50%] p-4 my-10 flex items-center justify-center bg-black text-white mx-auto'>You are not logged in as an administrator</div>
        )
    }

    return (
        <div className="container mx-auto my-16">

            <h1 className="text-3xl font-bold mb-4 text-center text-rose-900">Admin Dashboard</h1>

            <div className="flex justify-center">

                <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow-md">

                    <p className="text-md my-4">Welcome to the Institutional Quality Assurance Cell (IQAC) Dashboard!</p>

                    <p className="text-md my-4">Here, you can manage various functionalities specific to IQAC.</p>

                    <p className="text-base my-4 text-rose-900 font-bold">For instance:</p>

                    <ul className="list-disc pl-6">
                        <li>Monitor and enhance academic quality</li>
                        <li>Assess and analyze institutional performance</li>
                        <li>Coordinate accreditation processes</li>
                        <li>Facilitate continuous improvement initiatives</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
