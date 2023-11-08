import { roombookCreate } from "@/services/roombook.services"

export default async function bookRequestCreate(req, res) {

    const { date, from, to, clubId, description } = req.body

    try {
        const data = {
            "from": new Date(from).toISOString(),
            "to": new Date(to).toISOString(),
            "clubId": clubId,
            description
        }
        await roombookCreate(data)
        res.json({ status: 200, message: 'Request created.' })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }

}
