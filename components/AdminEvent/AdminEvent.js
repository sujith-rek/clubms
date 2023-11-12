import { updateEvent } from "@/operations/admin.fetch";
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function AdminEvent({ approvedEvents, pendingEvents, rejectedEvents , user}) {
    const handleApproveEvent = async (eventId) => {
        const data = {
            "eventId" : eventId,
            "adminStatus" : "APPROVED",
            "adminId" : user.id,
        }
        try {
            const response = await updateEvent(data);
            if(response.status === 200) {
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
            "eventId" : eventId,
            "adminStatus" : "REJECTED",
            "adminId" : user.id,
        }
        try {
            const response = await updateEvent(data);
            if(response.status === 200) {
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
                <TabPanel>
                    {pendingEvents.map((event, index) => {
                        return (
                            <div key={index}>
                                <p>EVENT NAME = {event.name}</p>
                                <p>EVENT DESCRIPTION = {event.description}</p>
                                <p>EVENT DATE = {event.date}</p>
                                <p>CLUB NAME = {event.clubName}</p>
                                <p>VENUE = {event.venue}</p>
                                <p>CC STATUS = {event.Eventapproval.ccStatus}</p>
                                <p>ADMIN STATUS = {event.Eventapproval.adminStatus}</p>
                                <Button onClick={() => handleApproveEvent(event.id)} marginTop={"10px"} marginRight={"10px"} colorScheme="blue">Approve Event</Button>
                                <Button onClick={() => handleRejectEvent(event.id)} marginTop={"10px"} colorScheme="red">Reject Event</Button>
                                <br />
                                <br />
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel>
                    {approvedEvents.map((event, index) => {
                        return (
                            <div key={index}>
                                <p>EVENT NAME = {event.name}</p>
                                <p>EVENT DESCRIPTION = {event.description}</p>
                                <p>EVENT DATE = {event.date}</p>
                                <p>CLUB NAME = {event.clubName}</p>
                                <p>VENUE = {event.venue}</p>
                                <p>CC STATUS = {event.Eventapproval.ccStatus}</p>
                                <p>ADMIN STATUS = {event.Eventapproval.adminStatus}</p>
                                <br />
                                <br />
                            </div>
                        )
                    })}
                </TabPanel>
                <TabPanel>
                    {rejectedEvents.map((event, index) => {
                        return (
                            <div key={index}>
                                <p>EVENT NAME = {event.name}</p>
                                <p>EVENT DESCRIPTION = {event.description}</p>
                                <p>EVENT DATE = {event.date}</p>
                                <p>CLUB NAME = {event.clubName}</p>
                                <p>VENUE = {event.venue}</p>
                                <p>CC STATUS = {event.Eventapproval.ccStatus}</p>
                                <p>ADMIN STATUS = {event.Eventapproval.adminStatus}</p>
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