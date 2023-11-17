import { logout } from '@/operations/users.fetch'
import { eventFindMany } from '@/services/events.service'
import { fetchAllClubs } from '@/services/clubs.service';
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { updateEvent } from '@/operations/cc.fetch';
import { Text } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box } from '@chakra-ui/react'

export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
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
            "eventId": eventId,
            "ccStatus": "APPROVED",
            "ccId": user.id,
        }
        try {
            const response = await updateEvent(data);
            if (response.status === 200) {
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
            "eventId": eventId,
            "ccStatus": "REJECTED",
            "ccId": user.id,
        }
        try {
            const response = await updateEvent(data);
            if (response.status === 200) {
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
                <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                    <Text fontWeight={"500"} fontSize='4xl'>Welcome {user.name}</Text>
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                </div>
                <Text fontSize={'2xl'} paddingLeft={"2rem"}>Cultural Committee Dashboard</Text>
            </div>
            <br />
            <Tabs paddingLeft={"2rem"} paddingRight={"2rem"}>
                <TabList>
                    <Tab>Pending Events</Tab>
                    <Tab>Approved Events</Tab>
                    <Tab>Rejected Events</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {allEvents.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'PENDING') {
                                return (
                                    <div style={{ width: "35rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                                <Button onClick={() => handleApproveEvent(event.id)} marginTop={"10px"} marginRight={"10px"} colorScheme="blue">Approve Event</Button>
                                                <Button onClick={() => handleRejectEvent(event.id)} marginTop={"10px"} colorScheme="red">Reject Event</Button>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {allEvents.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'APPROVED') {
                                return (
                                    <div style={{ width: "35rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {allEvents.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'REJECTED') {
                                return (
                                    <div style={{ width: "35rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                            </CardBody>
                                        </Card>
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