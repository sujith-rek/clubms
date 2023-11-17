import { getBudgetRequestsByClubId } from "@/services/budget.services";


export async function getBudgetRequests(req, res) {
    const { clubId } = req.body;
    try {
        const result = await getBudgetRequestsByClubId(clubId);
        res.json({ status: 200, message: 'Budget requests fetched successfully', data: result })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

