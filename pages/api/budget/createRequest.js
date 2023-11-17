import { createBudgetRequest } from "@/services/budget.services";

export async function createRequest(req, res) {
    const { clubId, amount, description, attachment } = req.body;
    const data = {
        clubId,
        amount,
        description,
        attachment
    }
    try {
        const result = await createBudgetRequest(data);
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

