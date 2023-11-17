import { deleteBudgetRequest } from "@/services/budget.services";


export default async function budgetDelete(req, res) {
    const { id, clubId } = req.body;
    try {
        const result = await deleteBudgetRequest(id, clubId);

        res.json({ message: "Budget request deleted successfully", result });
    }
    catch (e) {
        res.json({ message: e.message });
    }
}

