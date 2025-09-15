import { Users, Watch, Star, ShieldOff } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import Chart from 'react-apexcharts';

const StatsCard = ({ leadStatus, options, series }) => {
    return (
        <Card className='card-statistics'>
            <CardHeader>
                <CardTitle tag='h4'>Lead Statistics</CardTitle>
            </CardHeader>

            <CardBody className='statistics-body'>
                <Row>
                    <Col>
                        <div className='d-flex align-items-center'>
                            <Avatar color='light-primary' icon={<Users size={24} />} className='me-2' />
                            
                            <div className='my-auto'>
                                <h4 className='fw-bolder mb-0'>{leadStatus.find(item => item._id === 1)?.count || 0}</h4>
                                <CardText className='font-small-3 mb-0'>{'Open - Not Connected'}</CardText>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex align-items-center'>
                            <Avatar color='light-warning' icon={<Watch size={24} />} className='me-2' />
                            
                            <div className='my-auto'>
                                <h4 className='fw-bolder mb-0'>{leadStatus.find(item => item._id === 2)?.count || 0}</h4>
                                <CardText className='font-small-3 mb-0'>{'Working - Connected'}</CardText>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex align-items-center'>
                            <Avatar color='light-success' icon={<Star size={24} />} className='me-2' />
                            
                            <div className='my-auto'>
                                <h4 className='fw-bolder mb-0'>{leadStatus.find(item => item._id === 3)?.count || 0}</h4>
                                <CardText className='font-small-3 mb-0'>{'Closed - Converted'}</CardText>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex align-items-center'>
                            <Avatar color='light-danger' icon={<ShieldOff size={24} />} className='me-2' />
                            
                            <div className='my-auto'>
                                <h4 className='fw-bolder mb-0'>{leadStatus.find(item => item._id === 4)?.count || 0}</h4>
                                <CardText className='font-small-3 mb-0'>{'Closed - Not Converted'}</CardText>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Chart options={options} series={series} type="donut" height={300} />
                </Row>
            </CardBody>
        </Card>
    )
}

export default StatsCard;


