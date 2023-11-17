import { getBudgetRequestById } from '@/services/budget.services.js'

export default async function budgetRequestById(req, res) {
    const { id } = req.body
    try {
        const result = await getBudgetRequestById(id)
        res.json({ status: 200, message: 'Budget request fetched successfully', data: result })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}
