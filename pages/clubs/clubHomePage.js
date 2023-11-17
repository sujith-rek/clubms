import { fetchAllRooms, fetchBookedRooms } from '@/services/roombook.services'
import { eventFindManyByClubId } from '@/services/events.service'
import { getBudgetRequestsByClubId,getClubBudgetDetails } from '@/services/budget.services'
import { logout } from '@/operations/users.fetch'
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Card, 
    CardBody, 
    Box,
} from '@chakra-ui/react'
import ClubRoomBooking from '@/components/ClubRoomBooking/ClubRoomBooking'
import ClubEvent from '@/components/ClubEvent/ClubEvent'
import ClubBudget from '@/components/ClubBudget/ClubBudget'

export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    if (context.req.session.user.role === 'ADMIN') {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/adminHomePage'
            }
        }
    } else if (context.req.session.user.role === 'CC') {
        return {
            redirect: {
                permanent: false,
                destination: '/cc/ccHomepage'
            }
        }
    } else if (context.req.session.user.role === 'STUDENT') {
        return {
            redirect: {
                permanent: false,
                destination: '/student/studentHomePage'
            }
        }
    } else {
        const user = context.req.session.user;
        let bookedRooms = await fetchBookedRooms(context.req.session.user.id);
        let events = await eventFindManyByClubId(user.id);
        let requests = await getBudgetRequestsByClubId(user.id);
        const allRooms = await fetchAllRooms();
        let clubBudgetDetails = await getClubBudgetDetails(user.id);
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
            event.date = JSON.stringify(event.date);
            return event;
        });

        requests = requests.map(request => {
            request.requestDate = JSON.stringify(request.requestDate);
            return request;
        });

        return {
            props: { user: user, bookedRooms, events, requests, clubBudgetDetails }
        }
    }
}

export default function ClubHomePage({ user, bookedRooms, events, requests, clubBudgetDetails }) {

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
                <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                    <Text fontWeight={"500"} fontSize='4xl'>Welcome {user.name}</Text>
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                </div>
                <Text fontSize={'2xl'} paddingLeft={"2rem"}>Club Dashboard</Text>

            </div>
            <br />
            <Tabs paddingLeft={"2rem"} paddingRight={"2rem"}>
                <TabList>
                    <Tab>Event</Tab>
                    <Tab>Room</Tab>
                    <Tab>Budget</Tab>
                    <Tab>Club Details</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ClubEvent events={events} user={user} />
                    </TabPanel>
                    <TabPanel>
                        <ClubRoomBooking user={user} bookedRooms={bookedRooms} />
                    </TabPanel>
                    <TabPanel>

                        <Card>
                            <CardBody>
                                <Box>
                                    <Text size='md'>
                                        Name - {user.name}
                                    </Text>
                                </Box>
                                <Box marginTop={"0.5rem"}>
                                    <Text size='md'>
                                        Email - {user.email}
                                    </Text>
                                </Box>
                                <Box marginTop={"0.5rem"}>
                                    <Text size='md'>
                                        Description - {user.description}
                                    </Text>
                                </Box>
                            </CardBody>
                        </Card>
                    </TabPanel>
                </TabPanels>

            </Tabs>

        </div>
    )
}