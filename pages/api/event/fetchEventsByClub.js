import { eventFindManyByClubId } from "@/services/events.service";

export default async function fetchEventsByClub(req, res) {

    const { clubId } = req.body

    try {
        const events = await eventFindManyByClubId(clubId)
        res.status(200)
        res.json({ events })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }

}