import { eventFindUnique } from "@/services/events.service"

export default async function fetchEvent(req, res) {

    const { eventId, clubId } = req.body

    try {
        const event = await eventFindUnique(eventId)
        res.status(200)
        res.json({ event })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }

}