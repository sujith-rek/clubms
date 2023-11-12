import { eventUpdateCC } from "@/services/cc.service";

export default async function updateEvent(req,res) {
    const { eventId, ccStatus, ccId } = req.body
    try {
        const event = await eventUpdateCC(eventId, { ccStatus, ccId })
        res.json({ status: 200, message: 'Event updated successfully' })
    } catch (e) {
        res.json({ status: 400, message: e.message })
    }
}