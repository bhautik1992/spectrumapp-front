import { Row,Col,Card,CardHeader,CardBody,CardTitle,CardText,CardLink } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'

import DataTableComponent from '../Table/DataTableComponent';
import { customersTableColumn } from '../Table/Columns';

const Customers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    
    const [initialValues, setInitialValues] = useState({
        list: {},
        total:0
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get('lead');

                if(response.data.success){
                    setInitialValues(prevVal => ({
                        ...prevVal,
                        list:response.data.data.customers,
                        total:response.data.data.total
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
                            columns={customersTableColumn(currentPage, rowsPerPage)}
                            data={initialValues.list}
                            total={initialValues.total}
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
        </>
    );
};

export default Customers;


