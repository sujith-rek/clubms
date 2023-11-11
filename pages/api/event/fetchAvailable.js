import { eventsApprovedFindMany } from "@/services/events.service";

export default async function fetchApproved(req, res) {

    try {
        const events = await eventsApprovedFindMany()
        res.status(200).json({ events })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }

}

