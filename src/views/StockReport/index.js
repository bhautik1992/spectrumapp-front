import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select'
import { Download } from 'react-feather';
import { selectThemeColors } from '@utils'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { stockReportFilter } from '../../constants';
import Flatpickr from 'react-flatpickr'
import { Spinner } from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss'

import DataTableComponent from '../Table/DataTableComponent';
import { stockReportTableColumn, quarterComparisonColumns } from '../Table/Columns';

const index = () => {
    const today     = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const [prevPage, setPrevPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterVal, setFilterVal] = useState(0);

    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [total , setTotal] = useState(0);

    const [picker, setPicker] = useState([lastMonth, today])
    const [disDatePicker, setDisDatePicker] = useState(false)
    const [exporting, setExporting] = useState(false)

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
                            filter: filterVal,
                            picker
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
            await fetchProducts();
        })();
    },[rowsPerPage,filterVal]);

    useEffect(() => {
        (async () => {
            if (picker && picker.length === 2) {
                await fetchProducts();
            }
        })();
    },[picker]);

    
    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('product',{
                params: { 
                    perPage: rowsPerPage,
                    filter: filterVal,
                    picker
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
    }

    const handleChange = async (option) => {
        setFilterVal(option.value);
    }

    const handleExportCsv = async () => {
        try {
            setExporting(true);

            const response = await axiosInstance.get('product/export', {
                params: {
                    filter: filterVal,
                    picker,
                },
                responseType: 'blob',
            });

            const contentType = response.headers?.['content-type'] || 'text/csv;charset=utf-8;';
            const blob = new Blob([response.data], { type: contentType });

            const contentDisposition = response.headers?.['content-disposition'] || '';
            const matchedFileName = contentDisposition.match(/filename="?([^";]+)"?/i);
            const fileName = matchedFileName?.[1] || 'stock_report.csv';

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
    }

    useEffect(() => {
        setDisDatePicker(!['0', '1', '4'].includes(String(filterVal)));
    },[filterVal])

    return (
        <>
            <Helmet>
                <title>Stock Report</title>
            </Helmet>

            <Card>
                <CardHeader>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <CardTitle tag='h4' className='mb-0'>Filters</CardTitle>

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
                    </div>
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

                        {disDatePicker && (
                            <Col md='4'>
                                <Label for='role-select'>Select Date</Label>
                                <Flatpickr
                                    value={picker}
                                    id='range-picker'
                                    className='form-control'
                                    onChange={date => setPicker(date)}
                                    options={{
                                        mode: 'range',
                                        defaultDate: [lastMonth,today],
                                    }}
                                />
                            </Col>
                        )}
                    </Row>
                </CardBody>
            </Card>

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTableComponent
                        className='react-dataTable'
                        columns={
                            filterVal == 4
                                ? quarterComparisonColumns
                                : stockReportTableColumn(currentPage, rowsPerPage, filterVal)
                        }
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


