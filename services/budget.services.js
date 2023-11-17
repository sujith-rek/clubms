import db from "@/lib/prisma";

export async function allocateBudget(data) {
    return await db.clubBudget.update({
        data
    })
}

export async function getAllBudgetRequests() {
    return await db.budgetApproval.findMany()
}

export async function getBudgetRequestById(id) {
    return await db.budgetApproval.findUnique({
        where: { id }
    })
}

export async function updateBudgetRequest(id, data) {
    return await db.budgetApproval.update({
        where: { id },
        data
    })
}

export async function createBudgetRequest(data) {
    return await db.budgetApproval.create({
        data
    })
}

export async function deleteBudgetRequest(id, clubId) {
    return await db.budgetApproval.delete({
        where: { id, clubId }
    })
}

export async function getBudgetRequestsByClubId(clubId) {
    return await db.budgetApproval.findMany({
        where: { clubId }
    })
}

export async function getRemainingBudgetByClubId(clubId) {
    return await db.budgetApproval.findUnique({
        where: { clubId }
    })
}

export async function getClubBudgetDetails(clubId) {
    return await db.clubBudget.findUnique({
        where: { clubId }
    })
}


