import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';
import Edit from './Edit';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function Forms() {


    const [forms, setForms] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formId, setFormId] = useState(null);
    const [email, setEmail] = useState(null);




    const adminToken = useSelector((state) => state.admin.token);


    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get('http://localhost:8000/forms');

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

    if (loading) {

        return <div className='text-black text-center mt-8 text-[1.5rem]'>Loading...</div>;
    }

    if (!adminToken) {

        return <div></div>
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

        <div className="flex justify-center items-center my-16">

            {
                forms && Array.isArray(forms) ?
                    (
                        <ul className="w-full flex flex-col gap-6">

                            {
                                forms.map((form, index) => (

                                    <li
                                        key={index}
                                        style={{ margin: '0 auto' }}
                                        className="bg-white rounded-lg p-5 shadow-md sm:w-[100%] md:w-[80%]"

                                    >
                                        <h3 className="text-2xl font-bold text-center bg-rose-900 text-white p-2 rounded-lg">
                                            Form No: {index + 1}
                                        </h3>

                                        <div className="flex flex-col gap-4 mt-4">

                                            {
                                                Object.entries(form)

                                                    .filter(([key]) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'remarks')

                                                    .map(([key, value]) => (

                                                        <div key={key} className="flex justify-between items-center">

                                                            <span className="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                                            <span>
                                                                {
                                                                    ['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value
                                                                }
                                                            </span>

                                                        </div>
                                                    ))
                                            }
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <button
                                                onClick={() => handleEdit(form._id, form.eventOrganizerEmail)}
                                                className="bg-rose-700 text-white px-4 py-2 rounded"
                                            >
                                                Edit
                                            </button>

                                            <PDFDownloadLink

                                                document={

                                                    <Document>

                                                        <Page style={styles.page}>

                                                            <View style={styles.section}>

                                                                <Text style={styles.header}>IQAC Event Form</Text>

                                                                {
                                                                    Object.entries(form)

                                                                        .filter(([key]) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'remarks')

                                                                        .map(([key, value]) => (

                                                                            <View key={key} style={styles.detail}>

                                                                                <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)} :</Text>

                                                                                <Text style={styles.value}>
                                                                                    {
                                                                                        ['eventDate', 'dateOfRequest'].includes(key) && value ? new Date(value).toLocaleDateString() : value
                                                                                    }
                                                                                </Text>

                                                                            </View>
                                                                        ))}
                                                            </View>
                                                        </Page>
                                                    </Document>
                                                }

                                                fileName={`Form_${index + 1}.pdf`}

                                                className="bg-rose-700 text-white px-4 py-2 rounded"
                                            >
                                                {({ blob, url, loading, error }) => loading ? 'Wait' : 'Download'}

                                            </PDFDownloadLink>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p>Forms data is not available or is not in the expected format.</p>
                    )}
        </div>
    );
}

export default Forms;
