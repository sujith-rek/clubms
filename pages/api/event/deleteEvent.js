import { eventDelete, eventApprovalDelete } from "@/services/events.service"

export default async function deleteEvent(req, res) {

    const { eventId, clubId } = req.body

    try {
        await eventApprovalDelete(eventId, clubId)
        const event = await eventDelete(eventId, clubId)
        res.json({ message: 'Event deleted successfully', event })
        
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }
}
