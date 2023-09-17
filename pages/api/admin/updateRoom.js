

export default async function updateRoom(req, res) {

    const { roomId, adminStatus, adminId } = req.body
    try {
        const room = await roomUpdateAdmin(roomId, { adminStatus, adminId })
        res.json({ message: 'Room updated successfully', room })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }
}

