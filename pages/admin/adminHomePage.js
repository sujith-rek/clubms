import AdminRoomBooking from '@/components/AdminRoomBooking/AdminRoomBooking'
import { logout } from '@/operations/users.fetch'
import { fetchAllRooms, fetchApprovedRooms, fetchPendingRooms, fetchRejectedRooms } from '@/services/roombook.services'
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,

} from '@chakra-ui/react'

export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/admin/adminLogin'
            }
        }
    }
    if (context.req.session.user.role === 'CLUB') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/club/clubLogin'
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
        return {
            props: { user: user, pendingRooms: pendingRooms, approvedRooms: approvedRooms, rejectedRooms: rejectedRooms, allRooms: allRooms }
        }
    }
}

export default function AdminHomePage({ user, pendingRooms, approvedRooms, rejectedRooms, allRooms }) {

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
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                </div>
            </div>
            <br />
            <Tabs>
                <TabList>
                    <Tab>Room Booking</Tab>
                    <Tab>Event Booking</Tab>
                    <Tab>Admin Details</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AdminRoomBooking pendingRooms={pendingRooms} approvedRooms={approvedRooms} rejectedRooms={rejectedRooms} allRooms={allRooms} />
                    </TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel>
                        <p>Admin Name : {user.name}</p>
                        <p>Admin Email : {user.email}</p>
                        <p>Admin ID : {user.id}</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}