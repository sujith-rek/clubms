import { getAllBudgetRequests } from "@/services/budget.services";

export async function getBudgetRequests(req, res) {
    try {
        const result = await getAllBudgetRequests();
        res.json({ status: 200, message: 'Budget requests fetched successfully', data: result })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}

