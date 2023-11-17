import { allocateBudget } from "@/services/budget.services";

export default async function allocate(req, res) {
    const { clubId, amount } = req.body;
    const data = {
        clubId,
        allocated: amount,
        spent: 0,
        remaining: amount,
        userId: clubId
    }
    try {
        const result = await allocateBudget(data);
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }

}

