import React, { useState } from 'react';
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

                setEventDetails(response.data.data);
            }

        } catch (error) {

            console.error('Error fetching event details:', error);

        } finally {

            setFetchingDetails(false);
        }
    };

    const fetchDetails = () => {

        fetchEventDetails(user.email);

        setClicked(true);
    };


    const generatePDF = () => {

        const MyDocument = (

            <Document>
                <Page style={styles.page}>

                    <View style={styles.section}>

                        <Text style={styles.header}>IQAC Event Details</Text>
                        {
                            eventDetails &&
                            Object.entries(eventDetails).map(([key, value]) => {

                                if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'remarks') {

                                    return (

                                        <View key={key} style={styles.detail}>

                                            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)} :</Text>
                                            <Text style={styles.value}>
                                                {
                                                    ['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value
                                                }
                                            </Text>
                                        </View>


                                    );
                                }
                                return null;
                            })
                        }

                    </View>

                </Page>
            </Document>
        );

        return (

            <PDFDownloadLink document={MyDocument} fileName="IQAC.pdf" className='bg-rose-900 text-white px-8 py-2 rounded'>

                {({ blob, url, loading, error }) => (loading ? 'Wait' : 'Download')}

            </PDFDownloadLink>
        );
    };

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
        },
        detail: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: '#881337',
            padding: 5,
            marginBottom: 15,
        },
        label: {
            fontSize: 12,
        },
        value: {
            marginLeft: 10,
            fontSize: 12,
            borderBottom: '1px dotted #881337',
            width: '40%',
            paddingLeft: 10,
        },
    });

    return (
        <div className="container mx-auto mt-10">

            <div className="bg-white p-8 shadow-md rounded-lg">
                {
                    token ?
                        (
                            user ?
                                (
                                    <div>

                                        <h1 className="text-3xl font-semibold mb-4">User Profile</h1>

                                        <div className="mb-4">
                                            <div className="flex justify-center items-center w-20 h-20 bg-rose-900 rounded-full text-white text-2xl font-bold">
                                                {getInitials(user.firstName, user.lastName)}
                                            </div>
                                        </div>

                                        <div className="flex justify-between mb-4">
                                            <span className="font-semibold">First Name:</span>
                                            <span>{user.firstName}</span>
                                        </div>

                                        <div className="flex justify-between mb-4">
                                            <span className="font-semibold">Last Name:</span>
                                            <span>{user.lastName}</span>
                                        </div>

                                        <div className="flex justify-between mb-4">
                                            <span className="font-semibold">Email:</span>
                                            <span>{user.email}</span>
                                        </div>

                                        {
                                            !clicked &&
                                            (
                                                <button onClick={fetchDetails} className="bg-rose-900 text-white px-4 py-2 rounded">
                                                    View Event Details
                                                </button>
                                            )
                                        }

                                        {
                                            fetchingDetails && <p className='bg-rose-900 text-xl font-semibold p-4 mb-8 text-center text-white'>Loading...</p>
                                        }

                                        {
                                            eventDetails &&
                                            (
                                                <div className="h-auto my-4">

                                                    <h2 className="bg-rose-900 text-xl font-semibold p-4 mb-8 text-center text-white">Event Details</h2>

                                                    <div className="flex flex-col items-center mb-8">

                                                        {
                                                            Object.entries(eventDetails).map(([key, value]) => {

                                                                if (key === '_id' || key === '__v') {

                                                                    return null;
                                                                }
                                                                return (

                                                                    <div key={key} className="text-black w-full my-4 px-4 sm:px-20 border-b">

                                                                        <p className="mb-2 sm:mb-0 text-sm sm:text-base">
                                                                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                                                            <span className="float-right sm:ml-4">{value}</span>
                                                                        </p>

                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>

                                                    <div className='w-[100%] flex items-center justify-center'>
                                                        {generatePDF()}
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {
                                            clicked && !eventDetails &&
                                            (
                                                <div className='text-xl font-semibold p-4 mb-8 text-center text-red-600'>
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

export default Profile;
