import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const index = () => {
    const filterOptions = [
        { value: '1', label: 'What is low' },
        { value: '2', label: 'What is selling well' },
        { value: '3', label: 'What is not selling in the last month' },
        { value: '4', label: 'What is not selling in the last two month' },
    ];

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
                                options={filterOptions}
                                className='react-select'
                                classNamePrefix='select'
                                theme={selectThemeColors}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};

export default index;


