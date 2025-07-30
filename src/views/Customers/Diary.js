import Timeline from '@components/timeline'
import { Button, Label, Row, Col } from 'reactstrap'
import { Field } from 'formik';
import { ArrowLeft, ArrowRight, MessageSquare } from 'react-feather'
import { useState, useEffect } from 'react';

const Diary = ({ stepper, info, values, setFieldValue, handleSubmit }) => {
    return (
        <>   
            <Row className='mt-1'>
                <Col md='12'>
                    <Field
                        as="textarea"
                        name="diary"
                        id="diary"
                        rows="5"
                        cols="5"
                        className={"form-control mb-1"}
                        placeholder={"Enter details about the call or meeting..."}
                    />
                </Col>
            </Row>

            {(info.diaries.length)?
                <Timeline data={info.diaries} className='ms-50' />
            :
                <div className="text-center mt-4">
                    <div className="icon-circle mb-2 mx-auto d-flex align-items-center justify-content-center">
                        <MessageSquare size={32} />
                    </div>

                    <div className="start-btn px-3 py-1 mx-auto">
                        Start Conversation
                    </div>
                </div>
            }

            <div className='d-flex justify-content-between mt-2'>
                <Button color='primary' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
                    <div className='align-middle d-sm-inline-block d-none'>Previous</div>
                </Button>

                <Button color='success' className='btn-submit' onClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </>
    )
}

export default Diary;


