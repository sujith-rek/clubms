import { deleteRoom } from "@/services/roombook.services";

export default async function delRoom(req, res) {
    const { roomId } = req.body;
    try {
        const room = await deleteRoom(roomId);
        res.json({ status: 200, message: "Room removed" });
    } catch (e) {
        res.json({ status: 400, message: e.message });
    }
}