import { Fragment, useState, useEffect } from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Label, Button, FormText } from 'reactstrap'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast';

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

import { Helmet } from 'react-helmet-async';
import '@styles/react/libs/input-number/input-number.scss';
import { useDispatch } from "react-redux";
import { ChevronsLeft } from 'react-feather'
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const dispatch = useDispatch();
    const navigate = new useNavigate();

    const [initialValues, setInitialValues] = useState({
        sf_access_token: '',
        sf_client_id: '',
        sf_id:'',
        sf_instance_url : '',
    });

    const validationSchema = Yup.object({
        sf_access_token : Yup.string()
            .max(150)
            .label('Access Token'),
        sf_client_id: Yup.string()
            .max(15)
            .label('Client Id'),
        sf_id : Yup.string()
            .max(25)
            .label('Id'),
        sf_instance_url : Yup.string()
            .max(100)
            .matches(
                /^https:\/\/([a-zA-Z0-9-]+\.)*my\.salesforce\.com$/,
                "Invalid Salesforce Instance URL format"
            )
            .label('Instance Url')
    })

    // Using an IIFE (Immediately Invoked Function Expression) Inside useEffect
    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get('settings');

                if(response.data.success){
                    setInitialValues(prevValue => ({
                        ...prevValue,
                        ...response.data.data
                    }))
                }
            } catch (error) {
                let errorMessage = import.meta.env.VITE_ERROR_MSG;
    
                if(error.response){
                    errorMessage = error.response.data?.message || JSON.stringify(error.response.data); // Case 1: API responded with an error
                }else if (error.request){
                    errorMessage = import.meta.env.VITE_NO_RESPONSE; // Case 2: Network error
                }
        
                // console.error(error.message);
                toast.error(errorMessage);
            }
        })();
    },[])

    const onSubmit = async (values) => {
        try {
            const response = await axiosInstance.post('settings', values);
            
            if(response.data.success){
                toast.success(response.data.message);

                setInitialValues(prevValue => ({
                    ...prevValue,
                    ...response.data.data,
                }))
            }
        } catch (error) {
            let errorMessage = import.meta.env.VITE_ERROR_MSG;

            if(error.response){
                errorMessage = error.response.data?.message || JSON.stringify(error.response.data); // Case 1: API responded with an error
            }else if (error.request){
                errorMessage = import.meta.env.VITE_NO_RESPONSE; // Case 2: Network error
            }
    
            // console.error(error.message);
            toast.error(errorMessage);
        }
    }

    return (
        <Fragment>
            <Helmet>
                <title>Settings</title>
            </Helmet>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className='border-bottom'>
                            <CardTitle tag='h4'>Settings</CardTitle>

                            <CardTitle tag='h4'>
                                <Button color='secondary' size='sm' onClick={() => navigate(-1)}>
                                    <ChevronsLeft size={15} />
                                </Button>
                            </CardTitle>
                        </CardHeader>

                        <CardBody className='pt-1'>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                enableReinitialize={true}
                                onSubmit={onSubmit}
                            >
                                {({ errors, touched  }) => (
                                    <Form>
                                        <Row>
                                            <Col sm='4' className='mb-1'>
                                                <Label className='form-label' for='sf_access_token'>
                                                    SF Access Token
                                                </Label>
                                
                                                <Field
                                                    type="text"
                                                    name="sf_access_token"
                                                    id="sf_access_token"
                                                    placeholder="Enter SF Access Token"
                                                    className={`form-control ${errors.sf_access_token && touched.sf_access_token ? 'is-invalid' : ''}`}
                                                    maxLength={150}
                                                    autoComplete="off"
                                                    autoFocus
                                                />

                                                <ErrorMessage name="sf_access_token" component="div" className="invalid-feedback"/>
                                            </Col>

                                            <Col sm='4' className='mb-1'>
                                                <Label className='form-label' for='sf_client_id'>
                                                    SF Client Id
                                                </Label>
                                
                                                <Field
                                                    type="text"
                                                    name="sf_client_id"
                                                    id="sf_client_id"
                                                    placeholder="Enter SF Client Id"
                                                    className={`form-control ${errors.sf_client_id && touched.sf_client_id ? 'is-invalid' : ''}`}
                                                    maxLength={15}
                                                    autoComplete="off"
                                                />

                                                <ErrorMessage name="sf_client_id" component="div" className="invalid-feedback"/>
                                            </Col>

                                            <Col sm='4' className='mb-1'>
                                                <Label className='form-label' for='sf_id'>
                                                    SF Id
                                                </Label>
                                
                                                <Field
                                                    type="text"
                                                    name="sf_id"
                                                    id="sf_id"
                                                    placeholder="Enter SF Id"
                                                    className={`form-control ${errors.sf_id && touched.sf_id ? 'is-invalid' : ''}`}
                                                    maxLength={25}
                                                    autoComplete="off"
                                                />

                                                <ErrorMessage name="sf_id" component="div" className="invalid-feedback"/>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm='4' className='mb-1'>
                                                <Label className='form-label' for='sf_instance_url'>
                                                    SF Instance Url
                                                </Label>
                                
                                                <Field
                                                    type="text"
                                                    name="sf_instance_url"
                                                    id="sf_instance_url"
                                                    placeholder="Enter SF Instance Url"
                                                    className={`form-control ${errors.sf_instance_url && touched.sf_instance_url ? 'is-invalid' : ''}`}
                                                    maxLength={100}
                                                    autoComplete="off"
                                                />

                                                <ErrorMessage name="sf_instance_url" component="div" className="invalid-feedback"/>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className='mt-1' sm='12'>
                                                <Button type='submit' className='me-1' color='primary'>
                                                    Save
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>



    )
}

export default Index;


