import { eventUpdateAdmin } from "@/services/admin.services";

export default async function updateEvent(req, res) {

    const { eventId, adminStatus, adminId } = req.body
    try {
        const event = await eventUpdateAdmin(eventId, { adminStatus, adminId })
        res.json({ status: 200, message: 'Event updated successfully' })
    } catch (e) {
        res.json({ status: 400, message: e.message })
    }

}



