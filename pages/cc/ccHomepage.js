import { logout } from '@/operations/users.fetch'
import { eventFindMany } from '@/services/events.service'
import { fetchAllClubs } from '@/services/clubs.service';
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { updateEvent } from '@/operations/cc.fetch';
export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/cc/ccLogin'
            }
        }
    }
    if (context.req.session.user.role === 'CLUB') {
        return {
            redirect: {
                permanent: false,
                destination: '/club/clubHomepage'
            }
        }
    } else if (context.req.session.user.role === 'ADMIN') {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/adminHomepage'
            }
        }
    } else if (context.req.session.user.role === 'STUDENT') {
        return {
            redirect: {
                permanent: false,
                destination: '/student/studentHomepage'
            }
        }
    } else {
        const indianOptions = {
            timeZone: 'Asia/Kolkata',
            hour12: false,
        };
        const user = context.req.session.user;
        const allClubs = await fetchAllClubs();
        let allEvents = await eventFindMany();
        allEvents = allEvents.map((event) => {
            event.date = event.date.toLocaleString('en-IN', indianOptions);
            const club = allClubs.find(c => c.id === event.clubId)
            if (club) {
                event.clubName = club.name;
            }
            return event;
        })
        return {
            props: { user: user, allEvents: JSON.parse(JSON.stringify(allEvents)) }
        }
    }
}

export default function ccHomepage({ user, allEvents }) {
    const handleLogOut = async () => {
        try {
            const res = await logout();
            if (res.status === 200) {
                alert('You have been loged out successfully');
                window.location.reload();
            } else {
                alert('Internal Server Error')
            }
        } catch (e) {
            alert(e.message);
        }
    }

    const handleApproveEvent = async (eventId) => {
        const data = {
            "eventId" : eventId,
            "ccStatus" : "APPROVED",
            "ccId" : user.id,
        }
        try {
            const response = await updateEvent(data);
            if(response.status === 200) {
                alert('Event approved successfully');
                window.location.reload();
            } else {
                console.log(response.message)
                alert(response.message);
            }
        } catch (e) {
            alert(e.message);
        }
    }

    const handleRejectEvent = async (eventId) => {
        const data = {
            "eventId" : eventId,
            "ccStatus" : "REJECTED",
            "ccId" : user.id,
        }
        try {
            const response = await updateEvent(data);
            if(response.status === 200) {
                alert('Event rejected successfully');
                window.location.reload();
            } else {
                console.log(response.message)
                alert(response.message);
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
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                </div>
            </div>
            <br />
            <Tabs>
                <TabList>
                    <Tab>Pending Events</Tab>
                    <Tab>Approved Events</Tab>
                    <Tab>Rejected Events</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {allEvents.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'PENDING') {
                                return (
                                    <div key={index}>
                                        <p>EVENT NAME = {event.name}</p>
                                        <p>EVENT DESCRIPTION = {event.description}</p>
                                        <p>EVENT DATE = {event.date}</p>
                                        <p>CLUB NAME = {event.clubName}</p>
                                        <p>VENUE = {event.venue}</p>
                                        <p>CC STATUS = {event.Eventapproval.ccStatus}</p>
                                        <p>ADMIN STATUS = {event.Eventapproval.adminStatus}</p>
                                        <Button onClick={() => handleApproveEvent(event.id)} marginTop={"10px"} marginRight={"10px"} colorScheme="blue">Approve Event</Button>
                                        <Button onClick={() => handleRejectEvent(event.id)} marginTop={"10px"} colorScheme="red">Reject Event</Button>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel>
                        {allEvents.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'APPROVED') {
                                return (
                                    <div key={index}>
                                        <p>EVENT NAME = {event.name}</p>
                                        <p>EVENT DESCRIPTION = {event.description}</p>
                                        <p>EVENT DATE = {event.date}</p>
                                        <p>CLUB NAME = {event.clubName}</p>
                                        <p>VENUE = {event.venue}</p>
                                        <p>CC STATUS = {event.Eventapproval.ccStatus}</p>
                                        <p>ADMIN STATUS = {event.Eventapproval.adminStatus}</p>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel>
                    {allEvents.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'REJECTED') {
                                return (
                                    <div key={index}>
                                        <p>EVENT NAME = {event.name}</p>
                                        <p>EVENT DESCRIPTION = {event.description}</p>
                                        <p>EVENT DATE = {event.date}</p>
                                        <p>CLUB NAME = {event.clubName}</p>
                                        <p>VENUE = {event.venue}</p>
                                        <p>CC STATUS = {event.Eventapproval.ccStatus}</p>
                                        <p>ADMIN STATUS = {event.Eventapproval.adminStatus}</p>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}