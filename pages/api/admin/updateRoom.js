import { roombookUpdate } from "@/services/roombook.services"

export default async function updateRoom(req, res) {

    const { roombookId, adminStatus, adminId } = req.body
    try {
        const room = await roombookUpdate(roombookId, { adminStatus, adminId })
        res.json({ message: 'Room updated successfully', room })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }
}

