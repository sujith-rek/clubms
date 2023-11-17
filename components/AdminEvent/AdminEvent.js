import { updateEvent } from "@/operations/admin.fetch";
import { Button, Card, CardBody, CardHeader, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Box, Text } from "@chakra-ui/react";

export default function AdminEvent({ approvedEvents, pendingEvents, rejectedEvents, user }) {
    const handleApproveEvent = async (eventId) => {
        const data = {
            "eventId": eventId,
            "adminStatus": "APPROVED",
            "adminId": user.id,
        }
        try {
            const response = await updateEvent(data);
            if (response.status === 200) {
                alert('Event approved successfully');
                window.location.reload();
            } else {
                console.log(response.message)
                alert(response.message);
            }
        } catch (e) {
            alert(e.message);
        }
    }

    const handleRejectEvent = async (eventId) => {
        const data = {
            "eventId": eventId,
            "adminStatus": "REJECTED",
            "adminId": user.id,
        }
        try {
            const response = await updateEvent(data);
            if (response.status === 200) {
                alert('Event rejected successfully');
                window.location.reload();
            } else {
                console.log(response.message)
                alert(response.message);
            }
        } catch (e) {
            alert(e.message);
        }
    }
    return (
        <Tabs>
            <TabList>
                <Tab>Pending Events</Tab>
                <Tab>Approved Events</Tab>
                <Tab>Rejected Events</Tab>
            </TabList>
            <TabPanels>
                <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                    {pendingEvents.map((event, index) => {
                        return (
                            <div key={index}>
                                <Card margin={"1rem"} width={"20rem"}>
                                    <CardHeader>
                                        <Heading size={"md"}>Event Details</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event name</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.name}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event description</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.description}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event date</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.date}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>club name</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.clubName}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>venue</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.venue}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>Admin status</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.Eventapproval.adminStatus}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>CC status</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.Eventapproval.ccStatus}</Text>
                                        </Box>
                                        <Button onClick={() => handleApproveEvent(event.id)} marginTop={"10px"} marginRight={"10px"} colorScheme="blue">Approve Event</Button>
                                        <Button onClick={() => handleRejectEvent(event.id)} marginTop={"10px"} colorScheme="red">Reject Event</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                    {approvedEvents.map((event, index) => {
                        return (
                            <div key={index}>
                                <Card margin={"1rem"} width={"20rem"}>
                                    <CardHeader>
                                        <Heading size={"md"}>Event Details</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event name</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.name}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event description</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.description}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event date</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.date}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>club name</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.clubName}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>venue</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.venue}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>Admin status</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.Eventapproval.adminStatus}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>CC status</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.Eventapproval.ccStatus}</Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                    {rejectedEvents.map((event, index) => {
                        return (
                            <div key={index}>
                                <Card margin={"1rem"} width={"20rem"}>
                                    <CardHeader>
                                        <Heading size={"md"}>Event Details</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event name</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.name}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event description</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.description}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>event date</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.date}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>club name</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.clubName}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>venue</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.venue}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>Admin status</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.Eventapproval.adminStatus}</Text>
                                        </Box>
                                        <Box marginTop={"0.5rem"}>
                                            <Heading size={'xs'} textTransform={'uppercase'}>CC status</Heading>
                                            <Text pt='0' fontSize={'sm'}>{event.Eventapproval.ccStatus}</Text>
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