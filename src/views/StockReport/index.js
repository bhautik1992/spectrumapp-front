import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { stockReportFilter } from '../../constants';

import DataTableComponent from '../Table/DataTableComponent';
import { stockReportTableColumn } from '../Table/Columns';

const index = () => {
    const dispatch = new useDispatch();

    const [prevPage, setPrevPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterVal, setFilterVal] = useState(0);

    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [total , setTotal] = useState(0);

    // Navigation
    useEffect(() => {
        if(currentPage > 0){
            (async () => {
                try {
                    const before = pageInfo.startCursor;
                    const after  = pageInfo.endCursor;
    
                    const response = await axiosInstance.get('product',{
                        params: { 
                            perPage: rowsPerPage,
                            before,
                            after,
                            isNext:(currentPage > prevPage)?true:false,
                            filter: filterVal
                        }
                    });
                    
                    if(response.data.success){
                        setProducts(response.data.data.products);
                        setPageInfo(response.data.data.pageInfo);
                        setTotal(response.data.data.total);
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
        }

        setPrevPage(currentPage);
    },[currentPage]);

    // Initial Load,Rows Per Page Change, Filter Change
    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get('product',{
                    params: { 
                        perPage: rowsPerPage,
                        filter: filterVal
                    }
                });
                
                if(response.data.success){
                    setProducts(response.data.data.products);
                    setPageInfo(response.data.data.pageInfo);
                    setTotal(response.data.data.total);
                    setCurrentPage(0);
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
    },[rowsPerPage,filterVal]);

    const handleChange = async (option) => {
        setFilterVal(option.value);
    }

    return (
        <>
            <Helmet>
                <title>Stock Report</title>
            </Helmet>

            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Filters</CardTitle>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col md='4'>
                            <Label for='role-select'>Sales Performance</Label>
                            <Select
                                isClearable={false}
                                options={stockReportFilter}
                                className='react-select'
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                onChange={handleChange}
                                defaultValue={stockReportFilter[0]}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTableComponent
                        columns={stockReportTableColumn(currentPage, rowsPerPage)}
                        data={products}
                        total={total}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                        hasPaginateWithNum={false}
                        pageInfo={pageInfo}
                        hasSearch={false}
                    />
                </div>
            </Card>
        </>
    );
};

export default index;


