import { approveRoom, rejectRoom } from "@/operations/admin.fetch";
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function AdminRoomBooking({ pendingRooms, approvedRooms, rejectedRooms }) {
    const handleApprove = async (id) => {
        const data = {
            "roomBookId": id,
        }
        try {
            const res = await approveRoom(data);
            if (res.status === 200) {
                alert(res.message);
                window.location.reload();
            } else {
                alert(res.message);
            }
        } catch (e) {
            alert("INTERNAL SERVER ERROR");
        }
    }

    const handleReject = async (id) => {
        const data = {
            "roomBookId": id,
        }
        try {
            const res = await rejectRoom(data);
            if (res.status === 200) {
                alert(res.message);
                window.location.reload();
            } else {
                alert(res.message);
            }
        } catch (e) {
            alert("INTERNAL SERVER ERROR");
        }
    }
    return (
        <Tabs>
            <TabList>
                <Tab>Pending Room Approvals</Tab>
                <Tab>Approved Room Approvals</Tab>
                <Tab>Rejected Room Approvals</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {pendingRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <p>Room Number = {room.roomNumber}</p>
                                <p>Room Block = {room.roomBlock}</p>
                                <p>From = {room.from}</p>
                                <p>To = {room.to}</p>
                                <p>Description = {room.description}</p>
                                <p>Admin Status = {room.adminStatus}</p>
                                <Button marginRight={"10px"} onClick={() => handleApprove(room.id)} colorScheme="blue">Approve Booking</Button>
                                <Button onClick={() => handleReject(room.id)} colorScheme="red">Reject Booking</Button>
                                <br />
                                <br />
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel>
                    {approvedRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <p>Room Number = {room.roomNumber}</p>
                                <p>Room Block = {room.roomBlock}</p>
                                <p>From = {room.from}</p>
                                <p>To = {room.to}</p>
                                <p>Description = {room.description}</p>
                                <p>Admin Status = {room.adminStatus}</p>
                                <br />
                                <br />
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel>
                {rejectedRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <p>Room Number = {room.roomNumber}</p>
                                <p>Room Block = {room.roomBlock}</p>
                                <p>From = {room.from}</p>
                                <p>To = {room.to}</p>
                                <p>Description = {room.description}</p>
                                <p>Admin Status = {room.adminStatus}</p>
                                <br />
                                <br />
                            </div>
                        )
                    })}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}