import { allocateBudget } from "@/services/budget.services";

export default async function allocate(req, res) {
    const { clubId, amount, id } = req.body;
    const data = {
        "clubId": parseInt(clubId),
        "allocated": parseInt(amount),
        "spent": 0,
        "remaining": parseInt(amount),
        "userId": parseInt(clubId)
    }
    try {
        const result = await allocateBudget(id, data);
        res.json({ status: 200, message: 'Budget allocated successfully', data: result })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }

}

