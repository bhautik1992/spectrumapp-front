import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import StatsCard from './StatsCard';
import { useState, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';
import toast from 'react-hot-toast'
import Timeline from '@components/timeline'
import { List } from 'react-feather'
import { useSelector } from "react-redux";
import moment from 'moment';
import { Calendar } from 'react-feather'

const Home = () => {
    const [leadStatus, setLeadStatus] = useState([]);
    const [eventList, setEventList]   = useState([]);
    const { user } = useSelector((state) => state.LoginReducer);

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get('home/'+user._id);

                if (response.data.success) {
                    setLeadStatus(response.data.data.result);

                    const eventResult = response.data.data.events.map(event => {
                        const date = moment(event.date);

                        return {
                            title: event.title,
                            meta: date.format('DD/MM/YYYY') || '',
                            icon: <Calendar size={15} />,
                            customContent: (
                                <div className="p-3 border rounded shadow-sm bg-white">
                                    <div className="mb-1 d-flex align-items-center">
                                        <div className="me-1">
                                            <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                👤
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h6>
                                                {event.customer_id?.lead_first_name} 
                                                {event.customer_id?.lead_last_name}
                                            </h6>
                                            
                                            <small className="text-muted">
                                                ✉️ {event.customer_id?.lead_email}
                                            </small><br />

                                            {event.customer_id?.lead_phone && <small className="text-muted">📞 {event.customer_id?.lead_phone}</small>}
                                        </div>
                                    </div>

                                    {event.location && (
                                        <div className="mb-1">
                                            <strong>📍 Location:</strong> 
                                            <span>{event.location}</span>
                                        </div>
                                    )}

                                    {event.url && (
                                        <div className="mb-1">
                                            <strong>🔗 URL:</strong>{' '}
                                            <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                                                {event.url}
                                            </a>
                                        </div>
                                    )}

                                    {event.description && (
                                        <div className="mb-1">
                                            <strong>📝 Description:</strong> 
                                            <span>{event.description}</span>
                                        </div>
                                    )}
                                </div>
                            )
                        };
                    });

                    setEventList(eventResult);
                }
            } catch (error) {
                let errorMessage = import.meta.env.VITE_ERROR_MSG;

                if (error.response) {
                    errorMessage = error.response.data?.message || JSON.stringify(error.response.data); // Case 1: API responded with an error
                } else if (error.request) {
                    errorMessage = import.meta.env.VITE_NO_RESPONSE; // Case 2: Network error
                }

                // console.error(error.message);
                toast.error(errorMessage);
            }
        })();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <Row>
                <Col lg='12' sm='12'>
                    <StatsCard leadStatus={leadStatus} />
                </Col>
            </Row>

            <Row className='match-height'>
                <Col lg='12' xs='12'>
                    <Card className='card-user-timeline'>
                        <CardHeader>
                            <div className='d-flex align-items-center'>
                                <List className='user-timeline-title-icon' />
                                <CardTitle tag='h4'>Event Timeline</CardTitle>
                            </div>
                        </CardHeader>

                        <CardBody style={{ maxHeight: eventList.length ? '535px' : 'auto', overflowY: eventList.length ? 'auto' : 'visible' }}>
                            {eventList && eventList.length > 0 ? (
                                <Timeline className='ms-50 mb-0' data={eventList} />
                            ) : (
                                <div className="text-center py-5">
                                    <div className="mx-auto mb-3" style={{ fontSize: '3rem', color: '#6c757d' }}>
                                        📭
                                    </div>

                                    <h5 className="mb-1">No Events Found</h5>
                                    <p className="text-muted mb-0">
                                        There are no upcoming events for this user. Once events are scheduled, they will appear here.
                                    </p>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;


