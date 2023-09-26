import { roombookCreate } from "@/services/roombook.services"

export default async function bookRequestCreate(req, res) {

    const { date, from, to, clubId, description } = req.body

    try {
        await roombookCreate({
            date: new Date(date),
            from: new Date(from), 
            to: new Date(to),
            clubId,
            description
        })
        res.json({ message: 'Request created.' })
    } catch (error) {
        res.json({ message: error.message })
    }

}
