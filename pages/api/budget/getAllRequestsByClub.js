import { getBudgetRequestsByClubId } from "@/services/budget.services";


export async function getBudgetRequests(req, res) {
    const { clubId } = req.body;
    try {
        const result = await getBudgetRequestsByClubId(clubId);
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

