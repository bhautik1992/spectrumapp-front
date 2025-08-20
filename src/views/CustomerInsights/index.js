import { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { getSegmentList } from '../../services/actions/CustomersAction';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'

import DataTableComponent from '../Table/DataTableComponent';
import { cusInsightsTableColumn } from '../Table/Columns';

const index = () => {
    const dispatch = new useDispatch();
    const { segments } = useSelector((state) => state.CustomersReducer);
    const [options, setOptions] = useState([]);

    const [prevPage, setPrevPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedSegment, setSelectedSegment] = useState('');
    const [segmentMember, setSegmentMember] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    
    useEffect(() => {
        setSelectedSegment('');
        dispatch(getSegmentList());
    }, [dispatch]);

    // Navigation
    useEffect(() => {
        if(currentPage > 0){
            (async () => {
                try {
                    const before = pageInfo.startCursor;
                    const after  = pageInfo.endCursor;
    
                    const response = await axiosInstance.get('customer/segment/records',{
                        params: { 
                            id:selectedSegment,
                            perPage: rowsPerPage,
                            before,
                            after,
                            isNext:(currentPage > prevPage)?true:false
                        }
                    });
                    
                    if(response.data.success){
                        setSegmentMember(response.data.data.members);
                        setPageInfo(response.data.data.pageInfo);
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

    useEffect(() => {
        const temp = segments.map(({ id, name }) => ({
            value: id,
            label: name
        }));
        
        setOptions(temp);
    },[segments]);

    // Filter Change
    const handleSegmentChange = async (selectedOption) => {
        try {
            setSelectedSegment(selectedOption.value);

            const response = await axiosInstance.get('customer/segment/records',{
                params: { 
                    id: selectedOption.value,
                    perPage: rowsPerPage
                }
            });
            
            if(response.data.success){
                setSegmentMember(response.data.data.members);
                setPageInfo(response.data.data.pageInfo);
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
    };

    // Rows Per Page Change
    useEffect(() => {
        if(selectedSegment != ''){
            handleSegmentChange({'value':selectedSegment});
        }
    },[rowsPerPage]);

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
                        className='react-dataTable'
                        columns={cusInsightsTableColumn(currentPage, rowsPerPage)}
                        data={segmentMember}
                        total={400}
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


