import AvailableRooms from '@/components/AvailableRooms/AvailableRooms'
import useRoom from '@/hooks/useRoom'
import { fetchRooms } from '@/operations/club.fetch'
import { fetchAllRooms, fetchBookedRooms } from '@/services/roombook.services'
import { eventFindManyByClubId } from '@/services/events.service'
import EventCreate from '@/components/EventCreate/EventCreate'
import EventUpdate from '@/components/EventUpdate/EventUpdate'

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'


export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
            }
        }
    }
    if (context.req.session.user.role === 'ADMIN') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
            }
        }
    } else if (context.req.session.user.role === 'CC') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
            }
        }
    } else if (context.req.session.user.role === 'STUDENT') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
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

    const seeAvailRooms = async () => {
        if (from === '' || to === '') {
            alert('Please fil all the fields');
            return;
        }
        try {
            setIsFetching(false)
            const response = await fetchRooms({
                startDate: new Date(from).toISOString(),
                endDate: new Date(to).toISOString,
            });
            if (response.status === 200) {
                setRooms(response.rooms);
                setToTime(to);
                setFromTime(from);
                setIsFetching(true)
            } else {
                console.log(response.message)
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
            </div>

            <br />

            {updateModal ? <EventUpdate event={events.find(event => event.id === updateEventId)} /> : null}

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

                        <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => bookRoom(!room)}>{room ? 'Cancel room Book' : 'Book Room'}</Button>
                        <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => showApprovedRooms(!approvedRooms)}>{approvedRooms ? 'Close Approved Rooms' : 'Show Approved Rooms'}</Button>
                        <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => showPendingRooms(!pendingRooms)}>{pendingRooms ? 'Close Pending Rooms' : 'Show Pending Rooms'}</Button>

                        {room ?
                            <div>
                                <div>
                                    <FormControl>
                                        <FormLabel>From</FormLabel>
                                        <Input onChange={(e) => setFrom(e.target.value)} type='datetime-local' />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl>
                                        <FormLabel>To</FormLabel>
                                        <Input onChange={(e) => setTo(e.target.value)} type='datetime-local' />
                                    </FormControl>
                                </div>
                                <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={seeAvailRooms}>Fetch Rooms</Button>
                            </div>
                            : null
                        }

                        {isFetching ?
                            <div>{rooms.map((room, index) => {
                                return (
                                    <AvailableRooms key={index} room={room} clubId={user.id} />
                                )
                            })}</div> : null
                        }
                        <br />

                        {approvedRooms ?
                            <div>
                                {bookedRooms.map((bookedRoom, index) => {
                                    if (bookedRoom.adminStatus === 'APPROVED') {
                                        return (
                                            <div key={index}>
                                                <p>Room Number : {bookedRoom.roomNumber}</p>
                                                <p>Room Block : {bookedRoom.roomBlock}</p>
                                                <p>From : {bookedRoom.from}</p>
                                                <p>To : {bookedRoom.to}</p>
                                                <p>Status : {bookedRoom.status}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div> : null
                        }

                        {pendingRooms ?
                            <div>
                                {bookedRooms.map((bookedRoom, index) => {
                                    if (bookedRoom.adminStatus === 'PENDING') {
                                        return (
                                            <div key={index}>
                                                <p>Room Number : {bookedRoom.roomNumber}</p>
                                                <p>Room Block : {bookedRoom.roomBlock}</p>
                                                <p>From : {bookedRoom.from}</p>
                                                <p>To : {bookedRoom.to}</p>
                                                <p>Status : {bookedRoom.status}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div> : null
                        }

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