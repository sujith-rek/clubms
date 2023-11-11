import { approveRoomBook } from "@/services/roombook.services";

export default async function approveRoomBooking(req, res) {
    const { roomBookId } = req.body;
    try {
        const roomBook = await approveRoomBook(roomBookId);
        res.json({ status: 200, message: "Room Approved" });
    } catch (e) {
        res.json({ status: 400, message: e.message });
    }
}