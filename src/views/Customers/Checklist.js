import { Fragment } from 'react'
import { Button, Label, ListGroup, ListGroupItem, Row, Col } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Field } from 'formik';
import { Target,Zap,Trello,CloudSnow,Columns,Repeat,Monitor,Briefcase,Server,Shuffle } from 'react-feather'

const Checklist = ({ stepper, info, values, setFieldValue, handleSubmit }) => {
    return (
        <Fragment>
            <Row>
                <Col md='5'>
                    <div style={{ maxHeight: '403px', overflowY: 'auto' }}>
                        <ListGroup flush>
                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='colour_ring' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-info me-1'>
                                        <Target size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Wants to buy a colour ring</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="colour_ring"
                                                value="1"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='tapes_course' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-danger me-1'>
                                        <Zap size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Interested in Tapes Course</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="tapes_course"
                                                value="2"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='nanos_course' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-success me-1'>
                                        <Trello size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Interested in Nanos Course</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="nanos_course"
                                                value="3"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='weave_course' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-warning me-1'>
                                        <CloudSnow size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Interested In Weave Course</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="weave_course"
                                                value="4"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='hair_ext' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-secondary me-1'>
                                        <Columns size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Is New to hair extensions</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="hair_ext"
                                                value="5"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='another_brand' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-info me-1'>
                                        <Repeat  size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Interested in switching from another brand</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="another_brand"
                                                value="6"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='currently_use' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-danger me-1'>
                                        <Monitor size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Wanting to add us as another option to a brand they currently use</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="currently_use"
                                                value="7"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='persuasion' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-success me-1'>
                                        <Briefcase size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Interested in buying off us but needs more help/information or persuasion</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="persuasion"
                                                value="8"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='us_before' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-warning me-1'>
                                        <Server size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Has already bought hair off us before</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="us_before"
                                                value="9"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>

                            <ListGroupItem className='border-0 px-0'>
                                <label htmlFor='not_interested' className='d-flex cursor-pointer'>
                                    <span className='avatar avatar-tag bg-light-info me-1'>
                                        <Shuffle size={20} />
                                    </span>

                                    <span className='d-flex align-items-center justify-content-between flex-grow-1'>
                                        <div className='me-1'>
                                            <h5 className='d-block'>Not interested</h5>
                                        </div>

                                        <span>
                                            <Field
                                                type="radio"
                                                name="engagement_type"
                                                id="not_interested"
                                                value="10"
                                                className="form-check-input"
                                            />
                                        </span>
                                    </span>
                                </label>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Col>

                <Col md='7'>
                    <Label className='form-label' for='engagement_note'>
                        Notes
                    </Label>
    
                    <Field
                        as="textarea"
                        name="engagement_note"
                        id="engagement_note"
                        rows="8"
                        cols="5"
                        className={"form-control"}
                    />
                </Col>
            </Row>

            <div className="d-flex mt-2">
                <Button color='primary' onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
                    <div className='align-middle d-sm-inline-block d-none'>Previous</div>
                </Button>

                <div className="ms-auto d-flex gap-1">
                    <Button color='success' className='btn-submit' onClick={handleSubmit}>
                        Save & Exit
                    </Button>

                    <Button color='primary' onClick={() => stepper.next()}>
                        <div className='align-middle d-sm-inline-block d-none'>Next</div>
                        <ArrowRight size={14} className='rotate-rtl align-middle ms-sm-50 ms-0' />
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

export default Checklist;


