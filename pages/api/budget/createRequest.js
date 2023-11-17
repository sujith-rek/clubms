import { createBudgetRequest } from "@/services/budget.services";

export default async function createRequest(req, res) {
    const { clubId, amount, description, attachment } = req.body;
    const data = {
        clubId,
        amount,
        description,
        attachment
    }
    try {
        const result = await createBudgetRequest(data);
        res.json({ status: 200, message: 'Budget request created successfully', data: result })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

