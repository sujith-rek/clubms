import { updateBudgetRequest } from "@/services/budget.services";

export default async function updateBudget(req, res) {
    const { id, clubId, amount, description, attachment } = req.body;
    const data = {
        clubId,
        amount,
        description,
        attachment
    }
    try {
        const result = await updateBudgetRequest(id, data);
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}


