import { getBudgetRequestById } from '@/services/budget.services.js'

export default async function budgetRequestById(req, res) {
    const { id } = req.body
    try {
        const result = await getBudgetRequestById(id)
        res.status(200).json(result)
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
}
