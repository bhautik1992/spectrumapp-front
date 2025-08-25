import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import { useRTL } from '@hooks/useRTL'
import { useSelector, useDispatch } from 'react-redux'
import { selectEvent, updateEvent } from './store'
import '@styles/react/apps/app-calendar.scss'

// ** CalendarColors
const calendarsColor = {
    Business: 'primary',
    Holiday : 'success',
    Personal: 'danger',
    Family  : 'warning',
    ETC     : 'info'
}

const CalendarComponent = () => {
    const [isRtl] = useRTL()
    const dispatch = useDispatch()
    const store = useSelector(state => state.calendar)

    const [calendarApi, setCalendarApi] = useState(null)
    const [addSidebarOpen, setAddSidebarOpen] = useState(false)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)


    const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)
    const toggleSidebar = val => setLeftSidebarOpen(val)

    const blankEvent = {
        title: '',
        start: '',
        end: '',
        allDay: false,
        url: '',
        extendedProps: {
            calendar: '',
            guests: [],
            location: '',
            description: ''
        }
    }

    const refetchEvents = () => {
        if (calendarApi !== null) {
            calendarApi.refetchEvents()
        }
    }

    // ** Fetch Events On Mount
    // useEffect(() => {
    //     dispatch(fetchEvents(store.selectedCalendars))
    // }, [])

    return (
        <Fragment>
            <div className='app-calendar overflow-hidden border'>
                <Row className='g-0'>
                    <Col id='app-calendar-sidebar'
                        className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
                            show: leftSidebarOpen
                        })}
                    >
                        <SidebarLeft
                            toggleSidebar={toggleSidebar}
                            handleAddEventSidebar={handleAddEventSidebar}
                        />
                    </Col>

                    <Col className='position-relative'>
                        <Calendar
                            isRtl={isRtl}
                            store={store}
                            dispatch={dispatch}
                            blankEvent={blankEvent}
                            calendarApi={calendarApi}
                            selectEvent={selectEvent}
                            updateEvent={updateEvent}
                            toggleSidebar={toggleSidebar}
                            calendarsColor={calendarsColor}
                            setCalendarApi={setCalendarApi}
                            handleAddEventSidebar={handleAddEventSidebar}
                        />
                    </Col>

                    <div
                        className={classnames('body-content-overlay', {
                            show: leftSidebarOpen === true
                        })}
                        onClick={() => toggleSidebar(false)}
                    ></div>
                </Row>
            </div>

            {/* <AddEventSidebar
                store={store}
                dispatch={dispatch}
                addEvent={addEvent}
                open={addSidebarOpen}
                selectEvent={selectEvent}
                updateEvent={updateEvent}
                removeEvent={removeEvent}
                calendarApi={calendarApi}
                refetchEvents={refetchEvents}
                calendarsColor={calendarsColor}
                handleAddEventSidebar={handleAddEventSidebar}
            /> */}
        </Fragment>
    )
}

export default CalendarComponent;


