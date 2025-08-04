import { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { getSegmentList } from '../../services/actions/CustomersAction';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from  '../../helper/axiosInstance';

import DataTableComponent from '../Table/DataTableComponent';
import { cusInsightsTableColumn } from '../Table/Columns';

const index = () => {
    const dispatch = new useDispatch();
    const { segments } = useSelector((state) => state.CustomersReducer);
    const [options, setOptions] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    
    const [segmentMem, setSegmentMem] = useState([]);
    
    useEffect(() => {
        dispatch(getSegmentList());
    }, [dispatch]);

    useEffect(() => {
        console.log(segments)
        console.log(segments.length)
        // const temp = segments.map(({ id, name }) => ({
        //     value: id,
        //     label: name
        // }));

        // setOptions(temp);
    },[segments]);

    const handleSegmentChange = async (selectedOption) => {
        try {
            const response = await axiosInstance.get('customer/segment/records',{
                params: { 
                    id: selectedOption.value
                }
            });
            
            if(response.data.success){ 
                setSegmentMem(response.data.data.members);
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
    };

    return (
        <>
            <Helmet>
                <title>Customer Insights</title>
            </Helmet>

            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Filters</CardTitle>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col md='4'>
                            <Label for='role-select'>Select Segment</Label>
                            <Select
                                isClearable={false}
                                options={options}
                                className='react-select'
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                onChange={handleSegmentChange}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTableComponent
                        pagination
                        columns={cusInsightsTableColumn(currentPage, rowsPerPage)}
                        data={segmentMem}
                        total={segmentMem.length}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        searchValue={searchValue}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                        setSearchValue={setSearchValue}
                    />
                </div>
            </Card>
        </>
    );
};

export default index;


