import { eventApprovalDelete } from "@/services/events.service";


export default async function deleteEventApproval(req, res) {
    const { id, clubId } = req.body;

    try {
        const result = await eventApprovalDelete(id, clubId);
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

