import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useRoom from "@/hooks/useRoom";
import { fetchRooms } from '@/operations/club.fetch'
import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text
} from '@chakra-ui/react'
import AvailableRooms from "../AvailableRooms/AvailableRooms";

export default function ClubRoomBooking({ user, bookedRooms }) {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const { rooms, setRooms, setToTime, setFromTime } = useRoom();
    const [isFetching, setIsFetching] = useState(false);
    const seeAvailRooms = async () => {
        if (from === '' || to === '') {
            alert('Please fil all the fields');
            return;
        }
        try {
            setIsFetching(false)
            const response = await fetchRooms({
                startDate: new Date(from).toISOString(),
                endDate: new Date(to).toISOString,
            });
            console.log(response)
            if (response.status === 200) {
                setRooms(response.rooms);
                setToTime(to);
                setFromTime(from);
                setIsFetching(true)
            } else {
                console.log(response.message)
            }
        } catch (e) {
            alert(e.message);
        }
    }
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>Book Room</Tab>
                    <Tab>Pending Rooms</Tab>
                    <Tab>Approved Rooms</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <>
                            <div>
                                <div>
                                    <FormControl>
                                        <FormLabel>From</FormLabel>
                                        <Input onChange={(e) => setFrom(e.target.value)} type='datetime-local' />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl>
                                        <FormLabel>To</FormLabel>
                                        <Input onChange={(e) => setTo(e.target.value)} type='datetime-local' />
                                    </FormControl>
                                </div>
                                <br />
                                <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={seeAvailRooms}>Fetch Rooms</Button>
                            </div>
                            <br />
                            {isFetching ? <div>{
                                rooms.length === 0 ? "No Rooms" : null
                            }</div> : <div></div>}
                            {isFetching ?
                                <div style={{ "display": "flex", "justifyContent": "flex-start", "flexWrap": "wrap", "alignItems": "flex-start" }}>
                                    {rooms.map((room, index) => {
                                        return (
                                            <AvailableRooms key={index} room={room} clubId={user.id} />
                                        )
                                    })}
                                </div> : null
                            }
                        </>
                    </TabPanel>
                    <TabPanel>
                        <div style={{"display" : "flex", "flexWrap" : "wrap"}}>
                            {bookedRooms.map((bookedRoom, index) => {
                                if (bookedRoom.adminStatus === 'PENDING') {
                                    return (
                                        <div style={{"marginRight" : "1rem"}} key={index}>
                                            <Card width={"20rem"}>
                                                <CardHeader>
                                                    <Heading size='md'>Room Details</Heading>
                                                </CardHeader>
                                                <CardBody>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Room Number
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.roomNumber}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Block
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.roomBlock}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            From
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.from}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            To
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.to}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.adminStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Reason For booking
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.description}
                                                        </Text>
                                                    </Box>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div style={{"display" : "flex", "flexWrap" : "wrap"}}>
                            {bookedRooms.map((bookedRoom, index) => {
                                if (bookedRoom.adminStatus === 'APPROVED') {
                                    return (
                                        <div style={{"marginRight" : "1rem"}} key={index}>
                                            <Card width={"20rem"}>
                                                <CardHeader>
                                                    <Heading size='md'>Room Details</Heading>
                                                </CardHeader>
                                                <CardBody>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Room Number
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.roomNumber}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Block
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.roomBlock}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            From
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.from}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            To
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.to}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.adminStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box marginTop={'0.5rem'}>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Reason For booking
                                                        </Heading>
                                                        <Text pt='0' fontSize='sm'>
                                                            {bookedRoom.description}
                                                        </Text>
                                                    </Box>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}