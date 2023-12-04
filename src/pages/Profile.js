import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';


function getInitials(firstName, lastName) {

    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';

    return `${firstInitial}${lastInitial}`;
}

function Profile() {

    const [clicked, setClicked] = useState(false);

    const [eventDetails, setEventDetails] = useState(null);

    const [fetchingDetails, setFetchingDetails] = useState(false);


    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.profile.user);

    const fetchEventDetails = async (email) => {

        try {

            setFetchingDetails(true);

            const response = await axios.get(`http://localhost:8000/details/${email}`);

            if (response.data && response.data.success) {

                console.log(response);

                setEventDetails(response.data.data);
            }

        } catch (error) {

            console.error('Error fetching event details:', error);

        } finally {

            setFetchingDetails(false);
        }
    };

    useEffect(() => {

        if (clicked && user.email) {

            fetchEventDetails(user.email);
        }

    }, [clicked, user]);

    const generatePDF = () => {

        return (



            <Document>

                {console.log("OK" + eventDetails.eventName)}

                <Page style={styles.page}>

                    <View style={styles.section}>

                        <Text style={styles.header}>Event Form</Text>
                        {

                            eventDetails &&
                            Object.entries(eventDetails).map(([key, value]) => {



                                if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'remarks') {

                                    return (

                                        <View key={key} style={styles.detail}>

                                            <Text style={styles.label}>
                                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
                                            </Text>

                                            <Text style={styles.value}>
                                                {['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value}
                                            </Text>

                                        </View>
                                    );
                                }
                                return null;
                            })}
                    </View>
                </Page>
            </Document>
        );
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white p-8 shadow-md rounded-lg">
                {
                    token ?
                        (
                            user ?
                                (
                                    <div className="flex flex-col gap-8">
                                        <h1 className="text-3xl font-semibold mb-4">User Profile</h1>
                                        <div className="mb-4">
                                            <div className="flex justify-center items-center w-20 h-20 bg-rose-900 rounded-full text-white text-2xl font-bold">
                                                {getInitials(user.firstName, user.lastName)}
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-between">
                                            <span className="font-bold">First Name</span>
                                            <span>{user.firstName}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-between">
                                            <span className="font-bold">Last Name</span>
                                            <span>{user.lastName}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-between">
                                            <span className="font-bold">Email</span>
                                            <span>{user.email}</span>
                                        </div>
                                        {
                                            !clicked &&
                                            (
                                                <button onClick={() => setClicked(true)} className="bg-rose-900 w-[200px] text-white px-4 py-2 rounded">
                                                    View Event Details
                                                </button>
                                            )
                                        }
                                        {
                                            fetchingDetails &&
                                            <p className="text-xl font-semibold p-4 mb-8 text-center text-black">Loading...</p>
                                        }

                                        {
                                            eventDetails &&
                                            (
                                                <div className="h-auto my-4">
                                                    <h2 className="bg-rose-900 text-xl font-semibold p-4 mb-8 text-center text-white">Event Details</h2>
                                                    <div className="flex flex-col items-center mb-8">

                                                        {
                                                            Object.entries(eventDetails).map(([key, value]) => {

                                                                if (key === '_id' || key === '__v' || key === 'createdAt' || key === 'remarks') {

                                                                    return null;
                                                                }

                                                                console.log(`Rendering ${key}: ${value}`);

                                                                return (
                                                                    <div key={key} className="text-black w-full my-4 px-4 sm:px-20 border-b">
                                                                        <div className="mb-2 sm:mb-0 text-sm sm:text-base flex flex-col sm:flex-row justify-between">
                                                                            <p className="w-full sm:w-auto mb-2 sm:mb-0 sm:mr-4 font-bold">
                                                                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                                            </p>
                                                                            <p className="text-left sm:text-right">
                                                                                {['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                    <div className="w-[100%] flex items-center justify-center">
                                                        <PDFDownloadLink document={generatePDF()} fileName="IQAC.pdf" className="bg-rose-900 text-white px-8 py-2 rounded">
                                                            {({ loading }) => (loading ? 'Wait' : 'Download')}
                                                        </PDFDownloadLink>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {
                                            clicked && !eventDetails &&
                                            (
                                                <div className="text-xl font-semibold p-4 mb-8 text-center text-red-600">
                                                    Not Found!
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className="text-red-600">Failed to fetch user data.</div>
                                )
                        )
                        :
                        (
                            <div className="text-center text-red-600">Please log in to view your profile.</div>
                        )
                }
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        border: '2px solid #881337',
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#881337',
        color: 'white',
        paddingVertical: 20,
        marginBottom: 30,
        fontWeight: 700,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#881337',
        padding: 5,
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        backgroundColor: '#881337',
        color: 'white',
        width: '25%',
        padding: 5,
    },
    value: {
        fontSize: 12,
        borderBottom: '1px dotted #881337',
        width: '50%',
        paddingLeft: 5,
    },
});

export default Profile;
