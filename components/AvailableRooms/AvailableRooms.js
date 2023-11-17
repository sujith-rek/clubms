import useRoom from "@/hooks/useRoom"
import { roomBook } from "@/operations/club.fetch";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text, Input, Button } from '@chakra-ui/react'

export default function AvailableRooms({ room, clubId }) {
    const { toTime, fromTime } = useRoom();
    const [desc, setDesc] = useState('')
    const handleClick = async () => {
        if (desc === '') {
            alert('Please fill all the fields');
            return;
        }
        const data = {
            "from": fromTime,
            "to": toTime,
            clubId,
            "description": desc,
            "roomId": room.id
        }
        const res = await roomBook(data)
        if (res.status === 200) {
            alert(res.message);
            window.location.reload()
        } else {
            alert(res.message);
        }
    }
    return (
        <div style={{'width' : "20rem", "marginRight" : "1rem"}}>
            <Card>
                <CardHeader>
                    <Heading size={'md'}>Room Details</Heading>
                </CardHeader>
                <CardBody>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Room Number
                        </Heading>
                        <Text pt='0' fontSize='sm'>
                            {room.roomNumber}
                        </Text>
                    </Box>
                    <Box marginTop={'0.5rem'}>
                        <Heading size='xs' textTransform='uppercase'>
                            Block
                        </Heading>
                        <Text pt='0' fontSize='sm'>
                            {room.roomBlock}
                        </Text>
                    </Box>
                    <Box marginTop={'0.5rem'}>
                        <Heading size='xs' textTransform='uppercase'>
                            Capacity
                        </Heading>
                        <Text pt='0' fontSize='sm'>
                            {room.capacity}
                        </Text>
                    </Box>
                    <Box marginTop={'0.5rem'}>
                        <Heading size='xs' textTransform='uppercase'>
                            Reason for booking
                        </Heading>
                        <Input marginTop={"0.5rem"} type="text" onChange={(e) => setDesc(e.target.value)} />
                    </Box>
                    <Box marginTop={'1rem'}>
                        <Button onClick={handleClick} >Book Room</Button>
                    </Box>
                </CardBody>
            </Card>
        </div>
    )
}