import { logout } from '@/operations/users.fetch'
import { fetchAllClubs } from '@/services/clubs.service'
import { eventFindMany } from '@/services/events.service'
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
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
    } else if (context.req.session.user.role === 'CC') {
        return {
            redirect: {
                permanent: false,
                destination: '/cc/ccHomepage'
            }
        }
    } else {
        const indianOptions = {
            timeZone: 'Asia/Kolkata',
            hour12: false,
        };
        const user = context.req.session.user;
        let allEvents = await eventFindMany();
        let allClubs = await fetchAllClubs();
        allEvents = allEvents.map((event) => {
            event.date = event.date.toLocaleString('en-IN', indianOptions);
            const club = allClubs.find(c => c.id === event.clubId)
            if (club) {
                event.clubName = club.name;
            }
            return event;
        })
        return {
            props: { user: user, events: JSON.parse(JSON.stringify(allEvents)) }
        }
    }
}

export default function StudentHomePage({ events, user }) {
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
    return (
        <div>
            <div>
                <div style={{ "paddingTop": "1rem", "display": "flex", "justifycontent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                    <Text fontWeight={"500"} fontSize='4xl'>Welcome {user.name}</Text>
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                </div>
                <Text fontSize={'2xl'} paddingLeft={"2rem"}>Student Dashboard</Text>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Upcoming Events</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {events.map((event, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <Heading size='md'>{event.name}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='2'>
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
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}