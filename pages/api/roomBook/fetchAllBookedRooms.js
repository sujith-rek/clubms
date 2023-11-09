import { fetchBookedRooms } from "@/services/roombook.services";

export default async function fetchAllBookedRooms(req, res) {
    const { clubId } = req.body;
    try {
        const response = await fetchBookedRooms(clubId);
        res.json({ status: 200, bookedRooms: response });
    } catch (e) {
        res.json({ status: 400, message: e.message });
    }
}