import { Row,Col,Card,CardHeader,CardTitle,Label,Button } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from '../../services/actions/CustomersAction';
import Sidebar from '@components/sidebar'
import {Formik, Form} from 'formik';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { leadSourceLabels, leadStatusOptions } from '../../constants';

import DataTableComponent from '../Table/DataTableComponent';
import { customersTableColumn } from '../Table/Columns';

const Customers = () => {
    const dispatch = new useDispatch();
    const { list, total } = useSelector((state) => state.CustomersReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState({})
    const toggleSidebar = () => setOpen(!open)

    const [initialValues, setInitialValues] = useState({
        shopify_cus_id:'',
        lead_status : ''
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

                // progressbar, update table row.
                // setInitialValues(prevValue => ({
                //     ...prevValue,
                //     ...response.data.data,
                // }))
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

            <Sidebar
                size='lg'
                open={open}
                title={'Edit Customer'}
                headerClassName='mb-1'
                contentClassName='pt-0'
                toggleSidebar={toggleSidebar}
                style={{ 
                    width: "35vw", 
                    maxWidth: "500px" 
                }}
            >
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                >
                    {({ setFieldValue, values }) => (
                    <Form>                    
                        <Row>
                            <Col sm='12'>
                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Shopify Customer Id:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <h6>{info.shopify_cus_id}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Salesforce Lead Id:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <h6>{info.salesforce_lead_id}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Name:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <h6>{info.full_name}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Company:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <h6>{info.lead_company}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Email:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <h6>{info.lead_email}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Phone:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <h6>{info.lead_phone}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Lead Source:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <h6>{leadSourceLabels[info.lead_source] || "Unknown"}</h6>
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Label sm='5' className='form-label'>
                                        <h6>Lead Status:</h6>
                                    </Label>

                                    <Col sm='7' className="col-form-label">
                                        <Select
                                            name="lead_status"
                                            id="lead_status"
                                            theme={selectThemeColors}
                                            className={`react-select`}
                                            classNamePrefix='select'
                                            options={leadStatusOptions}
                                            value={leadStatusOptions.find(opt => opt.value === values.lead_status)}
                                            onChange={(option) => setFieldValue("lead_status", option.value)}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Label sm='5' className='form-label'>
                                        <h6>Description:</h6>
                                    </Label>
                                    
                                    <Col sm='7' className="col-form-label">
                                        <h6>{info.lead_description}</h6>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col className='mt-1' sm='12'>
                                <Button type='submit' className='me-1' color='primary'>
                                    Save
                                </Button>
                                
                                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    )}
                </Formik>
            </Sidebar>
        </>
    );
};

export default Customers;


