import { eventFindMany } from "@/services/events.service"

export default async function fetchAllEvents(req, res) {
    try {
        const events = await eventFindMany();
        res.status(200).json({ events });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}