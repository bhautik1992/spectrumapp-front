import { Row,Col,Card,CardHeader,CardTitle,Modal,ModalBody,ModalHeader } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from '../../services/actions/CustomersAction';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CUSTOMER_UPDATE } from '../../services/constants';
import { User, CheckCircle, Layers, Calendar } from 'react-feather'
import Wizard from '@components/wizard'
import CustomerDetails from './CustomerDetails';
import Checklist from './Checklist';
import Diary from './Diary';
import Event from './Event';
import moment from 'moment';
import { leadStatusOptions } from '../../constants';

import DataTableComponent from '../Table/DataTableComponent';
import { customersTableColumn } from '../Table/Columns';

const Customers = () => {
    const ref = useRef(null);
    const dispatch = new useDispatch();
    const { list, total } = useSelector((state) => state.CustomersReducer);
    const { user } = useSelector((state) => state.LoginReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [stepper, setStepper] = useState(null)
    
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState({})
    const toggleSidebar = () => setOpen(!open)

    const [initialValues, setInitialValues] = useState({
        loggedin_user_id:user._id,
        shopify_cus_id:'',
        lead_status : '',
        engagement_type:'',
        engagement_note:'',
        diary:'',
        title:'',
        date:moment().format('YYYY-MM-DD'),
        url:'',
        location:'',
        description:'',
        isClosedConverted:false,
    });

    useEffect(() => {
        dispatch(getCustomers(currentPage, rowsPerPage, searchValue));
    }, [dispatch, currentPage, rowsPerPage, searchValue]);

    const editRecord = (rowData) => {
        (async () => {
            try {
                const response = await axiosInstance.get('customer/edit/'+rowData._id);
                
                if(response.data.success){
                    setInitialValues(prevValue => ({
                        ...prevValue,
                        ...response.data.data,
                        engagement_type:response.data.data.engagement_type?.toString(),
                        engagement_note:response.data.data?.engagement_note || '',
                        isClosedConverted: (response.data.data?.lead_status == leadStatusOptions[2].value)?true:false,
                    }))

                    const result = response.data.data.diaries.map(diary => {
                        const createdAt = moment(diary.createdAt);
                        const now = moment();
                        const hoursDiff = now.diff(createdAt, 'hours');
                    
                        return {
                            icon: <User size={15} style={{ color: diary.sender_id?.color_code || '#ffffff' }} />,
                            title: diary.sender_id?.full_name || 'Unknown Sender',
                            content: diary.message || '',
                            meta: hoursDiff < 24 ? createdAt.fromNow() : createdAt.format('DD/MM/YYYY')
                        };
                    });

                    response.data.data.diaries = result;
                    setInfo(response.data.data)
                    setOpen(!open)
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
    };

    const onSubmit = async (values) => {
        try {
            const response = await axiosInstance.post('customer/update', values);
            
            if(response.data.success){
                toast.success(response.data.message);
                toggleSidebar();
                
                dispatch({
                    type:CUSTOMER_UPDATE,
                    payload:{ 
                        shopify_cus_id: values.shopify_cus_id,
                        lead_status   : values.lead_status,
                    }
                })
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
        <>
            <Helmet>
                <title>Customers</title>
            </Helmet>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className='border-bottom'>
                            <CardTitle tag='h4'>Customers List</CardTitle>
                        </CardHeader>

                        <DataTableComponent
                            columns={customersTableColumn(currentPage, rowsPerPage, editRecord)}
                            data={list}
                            total={total}
                            currentPage={currentPage}
                            rowsPerPage={rowsPerPage}
                            searchValue={searchValue}
                            setCurrentPage={setCurrentPage}
                            setRowsPerPage={setRowsPerPage}
                            setSearchValue={setSearchValue}
                        />
                    </Card>
                </Col>
            </Row>

            <Modal isOpen={open} toggle={() => setOpen(!open)} className='modal-dialog-centered modal-xl' contentClassName="d-flex flex-column">
                <ModalHeader className='bg-transparent' toggle={() => setOpen(!open)}>
                    <span><h5 className='text-center mb-1'>Edit Customer</h5></span>
                </ModalHeader>

                <ModalBody className='pb-3 px-sm-3' style={{ height: '70vh', overflowY: 'auto' }}>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                    >
                        {({ setFieldValue, values, handleSubmit, errors, touched }) => (
                            <Form>
                                <Wizard
                                    ref={ref}
                                    steps={[
                                        {
                                          id: 'details',
                                          title: 'Customer Details',
                                        //   subtitle: 'Customer Details.',
                                          icon: <User className='font-medium-3' />,
                                          content: <CustomerDetails stepper={stepper} info={info} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setOpen={setOpen} />
                                        },
                                        {
                                          id: 'checklist',
                                          title: 'Engagement Checklist',
                                        //   subtitle: 'Select Checklist',
                                          icon: <CheckCircle className='font-medium-3' />,
                                          content: <Checklist stepper={stepper} info={info} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setOpen={setOpen} />
                                        },
                                        {
                                          id: 'diary',
                                          title: 'Sales & Admin Diary',
                                        //   subtitle: 'Review & Submit',
                                          icon: <Layers className='font-medium-3' />,
                                          content: <Diary stepper={stepper} info={info} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setOpen={setOpen} />
                                        },
                                        {
                                            id: 'event',
                                            title: 'Event Planning',
                                          //   subtitle: 'Event Planning',
                                            icon: <Calendar className='font-medium-3' />,
                                            content: <Event stepper={stepper} info={info} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setOpen={setOpen} />
                                        }
                                    ]}
                                    type='horizontal'
                                    headerClassName='border-0'
                                    options={{ linear: false }}
                                    instance={el => setStepper(el)}
                                    contentClassName='shadow-none'
                                    className='bg-transparent create-app-wizard shadow-none'
                                />    
                            </Form>
                        )}  
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Customers;


