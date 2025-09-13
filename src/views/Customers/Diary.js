import Timeline from '@components/timeline'
import { Button, Label, Row, Col } from 'reactstrap'
import { Field } from 'formik';
import { ArrowLeft, ArrowRight, MessageSquare } from 'react-feather'
import { useState, useEffect } from 'react';
import { leadStatusOptions } from '../../constants';

const Diary = ({ stepper, info, values, setFieldValue, handleSubmit, setOpen }) => {
    return (
        <>  
            <Row>
                {(values.isClosedConverted)?
                    <Col md='12'>
                        {(info.diaries.length)?
                            <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                                <Timeline data={info.diaries} className='' />
                            </div>
                            :
                            <div className="text-center mt-5">
                                <div className="icon-circle mb-3 mx-auto d-flex align-items-center justify-content-center">
                                    <MessageSquare size={35} />
                                </div>

                                <div className="start-btn px-3 py-1 mx-auto">
                                    Start Conversation
                                </div>
                            </div>
                        }
                    </Col>
                :
                    <>
                        <Col md='4'>
                            <Field
                                as="textarea"
                                name="diary"
                                id="diary"
                                rows="16"
                                cols="5"
                                className={"form-control mb-1"}
                                placeholder={"Enter details about the call, meeting or follow-up..."}
                            />
                        </Col>

                        <Col md='8'>
                            {(info.diaries.length)?
                                <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                                    <Timeline data={info.diaries} className='' />
                                </div>
                                :
                                <div className="text-center mt-5">
                                    <div className="icon-circle mb-3 mx-auto d-flex align-items-center justify-content-center">
                                        <MessageSquare size={35} />
                                    </div>

                                    <div className="start-btn px-3 py-1 mx-auto">
                                        Start Conversation
                                    </div>
                                </div>
                            }
                        </Col>
                    </>
                }
            </Row>

            <div className="d-flex mt-2">
                <Button color='primary' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
                    <div className='align-middle d-sm-inline-block d-none'>Previous</div>
                </Button>

                <div className="ms-auto d-flex gap-1">
                    {values.isClosedConverted ?
                        <Button color="secondary" className="btn-submit" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        :
                        <Button color='success' className='btn-submit' onClick={handleSubmit}>
                            Save & Exit
                        </Button>
                    }

                    <Button color='primary' onClick={() => stepper.next()}>
                        <div className='align-middle d-sm-inline-block d-none'>Next</div>
                        <ArrowRight size={14} className='rotate-rtl align-middle ms-sm-50 ms-0' />
                    </Button>
                </div>
            </div>
            
        </>
    )
}

export default Diary;


