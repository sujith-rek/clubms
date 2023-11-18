import AdminEvent from '@/components/AdminEvent/AdminEvent';
import AdminRoomBooking from '@/components/AdminRoomBooking/AdminRoomBooking'
import AdminBudget from '@/components/AdminBudget/AdminBudget';
import { logout } from '@/operations/users.fetch'
import { fetchAllClubs } from '@/services/clubs.service';
import { eventsAdminApproved, eventsAdminPending, eventsAdminRejected } from '@/services/events.service';
import { fetchAllRooms, fetchApprovedRooms, fetchPendingRooms, fetchRejectedRooms } from '@/services/roombook.services'
import { getAllBudgetRequests, getClubBudgets } from '@/services/budget.services';
import { getUserBudgets } from '@/services/users.services';
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
                destination: '/club/clubHomePage'
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
        const allRooms = await fetchAllRooms();
        const allBudgets = await getClubBudgets();
        let pendingRooms = await fetchPendingRooms();
        let approvedRooms = await fetchApprovedRooms();
        let rejectedRooms = await fetchRejectedRooms();
        const indianOptions = {
            timeZone: 'Asia/Kolkata',
            hour12: false,
        };
        pendingRooms = pendingRooms.map(room => {
            room.from = room.from.toLocaleString('en-IN', indianOptions);
            room.to = room.to.toLocaleString('en-IN', indianOptions);
            const ro = allRooms.find(r => r.id === room.roomId)
            if (ro) {
                room.roomNumber = ro.roomNumber;
                room.roomBlock = ro.roomBlock;
            }
            return room;
        })

        approvedRooms = approvedRooms.map(room => {
            room.from = room.from.toLocaleString('en-IN', indianOptions);
            room.to = room.to.toLocaleString('en-IN', indianOptions);
            const ro = allRooms.find(r => r.id === room.roomId)
            if (ro) {
                room.roomNumber = ro.roomNumber;
                room.roomBlock = ro.roomBlock;
            }
            return room;
        })

        rejectedRooms = rejectedRooms.map(room => {
            room.from = room.from.toLocaleString('en-IN', indianOptions);
            room.to = room.to.toLocaleString('en-IN', indianOptions);
            const ro = allRooms.find(r => r.id === room.roomId)
            if (ro) {
                room.roomNumber = ro.roomNumber;
                room.roomBlock = ro.roomBlock;
            }
            return room;
        })

        const allClubs = await fetchAllClubs();
        let approvedEvents = await eventsAdminApproved();
        let userBudget = await getUserBudgets();
        approvedEvents = approvedEvents.map((event) => {
            event.date = event.date.toLocaleString('en-IN', indianOptions);
            const club = allClubs.find(c => c.id === event.clubId)
            if (club) {
                event.clubName = club.name;
            }
            return event;
        })
        let pendingEvents = await eventsAdminPending();
        pendingEvents = pendingEvents.map((event) => {
            event.date = event.date.toLocaleString('en-IN', indianOptions);
            const club = allClubs.find(c => c.id === event.clubId)
            if (club) {
                event.clubName = club.name;
            }
            return event;
        })
        let rejectedEvents = await eventsAdminRejected();
        rejectedEvents = rejectedEvents.map((event) => {
            event.date = event.date.toLocaleString('en-IN', indianOptions);
            const club = allClubs.find(c => c.id === event.clubId)
            if (club) {
                event.clubName = club.name;
            }
            return event;
        })


        let clubs = allClubs.map(club => {
            club.password = null;
            return club;
        });

        let budgetRequests = await getAllBudgetRequests();

        return {
            props: {
                user: user,
                pendingRooms: pendingRooms,
                approvedRooms: approvedRooms,
                rejectedRooms: rejectedRooms,
                allRooms: allRooms,
                pendingEvents: JSON.parse(JSON.stringify(pendingEvents)),
                approvedEvents: JSON.parse(JSON.stringify(approvedEvents)),
                rejectedEvents: JSON.parse(JSON.stringify(rejectedEvents)),
                clubs: allClubs,
                budgetRequests: JSON.parse(JSON.stringify(budgetRequests)),
                allBudgets: allBudgets,
                userBudget: userBudget
            }
        }
    }
}

export default function AdminHomePage({ user, pendingRooms, approvedRooms, rejectedRooms, allRooms, approvedEvents, rejectedEvents, pendingEvents, clubs, budgetRequests, allBudgets, userBudget }) {

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
                <Text fontSize={'2xl'} paddingLeft={"2rem"}>Admin Dashboard</Text>
            </div>
            <br />
            <Tabs paddingLeft={"2rem"} paddingRight={"2rem"}>
                <TabList>
                    <Tab>Room Booking</Tab>
                    <Tab>Event Booking</Tab>
                    <Tab>Budget</Tab>
                    <Tab>Admin Details</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AdminRoomBooking pendingRooms={pendingRooms} approvedRooms={approvedRooms} rejectedRooms={rejectedRooms} allRooms={allRooms} />
                    </TabPanel>
                    <TabPanel>
                        <AdminEvent approvedEvents={approvedEvents} rejectedEvents={rejectedEvents} pendingEvents={pendingEvents} user={user} />
                    </TabPanel>
                    <TabPanel>
                        <AdminBudget budgetRequests={budgetRequests} clubs={clubs} allBudgets={allBudgets} userBudget={userBudget} />
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