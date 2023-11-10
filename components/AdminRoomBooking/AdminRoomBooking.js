import { addRoom, approveRoom, rejectRoom, removeRoom } from "@/operations/admin.fetch";
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
export default function AdminRoomBooking({ pendingRooms, approvedRooms, rejectedRooms, allRooms }) {
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

    const handleAddRoom = async () => {
        if (capacity === null || roomNumber === null || roomBlock === '') {
            alert('Please fill in all the fields');
            return;
        }
        const data = {
            "capacity": capacity,
            "roomNumber": roomNumber,
            "roomBlock": roomBlock
        }
        try {
            const res = await addRoom(data);
            if (res.status === 200) {
                alert('Room Added successfully');
                window.location.reload();
            } else {
                alert(res.message);
            }
        } catch (e) {
            alert(e.message);
        }
    }
    const handleRemoveRoom = async (id) => {
        const data = {
            "roomId": id,
        }
        const res = await removeRoom(data);
        if(res.status === 200) {
            alert(res.message);
            window.location.reload();
        } else {
            alert(e.message);
        }
    }
    const [roomNumber, setRoomNumber] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [roomBlock, setRoomBlock] = useState('');
    return (
        <Tabs>
            <TabList>
                <Tab>Add Room</Tab>
                <Tab>Remove Room</Tab>
                <Tab>Pending Room Approvals</Tab>
                <Tab>Approved Room Approvals</Tab>
                <Tab>Rejected Room Approvals</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div>
                        <FormControl>
                            <FormLabel>Block</FormLabel>
                            <Select onChange={(e) => setRoomBlock(e.target.value)} placeholder='Select Block Name'>
                                <option value='A_BLOCK'>A BLOCK</option>
                                <option value='B_BLOCK'>B BLOCK</option>
                                <option value='C_BLOCK'>C BLOCK</option>
                                <option value='D_BLOCK'>D BLOCK</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Room Number</FormLabel>
                            <Input onChange={(e) => setRoomNumber(e.target.value)} type="number" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Capacity</FormLabel>
                            <Input onChange={(e) => setCapacity(e.target.value)} type="number" />
                        </FormControl>
                        <Button onClick={handleAddRoom} marginTop={"20px"} colorScheme="blue">Add Room</Button>
                    </div>
                </TabPanel>
                <TabPanel>
                    {allRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <p>Block = {room.roomBlock}</p>
                                <p>Room Number = {room.roomNumber}</p>
                                <p>Room Capacity = {room.capacity}</p>
                                <Button onClick={() => handleRemoveRoom(room.id)} colorScheme="purple" marginTop={"10px"}>Remove Room</Button>
                                <br />
                                <br />
                            </div>
                        )
                    })}
                </TabPanel>
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