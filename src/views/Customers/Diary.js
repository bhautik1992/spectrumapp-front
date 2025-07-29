import Timeline from '@components/timeline'
import { Button, Label, Row, Col } from 'reactstrap'
import { Field } from 'formik';
import { ArrowLeft, ArrowRight } from 'react-feather'

const data = [
    {
        title: 'User login',
        content: 'User login at 2:12pm',
        meta: '12 mins ago'
    },
    {
        title: 'Meeting with john',
        content: 'React Project meeting with john @10:15am',
        meta: '45 mins ago',
        color: 'warning'
    },
    {
        title: 'Create a new react project for client',
        content: 'Add files to new design folder',
        meta: '2 days ago',
        color: 'info'
    },
    {
        title: 'Create Invoices for client',
        content: 'Create new Invoices and send to Leona Watkins',
        meta: '12 mins ago',
        color: 'danger'
    }
]

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

            <Timeline data={data} className='ms-50' />

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


