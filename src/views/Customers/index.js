import { Row,Col,Card,CardHeader,CardBody,CardTitle,CardText,CardLink } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from '../../services/actions/CustomersAction';

import DataTableComponent from '../Table/DataTableComponent';
import { customersTableColumn } from '../Table/Columns';

const Customers = () => {
    const dispatch = new useDispatch();
    const { list, total } = useSelector((state) => state.CustomersReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    
    useEffect(() => {
        dispatch(getCustomers(currentPage, rowsPerPage, searchValue));
    }, [dispatch, currentPage, rowsPerPage, searchValue]);

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
        </>
    );
};

export default Customers;


