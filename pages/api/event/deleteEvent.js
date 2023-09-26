import { eventDelete } from "@/services/events.service"
export default async function deleteEvent(req, res) {
    const { eventId } = req.body
    try {
        const event = await eventDelete(eventId)
        res.json({ message: 'Event deleted successfully', event })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }
}
