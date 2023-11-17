import { updateBudgetRequest } from "@/services/budget.services";


export default async function updateBudget(req, res) {
    const { id, status } = req.body;
    const data = {
        status
    }
    try {
        const result = await updateBudgetRequest(id, data);
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }

}

