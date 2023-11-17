import { getAllBudgetRequests } from "@/services/budget.services";

export async function getBudgetRequests(req, res) {
    try {
        const result = await getAllBudgetRequests();
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

