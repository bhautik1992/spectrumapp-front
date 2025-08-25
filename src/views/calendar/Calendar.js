import { useEffect, useRef, memo } from 'react'
import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import toast from 'react-hot-toast'
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'

const Calendar = props => {
    const calendarRef = useRef(null)

    const {
        store,
        isRtl,
        dispatch,
        calendarsColor,
        calendarApi,
        setCalendarApi,
        handleAddEventSidebar,
        blankEvent,
        toggleSidebar,
        selectEvent,
        updateEvent
    } = props

    useEffect(() => {
        if (calendarApi === null) {
            setCalendarApi(calendarRef.current.getApi())
        }
    }, [calendarApi])

    // ** calendarOptions(Props)
    const calendarOptions = {
        events: [],
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            start: 'sidebarToggle, prev,next, title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        editable: true,
        eventResizableFromStart: true,
        dragScroll: true,
        dayMaxEvents: 2,
        navLinks: true,
        eventClassNames({ event: calendarEvent }) {
            const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

            return [
                `bg-light-${colorName}`
            ]
        },
        eventClick({ event: clickedEvent }) {
            dispatch(selectEvent(clickedEvent))
            handleAddEventSidebar()
        },
        customButtons: {
            sidebarToggle: {
                text: <Menu className='d-xl-none d-block' />,
                click() {
                    toggleSidebar(true)
                }
            }
        },
        dateClick(info) {
            const ev = blankEvent
            ev.start = info.date
            ev.end = info.date
            dispatch(selectEvent(ev))
            handleAddEventSidebar()
        },
        eventDrop({ event: droppedEvent }) {
            dispatch(updateEvent(droppedEvent))
            toast.success('Event Updated')
        },
        eventResize({ event: resizedEvent }) {
            dispatch(updateEvent(resizedEvent))
            toast.success('Event Updated')
        },
        ref: calendarRef,
        direction: isRtl ? 'rtl' : 'ltr'
    }

    return (
        <Card className='shadow-none border-0 mb-0 rounded-0'>
            <CardBody className='pb-0'>
                <FullCalendar {...calendarOptions} />{' '}
            </CardBody>
        </Card>
    )
}

export default memo(Calendar);


