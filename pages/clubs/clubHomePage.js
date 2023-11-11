import AvailableRooms from '@/components/AvailableRooms/AvailableRooms'
import useRoom from '@/hooks/useRoom'
import { fetchRooms } from '@/operations/club.fetch'
import { fetchAllRooms, fetchBookedRooms } from '@/services/roombook.services'
import { eventFindManyByClubId } from '@/services/events.service'
import EventCreate from '@/components/EventCreate/EventCreate'
import EventUpdate from '@/components/EventUpdate/EventUpdate'

import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ClubRoomBooking from '@/components/ClubRoomBooking/ClubRoomBooking'
import { logout } from '@/operations/users.fetch'


export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/club/clubLogin'
            }
        }
    }
    if (context.req.session.user.role === 'ADMIN') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/admin/adminLogin'
            }
        }
    } else if (context.req.session.user.role === 'CC') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/club/clubLogin'
            }
        }
    } else if (context.req.session.user.role === 'STUDENT') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/student/studentLogin'
            }
        }
    } else {
        const user = context.req.session.user;
        let bookedRooms = await fetchBookedRooms(context.req.session.user.id);
        let events = await eventFindManyByClubId(user.id);
        const allRooms = await fetchAllRooms();
        const indianOptions = {
            timeZone: 'Asia/Kolkata',
            hour12: false,
        };
        bookedRooms = bookedRooms.map(bookedRoom => {
            bookedRoom.from = bookedRoom.from.toLocaleString('en-IN', indianOptions);
            bookedRoom.to = bookedRoom.to.toLocaleString('en-IN', indianOptions);

            const room = allRooms.find(r => r.id === bookedRoom.roomId);

            if (room) {
                bookedRoom.roomNumber = room.roomNumber;
                bookedRoom.roomBlock = room.roomBlock;
            }

            return bookedRoom;
        });

        events = events.map(event => {
            event.date = event.date.toLocaleString('en-IN', indianOptions);
            return event;
        });


        return {
            props: { user: user, bookedRooms, events }
        }
    }
}

export default function ClubHomePage({ user, bookedRooms, events }) {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [updateModal, showUpdateModal] = useState(false)
    const [event, showEvent] = useState(false)
    const [eventUpdate, showEventUpdate] = useState(false)
    const [pendingEvents, showPendingEvents] = useState(false)
    const [approvedEvents, showApprovedEvents] = useState(false)
    const [room, bookRoom] = useState(false)
    const [approvedRooms, showApprovedRooms] = useState(false)
    const [pendingRooms, showPendingRooms] = useState(false)
    const [isFetching, setIsFetching] = useState(false);
    const [updateEventId, setUpdateEventId] = useState(0);
    const { rooms, setRooms, setToTime, setFromTime } = useRoom();
    const handleLogOut = async () => {
        try {
            const res = await logout();
            if(res.status === 200) {
                alert('You have been loged out successfully');
                window.location.reload();
            } else {
                alert('Internal Server Error')
            }
        } catch (e) {
            alert(e.message);
        }
    }
    return (
        <div>
            <div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">Welcome {user.name}</h1>
                </div>
                <Button onClick={() => handleLogOut()} colorScheme='red' marginTop={"10px"}>Logout</Button>
            </div>

            <br />
            {/* 
            {updateModal ? <EventUpdate event={events.find(event => event.id === updateEventId)} setEvent={showUpdateModal} /> : null} */}

            <Modal isOpen={updateModal} onClose={() => showUpdateModal(!updateModal)} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EventUpdate event={events.find(event => event.id === updateEventId)} />
                    </ModalBody>
                </ModalContent>
            </Modal>


            <Tabs>
                <TabList>
                    <Tab>Event</Tab>
                    <Tab>Room</Tab>
                    <Tab>Club Details</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => showEvent(!event)}>{event ? 'Close Create Event' : 'Create Event'}</Button>
                        <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => showApprovedEvents(!approvedEvents)}>{approvedEvents ? 'Close Approved Events' : 'Show Approved Events'}</Button>
                        <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => showPendingEvents(!pendingEvents)}>{pendingEvents ? 'Close Pending Events' : 'Show Pending Events'}</Button>

                        {event ? <EventCreate clubIdFromProps={user.id} /> : null}
                        {approvedEvents ?
                            <div>
                                {events.map((event, index) => {
                                    if (event.Eventapproval.adminStatus === 'APPROVED' && event.Eventapproval.ccStatus === 'APPROVED') {
                                        return (
                                            <div key={index}>
                                                <p>Name : {event.name}</p>
                                                <p>Description : {event.description}</p>
                                                <p>Date : {event.date}</p>
                                                <p>Venue : {event.venue}</p>
                                                <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                                <hr />
                                            </div>
                                        )
                                    }
                                })}
                            </div> : null
                        }
                        {pendingEvents ?
                            <div>
                                {events.map((event, index) => {
                                    if (event.Eventapproval.adminStatus === 'PENDING' || event.Eventapproval.ccStatus === 'PENDING') {
                                        return (
                                            <div key={index}>
                                                <p>Name : {event.name}</p>
                                                <p>Description : {event.description}</p>
                                                <p>Date : {event.date}</p>
                                                <p>Venue : {event.venue}</p>
                                                <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                                <hr />
                                            </div>
                                        )
                                    }
                                })}
                            </div> : null
                        }


                    </TabPanel>
                    <TabPanel>
                        <ClubRoomBooking user={user} bookedRooms={bookedRooms} />
                    </TabPanel>
                    <TabPanel>
                        <p>Club Name : {user.name}</p>
                        <p>Club Email : {user.email}</p>
                        <p>Club ID : {user.id}</p>
                    </TabPanel>
                </TabPanels>

            </Tabs>

        </div>
    )
}