import { roombookUpdate } from "@/services/roombook.services"

export default async function bookRequestUpdate(req, res) {
    const { roombookId, date, from,to,description } = req.body


    try {
        const roombook = await roombookUpdate(roombookId, {
            date: new Date(date),
            from: new Date(from), 
            to: new Date(to),
            description
        })
        res.json({ message: 'Request updated successfully', roombook })
    } catch (e) {
        res.status(400)
        res.json({ message: e.message })
    }

}

