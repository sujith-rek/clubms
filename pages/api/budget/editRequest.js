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
        res.json({ status: 200, message: 'Budget request updated successfully', data: result })
    } catch (error) {
        console.log(error);
        res.json({ status: 400, message: error.message })
    }
}


