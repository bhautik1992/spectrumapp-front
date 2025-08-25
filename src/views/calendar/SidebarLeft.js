import { Fragment } from 'react'
import { Card, CardBody, Button } from 'reactstrap'
import illustration from '@src/assets/images/pages/calendar-illustration.png'

const SidebarLeft = props => {
    const { toggleSidebar, handleAddEventSidebar  } = props

    const handleAddEventClick = () => {
        toggleSidebar(false)
        handleAddEventSidebar()
    }

    return (
        <Fragment>
            <Card className='sidebar-wrapper shadow-none'>
                <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
                    <Button color='primary' block onClick={handleAddEventClick}>
                        <span className='align-middle'>Add Event</span>
                    </Button>
                </CardBody>

                <CardBody className='mt-2'>
                    <div className='mt-auto'>
                        <img className='img-fluid' src={illustration} alt='illustration' />
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default SidebarLeft;


