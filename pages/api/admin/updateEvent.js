import { eventUpdateAdmin } from "@/services/admin.services";

export default async function updateEvent(req, res) {

    const { eventId, adminStatus, adminId } = req.body
    try {
        const event = await eventUpdateAdmin(eventId, { adminStatus, adminId })
        res.json({ message: 'Event updated successfully', event })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }

}



