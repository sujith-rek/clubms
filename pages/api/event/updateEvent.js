import { eventUpdate } from "@/services/events.service"

export default async function updateEvent(req, res) {
    const { eventId, name, description, date, venue } = req.body
    const eventData = {
        name,
        description,
        date: new Date(date),
        venue
    }
    try {
        const event = await eventUpdate(eventId, eventData)
        res.json({ message: 'Event updated successfully', event })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }
}
