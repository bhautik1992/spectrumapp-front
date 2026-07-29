import { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select'
import { Download } from 'react-feather';
import { selectThemeColors } from '@utils'
import { getSegmentList } from '../../services/actions/CustomersAction';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { Spinner } from 'reactstrap';

import DataTableComponent from '../Table/DataTableComponent';
import { cusInsightsTableColumn } from '../Table/Columns';

const formatInsightDate = (value) => {
    if (!value) return '-';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()] || '';
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
};

const ExpandableInsightRow = ({ data }) => {
    const lastPurchasedAt = data?.node?.lastPurchasedAt;
    const purchasedWhat = data?.node?.purchasedWhat;

    return (
        <div className='px-2 py-1'>
            <div className='mb-50'>
                <strong>Last Purchased:</strong> {formatInsightDate(lastPurchasedAt)}
            </div>
            <div>
                <strong>Purchased What:</strong> {purchasedWhat || '-'}
            </div>
        </div>
    );
};

const index = () => {
    const dispatch = new useDispatch();
    const { segments } = useSelector((state) => state.CustomersReducer);
    const [options, setOptions] = useState([]);

    const [prevPage, setPrevPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const [selectedSegment, setSelectedSegment] = useState('');
    const [selectedSegmentName, setSelectedSegmentName] = useState('');
    const [segmentMember, setSegmentMember] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [exporting, setExporting] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(() => {
        setSelectedSegment('');
        setSelectedSegmentName('');
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
                            isNext:(currentPage > prevPage)?true:false,
                            search: searchValue
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
    },[currentPage, selectedSegment, rowsPerPage]);

    // Search / initial load for selected segment
    useEffect(() => {
        if (!selectedSegment) return;

        (async () => {
            try {
                const response = await axiosInstance.get('customer/segment/records', {
                    params: {
                        id: selectedSegment,
                        perPage: rowsPerPage,
                        search: searchValue,
                    }
                });

                if (response.data.success) {
                    setSegmentMember(response.data.data.members);
                    setPageInfo(response.data.data.pageInfo);
                    setTotalRecords(response.data.data.totalCount);
                    setPrevPage(0);
                    if (currentPage !== 0) {
                        setCurrentPage(0);
                    }
                }
            } catch (error) {
                let errorMessage = import.meta.env.VITE_ERROR_MSG;

                if(error.response){
                    errorMessage = error.response.data?.message || JSON.stringify(error.response.data);
                }else if (error.request){
                    errorMessage = import.meta.env.VITE_NO_RESPONSE;
                }

                toast.error(errorMessage);
            }
        })();
    }, [searchValue, selectedSegment, rowsPerPage]);

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
            setSearchValue('');
            setSelectedSegment(selectedOption.value);
            setSelectedSegmentName(selectedOption.label || 'segment');
            setCurrentPage(0);
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

    const handleExportCsv = async () => {
        if(!selectedSegment) return;

        try {
            setExporting(true);

            const response = await axiosInstance.get('customer/segment/export', {
                params: {
                    id: selectedSegment,
                    segmentName: selectedSegmentName || 'segment'
                },
                responseType: 'blob',
            });

            const contentType = response.headers?.['content-type'] || 'text/csv;charset=utf-8;';
            const blob = new Blob([response.data], { type: contentType });

            const contentDisposition = response.headers?.['content-disposition'] || '';
            const matchedFileName = contentDisposition.match(/filename="?([^";]+)"?/i);
            const fileName = matchedFileName?.[1] || 'customer_insights.csv';

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            let errorMessage = import.meta.env.VITE_ERROR_MSG;

            if (error.response) {
                if (error.response.data instanceof Blob) {
                    try {
                        const errorText = await error.response.data.text();
                        const parsedError = JSON.parse(errorText);
                        errorMessage = parsedError?.message || errorText || errorMessage;
                    } catch {
                        errorMessage = import.meta.env.VITE_ERROR_MSG;
                    }
                } else {
                    errorMessage = error.response.data?.message || JSON.stringify(error.response.data);
                }
            } else if (error.request) {
                errorMessage = import.meta.env.VITE_NO_RESPONSE;
            }

            toast.error(errorMessage);
        } finally {
            setExporting(false);
        }
    };

    // Rows Per Page Change
    useEffect(() => {
        if(selectedSegment != ''){
            setCurrentPage(0);
        }
    },[rowsPerPage]);

    return (
        <>
            <Helmet>
                <title>Customer Insights</title>
            </Helmet>

            <Card>
                <CardHeader>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <CardTitle tag='h4' className='mb-0'>Filters</CardTitle>

                        {selectedSegment && (
                            <button
                                type='button'
                                className='btn btn-sm btn-outline-primary d-flex align-items-center gap-50 ms-auto'
                                onClick={handleExportCsv}
                                disabled={exporting}
                            >
                                {exporting ? (
                                    <>
                                        <Spinner size='sm' />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <Download size={16} />
                                        Export CSV
                                    </>
                                )}
                            </button>
                        )}
                    </div>
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
                        key={`ci-table-${selectedSegment || 'none'}-${currentPage}-${rowsPerPage}`}
                        className='react-dataTable'
                        columns={cusInsightsTableColumn(currentPage, rowsPerPage)}
                        data={segmentMember}
                        total={totalRecords}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        searchValue={searchValue}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                        setSearchValue={setSearchValue}
                        hasPaginateWithNum={false}
                        pageInfo={pageInfo}
                        hasSearch={Boolean(selectedSegment) && (totalRecords > 0 || searchValue)}
                        isExpandable={true}
                        expandOnRowClicked={false}
                        expandableColumns={ExpandableInsightRow}
                    />
                </div>
            </Card>
        </>
    );
};

export default index;


