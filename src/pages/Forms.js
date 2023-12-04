import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Edit from './Edit';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function Forms() {

    const [forms, setForms] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formId, setFormId] = useState(null);
    const [email, setEmail] = useState(null);

    const adminToken = useSelector((state) => state.admin.token);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:8000/forms`);

                if (!response.data.success) {

                    throw new Error(response.data.message);
                }

                setForms(response.data.forms);
                setLoading(false);

            } catch (error) {

                console.error('Error fetching data:', error);

                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleEdit = async (formId, email) => {

        setFormId(formId);
        setEmail(email);
    };

    const handleView = (form) => {

        setSelectedForm(form);
    };

    const handleClose = () => {

        setSelectedForm(null);
    };

    if (loading) {

        return <div className='text-black text-center mt-8 text-[1.5rem]'>Loading...</div>;
    }

    if (!adminToken) {

        return <div></div>;
    }

    if (formId && email) {

        return <Edit formId={formId} email={email} />;
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

    return (

        <div className='flex justify-center items-center my-16'>

            {
                selectedForm ?
                    (

                        <div className='bg-white rounded-lg p-5 shadow-md sm:w-[80%]'>

                            <h3 className='text-2xl font-bold text-center bg-rose-900 text-white p-2 rounded-lg'>
                                Form No: {forms.indexOf(selectedForm) + 1}
                            </h3>

                            <div className='flex flex-col gap-4 mt-4'>

                                {
                                    Object.entries(selectedForm).map(([key, value]) => {

                                        if (key !== "_id" && key !== "__v" && key !== "createdAt" && key !== "remarks") {

                                            return (

                                                <div key={key} className='mb-2 sm:mb-0 text-sm sm:text-base flex flex-col sm:flex-row justify-between'>

                                                    <p className='w-full sm:w-auto mb-2 sm:mb-0 sm:mr-4 font-bold'>
                                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                    </p>

                                                    <p className='text-left sm:text-right'>
                                                        {['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value}
                                                    </p>

                                                </div>
                                            );


                                        } else {

                                            return null;
                                        }

                                    })}

                                <div className='flex justify-between items-center mt-4'>

                                    <button onClick={() => handleClose()} className='bg-rose-700 text-white px-4 py-2 rounded'>
                                        Close
                                    </button>

                                    <button onClick={() => handleEdit(selectedForm._id, selectedForm.eventOrganizerEmail)} className='bg-rose-700 text-white px-4 py-2 rounded'>Edit</button>

                                    <PDFDownloadLink
                                        document={
                                            <Document>
                                                <Page style={styles.page}>
                                                    <View style={styles.section}>
                                                        <Text style={styles.header}>Event Form</Text>

                                                        {
                                                            Object.entries(selectedForm).map(([key, value]) => {

                                                                if (key !== "_id" && key !== "__v" && key !== "createdAt" && key !== "remarks") {

                                                                    return (

                                                                        <View key={key} style={styles.detail}>

                                                                            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}</Text>

                                                                            <Text style={styles.value}>
                                                                                {
                                                                                    ['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value
                                                                                }
                                                                            </Text>
                                                                        </View>
                                                                    );

                                                                } else {

                                                                    return null;
                                                                }
                                                            })
                                                        }
                                                    </View>
                                                </Page>
                                            </Document>
                                        }

                                        fileName={`Form_${forms.indexOf(selectedForm) + 1}.pdf`}

                                        className='bg-rose-700 text-white px-4 py-2 rounded'
                                    >
                                        {({ blob, url, loading, error }) => ('Download')}

                                    </PDFDownloadLink>
                                </div>
                            </div>

                        </div>
                    )
                    :
                    (
                        <ul className='w-full flex flex-col gap-6'>

                            {
                                forms && Array.isArray(forms) ?
                                    (
                                        forms.map((form, index) => (

                                            <li
                                                key={index}
                                                style={{ margin: '0 auto' }}
                                                className='bg-white rounded-lg p-5 shadow-md sm:w-[100%] md:w-[80%]'
                                            >

                                                <h3 className='text-2xl font-bold text-center bg-rose-900 text-white p-2 rounded-lg'>
                                                    Form No: {index + 1}
                                                </h3>

                                                <div className='flex gap-4 mt-4 justify-between'>
                                                    {
                                                        Object.entries(form).map(([key, value]) => {


                                                            if (key === 'eventName' || key === 'eventOrganizer' || key === 'contact' || key === 'status') {

                                                                return (

                                                                    <div key={key} className='mb-2 border border-rose-200 rounded-lg sm:mb-0 text-sm sm:text-base flex flex-col sm:flex-row justify-around sm:items-start sm:w-[22%]'>

                                                                        <p className='w-full sm:w-auto mb-2 sm:mb-0 sm:mr-4 font-bold'>
                                                                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                                        </p>

                                                                        <p className='text-left sm:text-right'>
                                                                            {['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value}
                                                                        </p>

                                                                    </div>
                                                                );
                                                            } else {

                                                                return null;
                                                            }
                                                        })}
                                                </div>
                                                <div className='flex justify-between items-center mt-4'>
                                                    <button onClick={() => handleView(form)} className='bg-rose-700 text-white px-4 py-2 rounded'>
                                                        View
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    )
                                    :
                                    (
                                        <p className='p-8 my-8 text-center rounded-2xls'>Not Found!</p>
                                    )
                            }
                        </ul>
                    )
            }
        </div>
    );
}

export default Forms;
