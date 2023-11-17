import { updateBudgetRequest } from "@/services/budget.services";


export default async function updateBudget(req, res) {
    const { id, adminStatus, remarks } = req.body;
    const data = {
        adminStatus,
        adminRemarks: remarks
    }
    console.log(data, id);
    try {
        const result = await updateBudgetRequest(id, data);
        res.json({ status: 200, message: 'Budget request updated successfully', data: result })
    } catch (error) {
        console.log(error);
        res.json({ status: 400, message: error.message })
    }

}

