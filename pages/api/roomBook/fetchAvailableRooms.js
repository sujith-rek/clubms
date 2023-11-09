import { checkRoomAvailabilty } from "@/services/roombook.services";

export default async function fetchRooms(req, res) {
    const { startDate, endDate } = req.body;
    try {
        const data = {
            startDate: startDate,
            endDate: endDate
        }
        const response = await checkRoomAvailabilty(data);
        res.json({ status: 200, rooms: response });
    } catch (e) {
        res.json({ status: 400, message: e.message });
    }
}