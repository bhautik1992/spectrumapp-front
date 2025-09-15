import { useState, useEffect } from 'react'
import { Row, Col, Button, Label } from 'reactstrap'
import { Field } from 'formik'
import Flatpickr from 'react-flatpickr'
import { ArrowLeft, MessageSquare } from 'react-feather'
import moment from 'moment';
import * as Yup from 'yup';
import Timeline from '@components/timeline'

import '@styles/react/libs/flatpickr/flatpickr.scss'

const Event = ({ stepper, info, values, setFieldValue, handleSubmit, setOpen }) => {
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        title: Yup.string()
            .required()
            .max(50)
            .label('Event Title'),
        url: Yup.string()
            .url()
            .max(100)
            .label('Event URL'),
        location: Yup.string()
            .max(50)
            .label('Location'),
    })

    const validateAndSubmit = async () => {
        try {
            await validationSchema.validate(values, { abortEarly: false });

            setErrors({});
            handleSubmit();
        } catch (validationErrors) {
            const formattedErrors = {};
            validationErrors.inner.forEach(err => {
                formattedErrors[err.path] = err.message;
            });

            setErrors(formattedErrors);
        }
    }

    return (
        <>
            <Row>
                <Col md='6'>
                    <Row>
                        <Col md="12">
                            <Label for="title">Event Title</Label>
                            
                            <Field
                                type="text"
                                name="title"
                                id="title"
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                placeholder="Enter event title"
                                maxLength={50}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </Col>
                    </Row>

                    <Row className='mt-1'>
                        <Col md="4">
                            <Label for="date">Event Date</Label>

                            <Flatpickr
                                name="date"
                                id="date"
                                className="form-control"
                                value={values.date}
                                options={{ dateFormat: 'Y-m-d' }}
                                onChange={date => {
                                    const formattedDate = moment(date[0]).format('YYYY-MM-DD');
                                    setFieldValue('date', formattedDate);
                                }}
                            />
                        </Col>

                        <Col md="4">
                            <Label for="url">Event URL</Label>
                            
                            <Field
                                type="url"
                                name="url"
                                id="url"
                                className={`form-control ${errors.url ? 'is-invalid' : ''}`}
                                placeholder="https://www.example.com"
                                maxLength={100}
                            />
                            {errors.url && <div className="invalid-feedback">{errors.url}</div>}
                        </Col>

                        <Col md="4">
                            <Label for="location">Location</Label>

                            <Field
                                type="text"
                                name="location"
                                id="location"
                                className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                placeholder="Enter event location"
                                maxLength={50}
                            />
                            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                        </Col>
                    </Row>
                    
                    <Row className='mt-1'>
                        <Col md="12">
                            <Label for="description">Description</Label>
                            
                            <Field
                                as="textarea"
                                name="description"
                                id="description"
                                className="form-control"
                                placeholder="Provide a brief description of the event"
                                rows="8"
                            />
                        </Col>
                    </Row>
                </Col>

                <Col md="6">
                    <Row>
                        {(info.events.length)?
                            <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                                <Timeline data={info.events} className='' />
                            </div>
                            :
                            <div className="text-center py-5">
                                <div className="icon-circle mb-3 mx-auto d-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: '80px', height: '80px', fontSize: '36px', color: '#6c757d' }}>
                                    📅
                                </div>

                                <h5 className="mb-2 text-muted">No Events Found</h5>

                                <p className="text-secondary mx-auto" style={{ maxWidth: '400px' }}>
                                    No events have been scheduled for this customer yet.
                                </p>
                            </div>
                        }
                    </Row>
                </Col>
            </Row>
            
            <div className='d-flex justify-content-between mt-3'>
                <Button color='primary' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
                    <div className='align-middle d-sm-inline-block d-none'>Previous</div>
                </Button>

                {values.isClosedConverted ?
                    <Button color="secondary" className="btn-submit" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    :
                    <Button color='success' className='btn-submit' onClick={validateAndSubmit}>
                        Save
                    </Button>                    
                }
            </div>        
        </>
    )
}

export default Event;


