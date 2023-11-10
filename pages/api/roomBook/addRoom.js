import { addRooms } from "@/services/roombook.services";

export default async function addRoom(req, res) {
    const { capacity, roomNumber, roomBlock } = req.body;
    try {
        const data = {
            "capacity": parseInt(capacity),
            "roomNumber": parseInt(roomNumber),
            "roomBlock": roomBlock
        }
        const room = await addRooms(data);
        res.json({ status: 200, message: 'Room added successfully' });
    } catch (e) {
        res.json({ status: 400, message: e.message });
    }
}