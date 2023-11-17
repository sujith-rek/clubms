import {
    Tab, TabList, TabPanel, TabPanels, Tabs, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Card, CardHeader, Text, CardBody, CardFooter, Heading, Stack, StackDivider, Box } from '@chakra-ui/react'
import EventUpdate from "../EventUpdate/EventUpdate";
import EventCreate from "../EventCreate/EventCreate";

export default function ClubEvent({ events, user }) {
    const [updateModal, showUpdateModal] = useState(false)
    const [updateEventId, setUpdateEventId] = useState(0);
    return (
        <>
            <Modal isOpen={updateModal} onClose={() => showUpdateModal(!updateModal)} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EventUpdate event={events.find(event => event.id === updateEventId)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Tabs>
                <TabList>
                    <Tab>Create Event</Tab>
                    <Tab>Admin Pending Events</Tab>
                    <Tab>Admin Approved Events</Tab>
                    <Tab>Admin Rejected Events</Tab>
                    <Tab>CC Pending Events</Tab>
                    <Tab>CC Approved Events</Tab>
                    <Tab>CC Rejected Events</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <EventCreate clubIdFromProps={user.id} />
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {events.map((event, index) => {
                            if (event.Eventapproval.adminStatus === 'PENDING') {
                                return (
                                    <div style={{ width: "30rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                                <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {events.map((event, index) => {
                            if (event.Eventapproval.adminStatus === 'APPROVED') {
                                return (
                                    <div style={{ width: "30rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                                <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {events.map((event, index) => {
                            if (event.Eventapproval.adminStatus === 'REJECTED') {
                                return (
                                    <div style={{ width: "30rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                                <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {events.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'PENDING') {
                                return (
                                    <div style={{ width: "30rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                                <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {events.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'APPROVED') {
                                return (
                                    <div style={{ width: "30rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                                <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                    <TabPanel display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        {events.map((event, index) => {
                            if (event.Eventapproval.ccStatus === 'REJECTED') {
                                return (
                                    <div style={{ width: "30rem" }} key={index}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Event Details</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='2'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Description
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.description}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Event Date
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.date}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Club Name
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.clubName}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Venue
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.venue}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            CC Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.ccStatus}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Admin Status
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {event.Eventapproval.adminStatus}
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                                <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                    setUpdateEventId(event.id);
                                                    showUpdateModal(!updateModal)
                                                }}>Update Event</Button>
                                            </CardBody>
                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                        })}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}