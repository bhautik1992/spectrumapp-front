import { Row,Col,Card,CardHeader,CardTitle,Modal,ModalBody,ModalHeader } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from '../../services/actions/CustomersAction';
import {Formik, Form, Field } from 'formik';
import { CUSTOMER_UPDATE } from '../../services/constants';
import { User, CheckCircle, Check } from 'react-feather'
import Wizard from '@components/wizard'
import CustomerDetails from './CustomerDetails';
import Checklist from './Checklist';
import SubmitStep from './SubmitStep';

import DataTableComponent from '../Table/DataTableComponent';
import { customersTableColumn } from '../Table/Columns';

const Customers = () => {
    const ref = useRef(null);
    const dispatch = new useDispatch();
    const { list, total } = useSelector((state) => state.CustomersReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [stepper, setStepper] = useState(null)
    
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState({})
    const toggleSidebar = () => setOpen(!open)

    const [initialValues, setInitialValues] = useState({
        shopify_cus_id:'',
        lead_status : '',
        engagement_type:'',
        checklist_notes:''
    });

    useEffect(() => {
        dispatch(getCustomers(currentPage, rowsPerPage, searchValue));
    }, [dispatch, currentPage, rowsPerPage, searchValue]);

    const editRecord = (rowData) => {
        setOpen(!open)
        setInfo(rowData)

        setInitialValues(prevValue => ({
            ...prevValue,
            lead_status:rowData.lead_status,
            shopify_cus_id:rowData.shopify_cus_id
        }))
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

            <Modal isOpen={open} toggle={() => setOpen(!open)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => setOpen(!open)}>
                    <span><h5 className='text-center mb-1'>Edit Customer</h5></span>
                </ModalHeader>

                <ModalBody className='pb-3 px-sm-3'>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                    >
                        {({ setFieldValue, values, handleSubmit }) => (
                            <Form>
                                <Wizard
                                    ref={ref}
                                    steps={[
                                        {
                                          id: 'details',
                                          title: 'Details',
                                          subtitle: 'Customer Details.',
                                          icon: <User className='font-medium-3' />,
                                          content: <CustomerDetails stepper={stepper} info={info} values={values} setFieldValue={setFieldValue} />
                                        },
                                        {
                                          id: 'checklist',
                                          title: 'Checklist',
                                          subtitle: 'Select Checklist',
                                          icon: <CheckCircle className='font-medium-3' />,
                                          content: <Checklist stepper={stepper} info={info} values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                                        },
                                        {
                                          id: 'submit',
                                          title: 'Submit',
                                          subtitle: 'Review & Submit',
                                          icon: <Check className='font-medium-3' />,
                                          content: <SubmitStep stepper={stepper} values={values} />
                                        }
                                    ]}
                                    type='vertical'
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


