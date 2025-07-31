import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const index = () => {
    const filterOptions = [
        { value: '1', label: 'Orders regularly' },
        { value: '2', label: 'Who has a trade account and has never ordered' },
        { value: '3', label: 'Who has a trade account and has only ever ordered once' },
        { value: '4', label: 'Who has only ever ordered a colour ring' },
        { value: '5', label: 'Who hasn’t ordered in the last 3, 6 and 12 months' },
        { value: '6', label: 'Who regularly orders' },
        { value: '7', label: 'Who the big spenders are' },
        { value: '8', label: 'Who used to order regularly but now doesn’t' },
        { value: '9', label: 'Who have been on a course either online or in salon who hasn’t ordered' },
        { value: '10', label: 'Who has used a discount code to order' },
    ];

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


