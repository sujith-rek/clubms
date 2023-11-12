import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useRoom from "@/hooks/useRoom";
import { fetchRooms } from '@/operations/club.fetch'
import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,

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
                            {isFetching ?
                                <div>{rooms.map((room, index) => {
                                    return (
                                        <AvailableRooms key={index} room={room} clubId={user.id} />
                                    )
                                })}</div> : null
                            }
                        </>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {bookedRooms.map((bookedRoom, index) => {
                                if (bookedRoom.adminStatus === 'PENDING') {
                                    return (
                                        <div key={index}>
                                            <p>Room Number : {bookedRoom.roomNumber}</p>
                                            <p>Room Block : {bookedRoom.roomBlock}</p>
                                            <p>From : {bookedRoom.from}</p>
                                            <p>To : {bookedRoom.to}</p>
                                            <p>Status : {bookedRoom.adminStatus}</p>
                                            <br />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {bookedRooms.map((bookedRoom, index) => {
                                if (bookedRoom.adminStatus === 'APPROVED') {
                                    return (
                                        <div key={index}>
                                            <p>Room Number : {bookedRoom.roomNumber}</p>
                                            <p>Room Block : {bookedRoom.roomBlock}</p>
                                            <p>From : {bookedRoom.from}</p>
                                            <p>To : {bookedRoom.to}</p>
                                            <p>Status : {bookedRoom.adminStatus}</p>
                                            <br />
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