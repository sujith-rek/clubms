import db from "@/lib/prisma";
import { getEventApprovalByEventId } from "./events.service";

export async function eventUpdateAdmin(id, data) {

    const eventApprovalId = await getEventApprovalByEventId(id)
    const reqEvent = eventApprovalId.Eventapproval
    return await db.eventapproval.update({
        where: { id: reqEvent.id },
        data
    })
}

