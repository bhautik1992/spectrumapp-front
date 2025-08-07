import {Row, Col, Label, Card, CardHeader, CardBody, CardTitle, Button} from "reactstrap";
import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorPicker from 'react-pick-color';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast';
import { UPDATE_PROFILE } from '../../services/constants';

const Index = () => {
    const { user } = useSelector((state) => state.LoginReducer);
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const dispatch = useDispatch();
    
    const [initialValues, setInitialValues] = useState({
        id:user._id,
        color_code: user?.color_code || '#ffffff',
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onSubmit = async (values) => {
        try {
            const response = await axiosInstance.post('user/profile/update', values);
            
            if(response.data.success){
                toast.success(response.data.message);
                dispatch({ type: UPDATE_PROFILE, data:response.data.data });
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
        <div>
            <Helmet>
                <title>Profile</title>
            </Helmet>

            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Profile Details</CardTitle>
                </CardHeader>

                <CardBody className='py-2 my-25'>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched, values, setFieldValue  }) => (
                            <Form>
                                <Row>
                                    <Col md='4'>
                                        <Label className='form-label' for='Name'>Name</Label>
                                        <h6><p className='form-control-static text-primary'>{user.full_name}</p></h6>
                                    </Col>

                                    <Col md='4'>
                                        <Label className='form-label' for='email'>Email</Label>
                                        <h6><p className='form-control-static text-primary'>{user.email}</p></h6>
                                    </Col>

                                    <Col md='4' style={{ position: "relative" }}>
                                        <Label className='form-label' for='color'>Select Color Code</Label>

                                        <div onClick={() => setShowPicker(!showPicker)} 
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                backgroundColor: values.color_code,
                                                border: '1px solid #ccc',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                color: "#fff",
                                                textAlign: "center",
                                                position: 'relative'
                                            }}
                                        >
                                            {values.color_code.toUpperCase()}
                                        </div>

                                        {showPicker && (
                                            <div
                                                ref={pickerRef}
                                                style={{
                                                    position: "absolute",
                                                    zIndex: 999
                                                }}
                                            >
                                                <ColorPicker
                                                    color={values.color_code}
                                                    onChange={(color) => setFieldValue("color_code", color.hex)}
                                                />
                                            </div>
                                        )}
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
        </div>
    );
};

export default Index;
