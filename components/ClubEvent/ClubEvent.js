import {
    Tab, TabList, TabPanel, TabPanels, Tabs, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
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
                    <TabPanel>
                        <div>
                            {events.map((event, index) => {
                                if (event.Eventapproval.adminStatus === 'PENDING') {
                                    return (
                                        <div key={index}>
                                            <p>Name : {event.name}</p>
                                            <p>Description : {event.description}</p>
                                            <p>Date : {event.date}</p>
                                            <p>Venue : {event.venue}</p>
                                            <p>CC Status : {event.Eventapproval.ccStatus}</p>
                                            <p>Admin Status : {event.Eventapproval.adminStatus}</p>
                                            <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                setUpdateEventId(event.id);
                                                showUpdateModal(!updateModal)
                                            }}>Update Event</Button>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {events.map((event, index) => {
                                if (event.Eventapproval.adminStatus === 'APPROVED') {
                                    return (
                                        <div key={index}>
                                            <p>Name : {event.name}</p>
                                            <p>Description : {event.description}</p>
                                            <p>Date : {event.date}</p>
                                            <p>Venue : {event.venue}</p>
                                            <p>CC Status : {event.Eventapproval.ccStatus}</p>
                                            <p>Admin Status : {event.Eventapproval.adminStatus}</p>
                                            <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                setUpdateEventId(event.id);
                                                showUpdateModal(!updateModal)
                                            }}>Update Event</Button>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {events.map((event, index) => {
                                if (event.Eventapproval.adminStatus === 'REJECTED') {
                                    return (
                                        <div key={index}>
                                            <p>Name : {event.name}</p>
                                            <p>Description : {event.description}</p>
                                            <p>Date : {event.date}</p>
                                            <p>Venue : {event.venue}</p>
                                            <p>CC Status : {event.Eventapproval.ccStatus}</p>
                                            <p>Admin Status : {event.Eventapproval.adminStatus}</p>
                                            <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                setUpdateEventId(event.id);
                                                showUpdateModal(!updateModal)
                                            }}>Update Event</Button>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {events.map((event, index) => {
                                if (event.Eventapproval.ccStatus === 'PENDING') {
                                    return (
                                        <div key={index}>
                                            <p>Name : {event.name}</p>
                                            <p>Description : {event.description}</p>
                                            <p>Date : {event.date}</p>
                                            <p>Venue : {event.venue}</p>
                                            <p>CC Status : {event.Eventapproval.ccStatus}</p>
                                            <p>Admin Status : {event.Eventapproval.adminStatus}</p>
                                            <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                setUpdateEventId(event.id);
                                                showUpdateModal(!updateModal)
                                            }}>Update Event</Button>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {events.map((event, index) => {
                                if (event.Eventapproval.ccStatus === 'APPROVED') {
                                    return (
                                        <div key={index}>
                                            <p>Name : {event.name}</p>
                                            <p>Description : {event.description}</p>
                                            <p>Date : {event.date}</p>
                                            <p>Venue : {event.venue}</p>
                                            <p>CC Status : {event.Eventapproval.ccStatus}</p>
                                            <p>Admin Status : {event.Eventapproval.adminStatus}</p>
                                            <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                setUpdateEventId(event.id);
                                                showUpdateModal(!updateModal)
                                            }}>Update Event</Button>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {events.map((event, index) => {
                                if (event.Eventapproval.ccStatus === 'REJECTED') {
                                    return (
                                        <div key={index}>
                                            <p>Name : {event.name}</p>
                                            <p>Description : {event.description}</p>
                                            <p>Date : {event.date}</p>
                                            <p>Venue : {event.venue}</p>
                                            <p>CC Status : {event.Eventapproval.ccStatus}</p>
                                            <p>Admin Status : {event.Eventapproval.adminStatus}</p>
                                            <Button marginTop={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => {
                                                setUpdateEventId(event.id);
                                                showUpdateModal(!updateModal)
                                            }}>Update Event</Button>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}