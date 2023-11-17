import { eventApprovalDelete } from "@/services/events.service";


export default async function deleteEventApproval(req, res) {
    const { id, clubId } = req.body;

    try {
        const result = await eventApprovalDelete(id, clubId);
        res.json({ status: 200, message: 'Event Approval deleted successfully', data: result })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

