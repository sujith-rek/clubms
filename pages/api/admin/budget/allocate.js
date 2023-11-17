import { allocateBudget } from "@/services/budget.services";

export default async function allocate(req, res) {
    const { clubId, allocate } = req.body;
    const data = {
        clubId,
        allocated: allocate,
        spent: 0,
        remaining: allocate,
        userId: clubId
    }
    try {
        const result = await allocateBudget(data);
        res.status(200).json(result);
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }

}

