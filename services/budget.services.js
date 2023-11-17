import db from "@/lib/prisma";

// model ClubBudget {
//     id             Int              @id @default(autoincrement())
//     clubId         Int              @default(1)
//     allocated      Int
//     spent          Int              @default(0)
//     remaining      Int              @default(0)
//     userId         Int?
//     BudgetApproval BudgetApproval[]
//     User           User?            @relation(fields: [userId], references: [id])
//   }
// model BudgetApproval {
//     id           Int        @id @default(autoincrement())
//     adminId      Int        @default(1)
//     adminStatus  Status     @default(PENDING)
//     clubId       Int        @default(1)
//     amount       Int
//     description  String
//     attachment   String
//     requestDate  DateTime  @default(now())
//     approvedDate DateTime?
//     budget       ClubBudget @relation(fields: [clubId], references: [id])
//   }


export async function allocateBudget(data) {
    return await db.clubbudget.create({
        data
    })
}

export async function getAllBudgetRequests() {
    return await db.budgetapproval.findMany()
}

export async function getBudgetRequestById(id) {
    return await db.budgetapproval.findUnique({
        where: { id }
    })
}

export async function updateBudgetRequest(id, data) {
    return await db.budgetapproval.update({
        where: { id },
        data
    })
}

export async function createBudgetRequest(data) {
    return await db.budgetapproval.create({
        data
    })
}

export async function deleteBudgetRequest(id) {
    return await db.budgetapproval.delete({
        where: { id }
    })
}

export async function getBudgetRequestsByClubId(clubId) {
    return await db.budgetapproval.findMany({
        where: { clubId }
    })
}

export async function getRemainingBudgetByClubId(clubId) {
    return await db.clubbudget.findUnique({
        where: { clubId }
    })
}


