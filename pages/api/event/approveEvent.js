import { eventApprovalCreate } from '@/services/events.service';

export default async function approveEvent(req, res) {
    const { eventId } = req.body;

    if (!req.user || (req.user.role !== 'CC' && req.user.role !== 'Admin')) {
        return res.status(403).json({ message: 'You do not have permission to approve events.' });
    }

    try {
        const eventApproval = await eventApprovalCreate({
            eventId: eventId,
            approvedBy: req.user.id,
        });

        return res.json({ message: 'Event approved successfully', eventApproval });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}