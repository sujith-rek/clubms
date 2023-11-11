import { eventFindMany } from "@/services/events.service"

export default async function fetchAllEvents(req, res) {
    try {
        const events = await eventFindMany();
        res.status(200);
        res.json({ events });
    } catch (e) {
        res.status(400);
        res.json({ message: e.message });
    }
}