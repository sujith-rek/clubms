import { addRoom, approveRoom, rejectRoom, removeRoom } from "@/operations/admin.fetch";
import { Box, Button, Card, CardBody, CardHeader, Tab, TabList, TabPanel, TabPanels, Tabs, Heading, Text } from "@chakra-ui/react";
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
        if (res.status === 200) {
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
                <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                    {allRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <Card width={"20rem"}>
                                    <CardHeader>
                                        <Heading size='md'>Room Details</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Block
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomBlock}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Room Number
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomNumber}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Capacity
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.capacity}
                                            </Text>
                                        </Box>
                                        <Button marginTop={"0.5rem"} onClick={() => handleRemoveRoom(room.id)}>Remove Room</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                    {pendingRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <Card width={"20rem"}>
                                    <CardHeader>
                                        <Heading size='md'>Room Details</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Block
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomBlock}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Room Number
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomNumber}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                From
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.from}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                To
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.to}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Description
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.description}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Admin Status
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.adminStatus}
                                            </Text>
                                        </Box>
                                        <Button marginTop={"0.5rem"} onClick={() => handleApprove(room.id)} colorScheme="blue">Approve Booking</Button>
                                        <Button marginTop={"0.5rem"} onClick={() => handleReject(room.id)} colorScheme="red">Reject Booking</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                    {approvedRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <Card width={"20rem"}>
                                    <CardHeader>
                                        <Heading size='md'>Room Details</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Block
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomBlock}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Room Number
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomNumber}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                From
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.from}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                To
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.to}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Description
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.description}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Admin Status
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.adminStatus}
                                            </Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                    {rejectedRooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <Card width={"20rem"}>
                                    <CardHeader>
                                        <Heading size='md'>Room Details</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Block
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomBlock}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Room Number
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.roomNumber}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                From
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.from}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                To
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.to}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Description
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.description}
                                            </Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Admin Status
                                            </Heading>
                                            <Text pt='0' fontSize='sm'>
                                                {room.adminStatus}
                                            </Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}