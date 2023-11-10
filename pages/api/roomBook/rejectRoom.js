import { rejectRoomBook } from "@/services/roombook.services";

export default async function rejectRoomBooking(req, res) {
    const { roomBookId } = req.body;
    try {
        const roomBook = await rejectRoomBook(roomBookId);
        res.json({ status: 200, message: "Room Request Rejected" });
    } catch (e) {
        res.json({ status: 400, message: e.message });
    }
}