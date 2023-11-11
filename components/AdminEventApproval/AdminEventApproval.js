import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { approveEvent } from "@/operations/admin.fetch";

export default function AdminEventApproval({ allEvents, approvedEvents, pendingEvents }) {
    const handleApprove = async (id) => {
        const data = {
            "eventId": id,
        }
        try {
            const res = await approveEvent(data);
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
                <Tab>All Events</Tab>
                <Tab>Approved Events</Tab>
                <Tab>Pending Events</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    {allEvents ? allEvents.map(event => (
                        <div key={event.id}>
                            <p>Name: {event.name}</p>
                            <p>Date: {event.date}</p>
                            <p>Venue: {event.venue}</p>
                            <p>Club ID: {event.clubId}</p>
                            <Button onClick={() => handleApprove(event.id)}>Approve</Button>
                        </div>
                    )) : null}
                </TabPanel>
                <TabPanel>
                    {approvedEvents ? approvedEvents.map(event => (
                        <div key={event.id}>{event.name}</div>
                    )) : null}
                </TabPanel>
                <TabPanel>
                    {pendingEvents ? pendingEvents.map(event => (
                        <div key={event.id}>
                            <p>Name: {event.name}</p>
                            <p>Date: {event.date}</p>
                            <p>Venue: {event.venue}</p>
                            <p>Club ID: {event.clubId}</p>
                            <p>Event ID: {event.id}</p>
                        </div>
                    )) : null}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}