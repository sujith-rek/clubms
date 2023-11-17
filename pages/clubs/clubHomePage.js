import { fetchAllRooms, fetchBookedRooms } from '@/services/roombook.services'
import { eventFindManyByClubId } from '@/services/events.service'
import { logout } from '@/operations/users.fetch'
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react'
import ClubRoomBooking from '@/components/ClubRoomBooking/ClubRoomBooking'
import ClubEvent from '@/components/ClubEvent/ClubEvent'
import ClubBudget from '@/components/ClubBudget/ClubBudget'

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
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">Welcome {user.name}</h1>
                </div>
                <Button onClick={() => handleLogOut()} colorScheme='red' marginTop={"10px"}>Logout</Button>
            </div>

            <br />

            <Tabs>
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
                        <ClubBudget />
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