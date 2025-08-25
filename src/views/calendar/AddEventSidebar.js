import { Row, Col, Button, Modal, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap';
import Sidebar from '@components/sidebar';

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddEventSidebar = props => {
    const { open, toggleSidebar } = props;

    return (
        <Sidebar
            size='lg'
            open={open}
            title={'ASAS'}
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            style={{ 
                width: "35vw", 
                maxWidth: "500px" 
            }}
        >
            <Form>
                <Row>
                    <Col sm='6'>
                        <div className='mb-2 pb-50'>
                            <h5>Task Name</h5>
                            <span>{'AAAAAA'}</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col className='mt-1' sm='12'>
                        <Button type='submit' className='me-1' color='primary'>
                            Save
                        </Button>
                        
                        <Button type='reset' color='secondary' outline>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Sidebar>
    )
}

export default AddEventSidebar;


